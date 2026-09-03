import { Check } from "lucide-react";

function IngredientList({ recipe, ingredients }) {
  const getIngredientsFromRecipe = () => {
    if (!recipe) {
      return [];
    }

    const result = [];

    for (let index = 1; index <= 20; index += 1) {
      const ingredient = recipe[`strIngredient${index}`]?.trim();
      const measure = recipe[`strMeasure${index}`]?.trim();

      if (ingredient) {
        result.push({
          ingredient,
          measure: measure || "",
        });
      }
    }

    return result;
  };

  const recipeIngredients =
    ingredients?.length > 0
      ? ingredients
      : getIngredientsFromRecipe();

  if (!recipeIngredients.length) {
    return (
      <div className="rounded-2xl bg-orange-50 p-5 text-sm text-stone-500">
        No ingredient information available.
      </div>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {recipeIngredients.map((item, index) => {
        const ingredient =
          item.ingredient || item.name || item.strIngredient;

        const measure =
          item.measure || item.quantity || item.strMeasure;

        return (
          <div
            key={`${ingredient}-${index}`}
            className="flex items-center gap-3 rounded-xl border border-orange-100 bg-white p-3 transition hover:border-orange-200 hover:bg-orange-50/50"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600">
              <Check size={16} />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-stone-800">
                {ingredient}
              </p>

              {measure && (
                <p className="mt-0.5 text-xs text-stone-500">
                  {measure}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default IngredientList;