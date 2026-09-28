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
  if (title.length >= 34) return "text-[clamp(16px,5.6cqi,68px)]";
  if (title.length >= 25) return "text-[clamp(18px,6.5cqi,78px)]";
  if (title.length >= 17) return "text-[clamp(20px,7.6cqi,91px)]";
  return "text-[clamp(22px,8.6cqi,103px)]";
}

export default function ActivityThumbnail({ title, category, className = "" }: Props) {
  const categoryLabel = CATEGORY_LABELS[category ?? ""] ?? "BRAND INSIGHT";
  const containerStyle = { containerType: "inline-size" } as CSSProperties;

  return (
    <div
      className={`relative aspect-[3/2] overflow-hidden border border-[#e6e6e6] bg-white text-black ${className}`}
      style={containerStyle}
      aria-label={`${title} 썸네일`}
    >
      <div className="absolute inset-[6.2cqi] flex flex-col">
        <div className="flex items-center gap-[3cqi]">
          <span className="shrink-0 text-[clamp(8px,2.15cqi,20px)] font-bold tracking-[0.12em]">
            {categoryLabel}
          </span>
          <span className="h-[clamp(2px,0.5cqi,6px)] flex-1 bg-[#1547ff]" aria-hidden="true" />
        </div>

        <div className="flex min-h-0 flex-1 items-center py-[3cqi]">
          <h2
            className={`w-full break-keep font-display font-black leading-[1.13] tracking-[0.01em] ${titleSize(title)}`}
          >
            {title}
          </h2>
        </div>

        <p className="text-[clamp(7px,1.75cqi,16px)] font-semibold tracking-[0.07em]">
          BRAND INSIGHTER · 박재현
        </p>
      </div>
    </div>
  );
}
