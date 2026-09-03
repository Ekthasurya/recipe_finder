import {
  getRecipeId,
  getRecipeName,
  getRecipeUrl,
} from "./recipeHelpers";

/**
 * Get the complete share URL
 */
export const getShareUrl = (recipe) => {
  const recipeId = getRecipeId(recipe);

  if (!recipeId) {
    return window.location.href;
  }

  return `${window.location.origin}/recipes/${recipeId}`;
};

/**
 * Copy recipe URL to clipboard
 */
export const copyRecipeLink = async (recipe) => {
  try {
    const url = getShareUrl(recipe);

    await navigator.clipboard.writeText(url);

    return {
      success: true,
      url,
      message: "Recipe link copied!",
    };
  } catch (error) {
    console.error("Copy recipe link failed:", error);

    return {
      success: false,
      url: null,
      message: "Unable to copy recipe link.",
    };
  }
};

/**
 * Share recipe using Web Share API
 */
export const shareRecipe = async (recipe) => {
  if (!recipe) {
    return {
      success: false,
      message: "Recipe information is missing.",
    };
  }

  const recipeName = getRecipeName(recipe);
  const url = getShareUrl(recipe);

  const shareData = {
    title: recipeName || "RecipeFinder Recipe",
    text: `Check out this delicious recipe: ${recipeName}`,
    url,
  };

  try {
    // Native mobile/browser sharing
    if (navigator.share) {
      await navigator.share(shareData);

      return {
        success: true,
        method: "native",
        message: "Recipe shared successfully!",
      };
    }

    // Clipboard fallback
    const result = await copyRecipeLink(recipe);

    if (result.success) {
      return {
        success: true,
        method: "clipboard",
        message: "Recipe link copied!",
      };
    }

    return {
      success: false,
      method: "none",
      message: "Sharing is not supported on this device.",
    };
  } catch (error) {
    // User cancelled the native share dialog
    if (error?.name === "AbortError") {
      return {
        success: false,
        cancelled: true,
        message: "Share cancelled.",
      };
    }

    console.error("Share recipe failed:", error);

    return {
      success: false,
      method: "none",
      message: "Unable to share recipe.",
    };
  }
};

/**
 * Share recipe to WhatsApp
 */
export const shareToWhatsApp = (recipe) => {
  const recipeName = getRecipeName(recipe);
  const url = getShareUrl(recipe);

  const message = encodeURIComponent(
    `Check out this recipe: ${recipeName}\n${url}`,
  );

  window.open(
    `https://wa.me/?text=${message}`,
    "_blank",
    "noopener,noreferrer",
  );
};

/**
 * Share recipe to Facebook
 */
export const shareToFacebook = (recipe) => {
  const url = encodeURIComponent(
    getShareUrl(recipe),
  );

  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    "_blank",
    "noopener,noreferrer",
  );
};

/**
 * Share recipe to X / Twitter
 */
export const shareToTwitter = (recipe) => {
  const recipeName = getRecipeName(recipe);
  const url = getShareUrl(recipe);

  const text = encodeURIComponent(
    `Check out this recipe: ${recipeName}`,
  );

  const encodedUrl = encodeURIComponent(url);

  window.open(
    `https://twitter.com/intent/tweet?text=${text}&url=${encodedUrl}`,
    "_blank",
    "noopener,noreferrer",
  );
};