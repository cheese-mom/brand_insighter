import Link from "next/link";
import type { Metadata } from "next";
import ActivityCard from "@/components/ActivityCard";
import CtaBanner from "@/components/CtaBanner";
import { getActivities, getSiteContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About | 박재현",
  description:
    "한국브랜드마케팅연구소 대표 · 연세대 브랜드전문가과정 前 책임교수 박재현. 25년간 브랜드 네이밍·전략·스토리 설계를 통해 브랜드의 방향을 고민해 왔습니다.",
};

export default async function AboutPage() {
  const [{ about }, activities] = await Promise.all([
    getSiteContent(),
    getActivities(),
  ]);
  const preview = activities.slice(0, 3);

  return (
    <>
      {/* About */}
      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <h1 className="font-display text-5xl font-black tracking-tight md:text-6xl">
              About
            </h1>
            <p className="mt-5 text-sm font-medium text-ink">{about.subtitle}</p>
            <div className="mt-8 space-y-5 text-sm leading-relaxed text-muted">
              {about.paragraphs.map((p, i) => (
                <p key={i} className="whitespace-pre-line">
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* 인물 사진 */}
          <div className="aspect-[3/4] w-full overflow-hidden bg-placeholder md:max-w-md md:justify-self-end">
            {about.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={about.image}
                alt="박재현"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm text-neutral-400">
                PORTRAIT
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Activity 미리보기 */}
      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
            Activity
          </h2>
          <Link
            href="/activity"
            className="text-sm text-muted transition-colors hover:text-ink"
          >
            전체 보기 →
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          {preview.map((item) => (
            <ActivityCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
