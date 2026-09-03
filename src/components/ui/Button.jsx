import { LoaderCircle } from "lucide-react";

const variants = {
  primary:
    "bg-orange-500 text-white shadow-md shadow-orange-200 hover:bg-orange-600",

  secondary:
    "bg-orange-50 text-orange-600 hover:bg-orange-100",

  outline:
    "border border-orange-200 bg-white text-orange-600 hover:bg-orange-50",

  dark:
    "bg-stone-900 text-white hover:bg-stone-800",

  ghost:
    "text-stone-600 hover:bg-orange-50 hover:text-orange-600",

  danger:
    "bg-red-500 text-white hover:bg-red-600",
};

const sizes = {
  small: "h-9 px-3 text-xs",
  medium: "h-11 px-5 text-sm",
  large: "h-13 px-7 text-base",
};

function Button({
  children,
  type = "button",
  variant = "primary",
  size = "medium",
  loading = false,
  disabled = false,
  fullWidth = false,
  icon: Icon,
  iconPosition = "left",
  onClick,
  className = "",
}) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={[
        "inline-flex items-center justify-center gap-2 rounded-xl font-semibold",
        "transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant] || variants.primary,
        sizes[size] || sizes.medium,
        fullWidth ? "w-full" : "",
        className,
      ].join(" ")}
    >
      {loading ? (
        <>
          <LoaderCircle size={17} className="animate-spin" />
          <span>Loading...</span>
        </>
      ) : (
        <>
          {Icon && iconPosition === "left" && <Icon size={17} />}

          {children}

          {Icon && iconPosition === "right" && <Icon size={17} />}
        </>
      )}
    </button>
  );
}

export default Button;