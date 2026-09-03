import { useCallback, useEffect, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useSearchParams } from "react-router-dom";

import SearchBar from "../components/common/SearchBar";
import RecipeGrid from "../components/recipe/RecipeGrid";
import Loader from "../components/common/Loader";
import EmptyState from "../components/ui/EmptyState";
import ErrorState from "../components/ui/ErrorState";
import Button from "../components/ui/Button";

import useDebounce from "../hooks/useDebounce";
import { useFavoritesContext } from "../context/FavoritesContext";

import {
  getCategories,
  getAreas,
  searchRecipes,
  getRecipesByCategory,
  getRecipesByArea,
} from "../services/recipeService";

function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSearch = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "";
  const initialCuisine = searchParams.get("cuisine") || "";

  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [cuisine, setCuisine] = useState(initialCuisine);

  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cuisines, setCuisines] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loadingFilters, setLoadingFilters] = useState(true);
  const [error, setError] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  const {
    isFavorite,
    toggleFavorite,
  } = useFavoritesContext();

  // --------------------------------------------------
  // Load categories and cuisines
  // --------------------------------------------------

  useEffect(() => {
    const loadFilters = async () => {
      try {
        setLoadingFilters(true);

        const [categoriesData, cuisinesData] =
          await Promise.all([
            getCategories(),
            getAreas(),
          ]);

        setCategories(categoriesData || []);
        setCuisines(cuisinesData || []);
      } catch (error) {
        console.error("Failed to load filters:", error);
      } finally {
        setLoadingFilters(false);
      }
    };

    loadFilters();
  }, []);

  // --------------------------------------------------
  // Fetch recipes
  // --------------------------------------------------

  const loadRecipes = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      let data = [];

      const searchValue = debouncedSearch.trim();

      if (searchValue) {
        data = await searchRecipes(searchValue);
      } else if (category) {
        data = await getRecipesByCategory(category);
      } else if (cuisine) {
        data = await getRecipesByArea(cuisine);
      } else {
        // Default search
        data = await searchRecipes("chicken");
      }

      setRecipes(data || []);
    } catch (err) {
      console.error("Explore error:", err);

      setRecipes([]);

      setError(
        "Unable to load recipes. Please check your connection and try again.",
      );
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, category, cuisine]);

  useEffect(() => {
    loadRecipes();
  }, [loadRecipes]);

  // --------------------------------------------------
  // Search
  // --------------------------------------------------

  const handleSearch = (value) => {
    setSearch(value);
    setCategory("");
    setCuisine("");

    const params = {};

    if (value.trim()) {
      params.search = value.trim();
    }

    setSearchParams(params);
  };

  // --------------------------------------------------
  // Category
  // --------------------------------------------------

  const handleCategoryChange = (event) => {
    const value = event.target.value;

    setCategory(value);
    setSearch("");
    setCuisine("");

    const params = {};

    if (value) {
      params.category = value;
    }

    setSearchParams(params);
  };

  // --------------------------------------------------
  // Cuisine
  // --------------------------------------------------

  const handleCuisineChange = (event) => {
    const value = event.target.value;

    setCuisine(value);
    setSearch("");
    setCategory("");

    const params = {};

    if (value) {
      params.cuisine = value;
    }

    setSearchParams(params);
  };

  // --------------------------------------------------
  // Clear filters
  // --------------------------------------------------

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setCuisine("");

    setSearchParams({});
  };

  const hasFilters =
    search.trim() || category || cuisine;

  // --------------------------------------------------
  // Page
  // --------------------------------------------------

  return (
    <main className="min-h-screen bg-orange-50 dark:bg-stone-950">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <section className="border-b border-orange-100 bg-white dark:border-stone-800 dark:bg-stone-900">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

          <div className="max-w-3xl">
            <div className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-orange-500">
              <Search size={16} />

              Explore
            </div>

            <h1 className="text-3xl font-extrabold text-stone-900 dark:text-white sm:text-4xl lg:text-5xl">
              Find Your Perfect Recipe
            </h1>

            <p className="mt-3 text-stone-500 dark:text-stone-400">
              Search thousands of recipes by name,
              category, or cuisine.
            </p>
          </div>

          {/* Search */}

          <div className="mt-8 max-w-3xl">
            <SearchBar
              value={search}
              onSearch={handleSearch}
              placeholder="Search recipes..."
            />
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* FILTERS */}
      {/* ================================================= */}

      <section className="border-b border-orange-100 bg-white dark:border-stone-800 dark:bg-stone-900">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">

            <div className="flex items-center gap-2 text-sm font-bold text-stone-700 dark:text-stone-300">
              <SlidersHorizontal
                size={18}
                className="text-orange-500"
              />

              Filters
            </div>

            <div className="grid flex-1 gap-3 sm:grid-cols-2">

              {/* Category */}

              <select
                value={category}
                onChange={handleCategoryChange}
                disabled={loadingFilters}
                className="h-11 rounded-xl border border-orange-200 bg-orange-50 px-4 text-sm font-medium text-stone-700 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200 disabled:cursor-not-allowed disabled:opacity-60 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200"
              >
                <option value="">
                  All Categories
                </option>

                {categories.map((item) => {
                  const name =
                    item.strCategory || item.name;

                  return (
                    <option
                      key={name}
                      value={name}
                    >
                      {name}
                    </option>
                  );
                })}
              </select>

              {/* Cuisine */}

              <select
                value={cuisine}
                onChange={handleCuisineChange}
                disabled={loadingFilters}
                className="h-11 rounded-xl border border-orange-200 bg-orange-50 px-4 text-sm font-medium text-stone-700 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200 disabled:cursor-not-allowed disabled:opacity-60 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200"
              >
                <option value="">
                  All Cuisines
                </option>

                {cuisines.map((item) => {
                  const name =
                    item.strArea ||
                    item.name ||
                    item.area;

                  return (
                    <option
                      key={name}
                      value={name}
                    >
                      {name}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Clear */}

            {hasFilters && (
              <Button
                variant="outline"
                size="medium"
                icon={X}
                onClick={clearFilters}
              >
                Clear
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* RESULTS */}
      {/* ================================================= */}

      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Result header */}

          <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h2 className="text-2xl font-extrabold text-stone-900 dark:text-white">
                {search
                  ? `Results for "${search}"`
                  : category
                    ? `${category} Recipes`
                    : cuisine
                      ? `${cuisine} Recipes`
                      : "Discover Recipes"}
              </h2>

              {!loading && !error && (
                <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                  {recipes.length}{" "}
                  {recipes.length === 1
                    ? "recipe"
                    : "recipes"}{" "}
                  found
                </p>
              )}
            </div>

            {loading && (
              <Loader size="small" />
            )}
          </div>

          {/* Error */}

          {error && !loading && (
            <ErrorState
              title="Couldn't load recipes"
              message={error}
              onRetry={loadRecipes}
            />
          )}

          {/* Loading */}

          {loading && !error && (
            <RecipeGrid
              recipes={[]}
              loading
            />
          )}

          {/* Results */}

          {!loading && !error && recipes.length > 0 && (
            <RecipeGrid
              recipes={recipes}
              isFavorite={isFavorite}
              onFavorite={toggleFavorite}
            />
          )}

          {/* Empty */}

          {!loading && !error && recipes.length === 0 && (
            <EmptyState
              icon={Search}
              title="No recipes found"
              message="Try another recipe name, category, or cuisine."
              actionText="Clear Filters"
              onAction={clearFilters}
            />
          )}
        </div>
      </section>
    </main>
  );
}

export default Explore;