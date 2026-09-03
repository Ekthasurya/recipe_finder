import { Globe2 } from "lucide-react";

import CuisineCard from "./CuisineCard";
import Skeleton from "../common/Skeleton";
import EmptyState from "../ui/EmptyState";

function CuisineGrid({
  cuisines = [],
  loading = false,
}) {
  if (loading) {
    return (
      <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-orange-100 bg-white p-1"
          >
            <div className="rounded-xl bg-orange-50 p-6">
              <Skeleton
                variant="avatar"
                className="h-12 w-12"
              />

              <Skeleton
                variant="title"
                className="mt-6 w-3/5"
              />

              <Skeleton
                variant="text"
                className="mt-3 w-full"
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!cuisines.length) {
    return (
      <EmptyState
        icon={Globe2}
        title="No cuisines found"
        message="We couldn't load the available cuisines. Please try again later."
      />
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {cuisines.map((cuisine, index) => {
        const cuisineName =
          cuisine.strArea ||
          cuisine.name ||
          cuisine.area;

        return (
          <CuisineCard
            key={`${cuisineName}-${index}`}
            cuisine={cuisine}
          />
        );
      })}
    </div>
  );
}

export default CuisineGrid;