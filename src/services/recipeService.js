const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

/**
 * Generic API request helper
 */
const apiRequest = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Recipe API Error:", error);
    throw new Error(
      error.message || "Something went wrong while fetching recipes.",
    );
  }
};

/**
 * Search recipes by name
 *
 * Example:
 * searchRecipes("chicken")
 */
export const searchRecipes = async (query) => {
  if (!query?.trim()) {
    return [];
  }

  const data = await apiRequest(
    `/search.php?s=${encodeURIComponent(query.trim())}`,
  );

  return data.meals || [];
};

/**
 * Get recipe details by recipe ID
 *
 * Example:
 * getRecipeById("52772")
 */
export const getRecipeById = async (id) => {
  if (!id) {
    throw new Error("Recipe ID is required.");
  }

  const data = await apiRequest(`/lookup.php?i=${id}`);

  return data.meals?.[0] || null;
};

/**
 * Get a random recipe
 */
export const getRandomRecipe = async () => {
  const data = await apiRequest("/random.php");

  return data.meals?.[0] || null;
};

/**
 * Get all recipe categories
 */
export const getCategories = async () => {
  const data = await apiRequest("/categories.php");

  return data.categories || [];
};

/**
 * Get recipes by category
 *
 * Example:
 * getRecipesByCategory("Seafood")
 */
export const getRecipesByCategory = async (category) => {
  if (!category) {
    return [];
  }

  const data = await apiRequest(
    `/filter.php?c=${encodeURIComponent(category)}`,
  );

  return data.meals || [];
};

/**
 * Get recipes by cuisine / area
 *
 * Example:
 * getRecipesByArea("Indian")
 */
export const getRecipesByArea = async (area) => {
  if (!area) {
    return [];
  }

  const data = await apiRequest(
    `/filter.php?a=${encodeURIComponent(area)}`,
  );

  return data.meals || [];
};

/**
 * Get recipes by main ingredient
 *
 * Example:
 * getRecipesByIngredient("chicken_breast")
 */
export const getRecipesByIngredient = async (ingredient) => {
  if (!ingredient) {
    return [];
  }

  const data = await apiRequest(
    `/filter.php?i=${encodeURIComponent(ingredient)}`,
  );

  return data.meals || [];
};

/**
 * Get all cuisines / areas
 */
export const getAreas = async () => {
  const data = await apiRequest("/list.php?a=list");

  return data.meals || [];
};

/**
 * Get all ingredients
 */
export const getIngredients = async () => {
  const data = await apiRequest("/list.php?i=list");

  return data.meals || [];
};

/**
 * Get all available meal categories
 *
 * This is an alias for getCategories()
 */
export const getAllCategories = async () => {
  return getCategories();
};

/**
 * Get recipes by first letter
 *
 * Example:
 * getRecipesByFirstLetter("a")
 */
export const getRecipesByFirstLetter = async (letter) => {
  if (!letter) {
    return [];
  }

  const normalizedLetter = letter.trim().charAt(0).toLowerCase();

  if (!/^[a-z]$/.test(normalizedLetter)) {
    throw new Error("Please provide a valid alphabet letter.");
  }

  const data = await apiRequest(
    `/search.php?f=${normalizedLetter}`,
  );

  return data.meals || [];
};

/**
 * Get multiple random recipes
 *
 * TheMealDB provides one random recipe per request,
 * so we make multiple requests.
 */
export const getRandomRecipes = async (count = 6) => {
  const safeCount = Math.min(Math.max(Number(count) || 1, 1), 10);

  try {
    const requests = Array.from(
      { length: safeCount },
      () => apiRequest("/random.php"),
    );

    const results = await Promise.all(requests);

    return results
      .map((result) => result.meals?.[0])
      .filter(Boolean);
  } catch (error) {
    console.error("Random recipes error:", error);
    throw new Error("Unable to load random recipes.");
  }
};

/**
 * Extract ingredients and measurements from
 * a complete TheMealDB recipe object.
 *
 * TheMealDB stores ingredients as:
 *
 * strIngredient1 ... strIngredient20
 * strMeasure1 ... strMeasure20
 */
export const getRecipeIngredients = (recipe) => {
  if (!recipe) {
    return [];
  }

  const ingredients = [];

  for (let i = 1; i <= 20; i += 1) {
    const ingredient = recipe[`strIngredient${i}`]?.trim();
    const measure = recipe[`strMeasure${i}`]?.trim();

    if (ingredient) {
      ingredients.push({
        ingredient,
        measure: measure || "",
      });
    }
  }

  return ingredients;
};

/**
 * Extract useful recipe information
 */
export const formatRecipe = (recipe) => {
  if (!recipe) {
    return null;
  }

  return {
    id: recipe.idMeal,
    name: recipe.strMeal,
    category: recipe.strCategory,
    area: recipe.strArea,
    instructions: recipe.strInstructions,
    image: recipe.strMealThumb,
    youtube: recipe.strYoutube,
    source: recipe.strSource,
    tags: recipe.strTags
      ? recipe.strTags.split(",").map((tag) => tag.trim())
      : [],
    ingredients: getRecipeIngredients(recipe),
  };
};

/**
 * Search and format recipes
 */
export const searchAndFormatRecipes = async (query) => {
  const recipes = await searchRecipes(query);

  return recipes.map(formatRecipe);
};

/**
 * Get and format a recipe by ID
 */
export const getFormattedRecipeById = async (id) => {
  const recipe = await getRecipeById(id);

  return formatRecipe(recipe);
};

/**
 * Get and format a random recipe
 */
export const getFormattedRandomRecipe = async () => {
  const recipe = await getRandomRecipe();

  return formatRecipe(recipe);
};