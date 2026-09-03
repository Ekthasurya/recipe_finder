import {
  Clock3,
  MapPin,
  Tag,
  Utensils,
} from "lucide-react";

import IngredientList from "./IngredientList";
import RecipeActions from "./RecipeActions";
import VideoPlayer from "./VideoPlayer";

function RecipeDetails({
  recipe,
  isFavorite = false,
  onFavorite,
}) {
  if (!recipe) {
    return null;
  }

  const recipeName = recipe.strMeal || recipe.name;
  const image = recipe.strMealThumb || recipe.image;
  const category = recipe.strCategory || recipe.category;
  const area = recipe.strArea || recipe.area;
  const instructions =
    recipe.strInstructions || recipe.instructions;
  const youtube = recipe.strYoutube || recipe.youtube;
  const source = recipe.strSource || recipe.source;

  const tags = recipe.strTags
    ? recipe.strTags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    : recipe.tags || [];

  return (
    <article className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Actions */}
      <div className="mb-6">
        <RecipeActions
          recipe={recipe}
          isFavorite={isFavorite}
          onFavorite={onFavorite}
        />
      </div>

      {/* Main Recipe */}
      <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
        {/* Image */}
        <div className="relative overflow-hidden rounded-3xl bg-orange-100 shadow-xl shadow-orange-100">
          <img
            src={image}
            alt={recipeName}
            className="aspect-square w-full object-cover"
          />

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6 pt-20">
            {category && (
              <span className="inline-flex rounded-full bg-orange-500 px-3 py-1.5 text-xs font-bold text-white">
                {category}
              </span>
            )}
          </div>
        </div>

        {/* Information */}
        <div>
          <div className="flex flex-wrap gap-2">
            {category && (
              <span className="flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1.5 text-xs font-semibold text-orange-600">
                <Utensils size={13} />
                {category}
              </span>
            )}

            {area && (
              <span className="flex items-center gap-1.5 rounded-full bg-stone-100 px-3 py-1.5 text-xs font-semibold text-stone-600">
                <MapPin size={13} />
                {area}
              </span>
            )}
          </div>

          <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-stone-900 sm:text-4xl lg:text-5xl">
            {recipeName}
          </h1>

          <p className="mt-5 leading-7 text-stone-500">
            Discover how to prepare this delicious{" "}
            {area ? `${area} ` : ""}
            {category ? `${category.toLowerCase()} ` : ""}
            recipe.
          </p>

          {/* Meta */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {category && (
              <div className="rounded-2xl bg-orange-50 p-4">
                <Utensils
                  size={20}
                  className="text-orange-500"
                />

                <p className="mt-2 text-xs text-stone-500">
                  Category
                </p>

                <p className="mt-1 text-sm font-bold text-stone-800">
                  {category}
                </p>
              </div>
            )}

            {area && (
              <div className="rounded-2xl bg-orange-50 p-4">
                <MapPin
                  size={20}
                  className="text-orange-500"
                />

                <p className="mt-2 text-xs text-stone-500">
                  Cuisine
                </p>

                <p className="mt-1 text-sm font-bold text-stone-800">
                  {area}
                </p>
              </div>
            )}

            <div className="rounded-2xl bg-orange-50 p-4">
              <Clock3
                size={20}
                className="text-orange-500"
              />

              <p className="mt-2 text-xs text-stone-500">
                Recipe
              </p>

              <p className="mt-1 text-sm font-bold text-stone-800">
                Easy to Follow
              </p>
            </div>
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="mt-6">
              <div className="mb-3 flex items-center gap-2">
                <Tag size={17} className="text-orange-500" />

                <h2 className="font-bold text-stone-900">
                  Tags
                </h2>
              </div>

              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-stone-100 px-3 py-1.5 text-xs font-medium text-stone-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Ingredients + Instructions */}
      <div className="mt-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        {/* Ingredients */}
        <section>
          <div className="mb-5">
            <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
              What you'll need
            </p>

            <h2 className="mt-1 text-2xl font-extrabold text-stone-900">
              Ingredients
            </h2>
          </div>

          <IngredientList recipe={recipe} />
        </section>

        {/* Instructions */}
        <section>
          <div className="mb-5">
            <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
              Let's cook
            </p>

            <h2 className="mt-1 text-2xl font-extrabold text-stone-900">
              Instructions
            </h2>
          </div>

          <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm sm:p-7">
            {instructions ? (
              <div className="space-y-5">
                {instructions
                  .split(/\r?\n/)
                  .map((step) => step.trim())
                  .filter(Boolean)
                  .map((step, index) => (
                    <div
                      key={`${step.slice(0, 20)}-${index}`}
                      className="flex gap-4"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">
                        {index + 1}
                      </div>

                      <p className="pt-1 text-sm leading-7 text-stone-600">
                        {step}
                      </p>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-sm text-stone-500">
                No cooking instructions are available.
              </p>
            )}
          </div>
        </section>
      </div>

      {/* Video */}
      {youtube && (
        <div className="mt-12">
          <VideoPlayer
            url={youtube}
            title={`${recipeName} recipe video`}
          />
        </div>
      )}

      {/* Source */}
      {source && (
        <div className="mt-8 border-t border-orange-100 pt-6">
          <a
            href={source}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-orange-500 transition hover:text-orange-600"
          >
            View Original Recipe →
          </a>
        </div>
      )}
    </article>
  );
}

export default RecipeDetails;