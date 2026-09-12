import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // About 페이지가 Philosophy로 개편됨 — 기존 링크/검색 결과 유지용 영구 리다이렉트
      { source: "/about", destination: "/philosophy", permanent: true },
    ];
  },
};

export default nextConfig;
