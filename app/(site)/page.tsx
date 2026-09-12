import LogoMarquee from "@/components/LogoMarquee";
import CtaBanner from "@/components/CtaBanner";
import MediaArchive from "@/components/MediaArchive";
import { getSiteContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function Home() {
  // stats는 어드민 "Project 통계"에서 편집한 값을 그대로 사용한다 (기본값 고정 금지)
  const { hero, stats: projectStats, currentActivities, mediaArchive } =
    await getSiteContent();
  // 사용자가 확정한 메인 비주얼. 기존 Supabase 값보다 이 로컬 원본을 우선한다.
  const heroImage = "/assets/hero.jpg";
  const archiveItems = mediaArchive.filter((item) => item.link.trim().length > 0);
  const mobileHeroLines = [
    "대한민국",
    "대표 브랜드를",
    "만들어 낸",
    "브랜드 전문가",
  ];
  const mobileActivityTitles: Record<string, string[]> = {
    "02": ["마마무(MAMAMU)", "브랜드 아카데미 운영"],
    "03": ["기업 브랜딩 컨설팅", "& 브랜드 강연"],
  };

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-[1280px] px-5 py-16 md:px-[50px] lg:py-[160px]">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,735px)_500px] lg:gap-0">
          <div>
            <h1 className="font-display text-[36px] leading-[1.03] tracking-[-0.03em] sm:text-[44px] lg:text-[50px]">
              <span className="sm:hidden">
                {mobileHeroLines.map((line) => (
                  <span key={line} className="block text-faint">
                    {line}
                  </span>
                ))}
              </span>
              <span className="hidden sm:block">
                {hero.lines.map((line, i) => (
                  <span key={i} className="block text-faint">
                    {line}
                  </span>
                ))}
              </span>
              <span className="mt-1 block text-[50px] text-ink sm:text-[60px] lg:text-[70px]">
                {hero.name}
              </span>
            </h1>

            {/* 모바일에서는 이름 바로 아래에 메인 사진을 배치 */}
            <div className="mt-8 aspect-[500/708] w-full overflow-hidden bg-placeholder md:hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heroImage}
                alt={`${hero.name} 브랜드 전문가`}
                className="h-full w-full object-cover"
              />
            </div>

            <p className="mt-7 text-[15px] font-extrabold leading-snug text-ink lg:text-[18px]">
              {hero.subtitle}
            </p>
            <div className="mt-9 max-w-[600px] space-y-6 text-[14px] leading-[1.65] text-muted lg:text-[15px]">
              {hero.paragraphs.map((p, i) => (
                <p key={i} className="whitespace-pre-line">
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* 인물 사진 */}
          <div className="hidden aspect-[500/708] w-full overflow-hidden bg-placeholder sm:max-w-[500px] md:block lg:-ml-[55px] lg:justify-self-end">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heroImage}
              alt={`${hero.name} 브랜드 전문가`}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Project 통계 */}
      <section className="border-y border-line py-14 md:py-[100px]">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-10 px-5 md:flex-row md:items-start md:px-[50px]">
          <h2 className="font-display text-[32px] tracking-[-0.03em] md:w-[300px] md:text-[40px]">
            Project
          </h2>
          <dl className="grid flex-1 grid-cols-3 divide-x divide-line text-center">
            {projectStats.map((stat, i) => (
              <div key={i} className="px-2 md:px-8">
                <dt className="whitespace-nowrap text-ink">
                  <span className="align-top text-[18px] font-extrabold leading-none sm:text-[24px] md:text-[30px]">
                    {stat.value.startsWith("+") ? "+" : ""}
                  </span>
                  <span className="font-display text-[25px] leading-none sm:text-[32px] md:text-[40px]">
                    {stat.value.replace(/^\+/, "")}
                  </span>
                </dt>
                <dd className="mt-2 font-display text-[10px] text-ink sm:text-[13px] md:text-[18px]">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="mx-auto mt-14 max-w-[1280px] overflow-hidden px-5 md:mt-20 md:px-[50px]">
          <LogoMarquee />
        </div>
      </section>

      {/* Current Activities */}
      <section className="mx-auto max-w-[1280px] px-5 py-20 md:px-[50px] md:py-[120px]">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[300px_1fr] md:gap-16">
          <h2 className="font-display text-[32px] leading-[0.95] tracking-[-0.03em] md:text-[40px]">
            Current
            <br />
            Activities
          </h2>
          <div className="space-y-12 md:px-[50px]">
            {currentActivities.map((act, i) => (
              <div key={i} className="grid grid-cols-[42px_1fr] gap-4 md:grid-cols-[50px_1fr] md:gap-6">
                <span className="font-display text-[26px] leading-none text-ink md:text-[40px]">
                  {act.no}
                </span>
                <div>
                  <h3 className="font-display text-[22px] leading-none tracking-[-0.03em] text-ink md:text-[35px]">
                    {mobileActivityTitles[act.no] ? (
                      <>
                        <span className="md:hidden">
                          {mobileActivityTitles[act.no].map((line) => (
                            <span key={line} className="block">
                              {line}
                            </span>
                          ))}
                        </span>
                        <span className="hidden md:inline">{act.title}</span>
                      </>
                    ) : (
                      act.title
                    )}
                  </h3>
                  <p className="mt-3 max-w-[600px] text-[13px] leading-[1.55] text-muted md:text-[16px]">
                    {act.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media & Archive */}
      <section className="mx-auto max-w-[1280px] px-5 pb-20 md:px-[50px] md:pb-[120px]">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[300px_1fr] md:gap-16">
          <h2 className="font-display text-[32px] leading-[0.95] tracking-[-0.03em] md:text-[40px]">
            Media &amp;
            <br />
            Archive
          </h2>
          <div className="md:px-[50px]">
            <MediaArchive items={archiveItems} />
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
