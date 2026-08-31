import { getActivities, getSiteContent } from "@/lib/content";
import { getSiteUrl } from "@/lib/site";

// llms.txt — AI 답변엔진(ChatGPT/Claude/Perplexity 등)이 사이트를 요약·인용할 때
// 참조하는 표준 문서. Supabase 콘텐츠를 단일 소스로 사용해 어드민 편집이 즉시 반영된다.
export const dynamic = "force-dynamic";

export async function GET() {
  const [content, activities] = await Promise.all([
    getSiteContent(),
    getActivities(),
  ]);
  const { hero, stats, currentActivities, about, footer } = content;
  const site = getSiteUrl().toString().replace(/\/$/, "");

  const lines: string[] = [
    `# ${footer.ceo} (${footer.org})`,
    "",
    `> ${hero.subtitle}`,
    "",
    "## 소개",
    "",
    ...about.paragraphs.map((p) => p.replaceAll("\n", " ")),
    "",
    "## 핵심 지표",
    "",
    ...stats.map((s) => `- ${s.value} ${s.label}`),
    "",
    "## 주요 활동",
    "",
    ...currentActivities.map((a) => `- ${a.title}: ${a.desc}`),
    "",
    "## 연락처",
    "",
    `- 기관: ${footer.org}`,
    `- 대표: ${footer.ceo}`,
    `- 주소: ${footer.address}`,
    `- 전화: ${footer.tel}`,
    `- 이메일: ${footer.email}`,
    ...(footer.instagram.startsWith("http")
      ? [`- Instagram: ${footer.instagram}`]
      : []),
    ...(footer.youtube.startsWith("http")
      ? [`- YouTube: ${footer.youtube}`]
      : []),
    "",
    "## 페이지",
    "",
    `- [Home](${site}/): 소개, 프로젝트 지표, 주요 활동`,
    `- [About](${site}/about): 상세 소개`,
    `- [Activity](${site}/activity): 강연·컨설팅·아카데미 활동 기록`,
    `- [Contact](${site}/contact): 브랜드 컨설팅·강연·아카데미 문의`,
  ];

  const recent = activities.slice(0, 5);
  if (recent.length > 0) {
    lines.push("", "## 최근 활동", "");
    lines.push(
      ...recent.map(
        (a) => `- [${a.title}](${site}/activity/${a.id}) (${a.date})`,
      ),
    );
  }

  return new Response(lines.join("\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
