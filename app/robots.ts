import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

// AI 답변엔진(GEO) 노출을 위해 주요 AI 크롤러를 명시적으로 허용한다.
// 추후 특정 봇을 차단하려면 해당 항목의 allow를 disallow: "/" 로 바꾸면 된다.
const AI_CRAWLERS = [
  "GPTBot", // OpenAI (ChatGPT)
  "ClaudeBot", // Anthropic (Claude)
  "PerplexityBot", // Perplexity
  "Google-Extended", // Google Gemini
  "CCBot", // Common Crawl
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/admin" },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: "/admin",
      })),
    ],
    sitemap: new URL("/sitemap.xml", getSiteUrl()).toString(),
  };
}
