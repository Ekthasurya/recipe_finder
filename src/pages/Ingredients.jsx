import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Search,
  X,
  Leaf,
  Utensils,
} from "lucide-react";
import { Link } from "react-router-dom";

import Loader from "../components/common/Loader";
import ErrorState from "../components/ui/ErrorState";
import EmptyState from "../components/ui/EmptyState";

import { getIngredients } from "../services/recipeService";

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==================================================
  // LOAD INGREDIENTS
  // ==================================================

  const loadIngredients = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getIngredients();

      setIngredients(data || []);
    } catch (err) {
      console.error("Ingredients error:", err);

      setError(
        "Unable to load ingredients. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIngredients();
  }, []);

  // ==================================================
  // FILTER INGREDIENTS
  // ==================================================

  const filteredIngredients = useMemo(() => {
    const value = search
      .trim()
      .toLowerCase();

    if (!value) {
      return ingredients;
    }

    return ingredients.filter((ingredient) => {
      const name =
        ingredient.strIngredient ||
        ingredient.name ||
        "";

      const description =
        ingredient.strDescription ||
        "";

      return (
        name.toLowerCase().includes(value) ||
        description
          .toLowerCase()
          .includes(value)
      );
    });
  }, [ingredients, search]);

  // ==================================================
  // CLEAR SEARCH
  // ==================================================

  const clearSearch = () => {
    setSearch("");
  };

  return (
    <main className="min-h-screen bg-orange-50 dark:bg-stone-950">

      {/* ================================================= */}
      {/* HERO */}
      {/* ================================================= */}

      <section className="relative overflow-hidden bg-white dark:bg-stone-900">

        {/* Background decoration */}

        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-orange-200/40 blur-3xl dark:bg-orange-900/20" />

        <div className="absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-orange-300/30 blur-3xl dark:bg-orange-900/20" />

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">

          {/* Back */}

          <Link
            to="/explore"
            className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-stone-500 transition hover:text-orange-500 dark:text-stone-400 dark:hover:text-orange-400"
          >
            <ArrowLeft size={17} />

            Back to Explore
          </Link>

          <div className="max-w-3xl">

            {/* Label */}

            <div className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-orange-500">
              <Leaf size={17} />

              Ingredients
            </div>

            {/* Heading */}

            <h1 className="text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white sm:text-5xl lg:text-6xl">
              Cook With What
              <span className="block text-orange-500">
                You Already Have
              </span>
            </h1>

            {/* Description */}

            <p className="mt-5 max-w-2xl text-base leading-7 text-stone-600 dark:text-stone-400 sm:text-lg">
              Search for an ingredient and discover
              delicious recipes you can make with it.
            </p>

            {/* Count */}

            {!loading && !error && (
              <div className="mt-7 inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-sm font-bold text-orange-600 dark:bg-orange-950/40 dark:text-orange-400">
                <Utensils size={16} />

                {ingredients.length} ingredients available
              </div>
            )}
          </div>

          {/* ================================================= */}
          {/* SEARCH */}
          {/* ================================================= */}

          <div className="mt-10 max-w-2xl">

            <div className="relative">

              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500"
              />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search ingredients..."
                className="h-14 w-full rounded-2xl border border-orange-200 bg-orange-50 pl-12 pr-12 text-sm font-medium text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 dark:border-stone-700 dark:bg-stone-800 dark:text-white dark:placeholder:text-stone-500 dark:focus:ring-orange-950"
              />

              {search && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-stone-400 transition hover:bg-orange-100 hover:text-orange-500 dark:hover:bg-stone-700"
                  aria-label="Clear search"
                >
                  <X size={18} />
                </button>
              )}

            </div>

            {!loading && !error && search && (
              <p className="mt-3 text-sm text-stone-500 dark:text-stone-400">
                Showing{" "}
                <span className="font-bold text-orange-500">
                  {filteredIngredients.length}
                </span>{" "}
                results for{" "}
                <span className="font-bold text-stone-700 dark:text-stone-200">
                  "{search}"
                </span>
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* INGREDIENTS */}
      {/* ================================================= */}

      <section className="py-12 sm:py-16">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Loading */}

          {loading && (
            <div className="flex min-h-[300px] items-center justify-center">
              <Loader />
            </div>
          )}

          {/* Error */}

          {!loading && error && (
            <ErrorState
              title="Couldn't load ingredients"
              message={error}
              onRetry={loadIngredients}
            />
          )}

          {/* Results */}

          {!loading &&
            !error &&
            filteredIngredients.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                {filteredIngredients.map(
                  (ingredient, index) => {
                    const name =
                      ingredient.strIngredient ||
                      ingredient.name ||
                      "";

                    const description =
                      ingredient.strDescription ||
                      "";

                    const encodedName =
                      encodeURIComponent(name);

                    return (
                      <Link
                        key={`${name}-${index}`}
                        to={`/ingredients/${encodedName}`}
                        className="group rounded-2xl border border-orange-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-lg hover:shadow-orange-100 dark:border-stone-800 dark:bg-stone-900 dark:hover:border-orange-800 dark:hover:shadow-none"
                      >

                        {/* Icon */}

                        <div className="flex items-start justify-between">

                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-500 transition group-hover:bg-orange-500 group-hover:text-white dark:bg-orange-950/40 dark:text-orange-400 dark:group-hover:bg-orange-500 dark:group-hover:text-white">
                            <Leaf size={23} />
                          </div>

                          <ArrowRight
                            size={18}
                            className="text-stone-300 transition group-hover:translate-x-1 group-hover:text-orange-500"
                          />

                        </div>

                        {/* Name */}

                        <h2 className="mt-5 text-lg font-extrabold text-stone-900 transition group-hover:text-orange-500 dark:text-white dark:group-hover:text-orange-400">
                          {name}
                        </h2>

                        {/* Description */}

                        {description ? (
                          <p className="mt-2 line-clamp-2 text-sm leading-6 text-stone-500 dark:text-stone-400">
                            {description}
                          </p>
                        ) : (
                          <p className="mt-2 text-sm text-stone-400">
                            Explore recipes using {name}.
                          </p>
                        )}

                        {/* Bottom */}

                        <div className="mt-5 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-orange-500">
                          <Utensils size={13} />

                          View Recipes
                        </div>

                      </Link>
                    );
                  },
                )}

              </div>
            )}

          {/* Empty */}

          {!loading &&
            !error &&
            filteredIngredients.length === 0 && (
              <EmptyState
                icon={Search}
                title="No ingredients found"
                message={`We couldn't find an ingredient matching "${search}".`}
                actionText="Clear Search"
                onAction={clearSearch}
              />
            )}

        </div>
      </section>

      {/* ================================================= */}
      {/* CTA */}
      {/* ================================================= */}

      {!loading && !error && (
        <section className="border-t border-orange-100 bg-white py-14 dark:border-stone-800 dark:bg-stone-900">

          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-500 dark:bg-orange-950/40 dark:text-orange-400">
              <Leaf size={28} />
            </div>

            <h2 className="mt-5 text-2xl font-extrabold text-stone-900 dark:text-white sm:text-3xl">
              Have an ingredient in your kitchen?
            </h2>

            <p className="mt-3 text-stone-500 dark:text-stone-400">
              Search for it and find recipes you can
              make today.
            </p>

            <Link
              to="/explore"
              className="group mt-7 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-bold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600 hover:shadow-orange-300 dark:shadow-none"
            >
              Search Recipes

              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

          </div>
        </section>
      )}

    </main>
  );
}

export default Ingredients;