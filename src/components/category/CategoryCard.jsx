import { ArrowRight, Utensils } from "lucide-react";
import { Link } from "react-router-dom";

function CategoryCard({ category }) {
  if (!category) {
    return null;
  }

  const categoryName =
    category.strCategory || category.name;

  const categoryImage =
    category.strCategoryThumb || category.image;

  const categoryDescription =
    category.strCategoryDescription ||
    category.description;

  return (
    <Link
      to={`/categories/${encodeURIComponent(categoryName)}`}
      className="group block overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-100"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        {categoryImage ? (
          <img
            src={categoryImage}
            alt={categoryName}
            loading="lazy"
            className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex aspect-[4/3] items-center justify-center bg-orange-50">
            <Utensils
              size={42}
              className="text-orange-300"
            />
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80" />

        {/* Category Name */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-end justify-between gap-3">
            <h3 className="text-xl font-extrabold text-white drop-shadow-sm">
              {categoryName}
            </h3>

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-500 text-white transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight size={17} />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="line-clamp-2 text-sm leading-6 text-stone-500">
          {categoryDescription ||
            `Explore delicious ${categoryName.toLowerCase()} recipes and discover something new to cook.`}
        </p>

        <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-orange-500">
          <Utensils size={15} />
          Browse {categoryName} recipes
        </div>
      </div>
    </Link>
  );
}

export default CategoryCard;