/**
 * Get recipe ID
 */
export const getRecipeId = (recipe) => {
  if (!recipe) {
    return null;
  }

  return recipe.idMeal || recipe.id || null;
};

/**
 * Get recipe name
 */
export const getRecipeName = (recipe) => {
  if (!recipe) {
    return "";
  }

  return recipe.strMeal || recipe.name || "";
};

/**
 * Get recipe image
 */
export const getRecipeImage = (recipe) => {
  if (!recipe) {
    return "";
  }

  return recipe.strMealThumb || recipe.image || "";
};

/**
 * Get recipe category
 */
export const getRecipeCategory = (recipe) => {
  if (!recipe) {
    return "";
  }

  return recipe.strCategory || recipe.category || "";
};

/**
 * Get recipe cuisine / area
 */
export const getRecipeArea = (recipe) => {
  if (!recipe) {
    return "";
  }

  return recipe.strArea || recipe.area || "";
};

/**
 * Get recipe instructions
 */
export const getRecipeInstructions = (recipe) => {
  if (!recipe) {
    return "";
  }

  return (
    recipe.strInstructions ||
    recipe.instructions ||
    ""
  );
};

/**
 * Get YouTube URL
 */
export const getRecipeYoutube = (recipe) => {
  if (!recipe) {
    return "";
  }

  return recipe.strYoutube || recipe.youtube || "";
};

/**
 * Get recipe source
 */
export const getRecipeSource = (recipe) => {
  if (!recipe) {
    return "";
  }

  return recipe.strSource || recipe.source || "";
};

/**
 * Get recipe tags
 */
export const getRecipeTags = (recipe) => {
  if (!recipe) {
    return [];
  }

  if (Array.isArray(recipe.tags)) {
    return recipe.tags;
  }

  if (recipe.strTags) {
    return recipe.strTags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  return [];
};

/**
 * Get ingredients from TheMealDB recipe
 */
export const getIngredients = (recipe) => {
  if (!recipe) {
    return [];
  }

  // Already formatted ingredients
  if (Array.isArray(recipe.ingredients)) {
    return recipe.ingredients.filter(
      (item) =>
        item?.ingredient ||
        item?.name ||
        item?.strIngredient,
    );
  }

  const ingredients = [];

  for (let index = 1; index <= 20; index += 1) {
    const ingredient =
      recipe[`strIngredient${index}`]?.trim();

    const measure =
      recipe[`strMeasure${index}`]?.trim();

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
 * Get only ingredient names
 */
export const getIngredientNames = (recipe) => {
  return getIngredients(recipe)
    .map(
      (item) =>
        item.ingredient ||
        item.name ||
        item.strIngredient ||
        "",
    )
    .filter(Boolean);
};

/**
 * Count ingredients
 */
export const getIngredientCount = (recipe) => {
  return getIngredients(recipe).length;
};

/**
 * Split instructions into individual steps
 */
export const getInstructionSteps = (recipe) => {
  const instructions = getRecipeInstructions(recipe);

  if (!instructions) {
    return [];
  }

  return instructions
    .split(/\r?\n/)
    .map((step) => step.trim())
    .filter(Boolean);
};

/**
 * Create a clean recipe object
 */
export const normalizeRecipe = (recipe) => {
  if (!recipe) {
    return null;
  }

  return {
    id: getRecipeId(recipe),
    name: getRecipeName(recipe),
    image: getRecipeImage(recipe),
    category: getRecipeCategory(recipe),
    area: getRecipeArea(recipe),
    instructions: getRecipeInstructions(recipe),
    youtube: getRecipeYoutube(recipe),
    source: getRecipeSource(recipe),
    tags: getRecipeTags(recipe),
    ingredients: getIngredients(recipe),
  };
};

/**
 * Create recipe URL
 */
export const getRecipeUrl = (recipe) => {
  const id = getRecipeId(recipe);

  if (!id) {
    return "/explore";
  }

  return `/recipes/${id}`;
};

/**
 * Get YouTube video ID
 */
export const getYouTubeVideoId = (url) => {
  if (!url) {
    return null;
  }

  try {
    const parsedUrl = new URL(url);

    // youtu.be/VIDEO_ID
    if (parsedUrl.hostname.includes("youtu.be")) {
      return parsedUrl.pathname
        .replace("/", "")
        .split("/")[0];
    }

    // youtube.com/watch?v=VIDEO_ID
    if (parsedUrl.hostname.includes("youtube.com")) {
      const videoId = parsedUrl.searchParams.get("v");

      if (videoId) {
        return videoId;
      }

      // youtube.com/embed/VIDEO_ID
      if (parsedUrl.pathname.includes("/embed/")) {
        return parsedUrl.pathname
          .split("/embed/")[1]
          .split("/")[0];
      }

      // youtube.com/shorts/VIDEO_ID
      if (parsedUrl.pathname.includes("/shorts/")) {
        return parsedUrl.pathname
          .split("/shorts/")[1]
          .split("/")[0];
      }
    }

    return null;
  } catch {
    return null;
  }
};

/**
 * Get YouTube embed URL
 */
export const getYouTubeEmbedUrl = (url) => {
  const videoId = getYouTubeVideoId(url);

  if (!videoId) {
    return null;
  }

  return `https://www.youtube.com/embed/${videoId}`;
};

/**
 * Get YouTube thumbnail
 */
export const getYouTubeThumbnail = (url) => {
  const videoId = getYouTubeVideoId(url);

  if (!videoId) {
    return null;
  }

  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
};

/**
 * Create a short description from recipe instructions
 */
export const getShortDescription = (
  recipe,
  maxLength = 140,
) => {
  const instructions = getRecipeInstructions(recipe);

  if (!instructions) {
    return "Discover this delicious recipe and learn how to prepare it.";
  }

  if (instructions.length <= maxLength) {
    return instructions;
  }

  return `${instructions.slice(0, maxLength).trim()}...`;
};

/**
 * Search recipes locally
 */
export const filterRecipes = (
  recipes = [],
  searchTerm = "",
) => {
  if (!searchTerm.trim()) {
    return recipes;
  }

  const term = searchTerm.toLowerCase().trim();

  return recipes.filter((recipe) => {
    const name = getRecipeName(recipe).toLowerCase();
    const category =
      getRecipeCategory(recipe).toLowerCase();
    const area = getRecipeArea(recipe).toLowerCase();

    return (
      name.includes(term) ||
      category.includes(term) ||
      area.includes(term)
    );
  });
};