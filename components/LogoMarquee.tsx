import { BRANDS } from "@/lib/defaults";

export default function LogoMarquee() {
  // 두 번 반복해 -50% 이동 시 끊김 없는 무한 루프
  const items = [...BRANDS, ...BRANDS];

  return (
    <div className="marquee-track overflow-hidden border-y border-line py-6">
      <div className="animate-marquee flex w-max items-center gap-12 md:gap-16">
        {items.map((brand, i) => (
          <span
            key={i}
            className="flex h-8 shrink-0 items-center whitespace-nowrap text-lg font-bold italic tracking-tight text-neutral-400 md:text-xl"
          >
            {brand}
          </span>
        ))}
      </div>
    </div>
  );
}
