import Link from "next/link";
import type { Activity } from "@/lib/types";
import { getActivityPath } from "@/lib/activity-url";
import ActivityThumbnail from "./ActivityThumbnail";

export default function ActivityCard({ item }: { item: Activity }) {
  return (
    <article className="group">
      <Link href={getActivityPath(item)} className="block">
        <div className="aspect-[3/2] w-full overflow-hidden bg-placeholder">
          {item.thumbnail ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.thumbnail}
              alt={item.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          ) : (
            <ActivityThumbnail
              title={item.title}
              category={item.category}
              className="transition-transform duration-300 group-hover:scale-[1.03]"
            />
          )}
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
