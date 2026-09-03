import { Link } from "react-router-dom";

import {
  Mail,
  Heart,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="border-t border-orange-100 bg-stone-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* ================================================= */}
          {/* BRAND */}
          {/* ================================================= */}

          <div>
            <Link
              to="/"
              className="flex items-center gap-2"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-xl">
                🍳
              </div>

              <span className="text-xl font-extrabold">
                Recipe
                <span className="text-orange-500">
                  Finder
                </span>
              </span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-6 text-stone-400">
              Discover delicious recipes, explore
              cuisines, and find inspiration for your
              next meal.
            </p>

            {/* Social Icons */}

            <div className="mt-5 flex gap-3">

              {/* Instagram */}

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-800 text-stone-400 transition hover:bg-orange-500 hover:text-white"
              >
                <FaInstagram size={17} />
              </a>

              {/* Facebook */}

              <a
                href="#"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-800 text-stone-400 transition hover:bg-orange-500 hover:text-white"
              >
                <FaFacebookF size={16} />
              </a>

              {/* YouTube */}

              <a
                href="#"
                aria-label="YouTube"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-800 text-stone-400 transition hover:bg-orange-500 hover:text-white"
              >
                <FaYoutube size={17} />
              </a>

            </div>
          </div>

          {/* ================================================= */}
          {/* EXPLORE */}
          {/* ================================================= */}

          <div>
            <h3 className="font-bold text-white">
              Explore
            </h3>

            <ul className="mt-4 space-y-3 text-sm text-stone-400">

              <li>
                <Link
                  to="/explore"
                  className="transition hover:text-orange-400"
                >
                  All Recipes
                </Link>
              </li>

              <li>
                <Link
                  to="/categories"
                  className="transition hover:text-orange-400"
                >
                  Categories
                </Link>
              </li>

              <li>
                <Link
                  to="/cuisines"
                  className="transition hover:text-orange-400"
                >
                  Cuisines
                </Link>
              </li>

              <li>
                <Link
                  to="/ingredients"
                  className="transition hover:text-orange-400"
                >
                  Ingredients
                </Link>
              </li>

            </ul>
          </div>

          {/* ================================================= */}
          {/* QUICK LINKS */}
          {/* ================================================= */}

          <div>
            <h3 className="font-bold text-white">
              Quick Links
            </h3>

            <ul className="mt-4 space-y-3 text-sm text-stone-400">

              <li>
                <Link
                  to="/favorites"
                  className="transition hover:text-orange-400"
                >
                  Favorites
                </Link>
              </li>

              <li>
                <Link
                  to="/history"
                  className="transition hover:text-orange-400"
                >
                  Recently Viewed
                </Link>
              </li>

              <li>
                <Link
                  to="/explore"
                  className="transition hover:text-orange-400"
                >
                  Random Recipe
                </Link>
              </li>

            </ul>
          </div>

          {/* ================================================= */}
          {/* CONTACT */}
          {/* ================================================= */}

          <div>
            <h3 className="font-bold text-white">
              Stay Connected
            </h3>

            <p className="mt-4 text-sm leading-6 text-stone-400">
              Get recipe inspiration and discover
              something delicious every day.
            </p>

            <div className="mt-4 flex items-center gap-2 text-sm text-stone-400">
              <Mail
                size={17}
                className="text-orange-500"
              />

              <a
                href="mailto:hello@recipefinder.com"
                className="transition hover:text-orange-400"
              >
                hello@recipefinder.com
              </a>
            </div>
          </div>

        </div>

        {/* ================================================= */}
        {/* BOTTOM */}
        {/* ================================================= */}

        <div className="mt-10 flex flex-col gap-3 border-t border-stone-800 pt-6 text-sm text-stone-500 sm:flex-row sm:items-center sm:justify-between">

          <p>
            © {new Date().getFullYear()} RecipeFinder.
            All rights reserved.
          </p>

          <p className="flex items-center gap-1">
            Made with

            <Heart
              size={14}
              className="fill-orange-500 text-orange-500"
            />

            for food lovers.
          </p>

        </div>

      </div>
    </footer>
  );
}

export default Footer;