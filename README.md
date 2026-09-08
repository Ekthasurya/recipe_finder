# 🍳 Recipe Finder

A modern and responsive **Recipe Finder Web Application** built with **React.js, JavaScript, Tailwind CSS, and TheMealDB API**. The application allows users to discover recipes, search by ingredients, categories, and cuisines, view detailed cooking instructions, save favorite recipes, and maintain a recently viewed recipe history.

## 🚀 Live Demo

🔗 **Live Demo:** `recipe-finder-bay-nine.vercel.app`

🔗 **GitHub:** `https://github.com/Ekthasurya/recipe_finder`

---

## 📌 Features

### 🔍 Recipe Discovery

* Search recipes by name
* Browse recipes by category
* Explore recipes by cuisine/area
* Search recipes by ingredients
* View random recipes
* Explore popular recipe collections

### 🍽️ Recipe Details

* Recipe thumbnail and title
* Category and cuisine information
* Complete ingredient list with measurements
* Step-by-step cooking instructions
* YouTube cooking video integration
* Recipe sharing functionality

### ❤️ Favorites

* Add/remove recipes from favorites
* Persistent favorites using `localStorage`
* Dedicated Favorites page
* Favorite status available across the application

### 🕒 Recently Viewed

* Automatically track viewed recipes
* Recently viewed recipe history
* Prevent duplicate history entries
* Clear browsing history
* Store history using `localStorage`

### 🎨 User Interface

* Modern orange-themed design
* Fully responsive layout
* Dark/Light mode
* Reusable UI components
* Loading states and skeleton screens
* Empty states
* Error handling
* 404 Not Found page
* Smooth navigation and interactions

---

## 🛠️ Tech Stack

### Frontend

* **React.js**
* **JavaScript (ES6+)**
* **Tailwind CSS**
* **React Router DOM**
* **Vite**

### API

* **TheMealDB REST API**

### State & Storage

* **React Context API**
* **Custom React Hooks**
* **LocalStorage**

### Libraries

* **Lucide React** – UI icons
* **React Icons** – Social/brand icons

---

## 🌐 API Integration

This project uses the free **TheMealDB API** to retrieve recipe information.

The application uses API endpoints for:

* Recipe search
* Recipe details
* Categories
* Cuisines/areas
* Ingredients
* Ingredient-based filtering
* Category-based filtering
* Cuisine-based filtering
* Random recipes

Example:

```text
https://www.themealdb.com/api/json/v1/1/search.php?s=chicken
```

---

## 📂 Project Structure

```text
recipe-finder/
│
├── public/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── Skeleton.jsx
│   │   │   └── ScrollToTop.jsx
│   │   │
│   │   ├── recipe/
│   │   │   ├── RecipeCard.jsx
│   │   │   ├── RecipeGrid.jsx
│   │   │   ├── RecipeDetails.jsx
│   │   │   ├── IngredientList.jsx
│   │   │   ├── RecipeActions.jsx
│   │   │   └── VideoPlayer.jsx
│   │   │
│   │   ├── category/
│   │   │   ├── CategoryCard.jsx
│   │   │   └── CategoryGrid.jsx
│   │   │
│   │   ├── cuisine/
│   │   │   ├── CuisineCard.jsx
│   │   │   └── CuisineGrid.jsx
│   │   │
│   │   └── ui/
│   │       ├── Button.jsx
│   │       ├── Modal.jsx
│   │       ├── Toast.jsx
│   │       ├── EmptyState.jsx
│   │       └── ErrorState.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Explore.jsx
│   │   ├── RecipeDetails.jsx
│   │   ├── Categories.jsx
│   │   ├── CategoryRecipes.jsx
│   │   ├── Cuisines.jsx
│   │   ├── CuisineRecipes.jsx
│   │   ├── Ingredients.jsx
│   │   ├── IngredientRecipes.jsx
│   │   ├── Favorites.jsx
│   │   ├── History.jsx
│   │   └── NotFound.jsx
│   │
│   ├── services/
│   │   └── recipeService.js
│   │
│   ├── hooks/
│   │   ├── useFavorites.js
│   │   ├── useHistory.js
│   │   └── useDebounce.js
│   │
│   ├── context/
│   │   ├── FavoritesContext.jsx
│   │   └── ThemeContext.jsx
│   │
│   ├── utils/
│   │   ├── storage.js
│   │   ├── recipeHelpers.js
│   │   └── shareRecipe.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── vite.config.js
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the project

```bash
cd recipe-finder
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The application will run on:

```text
http://localhost:5173
```

---

## 📱 Application Pages

| Page               | Description                           |
| ------------------ | ------------------------------------- |
| 🏠 Home            | Featured recipes and recipe discovery |
| 🔎 Explore         | Search and explore recipes            |
| 🍽️ Recipe Details | Complete recipe information           |
| 📂 Categories      | Browse recipes by category            |
| 🌎 Cuisines        | Explore recipes by cuisine            |
| 🥕 Ingredients     | Browse recipes by ingredients         |
| ❤️ Favorites       | View saved recipes                    |
| 🕒 History         | View recently visited recipes         |
| ❌ Not Found        | Custom 404 page                       |

---

## 💡 Key Implementation

### React Context

Context API is used for application-wide state such as:

* Favorites
* Theme preferences

### LocalStorage

`localStorage` is used to persist:

```text
Favorites
Recently Viewed Recipes
Theme Preference
```

This allows user data to remain available after refreshing the browser.

### Custom Hooks

Reusable hooks are implemented for:

```text
useFavorites()
useHistory()
useDebounce()
```

These hooks help keep the application logic modular and reusable.

---

## 🔄 Application Flow

```text
User
 │
 ▼
React Frontend
 │
 ├── Search Recipe
 │
 ├── Browse Category
 │
 ├── Browse Cuisine
 │
 └── Browse Ingredient
 │
 ▼
TheMealDB REST API
 │
 ▼
Recipe Data
 │
 ▼
Recipe Cards
 │
 ▼
Recipe Details
 │
 ├── Ingredients
 ├── Instructions
 ├── Video
 ├── Favorite
 └── Share
```

---

## 🎯 Learning Objectives

This project demonstrates practical implementation of:

* React component architecture
* React Hooks
* Context API
* React Router
* REST API integration
* Asynchronous JavaScript
* API error handling
* Debounced search
* LocalStorage
* Responsive UI development
* Tailwind CSS
* Reusable components
* State management
* Modern frontend development with Vite

---

## 🔮 Future Improvements

Possible future enhancements:

* User authentication
* Backend integration
* Personal recipe collections
* Recipe reviews and ratings
* Meal planning
* Shopping list generation
* Nutritional information
* Advanced multi-filter search
* Recipe recommendations
* AI-powered recipe suggestions

---

## 👨‍💻 Author

**Surya Kiran Majhi**

Full Stack / MERN Developer

### Connect With Me

* GitHub: `https://github.com/Ekthasurya`
* LinkedIn: `www.linkedin.com/in/surya-kiran-majhi`
* Portfolio: `https://surya-ashy.vercel.app/`

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

---

## 📄 License

This project is created for educational and portfolio purposes.
