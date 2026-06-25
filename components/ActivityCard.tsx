import type { Activity } from "@/lib/types";

export default function ActivityCard({ item }: { item: Activity }) {
  return (
    <article className="group">
      {/* 썸네일 — 이미지가 없으면 회색 placeholder */}
      <div className="aspect-[4/3] w-full overflow-hidden bg-placeholder">
        {item.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.thumbnail}
            alt={item.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-neutral-400">
            IMAGE
          </div>
        )}
      </div>
      <p className="mt-4 text-xs text-muted">{item.date}</p>
      <h3 className="mt-1 text-base font-bold text-ink">{item.title}</h3>
      <p className="mt-2 line-clamp-3 text-[13px] leading-relaxed text-muted">
        {item.excerpt}
      </p>
    </article>
  );
}
