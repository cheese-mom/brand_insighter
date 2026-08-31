import { BRANDS } from "@/lib/defaults";

export default function LogoMarquee() {
  // 두 번 반복해 -50% 이동 시 끊김 없는 무한 루프
  const items = [...BRANDS, ...BRANDS];

  return (
    <div className="marquee-track overflow-hidden">
      <div className="animate-marquee flex w-max items-center gap-[15px] pr-[15px]">
        {items.map((brand, i) => (
          <div
            key={i}
            className="relative flex h-[118px] w-[118px] shrink-0 items-center justify-center bg-white p-3 sm:h-[150px] sm:w-[150px] sm:p-4"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={brand.image}
              alt={brand.name}
              className="max-h-[58%] max-w-full object-contain"
            />
            <span className="absolute inset-x-1 bottom-2 text-center text-[9px] tracking-[-0.03em] text-ink sm:text-[11px]">
              {brand.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
