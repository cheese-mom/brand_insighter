export function getYouTubeVideoId(value: string): string | null {
  try {
    const url = new URL(value);
    const host = url.hostname.replace(/^www\./, "");

    if (host === "youtu.be") return url.pathname.split("/").filter(Boolean)[0] ?? null;
    if (host !== "youtube.com" && host !== "m.youtube.com") return null;

    if (url.pathname === "/watch") return url.searchParams.get("v");

    const [kind, id] = url.pathname.split("/").filter(Boolean);
    return ["shorts", "embed", "live"].includes(kind) ? (id ?? null) : null;
  } catch {
    return null;
  }
}

export function getYouTubeThumbnailUrl(value: string): string | null {
  const id = getYouTubeVideoId(value);
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null;
}
