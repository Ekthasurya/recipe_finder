import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "recipe-finder-favorites";

function getStoredFavorites() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored);

    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Failed to read favorites:", error);
    return [];
  }
}

function useFavorites() {
  const [favorites, setFavorites] = useState(getStoredFavorites);

  // Save favorites whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(favorites),
      );
    } catch (error) {
      console.error("Failed to save favorites:", error);
    }
  }, [favorites]);

  // Check if recipe is favorite
  const isFavorite = useCallback(
    (recipeId) => {
      if (!recipeId) {
        return false;
      }

      return favorites.some(
        (recipe) =>
          String(recipe.idMeal || recipe.id) ===
          String(recipeId),
      );
    },
    [favorites],
  );

  // Add recipe
  const addFavorite = useCallback((recipe) => {
    if (!recipe) {
      return;
    }

    const recipeId = recipe.idMeal || recipe.id;

    if (!recipeId) {
      return;
    }

    setFavorites((currentFavorites) => {
      const alreadyExists = currentFavorites.some(
        (item) =>
          String(item.idMeal || item.id) ===
          String(recipeId),
      );

      if (alreadyExists) {
        return currentFavorites;
      }

      return [...currentFavorites, recipe];
    });
  }, []);

  // Remove recipe
  const removeFavorite = useCallback((recipeId) => {
    if (!recipeId) {
      return;
    }

    setFavorites((currentFavorites) =>
      currentFavorites.filter(
        (recipe) =>
          String(recipe.idMeal || recipe.id) !==
          String(recipeId),
      ),
    );
  }, []);

  // Toggle favorite
  const toggleFavorite = useCallback(
    (recipe) => {
      if (!recipe) {
        return;
      }

      const recipeId = recipe.idMeal || recipe.id;

      if (isFavorite(recipeId)) {
        removeFavorite(recipeId);
      } else {
        addFavorite(recipe);
      }
    },
    [isFavorite, removeFavorite, addFavorite],
  );

  // Remove all favorites
  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  return {
    favorites,
    favoriteCount: favorites.length,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    clearFavorites,
  };
}

export default useFavorites;