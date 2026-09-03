import {
  ArrowLeft,
  Check,
  Copy,
  Heart,
  Share2,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function RecipeActions({
  recipe,
  isFavorite = false,
  onFavorite,
}) {
  const navigate = useNavigate();

  const [copied, setCopied] = useState(false);

  if (!recipe) {
    return null;
  }

  const recipeId = recipe.idMeal || recipe.id;
  const recipeName = recipe.strMeal || recipe.name;

  const recipeUrl = `${window.location.origin}/recipes/${recipeId}`;

  const handleFavorite = () => {
    onFavorite?.(recipe);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(recipeUrl);

      setCopied(true);

      toast.success("Recipe link copied!");

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Copy failed:", error);

      toast.error("Unable to copy recipe link.");
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: recipeName,
      text: `Check out this recipe: ${recipeName}`,
      url: recipeUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(recipeUrl);

        toast.success("Recipe link copied!");
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        toast.error("Unable to share recipe.");
      }
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Back */}
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 rounded-xl border border-orange-100 bg-white px-4 py-2.5 text-sm font-semibold text-stone-600 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600"
      >
        <ArrowLeft size={17} />
        Back
      </button>

      {/* Favorite */}
      <button
        type="button"
        onClick={handleFavorite}
        className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
          isFavorite
            ? "bg-orange-500 text-white shadow-md shadow-orange-200 hover:bg-orange-600"
            : "border border-orange-100 bg-white text-stone-600 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600"
        }`}
      >
        <Heart
          size={17}
          className={isFavorite ? "fill-current" : ""}
        />

        {isFavorite ? "Saved" : "Save Recipe"}
      </button>

      {/* Share */}
      <button
        type="button"
        onClick={handleShare}
        className="flex items-center gap-2 rounded-xl border border-orange-100 bg-white px-4 py-2.5 text-sm font-semibold text-stone-600 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600"
      >
        <Share2 size={17} />
        Share
      </button>

      {/* Copy */}
      <button
        type="button"
        onClick={handleCopy}
        className="flex items-center gap-2 rounded-xl border border-orange-100 bg-white px-4 py-2.5 text-sm font-semibold text-stone-600 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600"
      >
        {copied ? <Check size={17} /> : <Copy size={17} />}

        {copied ? "Copied" : "Copy Link"}
      </button>
    </div>
  );
}

export default RecipeActions;