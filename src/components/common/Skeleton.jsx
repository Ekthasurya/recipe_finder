function Skeleton({
  className = "",
  variant = "default",
}) {
  const variants = {
    default: "rounded-lg",

    text: "h-4 rounded-md",

    title: "h-6 rounded-md",

    image: "aspect-[4/3] rounded-2xl",

    avatar: "h-12 w-12 rounded-full",

    button: "h-10 rounded-xl",
  };

  return (
    <div
      className={`animate-pulse bg-stone-200 ${variants[variant] || variants.default} ${className}`}
      aria-hidden="true"
    />
  );
}

export default Skeleton;