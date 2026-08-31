// 사이트 URL / SEO 공용 상수 — canonical, sitemap, JSON-LD가 모두 이 값을 사용한다.
// 커스텀 도메인 확정 시 NEXT_PUBLIC_SITE_URL만 설정하면 전체에 반영된다.

export function getSiteUrl(): URL {
  const url =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
  return new URL(url);
}

export const SITE_NAME = "박재현 | 브랜드 전문가";

export const SITE_TITLE = "박재현 | 브랜드 전문가 · 브랜드 네이밍 디렉터";

export const SITE_DESCRIPTION =
  "한국브랜드마케팅연구소 대표 박재현. 브랜드 네이밍, 브랜드 전략, 스토리 설계 — 25년간 사람의 기억에 남는 브랜드를 설계해 왔습니다. 브랜드 컨설팅·강연·아카데미 문의.";
