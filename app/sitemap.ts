import type { MetadataRoute } from "next";
import { getActivities } from "@/lib/content";
import { getSiteUrl } from "@/lib/site";

// 어드민에서 게시글을 추가하면 즉시 sitemap에 반영되도록 동적 렌더링
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = getSiteUrl().toString().replace(/\/$/, "");
  const activities = await getActivities();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${site}/academy`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${site}/`, priority: 1.0, changeFrequency: "weekly" },
    { url: `${site}/philosophy`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${site}/activity`, priority: 0.8, changeFrequency: "weekly" },
    { url: `${site}/contact`, priority: 0.8, changeFrequency: "monthly" },
  ];

  const activityPages: MetadataRoute.Sitemap = activities.map((a) => ({
    url: `${site}/activity/${a.id}`,
    priority: 0.6,
    changeFrequency: "monthly",
    ...(a.created_at ? { lastModified: a.created_at } : {}),
  }));

  return [...staticPages, ...activityPages];
}
