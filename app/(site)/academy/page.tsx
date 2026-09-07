import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import MediaArchive from "@/components/MediaArchive";
import { ACADEMY as copy } from "@/lib/academy";
import { getSiteContent } from "@/lib/content";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: copy.name,
  description: copy.description,
  alternates: { canonical: "/academy" },
  openGraph: { title: `${copy.name} | 박재현`, description: copy.description, url: "/academy" },
};

const container = "mx-auto max-w-[1280px] px-5 md:px-[50px]";
const section = `${container} py-20 md:py-28 lg:py-36`;
const heading = "font-display text-[30px] leading-[1.35] tracking-[-0.04em] md:text-[38px] lg:text-[42px]";
const prose = "text-[15px] leading-[1.9] text-muted md:text-[17px]";
const eyebrow = "mb-6 text-[11px] font-semibold tracking-[0.2em] text-muted";

function Paragraphs({ items }: { items: readonly string[] }) {
  return <div className={`${prose} space-y-6`}>{items.map((text) => <p key={text}>{text}</p>)}</div>;
}

function AcademyImage({ src, alt, className = "", imageClassName = "object-cover", sizes }: { src: string; alt: string; className?: string; imageClassName?: string; sizes: string }) {
  return (
    <div className={`relative overflow-hidden bg-placeholder ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} className={imageClassName} />
    </div>
  );
}

export default async function AcademyPage() {
  const { mediaArchive } = await getSiteContent();
  const archiveItems = mediaArchive.filter((item) => item.link.trim().length > 0);

  return (
    <div className="[word-break:keep-all] [overflow-wrap:anywhere]">
      <BreadcrumbJsonLd items={[{ name: copy.name, path: "/academy" }]} />

      <section className={`${container} pb-16 pt-12 md:pb-24 md:pt-20`}>
        <div className="mb-10 flex items-center justify-between border-b border-line pb-4 text-[10px] tracking-[0.15em] text-muted md:mb-14">
          <span>EDUCATION / BRANDING</span><span>MAMAMU BRAND ACADEMY</span>
        </div>
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <p className="mb-7 text-sm font-semibold md:mb-9 md:text-base">{copy.name}</p>
            <AcademyImage
              src="/assets/academy/marketing-branding.jpg"
              alt="브랜딩 전문가 박재현의 마케팅과 브랜딩의 차이 강의"
              className="mb-8 aspect-[29/40] w-full lg:hidden"
              imageClassName="object-cover object-bottom"
              sizes="(max-width: 1023px) calc(100vw - 40px), 470px"
            />
            <h1 className="font-display text-[38px] leading-[1.32] tracking-[-0.045em] sm:text-[48px] lg:text-[54px]">
              <span className="block">사랑받고, 선택받고,</span>{" "}
              <span className="block">끝까지 살아남는</span>{" "}
              <span className="block">브랜드를 만듭니다</span>
            </h1>
            <p className={`${prose} mt-8 max-w-[430px]`}>{copy.description}</p>
            <a href="#introduction" className="mt-12 inline-flex min-h-11 items-center gap-5 text-[10px] tracking-[0.16em] text-muted focus-visible:outline-2 focus-visible:outline-offset-4" aria-label="마마무 소개로 이동">DISCOVER MAMAMU <span aria-hidden="true" className="text-lg">↓</span></a>
          </div>
          <AcademyImage
            src="/assets/academy/marketing-branding.jpg"
            alt="브랜딩 전문가 박재현의 마케팅과 브랜딩의 차이 강의"
            className="mx-auto hidden aspect-[29/40] w-full max-w-[470px] lg:mr-0 lg:block"
            imageClassName="object-cover object-bottom"
            sizes="(max-width: 1023px) calc(100vw - 40px), 470px"
          />
        </div>
      </section>

      <section id="introduction" className="scroll-mt-28 border-y border-line">
        <div className={`${section} grid gap-10 lg:grid-cols-[1fr_1.65fr] lg:gap-24`}>
          <div><p className={eyebrow}>THE NAME, THE MEANING</p><p className="font-display text-[48px] tracking-[-0.04em] md:text-[64px]">MAMAMU<span className="text-faint">.</span></p></div>
          <Paragraphs items={copy.intro} />
        </div>
      </section>

      <section className={section}>
        <p className={eyebrow}>01 — OUR PHILOSOPHY</p>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.65fr] lg:gap-24">
          <h2 className={heading}>{copy.philosophy.title}</h2><Paragraphs items={copy.philosophy.paragraphs} />
        </div>
        <blockquote className="mt-14 bg-dark px-7 py-16 text-center text-paper md:mt-20 md:px-20 md:py-24">
          <p className="mx-auto max-w-[850px] text-[26px] font-bold leading-[1.65] tracking-[-0.04em] md:text-[38px]">{copy.philosophy.quote}</p>
        </blockquote>
        <div className="mt-5">
          <MediaArchive items={archiveItems} />
        </div>
      </section>

      <section id="curriculum" className="scroll-mt-28 border-t border-line">
        <div className={section}>
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.65fr] lg:gap-24">
            <div className="lg:sticky lg:top-36"><p className={eyebrow}>02 — CURRICULUM</p><h2 className={heading}>{copy.curriculum.title}</h2><p className={`${prose} mt-6`}>{copy.curriculum.description}</p></div>
            <ol className="border-t border-ink">
              {copy.curriculum.items.map((item, i) => <li key={item.title} className="grid grid-cols-[40px_1fr] gap-4 border-b border-line py-9 md:grid-cols-[64px_1fr] md:gap-6 md:py-11"><span aria-hidden="true" className="text-[26px] font-semibold tracking-[-0.05em] text-faint md:text-[38px]">{String(i + 1).padStart(2, "0")}</span><div><h3 className="text-[20px] font-bold leading-[1.5] tracking-[-0.03em] md:text-[24px]"><span className="sr-only">{i + 1}. </span>{item.title}</h3><p className={`${prose} mt-4`}>{item.description}</p></div></li>)}
            </ol>
          </div>
          <div className="mt-16 grid gap-4 md:mt-24 md:grid-cols-3">
            {["students-01.jpg", "students-02.jpg", "students-03.jpg"].map((file, i) => (
              <AcademyImage
                key={file}
                src={`/assets/academy/${file}`}
                alt={`마마무 브랜드 아카데미 수강생 단체 사진 ${i + 1}`}
                className="aspect-[4/5]"
                sizes="(max-width: 767px) calc(100vw - 40px), 33vw"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line"><div className={section}>
        <p className={eyebrow}>03 — THE MAMAMU WAY</p><h2 className={heading}>{copy.difference.title}</h2>
        <div className="mt-12 border-t border-ink md:mt-16">{copy.difference.items.map((item, i) => <div key={item.title} className="grid grid-cols-[28px_1fr] gap-x-5 gap-y-4 border-b border-line py-8 md:grid-cols-[50px_1fr_1.2fr] md:gap-10 md:py-10"><span aria-hidden="true" className="pt-1 text-sm text-muted">{String(i + 1).padStart(2, "0")}</span><h3 className="text-[20px] font-bold leading-relaxed tracking-[-0.03em] md:text-[24px]">{item.title}</h3><p className={`${prose} col-start-2 md:col-start-auto`}>{item.description}</p></div>)}</div>
      </div></section>

      <section className="bg-dark text-paper"><div className={`${section} grid gap-12 lg:grid-cols-[1fr_1.65fr] lg:gap-24`}>
        <div><p className="mb-6 text-[11px] tracking-[0.2em] text-neutral-400">04 — FOR YOU</p><h2 className={heading}>{copy.audience.title}</h2></div>
        <ul className="border-t border-white/25">{copy.audience.items.map((item) => <li key={item} className="flex gap-5 border-b border-white/20 py-6 text-[16px] leading-[1.8] text-neutral-200 md:text-[18px]"><span aria-hidden="true" className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full border border-neutral-400"/><span>{item}</span></li>)}</ul>
      </div></section>

      <section className={section}>
        <p className={eyebrow}>05 — A NEW PERSPECTIVE</p>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.65fr] lg:gap-24"><h2 className={heading}>{copy.transformation.title}</h2><div className={`${prose} space-y-6`}><p>{copy.transformation.description}</p><p>{copy.transformation.introduction}</p></div></div>
        <ol className="mt-14 grid gap-x-16 md:mt-20 md:grid-cols-2">{copy.transformation.questions.map((question, i) => <li key={question} className={`flex gap-5 border-t border-line py-9 md:py-12 ${i === 6 ? 'md:col-span-2' : ''}`}><span aria-hidden="true" className="pt-1 text-xs text-muted">{String(i + 1).padStart(2, "0")}</span><p className="text-[22px] font-semibold leading-[1.5] tracking-[-0.04em] md:text-[28px]">{question}</p></li>)}</ol>
        <p className="border-y border-ink py-9 text-[18px] font-medium leading-[1.9] tracking-[-0.025em] md:py-12 md:text-[23px]">{copy.transformation.conclusion}</p>
      </section>

      <section className="border-t border-line"><div className={`${section} grid gap-10 lg:grid-cols-[1fr_1.65fr] lg:gap-24`}>
        <div><p className={eyebrow}>06 — BUILT TO LAST</p><h2 className={heading}>{copy.manifesto.title}</h2></div><Paragraphs items={copy.manifesto.paragraphs}/>
      </div></section>

      <div className={container}>
        <AcademyImage
          src="/assets/academy/textbook.jpg"
          alt="마마무 브랜드마케팅 전략과정 제7기 교재"
          className="aspect-[3/2] md:aspect-[16/7]"
          sizes="(max-width: 767px) calc(100vw - 40px), 1180px"
        />
      </div>
      <section className={`${section} text-center`}>
        <p className="text-[18px] font-medium text-muted md:text-[24px]">{copy.closing[0]}</p>
        <h2 className="mx-auto mt-5 max-w-[820px] font-display text-[32px] leading-[1.4] tracking-[-0.04em] md:text-[46px]">{copy.closing[1]}</h2>
        <p className={`${prose} mt-7`}>{copy.closing[2]}<br/>{copy.closing[3]}</p>
        <div className="mx-auto mt-10 flex max-w-[500px] flex-col justify-center gap-3 sm:flex-row">
          <a href="#curriculum" className="inline-flex min-h-14 items-center justify-center gap-8 border border-ink px-7 text-sm transition-colors hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-4">커리큘럼 보기 <span aria-hidden="true">↑</span></a>
          <Link href="/contact?help=academy" className="inline-flex min-h-14 items-center justify-center gap-8 border border-ink bg-ink px-7 text-sm text-paper transition-colors hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-4">현재 과정 확인하기 <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </div>
  );
}
