import { Search, X } from "lucide-react";

function SearchBar({
  value = "",
  onChange,
  onSubmit,
  onClear,
  placeholder = "Search for recipes...",
  loading = false,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();

    if (value.trim() && onSubmit) {
      onSubmit(value.trim());
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full"
      role="search"
    >
      <div className="group relative flex items-center overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm transition focus-within:border-orange-300 focus-within:shadow-md focus-within:shadow-orange-100">
        <Search
          size={21}
          className="ml-4 shrink-0 text-stone-400 transition group-focus-within:text-orange-500"
        />

        <input
          type="search"
          value={value}
          onChange={(event) => onChange?.(event.target.value)}
          placeholder={placeholder}
          className="h-14 w-full bg-transparent px-3 text-sm text-stone-800 outline-none placeholder:text-stone-400"
          aria-label="Search recipes"
        />

        {value && !loading && (
          <button
            type="button"
            onClick={onClear}
            className="mr-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-stone-400 transition hover:bg-orange-50 hover:text-orange-500"
            aria-label="Clear search"
          >
            <X size={17} />
          </button>
        )}

        <button
          type="submit"
          disabled={!value.trim() || loading}
          className="mr-2 flex h-10 shrink-0 items-center justify-center rounded-xl bg-orange-500 px-5 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
    </form>
  );
}

export default SearchBar;