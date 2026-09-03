import { ArrowRight, Globe2, Utensils } from "lucide-react";
import { Link } from "react-router-dom";

function CuisineCard({ cuisine }) {
  if (!cuisine) {
    return null;
  }

  const cuisineName =
    cuisine.strArea ||
    cuisine.name ||
    cuisine.area;

  if (!cuisineName) {
    return null;
  }

  return (
    <Link
      to={`/cuisines/${encodeURIComponent(cuisineName)}`}
      className="group relative block overflow-hidden rounded-2xl border border-orange-100 bg-white p-1 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-100"
    >
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-orange-50 via-white to-orange-100">
        {/* Decorative background */}
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-orange-200/40 transition-transform duration-500 group-hover:scale-125" />

        <div className="relative p-6">
          {/* Icon */}
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500 text-white shadow-md shadow-orange-200 transition-transform duration-300 group-hover:rotate-3 group-hover:scale-105">
              <Globe2 size={23} />
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-stone-400 shadow-sm transition-all duration-300 group-hover:bg-orange-500 group-hover:text-white">
              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </div>
          </div>

          {/* Cuisine */}
          <h3 className="mt-6 text-xl font-extrabold text-stone-900 transition-colors group-hover:text-orange-500">
            {cuisineName}
          </h3>

          <div className="mt-3 flex items-center gap-2 text-sm text-stone-500">
            <Utensils
              size={15}
              className="text-orange-500"
            />

            <span>
              Explore {cuisineName} recipes
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CuisineCard;