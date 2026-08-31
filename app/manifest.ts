import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "박재현",
    description: "브랜드 네이밍 전문가 박재현 — 한국브랜드마케팅연구소",
    start_url: "/",
    display: "browser",
    lang: "ko",
    background_color: "#ffffff",
    theme_color: "#1a1a1a",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  };
}
