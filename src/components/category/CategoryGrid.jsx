import CategoryCard from "./CategoryCard";
import Skeleton from "../common/Skeleton";
import EmptyState from "../ui/EmptyState";
import { Utensils } from "lucide-react";

function CategoryGrid({
  categories = [],
  loading = false,
}) {
  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border border-orange-100 bg-white"
          >
            <Skeleton
              variant="image"
              className="rounded-none"
            />

            <div className="space-y-3 p-4">
              <Skeleton
                variant="title"
                className="w-3/5"
              />

              <Skeleton
                variant="text"
                className="w-full"
              />

              <Skeleton
                variant="text"
                className="w-4/5"
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!categories.length) {
    return (
      <EmptyState
        icon={Utensils}
        title="No categories found"
        message="We couldn't load the recipe categories. Please try again later."
      />
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {categories.map((category) => {
        const categoryName =
          category.strCategory || category.name;

        return (
          <CategoryCard
            key={categoryName}
            category={category}
          />
        );
      })}
    </div>
  );
}

export default CategoryGrid;