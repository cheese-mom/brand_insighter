import LogoMarquee from "@/components/LogoMarquee";
import CtaBanner from "@/components/CtaBanner";
import { getSiteContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { hero, stats, currentActivities, mediaArchive } = await getSiteContent();

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              {hero.lines.map((line, i) => (
                <span key={i} className="block text-faint">
                  {line}
                </span>
              ))}
              <span className="block text-ink">{hero.name}</span>
            </h1>
            <p className="mt-5 text-sm font-medium text-ink">{hero.subtitle}</p>
            <div className="mt-6 space-y-4 text-[13px] leading-relaxed text-muted">
              {hero.paragraphs.map((p, i) => (
                <p key={i} className="whitespace-pre-line">
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* 인물 사진 */}
          <div className="aspect-[4/5] w-full overflow-hidden bg-placeholder md:max-w-md md:justify-self-end">
            {hero.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={hero.image}
                alt={hero.name}
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

      {/* Project 통계 */}
      <section className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 md:flex-row md:items-center md:px-8">
          <h2 className="font-display text-2xl font-extrabold tracking-tight md:w-48">
            Project
          </h2>
          <dl className="grid flex-1 grid-cols-3 divide-x divide-line text-center">
            {stats.map((stat, i) => (
              <div key={i} className="px-2">
                <dt className="text-2xl font-bold text-ink sm:text-3xl">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-xs text-muted sm:text-sm">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 브랜드 로고 마퀴 */}
      <LogoMarquee />

      {/* Current Activities */}
      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[18rem_1fr] md:gap-16">
          <h2 className="font-display text-2xl font-extrabold leading-tight tracking-tight md:text-3xl">
            Current
            <br />
            Activities
          </h2>
          <div className="space-y-10">
            {currentActivities.map((act, i) => (
              <div key={i} className="flex gap-5">
                <span className="font-display text-lg font-bold text-ink">
                  {act.no}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-ink">{act.title}</h3>
                  <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-muted">
                    {act.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media & Archive */}
      <section className="mx-auto max-w-6xl px-5 pb-16 md:px-8 md:pb-24">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[18rem_1fr] md:gap-16">
          <h2 className="font-display text-2xl font-extrabold leading-tight tracking-tight md:text-3xl">
            Media &amp; Archive
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {(mediaArchive.length > 0
              ? mediaArchive
              : Array.from({ length: 12 }, () => null)
            ).map((item, i) => {
              const cell = (
                <div className="aspect-square overflow-hidden bg-placeholder">
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
              return item?.link ? (
                <a
                  key={i}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  {cell}
                </a>
              ) : (
                <div key={i}>{cell}</div>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
