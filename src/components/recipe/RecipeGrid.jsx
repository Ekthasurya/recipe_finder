import RecipeCard from "./RecipeCard";
import Skeleton from "../common/Skeleton";
import EmptyState from "../ui/EmptyState";


function RecipeGrid({
  recipes = [],
  loading = false,
  favorites = [],
  onFavorite,
  emptyTitle = "No recipes found",
  emptyMessage = "Try searching for another recipe.",
}) {
  const isFavorite = (recipe) => {
    const recipeId = String(recipe?.idMeal || recipe?.id);

    return favorites.some(
      (favorite) =>
        String(favorite?.idMeal || favorite?.id) === recipeId,
    );
  };

  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border border-orange-100 bg-white"
          >
            <Skeleton variant="image" className="rounded-none" />

            <div className="space-y-3 p-4">
              <Skeleton variant="title" className="w-4/5" />
              <Skeleton variant="text" className="w-2/5" />
              <Skeleton variant="button" className="w-28" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!recipes.length) {
    return (
      <EmptyState
        title={emptyTitle}
        message={emptyMessage}
      />
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {recipes.map((recipe) => {
        const recipeId = recipe?.idMeal || recipe?.id;

        return (
          <RecipeCard
            key={recipeId}
            recipe={recipe}
            isFavorite={isFavorite(recipe)}
            onFavorite={onFavorite}
          />
        );
      })}
    </div>
  );
}

export default RecipeGrid;