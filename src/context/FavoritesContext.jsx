import { createContext, useContext, useMemo } from "react";
import useFavorites from "../hooks/useFavorites";

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const favoritesData = useFavorites();

  const value = useMemo(
    () => favoritesData,
    [favoritesData],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavoritesContext() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error(
      "useFavoritesContext must be used inside FavoritesProvider",
    );
  }

  return context;
}

export default FavoritesContext;