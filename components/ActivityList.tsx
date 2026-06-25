"use client";

import { useState } from "react";
import ActivityCard from "./ActivityCard";
import type { Activity } from "@/lib/types";

const PAGE_SIZE = 9;

export default function ActivityList({ items }: { items: Activity[] }) {
  const [page, setPage] = useState(1);
  const pages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const current = Math.min(page, pages);
  const start = (current - 1) * PAGE_SIZE;
  const visible = items.slice(start, start + PAGE_SIZE);

  const go = (p: number) => {
    if (p < 1 || p > pages) return;
    setPage(p);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (items.length === 0) {
    return (
      <p className="mt-12 text-sm text-muted">아직 등록된 활동이 없습니다.</p>
    );
  }

  return (
    <>
      <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3">
        {visible.map((item) => (
          <ActivityCard key={item.id} item={item} />
        ))}
      </div>

      {pages > 1 && (
        <nav
          className="mt-12 flex items-center justify-center gap-1.5 text-sm"
          aria-label="페이지네이션"
        >
          <button
            type="button"
            onClick={() => go(current - 1)}
            disabled={current === 1}
            className="flex h-8 w-8 items-center justify-center text-muted disabled:opacity-30"
            aria-label="이전 페이지"
          >
            ‹
          </button>
          {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => go(p)}
              aria-current={p === current ? "page" : undefined}
              className={`flex h-8 w-8 items-center justify-center transition-colors ${
                p === current
                  ? "border border-ink font-semibold text-ink"
                  : "text-muted hover:text-ink"
              }`}
            >
              {p}
            </button>
          ))}
          <button
            type="button"
            onClick={() => go(current + 1)}
            disabled={current === pages}
            className="flex h-8 w-8 items-center justify-center text-muted disabled:opacity-30"
            aria-label="다음 페이지"
          >
            ›
          </button>
        </nav>
      )}
    </>
  );
}
