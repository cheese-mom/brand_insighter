import Link from "next/link";

type Props = {
  /** plain: 배경 없이 텍스트만 (Contact). image: 배경 이미지 + 버튼 (Home/About/Activity) */
  variant?: "image" | "plain";
};

export default function CtaBanner({ variant = "image" }: Props) {
  const withImage = variant === "image";

  return (
    <section
      className={`relative overflow-hidden ${
        withImage ? "py-24 md:py-28" : "py-20 md:py-24"
      }`}
    >
      {withImage && (
        <>
          {/* 배경 이미지 placeholder (카메라 장비 — 실제 이미지 전까지 그라데이션) */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-neutral-300 via-neutral-200 to-neutral-100"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-paper/30" />
        </>
      )}

      <div className="relative mx-auto max-w-6xl px-5 text-center md:px-8">
        <h2 className="font-display text-5xl font-black tracking-tight text-ink sm:text-6xl md:text-7xl lg:text-8xl">
          Let&rsquo;s Build Your Brand
        </h2>

        {withImage && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/about"
              className="border border-ink bg-paper px-6 py-2.5 text-sm text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              아카데미 알아보기
            </Link>
            <Link
              href="/contact"
              className="border border-ink bg-paper px-6 py-2.5 text-sm text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              문의하기
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
