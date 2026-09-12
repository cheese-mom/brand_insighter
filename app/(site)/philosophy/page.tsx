import Link from "next/link";
import type { Metadata } from "next";
import ActivityCard from "@/components/ActivityCard";
import CtaBanner from "@/components/CtaBanner";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { getActivities, getSiteContent } from "@/lib/content";

export const dynamic = "force-dynamic";

const DESCRIPTION =
  "브랜드 전문가 박재현이 생각하는 브랜드의 다섯 가지 원칙. Branding is Be · Relationship · Experience · Differentiation · Survival.";

export const metadata: Metadata = {
  title: "Philosophy",
  description: DESCRIPTION,
  alternates: { canonical: "/philosophy" },
  openGraph: {
    title: "Philosophy | 박재현",
    description: DESCRIPTION,
    url: "/philosophy",
  },
};

export default async function PhilosophyPage() {
  const [{ philosophy }, activities] = await Promise.all([
    getSiteContent(),
    getActivities(),
  ]);
  const preview = activities.slice(0, 3);
  const image = philosophy.image || "/assets/about.jpg";

  return (
    <div className="[word-break:keep-all] [overflow-wrap:anywhere]">
      <BreadcrumbJsonLd items={[{ name: "Philosophy", path: "/philosophy" }]} />

      {/* 상단: 제목 아래 사진과 철학 소개 */}
      <section className="mx-auto max-w-[1280px] px-5 py-16 md:px-[50px] md:py-24">
        <h1 className="border-b border-ink pb-8 font-display text-5xl font-black tracking-tight md:pb-10 md:text-6xl">
          Philosophy
        </h1>

        <div className="mt-8 grid grid-cols-1 gap-10 md:mt-12 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:items-center md:gap-16">
          <div className="aspect-[3/4] w-full max-w-md overflow-hidden bg-placeholder">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt="박재현 브랜드 전문가"
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <p className="text-[11px] font-semibold tracking-[0.2em] text-muted">
              {philosophy.label}
            </p>
            <p className="mt-5 max-w-[480px] text-[26px] font-bold leading-[1.5] tracking-[-0.03em] text-ink md:text-[36px]">
              박재현이 생각하는
              <br />
              브랜드의 다섯 가지 원칙
            </p>
            {philosophy.flow.length > 0 && (
              <ul className="mt-8 flex flex-col gap-3 border-t border-line pt-6 font-display text-[17px] tracking-[-0.02em] text-muted md:mt-12 md:text-[20px]">
                {philosophy.flow.map((step, i) => (
                  <li key={i} className="inline-flex items-baseline gap-2">
                    <span className="font-sans text-[10px] tracking-normal text-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {step}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      {/* 다섯 가지 원칙 */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-[1280px] px-5 py-16 md:px-[50px] md:py-24">
          <ol className="border-t border-ink">
            {philosophy.principles.map((p, i) => (
              <li
                key={i}
                className="grid grid-cols-[42px_1fr] gap-4 border-b border-line py-9 md:grid-cols-[120px_1fr] md:gap-8 md:py-12"
              >
                <span
                  aria-hidden="true"
                  className="font-display text-[26px] leading-none text-faint md:text-[40px]"
                >
                  {p.no}
                </span>
                <div className="max-w-[760px]">
                  <h2 className="font-display text-[24px] leading-[1.2] tracking-[-0.03em] text-ink md:text-[34px]">
                    <span className="sr-only">{p.no}. </span>
                    {p.title}
                  </h2>
                  <p className="mt-4 text-[16px] font-bold leading-[1.6] tracking-[-0.02em] text-ink md:text-[19px]">
                    {p.lead}
                  </p>
                  <p className="mt-3 whitespace-pre-line text-[14px] leading-[1.8] text-muted md:text-[16px]">
                    {p.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 흐름 + 마무리 인용문 */}
      <section className="bg-dark text-paper">
        <div className="mx-auto max-w-[1280px] px-5 py-20 text-center md:px-[50px] md:py-28">
          {philosophy.flow.length > 0 && (
            <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 font-display text-[20px] tracking-[-0.02em] sm:text-[24px] md:text-[32px]">
              {philosophy.flow.map((step, i) => (
                <span key={i} className="inline-flex items-center gap-x-4">
                  {i > 0 && (
                    <span aria-hidden="true" className="text-neutral-500">
                      →
                    </span>
                  )}
                  <span>{step}</span>
                </span>
              ))}
            </p>
          )}
          {philosophy.closing && (
            <blockquote className="mx-auto mt-12 max-w-[820px] whitespace-pre-line text-[18px] font-medium leading-[1.85] tracking-[-0.02em] text-neutral-200 md:mt-16 md:text-[24px]">
              {philosophy.closing}
            </blockquote>
          )}
        </div>
      </section>

      {/* Activity 미리보기 */}
      <section className="mx-auto max-w-[1280px] px-5 py-16 md:px-[50px] md:py-20">
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
    </div>
  );
}
