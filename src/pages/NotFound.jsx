import {
  ArrowLeft,
  ChefHat,
  Home,
  Search,
  Utensils,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-orange-50 px-4 dark:bg-stone-950">

      {/* ================================================= */}
      {/* BACKGROUND DECORATION */}
      {/* ================================================= */}

      <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-orange-200/50 blur-3xl dark:bg-orange-900/20" />

      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-orange-300/40 blur-3xl dark:bg-orange-900/20" />

      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-100/70 blur-3xl dark:bg-orange-950/20" />

      {/* ================================================= */}
      {/* CONTENT */}
      {/* ================================================= */}

      <div className="relative z-10 w-full max-w-2xl text-center">

        {/* Icon */}

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-orange-100 text-orange-500 shadow-lg shadow-orange-100 dark:bg-orange-950/40 dark:text-orange-400 dark:shadow-none sm:h-24 sm:w-24">
          <ChefHat
            size={42}
            strokeWidth={1.8}
            className="sm:h-12 sm:w-12"
          />
        </div>

        {/* 404 */}

        <p className="mt-8 text-7xl font-black tracking-tight text-orange-500 sm:text-8xl">
          404
        </p>

        {/* Heading */}

        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white sm:text-4xl">
          This recipe page is missing
        </h1>

        {/* Description */}

        <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-stone-500 dark:text-stone-400 sm:text-lg">
          Looks like you've wandered into an empty
          kitchen. The page you're looking for doesn't
          exist or may have been moved.
        </p>

        {/* ================================================= */}
        {/* ACTIONS */}
        {/* ================================================= */}

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">

          {/* Home */}

          <Link
            to="/"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 font-bold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600 hover:shadow-orange-300 sm:w-auto dark:shadow-none"
          >
            <Home size={18} />

            Back Home
          </Link>

          {/* Explore */}

          <Link
            to="/explore"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-orange-200 bg-white px-6 py-3.5 font-bold text-orange-600 transition hover:bg-orange-50 sm:w-auto dark:border-stone-700 dark:bg-stone-900 dark:text-orange-400 dark:hover:bg-stone-800"
          >
            <Search size={18} />

            Explore Recipes
          </Link>

        </div>

        {/* ================================================= */}
        {/* QUICK LINKS */}
        {/* ================================================= */}

        <div className="mt-12">

          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-stone-400">
            Try these instead
          </p>

          <div className="flex flex-wrap justify-center gap-2">

            <Link
              to="/categories"
              className="inline-flex items-center gap-2 rounded-full border border-orange-100 bg-white px-4 py-2 text-sm font-semibold text-stone-600 transition hover:border-orange-300 hover:text-orange-500 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-400 dark:hover:border-orange-800 dark:hover:text-orange-400"
            >
              <Utensils size={14} />

              Categories
            </Link>

            <Link
              to="/cuisines"
              className="inline-flex items-center gap-2 rounded-full border border-orange-100 bg-white px-4 py-2 text-sm font-semibold text-stone-600 transition hover:border-orange-300 hover:text-orange-500 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-400 dark:hover:border-orange-800 dark:hover:text-orange-400"
            >
              Cuisines
            </Link>

            <Link
              to="/ingredients"
              className="inline-flex items-center gap-2 rounded-full border border-orange-100 bg-white px-4 py-2 text-sm font-semibold text-stone-600 transition hover:border-orange-300 hover:text-orange-500 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-400 dark:hover:border-orange-800 dark:hover:text-orange-400"
            >
              Ingredients
            </Link>

          </div>
        </div>

        {/* ================================================= */}
        {/* GO BACK */}
        {/* ================================================= */}

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-stone-400 transition hover:text-orange-500 dark:text-stone-500 dark:hover:text-orange-400"
        >
          <ArrowLeft size={16} />

          Go back to previous page
        </button>

      </div>
    </main>
  );
}

export default NotFound;