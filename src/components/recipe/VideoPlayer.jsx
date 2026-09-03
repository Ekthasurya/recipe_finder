import { ExternalLink, PlayCircle } from "lucide-react";

function getYouTubeEmbedUrl(url) {
  if (!url) {
    return null;
  }

  try {
    const parsedUrl = new URL(url);

    let videoId = "";

    if (parsedUrl.hostname.includes("youtu.be")) {
      videoId = parsedUrl.pathname.slice(1);
    } else if (parsedUrl.hostname.includes("youtube.com")) {
      videoId = parsedUrl.searchParams.get("v") || "";

      if (!videoId && parsedUrl.pathname.includes("/embed/")) {
        videoId = parsedUrl.pathname.split("/embed/")[1];
      }
    }

    if (!videoId) {
      return null;
    }

    return `https://www.youtube.com/embed/${videoId}`;
  } catch {
    return null;
  }
}

function VideoPlayer({ url, title = "Recipe Video" }) {
  const embedUrl = getYouTubeEmbedUrl(url);

  if (!url) {
    return null;
  }

  if (!embedUrl) {
    return (
      <div className="rounded-2xl border border-orange-100 bg-orange-50 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-500 text-white">
              <PlayCircle size={21} />
            </div>

            <div>
              <h3 className="font-bold text-stone-900">
                Recipe Video
              </h3>

              <p className="text-sm text-stone-500">
                Watch the recipe instructions.
              </p>
            </div>
          </div>

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
          >
            Watch Video
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    );
  }

  return (
    <section>
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-500">
          <PlayCircle size={20} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-stone-900">
            Video Tutorial
          </h2>

          <p className="text-sm text-stone-500">
            Follow the recipe step by step.
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl bg-black shadow-xl shadow-orange-100">
        <div className="aspect-video">
          <iframe
            src={embedUrl}
            title={title}
            className="h-full w-full"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}

export default VideoPlayer;