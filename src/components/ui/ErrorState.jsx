import { RefreshCw, TriangleAlert } from "lucide-react";

function ErrorState({
  title = "Something went wrong",
  message = "We couldn't load the recipes. Please try again.",
  onRetry,
}) {
  return (
    <div className="flex min-h-[300px] w-full items-center justify-center px-4 py-10">
      <div className="max-w-md text-center">
        {/* Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500">
          <TriangleAlert size={30} />
        </div>

        {/* Title */}
        <h2 className="mt-5 text-xl font-bold text-stone-900">
          {title}
        </h2>

        {/* Message */}
        <p className="mt-2 text-sm leading-6 text-stone-500">
          {message}
        </p>

        {/* Retry */}
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-200 transition hover:bg-orange-600"
          >
            <RefreshCw size={16} />
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}

export default ErrorState;