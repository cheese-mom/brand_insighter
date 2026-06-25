import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "박재현 | 브랜드 전문가 · 브랜드 네이밍 디렉터",
  description:
    "한국브랜드마케팅연구소 대표 박재현. 브랜드 네이밍, 브랜드 전략, 스토리 설계 — 25년간 사람의 기억에 남는 브랜드를 설계해 왔습니다. 브랜드 컨설팅·강연·아카데미 문의.",
  openGraph: {
    title: "박재현 | 브랜드 전문가 · 브랜드 네이밍 디렉터",
    description:
      "사람의 기억에 남는 브랜드를 설계합니다. 브랜드 네이밍·전략·컨설팅·강연.",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${archivo.variable} antialiased`}>
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
