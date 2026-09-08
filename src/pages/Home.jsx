import { useEffect, useState } from "react";
import {
  ArrowRight,
  ChefHat,
  Globe2,
  Search,
  Sparkles,
  Utensils,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import SearchBar from "../components/common/SearchBar";
import RecipeGrid from "../components/recipe/RecipeGrid";
import CategoryGrid from "../components/category/CategoryGrid";
import CuisineGrid from "../components/cuisine/CuisineGrid";

import EmptyState from "../components/ui/EmptyState";
import ErrorState from "../components/ui/ErrorState";

import {
  getCategories,
  getAreas,
  getPopularRecipes,
} from "../services/recipeService";

import { useFavoritesContext } from "../context/FavoritesContext";

function Home() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const [loadingCategories, setLoadingCategories] = useState(true);

  const [loadingCuisines, setLoadingCuisines] = useState(true);

  const [loadingRecipes, setLoadingRecipes] = useState(true);

  const [error, setError] = useState("");

  const { isFavorite, toggleFavorite } = useFavoritesContext();

  // ----------------------------------------
  // Load home page data
  // ----------------------------------------

  const loadHomeData = async () => {
    setError("");

    setLoadingCategories(true);
    setLoadingCuisines(true);
    setLoadingRecipes(true);

    try {
      const [categoriesData, cuisinesData, recipesData] = await Promise.all([
        getCategories(),
        getAreas(),
        getPopularRecipes(),
      ]);

      setCategories(categoriesData || []);
      setCuisines(cuisinesData || []);
      setRecipes(recipesData || []);
    } catch (err) {
      console.error("Home page error:", err);

      setError("Unable to load recipes right now. Please try again.");
    } finally {
      setLoadingCategories(false);
      setLoadingCuisines(false);
      setLoadingRecipes(false);
    }
  };

  useEffect(() => {
    loadHomeData();
  }, []);

  // ----------------------------------------
  // Search
  // ----------------------------------------

  const handleSearch = (value) => {
    const searchValue = value?.trim();

    if (!searchValue) {
      return;
    }

    navigate(`/explore?search=${encodeURIComponent(searchValue)}`);
  };

  // ----------------------------------------
  // Error state
  // ----------------------------------------

  if (error && !categories.length && !cuisines.length && !recipes.length) {
    return (
      <main className="min-h-screen bg-orange-50 dark:bg-stone-950">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <ErrorState
            title="Unable to load RecipeFinder"
            message={error}
            onRetry={loadHomeData}
          />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-orange-50 dark:bg-stone-950">
      {/* ================================================= */}
      {/* HERO */}
      {/* ================================================= */}

      <section className="relative overflow-hidden">
        {/* Background decorations */}

        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-orange-200/50 blur-3xl dark:bg-orange-900/20" />

        <div className="absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-orange-300/40 blur-3xl dark:bg-orange-900/20" />

        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-14 sm:px-6 lg:px-8 lg:pb-28 lg:pt-20">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-semibold text-orange-600 shadow-sm dark:border-stone-700 dark:bg-stone-900 dark:text-orange-400">
              <Sparkles size={16} />

              <span>Discover delicious recipes</span>
            </div>

            {/* Heading */}

            <h1 className="text-4xl font-extrabold tracking-tight text-stone-900 sm:text-5xl lg:text-7xl dark:text-white">
              Find Your Next
              <span className="block text-orange-500">Favorite Recipe</span>
            </h1>

            {/* Description */}

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-stone-600 sm:text-lg dark:text-stone-400">
              Explore thousands of delicious recipes, discover new cuisines, and
              find the perfect dish for every occasion.
            </p>

            {/* Search */}

            <div className="mx-auto mt-8 max-w-2xl">
              <SearchBar
                value={searchValue}
                onChange={setSearchValue}
                onSubmit={handleSearch}
                placeholder="Search for chicken, pasta, curry..."
              />
            </div>

            {/* Quick links */}

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/explore"
                className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600 hover:shadow-orange-300 dark:shadow-none"
              >
                <Search size={17} />
                Explore Recipes
              </Link>

              <Link
                to="/categories"
                className="inline-flex items-center gap-2 rounded-xl border border-orange-200 bg-white px-5 py-3 text-sm font-bold text-orange-600 transition hover:bg-orange-50 dark:border-stone-700 dark:bg-stone-900 dark:text-orange-400 dark:hover:bg-stone-800"
              >
                <Utensils size={17} />
                Browse Categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* FEATURED RECIPES */}
      {/* ================================================= */}

      <section className="bg-white py-16 dark:bg-stone-900 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <div className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-orange-500">
                <Sparkles size={16} />
                Featured
              </div>

              <h2 className="text-3xl font-extrabold text-stone-900 dark:text-white sm:text-4xl">
                Popular Recipes
              </h2>

              <p className="mt-2 max-w-xl text-stone-500 dark:text-stone-400">
                Discover delicious recipes that are perfect for your next meal.
              </p>
            </div>

            <Link
              to="/explore"
              className="group inline-flex items-center gap-2 font-bold text-orange-500 hover:text-orange-600"
            >
              View all recipes
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          <RecipeGrid
            recipes={recipes.slice(0, 8)}
            loading={loadingRecipes}
            isFavorite={isFavorite}
            onFavorite={toggleFavorite}
          />

          {!loadingRecipes && !recipes.length && (
            <EmptyState
              icon={ChefHat}
              title="No recipes available"
              message="We couldn't find any featured recipes right now."
              actionText="Explore Recipes"
              actionTo="/explore"
            />
          )}
        </div>
      </section>

      {/* ================================================= */}
      {/* CATEGORIES */}
      {/* ================================================= */}

      <section className="bg-orange-50 py-16 dark:bg-stone-950 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <div className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-orange-500">
                <Utensils size={16} />
                Categories
              </div>

              <h2 className="text-3xl font-extrabold text-stone-900 dark:text-white sm:text-4xl">
                What Are You Cooking?
              </h2>

              <p className="mt-2 max-w-xl text-stone-500 dark:text-stone-400">
                Browse recipes by your favorite food category.
              </p>
            </div>

            <Link
              to="/categories"
              className="group inline-flex items-center gap-2 font-bold text-orange-500 hover:text-orange-600"
            >
              All categories
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          <CategoryGrid
            categories={categories.slice(0, 8)}
            loading={loadingCategories}
          />
        </div>
      </section>

      {/* ================================================= */}
      {/* CUISINES */}
      {/* ================================================= */}

      <section className="bg-white py-16 dark:bg-stone-900 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <div className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-orange-500">
                <Globe2 size={16} />
                Cuisines
              </div>

              <h2 className="text-3xl font-extrabold text-stone-900 dark:text-white sm:text-4xl">
                Explore World Cuisines
              </h2>

              <p className="mt-2 max-w-xl text-stone-500 dark:text-stone-400">
                Travel the world through food and discover amazing recipes from
                different cultures.
              </p>
            </div>

            <Link
              to="/cuisines"
              className="group inline-flex items-center gap-2 font-bold text-orange-500 hover:text-orange-600"
            >
              All cuisines
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          <CuisineGrid
            cuisines={cuisines.slice(0, 10)}
            loading={loadingCuisines}
          />
        </div>
      </section>

      {/* ================================================= */}
      {/* CTA */}
      {/* ================================================= */}

      <section className="bg-orange-500 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-white backdrop-blur">
            <ChefHat size={32} />
          </div>

          <h2 className="mt-6 text-3xl font-extrabold text-white sm:text-4xl">
            Ready to Cook Something Amazing?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-orange-50">
            Find your next favorite recipe and bring something delicious to your
            table today.
          </p>

          <Link
            to="/explore"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-orange-600 shadow-lg transition hover:bg-orange-50"
          >
            Start Exploring
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Home;
