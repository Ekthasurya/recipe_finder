import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ChefHat,
  Clock3,
  Globe2,
  Heart,
  Share2,
  Tag,
  Utensils,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import Loader from "../components/common/Loader";
import IngredientList from "../components/recipe/IngredientList";
import RecipeActions from "../components/recipe/RecipeActions";
import VideoPlayer from "../components/recipe/VideoPlayer";

import EmptyState from "../components/ui/EmptyState";
import ErrorState from "../components/ui/ErrorState";

import { getRecipeById } from "../services/recipeService";

import { useFavoritesContext } from "../context/FavoritesContext";
import useHistory from "../hooks/useHistory";

import {
  getIngredients,
  getInstructionSteps,
  getRecipeArea,
  getRecipeCategory,
  getRecipeImage,
  getRecipeInstructions,
  getRecipeName,
  getRecipeTags,
  getRecipeYoutube,
} from "../utils/recipeHelpers";

import { shareRecipe } from "../utils/shareRecipe";

function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const {
    isFavorite,
    toggleFavorite,
  } = useFavoritesContext();

  const {
    addToHistory,
  } = useHistory();

  // --------------------------------------------------
  // Load recipe
  // --------------------------------------------------

  useEffect(() => {
    let isMounted = true;

    const loadRecipe = async () => {
      if (!id) {
        setError("Recipe ID is missing.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const data = await getRecipeById(id);

        if (!isMounted) {
          return;
        }

        if (!data) {
          setRecipe(null);
          return;
        }

        setRecipe(data);

        // Add to recently viewed history
        addToHistory(data);
      } catch (err) {
        console.error(
          "Failed to load recipe:",
          err,
        );

        if (isMounted) {
          setError(
            "Unable to load this recipe. Please try again.",
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadRecipe();

    return () => {
      isMounted = false;
    };
  }, [id, addToHistory]);

  // --------------------------------------------------
  // Loading
  // --------------------------------------------------

  if (loading) {
    return (
      <main className="min-h-screen bg-orange-50 dark:bg-stone-950">
        <div className="flex min-h-[70vh] items-center justify-center">
          <Loader />
        </div>
      </main>
    );
  }

  // --------------------------------------------------
  // Error
  // --------------------------------------------------

  if (error) {
    return (
      <main className="min-h-screen bg-orange-50 dark:bg-stone-950">
        <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
          <ErrorState
            title="Recipe couldn't be loaded"
            message={error}
            onRetry={() => window.location.reload()}
          />
        </div>
      </main>
    );
  }

  // --------------------------------------------------
  // Empty
  // --------------------------------------------------

  if (!recipe) {
    return (
      <main className="min-h-screen bg-orange-50 dark:bg-stone-950">
        <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
          <EmptyState
            icon={ChefHat}
            title="Recipe not found"
            message="The recipe you're looking for doesn't exist or is no longer available."
            actionText="Explore Recipes"
            onAction={() => navigate("/explore")}
          />
        </div>
      </main>
    );
  }

  // --------------------------------------------------
  // Recipe data
  // --------------------------------------------------

  const recipeName = getRecipeName(recipe);
  const recipeImage = getRecipeImage(recipe);
  const category = getRecipeCategory(recipe);
  const area = getRecipeArea(recipe);
  const instructions = getRecipeInstructions(recipe);
  const ingredients = getIngredients(recipe);
  const instructionSteps =
    getInstructionSteps(recipe);
  const tags = getRecipeTags(recipe);
  const youtubeUrl = getRecipeYoutube(recipe);

  const favorite = isFavorite(
    recipe.idMeal || recipe.id,
  );

  // --------------------------------------------------
  // Favorite
  // --------------------------------------------------

  const handleFavorite = () => {
    toggleFavorite(recipe);

    if (favorite) {
      toast.success("Removed from favorites");
    } else {
      toast.success("Added to favorites ❤️");
    }
  };

  // --------------------------------------------------
  // Share
  // --------------------------------------------------

  const handleShare = async () => {
    const result = await shareRecipe(recipe);

    if (result.success) {
      toast.success(result.message);
    } else if (!result.cancelled) {
      toast.error(result.message);
    }
  };

  return (
    <main className="min-h-screen bg-orange-50 dark:bg-stone-950">

      {/* ================================================= */}
      {/* TOP NAVIGATION */}
      {/* ================================================= */}

      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <Link
          to="/explore"
          className="inline-flex items-center gap-2 text-sm font-bold text-stone-600 transition hover:text-orange-500 dark:text-stone-400 dark:hover:text-orange-400"
        >
          <ArrowLeft size={18} />

          Back to recipes
        </Link>
      </div>

      {/* ================================================= */}
      {/* HERO */}
      {/* ================================================= */}

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">

        <div className="overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-xl shadow-orange-100/50 dark:border-stone-800 dark:bg-stone-900 dark:shadow-none">

          <div className="grid lg:grid-cols-2">

            {/* Image */}

            <div className="relative min-h-[320px] overflow-hidden bg-orange-100 sm:min-h-[450px] lg:min-h-[600px]">

              {recipeImage ? (
                <img
                  src={recipeImage}
                  alt={recipeName}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full min-h-[320px] items-center justify-center">
                  <ChefHat
                    size={70}
                    className="text-orange-300"
                  />
                </div>
              )}

              {/* Image overlay */}

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {/* Category */}

              {category && (
                <div className="absolute left-5 top-5">
                  <span className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-sm font-bold text-white shadow-lg">
                    <Tag size={15} />

                    {category}
                  </span>
                </div>
              )}
            </div>

            {/* Details */}

            <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">

              {/* Small label */}

              <div className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-orange-500">
                <ChefHat size={17} />

                Recipe
              </div>

              {/* Name */}

              <h1 className="text-3xl font-extrabold leading-tight text-stone-900 dark:text-white sm:text-4xl lg:text-5xl">
                {recipeName}
              </h1>

              {/* Description */}

              <p className="mt-5 leading-7 text-stone-600 dark:text-stone-400">
                Discover how to prepare this delicious{" "}
                {area || ""} recipe with simple
                ingredients and easy-to-follow cooking
                instructions.
              </p>

              {/* Meta */}

              <div className="mt-7 grid gap-3 sm:grid-cols-2">

                {category && (
                  <div className="flex items-center gap-3 rounded-xl bg-orange-50 p-4 dark:bg-stone-800">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-950/50">
                      <Utensils size={19} />
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-stone-500 dark:text-stone-400">
                        Category
                      </p>

                      <p className="font-bold text-stone-900 dark:text-white">
                        {category}
                      </p>
                    </div>
                  </div>
                )}

                {area && (
                  <div className="flex items-center gap-3 rounded-xl bg-orange-50 p-4 dark:bg-stone-800">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-950/50">
                      <Globe2 size={19} />
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-stone-500 dark:text-stone-400">
                        Cuisine
                      </p>

                      <p className="font-bold text-stone-900 dark:text-white">
                        {area}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3 rounded-xl bg-orange-50 p-4 dark:bg-stone-800">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-950/50">
                    <Clock3 size={19} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-stone-500 dark:text-stone-400">
                      Difficulty
                    </p>

                    <p className="font-bold text-stone-900 dark:text-white">
                      Easy
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-orange-50 p-4 dark:bg-stone-800">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-950/50">
                    <Utensils size={19} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-stone-500 dark:text-stone-400">
                      Ingredients
                    </p>

                    <p className="font-bold text-stone-900 dark:text-white">
                      {ingredients.length}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}

              <div className="mt-8">
                <RecipeActions
                  recipe={recipe}
                  isFavorite={favorite}
                  onFavorite={handleFavorite}
                  onShare={handleShare}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* CONTENT */}
      {/* ================================================= */}

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">

        <div className="grid gap-8 lg:grid-cols-[350px_1fr]">

          {/* ================================================= */}
          {/* INGREDIENTS */}
          {/* ================================================= */}

          <aside className="h-fit rounded-3xl border border-orange-100 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900 lg:sticky lg:top-24">

            <div className="mb-6">
              <div className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-orange-500">
                <Utensils size={16} />

                Ingredients
              </div>

              <h2 className="text-2xl font-extrabold text-stone-900 dark:text-white">
                What You'll Need
              </h2>

              <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                {ingredients.length} ingredients
              </p>
            </div>

            <IngredientList
              ingredients={ingredients}
            />
          </aside>

          {/* ================================================= */}
          {/* INSTRUCTIONS */}
          {/* ================================================= */}

          <div className="space-y-8">

            <div className="rounded-3xl border border-orange-100 bg-white p-6 shadow-sm sm:p-8 dark:border-stone-800 dark:bg-stone-900">

              <div className="mb-8">
                <div className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-orange-500">
                  <ChefHat size={16} />

                  Instructions
                </div>

                <h2 className="text-2xl font-extrabold text-stone-900 dark:text-white sm:text-3xl">
                  How to Make It
                </h2>
              </div>

              {instructionSteps.length > 0 ? (
                <div className="space-y-7">
                  {instructionSteps.map(
                    (step, index) => (
                      <div
                        key={`${index}-${step.slice(
                          0,
                          20,
                        )}`}
                        className="flex gap-4"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-extrabold text-white shadow-md shadow-orange-200 dark:shadow-none">
                          {index + 1}
                        </div>

                        <p className="pt-1 text-base leading-7 text-stone-600 dark:text-stone-300">
                          {step}
                        </p>
                      </div>
                    ),
                  )}
                </div>
              ) : (
                <p className="leading-7 text-stone-500 dark:text-stone-400">
                  {instructions ||
                    "Cooking instructions are not available for this recipe."}
                </p>
              )}
            </div>

            {/* ================================================= */}
            {/* VIDEO */}
            {/* ================================================= */}

            {youtubeUrl && (
              <div className="rounded-3xl border border-orange-100 bg-white p-6 shadow-sm sm:p-8 dark:border-stone-800 dark:bg-stone-900">

                <div className="mb-6">
                  <div className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-orange-500">
                    <ChefHat size={16} />

                    Video
                  </div>

                  <h2 className="text-2xl font-extrabold text-stone-900 dark:text-white">
                    Watch the Recipe
                  </h2>
                </div>

                <VideoPlayer
                  url={youtubeUrl}
                  title={recipeName}
                />
              </div>
            )}

            {/* ================================================= */}
            {/* TAGS */}
            {/* ================================================= */}

            {tags.length > 0 && (
              <div className="rounded-3xl border border-orange-100 bg-white p-6 shadow-sm sm:p-8 dark:border-stone-800 dark:bg-stone-900">

                <h2 className="text-xl font-extrabold text-stone-900 dark:text-white">
                  Tags
                </h2>

                <div className="mt-4 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-600 dark:bg-orange-950/40 dark:text-orange-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* BOTTOM CTA */}
      {/* ================================================= */}

      <section className="bg-orange-500 px-4 py-14 text-center">
        <div className="mx-auto max-w-2xl">

          <ChefHat
            size={40}
            className="mx-auto text-white"
          />

          <h2 className="mt-4 text-3xl font-extrabold text-white">
            Enjoyed this recipe?
          </h2>

          <p className="mt-3 text-orange-50">
            Save it to your favorites or discover
            another delicious recipe.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">

            <button
              type="button"
              onClick={handleFavorite}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-orange-600 transition hover:bg-orange-50"
            >
              <Heart
                size={18}
                fill={favorite ? "currentColor" : "none"}
              />

              {favorite
                ? "Saved to Favorites"
                : "Save Recipe"}
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 font-bold text-white backdrop-blur transition hover:bg-white/20"
            >
              <Share2 size={18} />

              Share Recipe
            </button>

          </div>
        </div>
      </section>
    </main>
  );
}

export default RecipeDetails;