import { Heart, MapPin, Utensils } from "lucide-react";
import { Link } from "react-router-dom";

function RecipeCard({
  recipe,
  isFavorite = false,
  onFavorite,
  showFavorite = true,
}) {
  if (!recipe) {
    return null;
  }

  const recipeId = recipe.idMeal || recipe.id;
  const recipeName = recipe.strMeal || recipe.name;
  const image = recipe.strMealThumb || recipe.image;
  const category = recipe.strCategory || recipe.category;
  const area = recipe.strArea || recipe.area;

  const handleFavorite = (event) => {
    event.preventDefault();
    event.stopPropagation();

    onFavorite?.(recipe);
  };

  return (
    <article className="group overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-100">
      {/* Image */}
      <div className="relative overflow-hidden">
        <Link to={`/recipes/${recipeId}`}>
          <img
            src={image}
            alt={recipeName}
            loading="lazy"
            className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Favorite */}
        {showFavorite && (
          <button
            type="button"
            onClick={handleFavorite}
            aria-label={
              isFavorite
                ? `Remove ${recipeName} from favorites`
                : `Add ${recipeName} to favorites`
            }
            className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md transition-all ${
              isFavorite
                ? "bg-orange-500 text-white shadow-lg shadow-orange-300"
                : "bg-white/90 text-stone-500 hover:bg-orange-500 hover:text-white"
            }`}
          >
            <Heart
              size={18}
              className={isFavorite ? "fill-current" : ""}
            />
          </button>
        )}

        {/* Category */}
        {category && (
          <div className="absolute bottom-3 left-3">
            <span className="rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-orange-600 shadow-sm backdrop-blur-sm">
              {category}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <Link to={`/recipes/${recipeId}`}>
          <h3 className="line-clamp-2 min-h-[48px] text-lg font-bold text-stone-900 transition-colors group-hover:text-orange-500">
            {recipeName}
          </h3>
        </Link>

        <div className="mt-3 flex flex-wrap gap-3 text-xs text-stone-500">
          {area && (
            <div className="flex items-center gap-1.5">
              <MapPin size={14} className="text-orange-500" />
              <span>{area}</span>
            </div>
          )}

          {category && (
            <div className="flex items-center gap-1.5">
              <Utensils size={14} className="text-orange-500" />
              <span>{category}</span>
            </div>
          )}
        </div>

        <Link
          to={`/recipes/${recipeId}`}
          className="mt-4 inline-flex items-center text-sm font-semibold text-orange-500 transition hover:text-orange-600"
        >
          View Recipe
          <span className="ml-1 transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </article>
  );
}

export default RecipeCard;