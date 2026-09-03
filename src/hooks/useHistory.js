import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "recipe-finder-history";
const MAX_HISTORY = 20;

function getStoredHistory() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored);

    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Failed to read recipe history:", error);
    return [];
  }
}

function useHistory() {
  const [history, setHistory] = useState(getStoredHistory);

  // Save history
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(history),
      );
    } catch (error) {
      console.error("Failed to save recipe history:", error);
    }
  }, [history]);

  // Add recipe to history
  const addToHistory = useCallback((recipe) => {
    if (!recipe) {
      return;
    }

    const recipeId = recipe.idMeal || recipe.id;

    if (!recipeId) {
      return;
    }

    setHistory((currentHistory) => {
      // Remove existing copy
      const filteredHistory = currentHistory.filter(
        (item) =>
          String(item.idMeal || item.id) !==
          String(recipeId),
      );

      // Add latest recipe at beginning
      return [recipe, ...filteredHistory].slice(
        0,
        MAX_HISTORY,
      );
    });
  }, []);

  // Remove one recipe
  const removeFromHistory = useCallback((recipeId) => {
    if (!recipeId) {
      return;
    }

    setHistory((currentHistory) =>
      currentHistory.filter(
        (recipe) =>
          String(recipe.idMeal || recipe.id) !==
          String(recipeId),
      ),
    );
  }, []);

  // Clear complete history
  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  // Check if recipe exists in history
  const isInHistory = useCallback(
    (recipeId) => {
      if (!recipeId) {
        return false;
      }

      return history.some(
        (recipe) =>
          String(recipe.idMeal || recipe.id) ===
          String(recipeId),
      );
    },
    [history],
  );

  return {
    history,
    historyCount: history.length,
    addToHistory,
    removeFromHistory,
    clearHistory,
    isInHistory,
  };
}

export default useHistory;