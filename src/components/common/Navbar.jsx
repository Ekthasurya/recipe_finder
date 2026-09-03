import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Heart,
  Menu,
  Search,
  UtensilsCrossed,
  X,
} from "lucide-react";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Explore", path: "/explore" },
  { name: "Categories", path: "/categories" },
  { name: "Cuisines", path: "/cuisines" },
  { name: "Ingredients", path: "/ingredients" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const getNavClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive
        ? "font-semibold text-orange-500"
        : "text-stone-600 hover:text-orange-500"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-orange-100 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white shadow-lg shadow-orange-200">
            <UtensilsCrossed size={21} />
          </div>

          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-stone-900">
              Recipe<span className="text-orange-500">Finder</span>
            </h1>

            <p className="hidden text-[10px] font-medium uppercase tracking-[0.18em] text-stone-400 sm:block">
              Discover & Cook
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={getNavClass}
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-2 md:flex">
          <Link
            to="/explore"
            aria-label="Search recipes"
            className="flex h-10 w-10 items-center justify-center rounded-full text-stone-600 transition hover:bg-orange-50 hover:text-orange-500"
          >
            <Search size={19} />
          </Link>

          <Link
            to="/favorites"
            className="flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-200 transition hover:bg-orange-600"
          >
            <Heart size={17} />
            Favorites
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-stone-700 transition hover:bg-orange-50 hover:text-orange-500 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-orange-100 bg-white px-4 py-5 md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-orange-50 font-semibold text-orange-600"
                      : "text-stone-600 hover:bg-orange-50 hover:text-orange-500"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            <Link
              to="/favorites"
              onClick={() => setIsOpen(false)}
              className="mt-2 flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white"
            >
              <Heart size={17} />
              Favorites
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;