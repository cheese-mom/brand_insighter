// 인스타그램 URL 파싱/임베드 헬퍼 — 클라이언트(팝업)와 서버 액션(썸네일 가져오기)에서 공용.

export type IgRef = { kind: "p" | "reel"; shortcode: string };

// instagram.com/reel/{c}, /reels/{c}, /p/{c}, /tv/{c} (후행 슬래시·쿼리 허용)
export function parseInstagramUrl(link: string): IgRef | null {
  try {
    const url = new URL(link);
    if (!/(^|\.)instagram\.com$/i.test(url.hostname)) return null;
    const m = url.pathname.match(/\/(reel|reels|p|tv)\/([A-Za-z0-9_-]+)/);
    if (!m) return null;
    return { kind: m[1] === "p" ? "p" : "reel", shortcode: m[2] };
  } catch {
    return null; // 프로토콜 없는 입력 등 URL 파싱 실패
  }
}

// 원본 URL은 X-Frame-Options로 iframe이 차단되므로 반드시 /embed/ 경로를 사용한다.
export function instagramEmbedUrl(ref: IgRef): string {
  return `https://www.instagram.com/${ref.kind}/${ref.shortcode}/embed/`;
}

export function canonicalInstagramUrl(ref: IgRef): string {
  return `https://www.instagram.com/${ref.kind}/${ref.shortcode}/`;
}
