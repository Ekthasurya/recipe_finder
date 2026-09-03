import { useCallback, useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChefHat,
  Utensils,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

import RecipeGrid from "../components/recipe/RecipeGrid";
import Loader from "../components/common/Loader";
import ErrorState from "../components/ui/ErrorState";
import EmptyState from "../components/ui/EmptyState";

import { getRecipesByCategory } from "../services/recipeService";

import { useFavoritesContext } from "../context/FavoritesContext";

function CategoryRecipes() {
  const { category } = useParams();
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const {
    isFavorite,
    toggleFavorite,
  } = useFavoritesContext();

  // --------------------------------------------------
  // Load category recipes
  // --------------------------------------------------

  const loadRecipes = useCallback(async () => {
    if (!category) {
      setError("Recipe category is missing.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const decodedCategory = decodeURIComponent(category);

      const data =
        await getRecipesByCategory(decodedCategory);

      setRecipes(data || []);
    } catch (err) {
      console.error(
        "Category recipes error:",
        err,
      );

      setRecipes([]);

      setError(
        "Unable to load recipes for this category.",
      );
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    loadRecipes();
  }, [loadRecipes]);

  const categoryName = category
    ? decodeURIComponent(category)
    : "Category";

  return (
    <main className="min-h-screen bg-orange-50 dark:bg-stone-950">

      {/* ================================================= */}
      {/* HERO */}
      {/* ================================================= */}

      <section className="relative overflow-hidden bg-white dark:bg-stone-900">

        {/* Decorative background */}

        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-orange-200/40 blur-3xl dark:bg-orange-900/20" />

        <div className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-orange-300/30 blur-3xl dark:bg-orange-900/20" />

        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">

          {/* Back */}

          <Link
            to="/categories"
            className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-stone-500 transition hover:text-orange-500 dark:text-stone-400 dark:hover:text-orange-400"
          >
            <ArrowLeft size={17} />

            All Categories
          </Link>

          {/* Content */}

          <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">

            <div>

              <div className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-orange-500">
                <Utensils size={17} />

                Category Recipes
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white sm:text-5xl">
                {categoryName}
                <span className="text-orange-500">
                  {" "}
                  Recipes
                </span>
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-stone-600 dark:text-stone-400">
                Discover delicious {categoryName.toLowerCase()} recipes
                and find something perfect to cook today.
              </p>

              {!loading && !error && (
                <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-sm font-bold text-orange-600 dark:bg-orange-950/40 dark:text-orange-400">
                  <ChefHat size={16} />

                  {recipes.length}{" "}
                  {recipes.length === 1
                    ? "recipe"
                    : "recipes"}
                </div>
              )}
            </div>

            {/* Explore */}

            <Link
              to="/explore"
              className="group inline-flex w-fit items-center gap-2 rounded-xl border border-orange-200 bg-orange-50 px-5 py-3 text-sm font-bold text-orange-600 transition hover:bg-orange-100 dark:border-stone-700 dark:bg-stone-800 dark:text-orange-400 dark:hover:bg-stone-700"
            >
              Search Recipes

              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* RECIPES */}
      {/* ================================================= */}

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Loading */}

          {loading && (
            <RecipeGrid
              recipes={[]}
              loading
            />
          )}

          {/* Error */}

          {!loading && error && (
            <ErrorState
              title="Couldn't load recipes"
              message={error}
              onRetry={loadRecipes}
            />
          )}

          {/* Results */}

          {!loading &&
            !error &&
            recipes.length > 0 && (
              <>
                <div className="mb-7 flex items-center justify-between">
                  <h2 className="text-2xl font-extrabold text-stone-900 dark:text-white">
                    {categoryName} Collection
                  </h2>

                  <button
                    type="button"
                    onClick={() => navigate("/explore")}
                    className="hidden text-sm font-bold text-orange-500 hover:text-orange-600 sm:block"
                  >
                    Browse More
                  </button>
                </div>

                <RecipeGrid
                  recipes={recipes}
                  isFavorite={isFavorite}
                  onFavorite={toggleFavorite}
                />
              </>
            )}

          {/* Empty */}

          {!loading &&
            !error &&
            recipes.length === 0 && (
              <EmptyState
                icon={ChefHat}
                title="No recipes found"
                message={`We couldn't find any ${categoryName.toLowerCase()} recipes.`}
                actionText="Explore Recipes"
                onAction={() => navigate("/explore")}
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
              <ChefHat size={28} />
            </div>

            <h2 className="mt-5 text-2xl font-extrabold text-stone-900 dark:text-white sm:text-3xl">
              Looking for something different?
            </h2>

            <p className="mt-3 text-stone-500 dark:text-stone-400">
              Explore other categories or search for a
              specific recipe.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3">

              <Link
                to="/categories"
                className="inline-flex items-center gap-2 rounded-xl border border-orange-200 px-5 py-3 font-bold text-orange-600 transition hover:bg-orange-50 dark:border-stone-700 dark:text-orange-400 dark:hover:bg-stone-800"
              >
                <ArrowLeft size={17} />

                Categories
              </Link>

              <Link
                to="/explore"
                className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-bold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600 dark:shadow-none"
              >
                Explore Recipes

                <ArrowRight size={17} />
              </Link>

            </div>
          </div>
        </section>
      )}
    </main>
  );
}

export default CategoryRecipes;