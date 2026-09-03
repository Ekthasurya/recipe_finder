import { LoaderCircle } from "lucide-react";

function Loader({
  size = "medium",
  text = "Loading...",
  fullScreen = false,
}) {
  const sizes = {
    small: {
      spinner: "h-5 w-5",
      text: "text-xs",
    },
    medium: {
      spinner: "h-8 w-8",
      text: "text-sm",
    },
    large: {
      spinner: "h-12 w-12",
      text: "text-base",
    },
  };

  const currentSize = sizes[size] || sizes.medium;

  const content = (
    <div className="flex flex-col items-center justify-center gap-3">
      <LoaderCircle
        className={`${currentSize.spinner} animate-spin text-orange-500`}
      />

      {text && (
        <p className={`${currentSize.text} font-medium text-stone-500`}>
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/80 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return (
    <div className="flex min-h-[200px] w-full items-center justify-center">
      {content}
    </div>
  );
}

export default Loader;