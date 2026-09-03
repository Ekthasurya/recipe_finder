import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import ScrollToTop from "./components/common/ScrollToTop";

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import RecipeDetails from "./pages/RecipeDetails";

import Categories from "./pages/Categories";
import CategoryRecipes from "./pages/CategoryRecipes";

import Cuisines from "./pages/Cuisines";
import CuisineRecipes from "./pages/CuisineRecipes";

import Ingredients from "./pages/Ingredients";
import IngredientRecipes from "./pages/IngredientRecipes";

import Favorites from "./pages/Favorites";
import History from "./pages/History";

import NotFound from "./pages/NotFound";

import { FavoritesProvider } from "./context/FavoritesContext";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <FavoritesProvider>

          {/* Scroll to top whenever route changes */}
          <ScrollToTop />

          {/* Navbar */}
          <Navbar />

          {/* Main Application */}
          <Routes>

            {/* ========================================= */}
            {/* MAIN PAGES */}
            {/* ========================================= */}

            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/explore"
              element={<Explore />}
            />

            {/* ========================================= */}
            {/* RECIPE */}
            {/* ========================================= */}

            <Route
              path="/recipes/:id"
              element={<RecipeDetails />}
            />

            {/* ========================================= */}
            {/* CATEGORIES */}
            {/* ========================================= */}

            <Route
              path="/categories"
              element={<Categories />}
            />

            <Route
              path="/categories/:category"
              element={<CategoryRecipes />}
            />

            {/* ========================================= */}
            {/* CUISINES */}
            {/* ========================================= */}

            <Route
              path="/cuisines"
              element={<Cuisines />}
            />

            <Route
              path="/cuisines/:cuisine"
              element={<CuisineRecipes />}
            />

            {/* ========================================= */}
            {/* INGREDIENTS */}
            {/* ========================================= */}

            <Route
              path="/ingredients"
              element={<Ingredients />}
            />

            <Route
              path="/ingredients/:ingredient"
              element={<IngredientRecipes />}
            />

            {/* ========================================= */}
            {/* USER */}
            {/* ========================================= */}

            <Route
              path="/favorites"
              element={<Favorites />}
            />

            <Route
              path="/history"
              element={<History />}
            />

            {/* ========================================= */}
            {/* 404 */}
            {/* ========================================= */}

            <Route
              path="*"
              element={<NotFound />}
            />

          </Routes>

          {/* Footer */}
          <Footer />

        </FavoritesProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;