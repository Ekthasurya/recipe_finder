import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChefHat,
  Utensils,
} from "lucide-react";
import { Link } from "react-router-dom";

import CategoryGrid from "../components/category/CategoryGrid";
import ErrorState from "../components/ui/ErrorState";

import { getCategories } from "../services/recipeService";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getCategories();

      setCategories(data || []);
    } catch (err) {
      console.error("Categories error:", err);

      setError(
        "Unable to load recipe categories. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <main className="min-h-screen bg-orange-50 dark:bg-stone-950">

      {/* ============================================= */}
      {/* HERO */}
      {/* ============================================= */}

      <section className="relative overflow-hidden bg-white dark:bg-stone-900">
        {/* Decorative circles */}

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
              <Utensils size={17} />

              Recipe Categories
            </div>

            {/* Heading */}

            <h1 className="text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white sm:text-5xl lg:text-6xl">
              What Are You
              <span className="block text-orange-500">
                In The Mood For?
              </span>
            </h1>

            {/* Description */}

            <p className="mt-5 max-w-2xl text-base leading-7 text-stone-600 dark:text-stone-400 sm:text-lg">
              Explore recipes organized by category.
              From hearty beef dishes to delicious
              desserts, find something perfect for
              your next meal.
            </p>

            {/* Count */}

            {!loading && !error && (
              <div className="mt-7 inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-sm font-bold text-orange-600 dark:bg-orange-950/40 dark:text-orange-400">
                <ChefHat size={16} />

                {categories.length} categories available
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* CATEGORY GRID */}
      {/* ============================================= */}

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Error */}

          {error && (
            <ErrorState
              title="Couldn't load categories"
              message={error}
              onRetry={loadCategories}
            />
          )}

          {/* Grid */}

          {!error && (
            <CategoryGrid
              categories={categories}
              loading={loading}
            />
          )}
        </div>
      </section>

      {/* ============================================= */}
      {/* CTA */}
      {/* ============================================= */}

      {!loading && !error && (
        <section className="border-t border-orange-100 bg-white py-14 dark:border-stone-800 dark:bg-stone-900">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-500 dark:bg-orange-950/40 dark:text-orange-400">
              <ChefHat size={28} />
            </div>

            <h2 className="mt-5 text-2xl font-extrabold text-stone-900 dark:text-white sm:text-3xl">
              Can't decide what to cook?
            </h2>

            <p className="mt-3 text-stone-500 dark:text-stone-400">
              Search through thousands of recipes and
              discover your next favorite meal.
            </p>

            <Link
              to="/explore"
              className="group mt-7 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-bold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600 hover:shadow-orange-300 dark:shadow-none"
            >
              Explore All Recipes

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

export default Categories;