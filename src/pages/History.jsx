import {
  ArrowRight,
  Clock3,
  ChefHat,
  History as HistoryIcon,
  Search,
  Trash2,
  Utensils,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import RecipeGrid from "../components/recipe/RecipeGrid";
import EmptyState from "../components/ui/EmptyState";

import { useHistory } from "../hooks/useHistory";

function History() {
  const navigate = useNavigate();

  const {
    history,
    clearHistory,
  } = useHistory();

  return (
    <main className="min-h-screen bg-orange-50 dark:bg-stone-950">

      {/* ================================================= */}
      {/* HERO */}
      {/* ================================================= */}

      <section className="relative overflow-hidden bg-white dark:bg-stone-900">

        {/* Decorative background */}

        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-orange-200/40 blur-3xl dark:bg-orange-900/20" />

        <div className="absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-orange-300/30 blur-3xl dark:bg-orange-900/20" />

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">

          {/* Label */}

          <div className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-orange-500">
            <HistoryIcon size={17} />

            Recently Viewed
          </div>

          {/* Heading */}

          <h1 className="text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white sm:text-5xl lg:text-6xl">
            Your Recipe
            <span className="block text-orange-500">
              History
            </span>
          </h1>

          {/* Description */}

          <p className="mt-5 max-w-2xl text-base leading-7 text-stone-600 dark:text-stone-400 sm:text-lg">
            Quickly find recipes you've recently
            viewed and continue exploring your favorite
            dishes.
          </p>

          {/* Count */}

          <div className="mt-7 inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-sm font-bold text-orange-600 dark:bg-orange-950/40 dark:text-orange-400">
            <Clock3 size={16} />

            {history.length}{" "}
            {history.length === 1
              ? "recent recipe"
              : "recent recipes"}
          </div>

        </div>
      </section>

      {/* ================================================= */}
      {/* HISTORY */}
      {/* ================================================= */}

      <section className="py-12 sm:py-16">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* ================================================= */}
          {/* HEADER */}
          {/* ================================================= */}

          {history.length > 0 && (
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

              <div>

                <div className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-orange-500">
                  <Utensils size={15} />

                  Recent Recipes
                </div>

                <h2 className="text-2xl font-extrabold text-stone-900 dark:text-white sm:text-3xl">
                  Continue Exploring
                </h2>

              </div>

              {/* Clear History */}

              <button
                type="button"
                onClick={clearHistory}
                className="inline-flex w-fit items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-bold text-red-500 transition hover:bg-red-50 dark:border-red-900/50 dark:bg-stone-900 dark:hover:bg-red-950/20"
              >
                <Trash2 size={16} />

                Clear History
              </button>

            </div>
          )}

          {/* ================================================= */}
          {/* RECIPE GRID */}
          {/* ================================================= */}

          {history.length > 0 && (
            <RecipeGrid
              recipes={history}
            />
          )}

          {/* ================================================= */}
          {/* EMPTY STATE */}
          {/* ================================================= */}

          {history.length === 0 && (
            <EmptyState
              icon={HistoryIcon}
              title="Your history is empty"
              message="Recipes you open will appear here so you can easily find them again."
              actionText="Explore Recipes"
              onAction={() =>
                navigate("/explore")
              }
            />
          )}

        </div>
      </section>

      {/* ================================================= */}
      {/* CTA */}
      {/* ================================================= */}

      <section className="border-t border-orange-100 bg-white py-14 dark:border-stone-800 dark:bg-stone-900">

        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-500 dark:bg-orange-950/40 dark:text-orange-400">
            <Search size={27} />
          </div>

          <h2 className="mt-5 text-2xl font-extrabold text-stone-900 dark:text-white sm:text-3xl">
            Ready for your next recipe?
          </h2>

          <p className="mt-3 text-stone-500 dark:text-stone-400">
            Explore new recipes and discover something
            delicious to cook today.
          </p>

          <Link
            to="/explore"
            className="group mt-7 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-bold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600 hover:shadow-orange-300 dark:shadow-none"
          >
            Explore Recipes

            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>

        </div>
      </section>

    </main>
  );
}

export default History;