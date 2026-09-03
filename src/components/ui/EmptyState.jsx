import { ChefHat, Search } from "lucide-react";
import { Link } from "react-router-dom";

function EmptyState({
  title = "Nothing here yet",
  message = "We couldn't find anything to display.",
  icon: Icon = ChefHat,
  actionText,
  actionTo,
  onAction,
}) {
  return (
    <div className="flex min-h-[300px] w-full items-center justify-center px-4 py-10">
      <div className="max-w-md text-center">
        {/* Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-orange-500">
          <Icon size={30} />
        </div>

        {/* Title */}
        <h2 className="mt-5 text-xl font-bold text-stone-900">
          {title}
        </h2>

        {/* Message */}
        <p className="mt-2 text-sm leading-6 text-stone-500">
          {message}
        </p>

        {/* Action */}
        {actionText && actionTo && (
          <Link
            to={actionTo}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-200 transition hover:bg-orange-600"
          >
            <Search size={16} />
            {actionText}
          </Link>
        )}

        {actionText && !actionTo && onAction && (
          <button
            type="button"
            onClick={onAction}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-200 transition hover:bg-orange-600"
          >
            <Search size={16} />
            {actionText}
          </button>
        )}
      </div>
    </div>
  );
}

export default EmptyState;