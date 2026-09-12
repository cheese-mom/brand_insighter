import { getActivities } from "@/lib/content";
import { getSiteUrl, SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export const dynamic = "force-dynamic";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function itemDate(createdAt?: string) {
  if (!createdAt) return "";
  const date = new Date(createdAt);
  return Number.isNaN(date.getTime()) ? "" : date.toUTCString();
}

export async function GET() {
  const site = getSiteUrl().toString().replace(/\/$/, "");
  const activities = await getActivities();
  const items = activities
    .map((activity) => {
      const url = `${site}/activity/${activity.id}`;
      const pubDate = itemDate(activity.created_at);
      return `<item>
        <title>${escapeXml(activity.title)}</title>
        <link>${escapeXml(url)}</link>
        <guid isPermaLink="true">${escapeXml(url)}</guid>
        <description>${escapeXml(activity.excerpt)}</description>
        ${pubDate ? `<pubDate>${pubDate}</pubDate>` : ""}
      </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${escapeXml(site)}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>ko-KR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link xmlns:atom="http://www.w3.org/2005/Atom" href="${escapeXml(`${site}/rss.xml`)}" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
