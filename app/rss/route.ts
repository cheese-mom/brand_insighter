import { GET as getRssXml } from "@/app/rss.xml/route";

export const dynamic = "force-dynamic";

// 네이버 서치어드바이저에서 확장자 없는 /rss 주소로 요청해도
// 동일한 RSS 2.0 피드를 직접 반환한다.
export async function GET() {
  return getRssXml();
}
