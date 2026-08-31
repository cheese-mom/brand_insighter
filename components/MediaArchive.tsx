"use client";

import { useEffect, useState } from "react";
import type { MediaItem } from "@/lib/types";
import {
  parseInstagramUrl,
  instagramEmbedUrl,
  canonicalInstagramUrl,
  type IgRef,
} from "@/lib/instagram";

type OpenReel = { ref: IgRef; link: string };

export default function MediaArchive({ items }: { items: MediaItem[] }) {
  const [open, setOpen] = useState<OpenReel | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <div className="grid grid-cols-3 gap-3">
        {(items.length > 0 ? items : Array.from({ length: 6 }, () => null)).map(
          (item, i) => {
            const cell = (
              <div className="aspect-[9/16] overflow-hidden bg-placeholder">
                {item?.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.image}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                )}
              </div>
            );
            if (!item?.link) return <div key={i}>{cell}</div>;
            // 인스타그램이 임베드를 차단한 게시물(embed: false)은 새 탭으로 연다
            const ref = item.embed === false ? null : parseInstagramUrl(item.link);
            if (ref) {
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setOpen({ ref, link: item.link })}
                  className="group block cursor-pointer text-left"
                  aria-label="인스타그램 릴스 보기"
                >
                  {cell}
                </button>
              );
            }
            return (
              <a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                {cell}
              </a>
            );
          },
        )}
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setOpen(null)}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              aria-label="닫기"
              onClick={() => setOpen(null)}
              className="absolute -top-10 right-0 p-1 text-3xl leading-none text-white hover:opacity-70"
            >
              &times;
            </button>
            <iframe
              key={open.ref.shortcode}
              src={instagramEmbedUrl(open.ref)}
              title="Instagram"
              className="h-[min(80vh,700px)] w-[min(92vw,400px)] border-0 bg-white"
              allow="autoplay; encrypted-media; picture-in-picture; clipboard-write"
              allowFullScreen
            />
            <a
              href={open.link || canonicalInstagramUrl(open.ref)}
              target="_blank"
              rel="noopener noreferrer"
              className="block py-2 text-center text-xs text-white/80 underline hover:text-white"
            >
              인스타그램 보기 (재생 안 될 시)
            </a>
          </div>
        </div>
      )}
    </>
  );
}
