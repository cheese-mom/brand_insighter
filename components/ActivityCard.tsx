import Link from "next/link";
import type { Activity } from "@/lib/types";

export default function ActivityCard({ item }: { item: Activity }) {
  const fallbackIndex =
    [...item.id].reduce((total, char) => total + char.charCodeAt(0), 0) % 12;
  const thumbnail =
    item.thumbnail ||
    `/assets/media/archive-${String(fallbackIndex + 1).padStart(2, "0")}.jpg`;

  return (
    <article className="group">
      <Link href={`/activity/${item.id}`} className="block">
        <div className="aspect-[3/2] w-full overflow-hidden bg-placeholder">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumbnail}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>
        <p className="mt-4 text-xs text-muted">{item.date}</p>
        <h3 className="mt-1 font-display text-base text-ink group-hover:underline">
          {item.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-[13px] leading-relaxed text-muted">
          {item.excerpt}
        </p>
      </Link>
    </article>
  );
}
