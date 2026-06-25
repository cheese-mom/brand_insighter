import type { SiteContent, Activity } from "./types";

// 정적 네비게이션 (편집 대상 아님)
export const NAV = [
  { label: "Home", href: "/" },
  { label: "Activity", href: "/activity" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const HEADER = {
  roleSmall: "브랜드 전문가",
  name: "박재현",
};

// 협업 브랜드 (로고 마퀴) — 현재 정적
export const BRANDS = [
  "LG WHISEN",
  "LG WHISEN",
  "LG WHISEN",
  "LG WHISEN",
  "LG WHISEN",
  "LG WHISEN",
  "LG WHISEN",
  "LG WHISEN",
];

// Supabase 미설정 시 사용하는 기본 콘텐츠 (편집 가능 항목의 초기값)
export const DEFAULT_CONTENT: SiteContent = {
  hero: {
    lines: ["대한민국", "대표 브랜드를 만든", "브랜드 네이밍 전문가,"],
    name: "박재현",
    subtitle: "한국브랜드마케팅연구소 대표 · 연세대 브랜드전문가과정 前 책임교수",
    paragraphs: [
      "안녕하세요? 한국브랜드마케팅연구소의 박재현 대표입니다.\n홈페이지를 방문해 주셔서 반갑습니다.\n이제 브랜드(BRAND)는 단순한 마케팅만으로는 효과를 기대하기 어려운 시기입니다.",
      "고객과 브랜드의 관계 형성이 어떻게 되느냐에 따라 브랜드의 파워 및 가치가 결정되는 상황에서 우리는 최적의 브랜드 마케팅을 진행하여야만 이 시대에서 생존할 수 있습니다.",
      "한국브랜드마케팅연구소는 이러한 브랜드 마케팅 과제를 수행하는 대한민국 대표 브랜드 전문가 그룹입니다.",
      "감사합니다.",
    ],
    image: null,
  },
  stats: [
    { value: "+25", label: "경력" },
    { value: "+400", label: "네이밍 프로젝트" },
    { value: "+800", label: "수강생" },
  ],
  currentActivities: [
    {
      no: "01",
      title: "한국브랜드마케팅연구소 대표",
      desc: "브랜드 전략 기획부터 실무 중심 마케팅 방향 설계까지, 기업의 브랜드 구축을 연구하고 운영합니다.",
    },
    {
      no: "02",
      title: "마마무 브랜드 아카데미 운영",
      desc: "실전 중심 브랜드 교육과 1:1 브랜드·소상공인을 위한 브랜딩 교육 프로그램을 운영합니다.",
    },
    {
      no: "03",
      title: "기업 브랜딩 컨설팅 & 강연",
      desc: "기업 및 브랜드를 대상으로 브랜드 방향성, 마케팅 전략, 실무 기반 브랜딩 강연을 진행합니다.",
    },
  ],
  mediaArchive: [],
  about: {
    subtitle: "한국브랜드마케팅연구소 대표 · 연세대 브랜드전문가과정 前 책임교수",
    paragraphs: [
      "좋은 브랜드는 설명보다 먼저 감각으로 기억됩니다.",
      "무엇을 말하는가보다 어떤 인상을 남기는가가 중요해진 시대 속에서,\n브랜드는 단순한 마케팅이 아니라 사람의 기억을 설계하는 작업이라고 믿고 있습니다.",
      "브랜드 네이밍, 브랜드 전략, 스토리 설계까지\n25년간 다양한 프로젝트를 통해 브랜드의 방향을 고민해왔습니다.",
      "현재는 한국브랜드마케팅연구소 대표로 활동하며\n브랜드 컨설팅과 강연, 브랜드 아카데미를 운영하고 있습니다.",
    ],
    image: null,
  },
  contact: {
    paragraphs: [
      "브랜드는 결국\n사람에게 어떤 인상으로 남을지에 대한 고민에서 시작됩니다.",
      "브랜드 전략, 네이밍, 강연 및 아카데미 관련 문의는\n문의하기를 통해 남겨주세요.",
      "현재 진행 중인 프로젝트와 활동 일정에 따라\n회신까지 다소 시간이 소요될 수 있습니다.",
    ],
  },
  footer: {
    org: "한국브랜드마케팅연구소",
    ceo: "박재현",
    address: "서울 강남구 선릉로115길 24 5층",
    tel: "02-541-5525",
    email: "saintbrand@naver.com",
    instagram: "https://www.instagram.com/brand_insighter/",
    youtube: "#",
  },
};

const DEFAULT_EXCERPT =
  "브랜드는 단순히 이름을 만드는 작업이 아니라, 사람의 기억 속에 특정 감정과 이미지를 남기는 과정에 가깝습니다. 마마무 브랜드 아카데미 현장에서 이야기한 브랜드의 본질과 네이밍...";

export const DEFAULT_ACTIVITIES: Activity[] = Array.from({ length: 9 }, (_, i) => ({
  id: `default-${i + 1}`,
  date: "2026.05.24",
  title: "마마무 브랜드 아카데미 현장 스케치",
  excerpt: DEFAULT_EXCERPT,
  body: DEFAULT_EXCERPT,
  thumbnail: null,
  sort_order: i,
}));
