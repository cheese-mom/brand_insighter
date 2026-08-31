import type { Metadata } from "next";
import { getSiteUrl, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: SITE_TITLE,
    template: "%s | 박재현",
  },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: SITE_TITLE,
    description:
      "사람의 기억에 남는 브랜드를 설계합니다. 브랜드 네이밍·전략·컨설팅·강연.",
    type: "website",
    locale: "ko_KR",
    siteName: SITE_NAME,
    url: "/",
  },
  // OG 이미지 추가 시(app/opengraph-image.png) card를 "summary_large_image"로 변경
  twitter: {
    card: "summary",
    title: SITE_TITLE,
    description:
      "사람의 기억에 남는 브랜드를 설계합니다. 브랜드 네이밍·전략·컨설팅·강연.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="antialiased">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      {/* suppressHydrationWarning: ColorZilla 등 브라우저 확장이 body에 주입하는
          속성(cz-shortcut-listen 등)으로 인한 hydration 경고만 억제 (body 한 레벨만) */}
      <body className="bg-paper text-ink" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
