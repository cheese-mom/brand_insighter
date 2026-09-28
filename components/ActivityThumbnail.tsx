import type { CSSProperties } from "react";

type Props = {
  title: string;
  category?: string;
  className?: string;
};

const CATEGORY_LABELS: Record<string, string> = {
  "브랜딩 문제 진단": "BRAND DIAGNOSIS",
  "브랜드 전략": "BRAND STRATEGY",
  "브랜드 네이밍": "BRAND NAMING",
  "교육·컨설팅 선택": "BRAND EDUCATION",
};

function titleSize(title: string) {
  if (title.length >= 34) return "text-[clamp(18px,4.5cqi,46px)]";
  if (title.length >= 25) return "text-[clamp(19px,5cqi,50px)]";
  return "text-[clamp(21px,5.6cqi,56px)]";
}

export default function ActivityThumbnail({ title, category, className = "" }: Props) {
  const categoryLabel = CATEGORY_LABELS[category ?? ""] ?? "BRAND INSIGHT";
  const containerStyle = { containerType: "inline-size" } as CSSProperties;

  return (
    <div
      className={`relative aspect-[3/2] overflow-hidden bg-[#f8f7f3] text-black ${className}`}
      style={containerStyle}
      aria-label={`${title} 썸네일`}
    >
      <div className="absolute inset-[6.2cqi]">
        <div className="flex items-center gap-[2.4cqi]">
          <span className="shrink-0 text-[clamp(8px,2.15cqi,20px)] font-bold tracking-[0.12em]">
            {categoryLabel}
          </span>
          <span className="h-px flex-1 bg-black/45" aria-hidden="true" />
        </div>

        <h2
          className={`mt-[6.2cqi] w-[64%] break-keep font-display font-black leading-[1.13] tracking-[0.01em] ${titleSize(title)}`}
        >
          {title}
        </h2>

        <p className="absolute bottom-0 left-0 text-[clamp(7px,1.75cqi,16px)] font-semibold tracking-[0.07em]">
          BRAND INSIGHTER · 박재현
        </p>
      </div>

      <div
        className="absolute bottom-[7.5%] right-[4.7%] aspect-square w-[34%] overflow-hidden rounded-full bg-[#e7e7e4]"
        aria-hidden="true"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/park-jaehyun-halftone-icon.png"
          alt=""
          className="absolute inset-x-[-2%] bottom-[-8%] h-[108%] w-[104%] object-contain object-bottom"
        />
      </div>
    </div>
  );
}
