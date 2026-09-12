import Link from "next/link";

type Props = {
  /** plain: 배경 없이 텍스트만 (Contact). image: 배경 이미지 + 버튼 (Home/Philosophy/Activity) */
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
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[url('/assets/cta.jpg')] bg-cover bg-center"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-white/45" />
        </>
      )}

      <div className="relative mx-auto max-w-6xl px-5 text-center md:px-8">
        <h2 className="font-display text-5xl tracking-[-0.03em] text-ink sm:text-6xl md:text-7xl lg:text-[90px]">
          Let&rsquo;s Build Your Brand
        </h2>

        {withImage && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/academy"
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
