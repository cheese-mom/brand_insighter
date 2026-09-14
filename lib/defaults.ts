import type { SiteContent, Activity } from "./types";

// 정적 네비게이션 (편집 대상 아님)
export const NAV = [
  { label: "Home", href: "/" },
  { label: "Activity", href: "/activity" },
  { label: "Academy", href: "/academy" },
  { label: "Philosophy", href: "/philosophy" },
  { label: "Contact", href: "/contact" },
];

export const HEADER = {
  roleSmall: "브랜드 인사이터",
  name: "박재현",
};

// 협업 브랜드 (로고 마퀴) — 현재 정적
export const BRANDS = [
  { name: "LG WHISEN", label: "엘지휘센", image: "/assets/logos/lg-whisen.png" },
  { name: "HD현대", label: "HD현대", image: "/assets/logos/hd-hyundai.png" },
  { name: "NHN", label: "NHN", image: "/assets/logos/hnn.png" },
  { name: "SK innovation", label: "SK이노베이션", image: "/assets/logos/sk-innovation.png" },
  { name: "AhnLab", label: "안랩", image: "/assets/logos/ahnlab.png" },
  { name: "쁘띠첼", label: "쁘띠첼", image: "/assets/logos/petitzel.png" },
  { name: "E1", label: "E1", image: "/assets/logos/e1.png" },
  { name: "PARNAS", label: "파르나스", image: "/assets/logos/parnas.png" },
  { name: "SK ZIC", label: "SK지크", image: "/assets/logos/sk-zic.png" },
  { name: "SK discovery", label: "SK디스커버리", image: "/assets/logos/sk-discovery.png" },
  { name: "트루맘", label: "트루맘", image: "/assets/logos/dreamon.png" },
];

// Supabase 미설정 시 사용하는 기본 콘텐츠 (편집 가능 항목의 초기값)
export const DEFAULT_CONTENT: SiteContent = {
  hero: {
    lines: ["대한민국", "대표 브랜드를 만든", "브랜드 네이밍 전문가,"],
    name: "박재현",
    subtitle: "한국브랜드마케팅연구소 대표 · 연세대 브랜드전문가과정 前 책임교수",
    paragraphs: [
      "안녕하세요? 한국브랜드마케팅연구소의 박재현 대표입니다.\n홈페이지를 방문해 주셔서 반갑습니다.\n이제 브랜드(BRAND)를 떠나서는 효과적인 마케팅을 기대하기 어려운 시기입니다.",
      "고객과 브랜드의 관계 형성이 어떻게 되느냐에 따라 브랜드의 파워 및 가치가 결정되는 상황에서 우리는 최적의 브랜드 마케팅을 진행하여야만 이 시대에서 생존할 수 있습니다.",
      "급변하는 마케팅 환경에서 과연 어떤 전략을 구사하여야 고객의 마음속에 러브마크를 찍을 수 있을까요?",
      "어떤 스토리텔링 전략을 써야 고객과의 러브스토리를 계속적으로 이어갈 수 있을까요?",
      "한국브랜드마케팅연구소는 이러한 브랜드 마케팅 과제를 수행하는 대한민국 대표 브랜드 전문가 그룹입니다.\n언제든지 연락주시면 귀사의 브랜딩에 최적화된 솔루션을 제공하도록 하겠습니다.",
      "감사합니다.",
    ],
    image: "/assets/hero.jpg",
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
      desc: "브랜드 전략 기획부터 실무 중심 마케팅 방향 설계까지, 기업의 브랜딩 구조를 연구하고 운영합니다.",
    },
    {
      no: "02",
      title: "마마무 브랜드 아카데미 운영",
      desc: "실전 중심 브랜드 교육과 1인 브랜드·소상공인을 위한 브랜딩 교육 프로그램을 운영합니다.",
    },
    {
      no: "03",
      title: "기업 브랜딩 컨설팅 & 강연",
      desc: "기업 및 브랜드를 대상으로 브랜드 방향성, 마케팅 전략, 실무 기반 브랜딩 강연을 진행합니다.",
    },
  ],
  currentActivityVideos: [
    {
      title:
        '“이름 하나가 시장을 바꾼다” 700개의 브랜드 네이밍의 비밀 | 마당밖김재원 Ep.7 (브랜드 인사이터 박재현)',
      url: "https://youtu.be/3k5JwI4-wuc?si=KtJrjwk23-Z-P2E9",
    },
  ],
  mediaArchive: Array.from({ length: 12 }, (_, i) => ({
    image: `/assets/media/archive-${String(i + 1).padStart(2, "0")}.jpg`,
    link: "",
  })),
  philosophy: {
    label: "BRAND PHILOSOPHY 5",
    intro: "박재현이 생각하는 브랜드의 다섯 가지 원칙",
    principles: [
      {
        no: "01",
        title: "Branding is Be.",
        lead: "브랜딩은 ‘하는 것(Do)’이 아니라 ‘되는 것(Be)’입니다.",
        body: "마케팅이 고객에게 무엇을 알리고 행동하게 만드는 일이라면, 브랜딩은 고객의 마음속에 어떤 존재가 될 것인가를 만드는 일입니다. 좋은 브랜드는 끊임없이 자신을 설명하지 않아도 고객이 먼저 떠올리고 선택합니다.",
      },
      {
        no: "02",
        title: "Branding is Relationship.",
        lead: "브랜딩은 고객과 관계를 만들어가는 일입니다.",
        body: "브랜드와 고객의 관계는 연애와 닮았습니다. 처음에는 관심을 끌어야 하지만, 결국 중요한 것은 지속적인 신뢰와 애정입니다. 고객의 삶 속으로 들어가 관계를 쌓을 때 고객(Customer)은 팬(Fan)이 됩니다.",
      },
      {
        no: "03",
        title: "Branding is Experience.",
        lead: "브랜드는 말하는 것이 아니라 경험하게 하는 것입니다.",
        body: "고객은 기업이 말한 것을 모두 기억하지 않습니다. 하지만 브랜드를 통해 느낀 경험은 오래 기억합니다. 제품, 공간, 서비스, 콘텐츠, 사람과의 모든 접점에서 ‘그 브랜드다운 경험’을 만드는 것, 그것이 브랜딩입니다.",
      },
      {
        no: "04",
        title: "Branding is Differentiation.",
        lead: "브랜딩은 더 좋아지는 경쟁이 아니라, 달라지는 경쟁입니다.",
        body: "경쟁자보다 조금 더 좋은 제품을 만드는 것만으로는 오래 살아남기 어렵습니다. 브랜드는 ‘왜 우리여야 하는가?’라는 질문에 분명한 답을 가지고 있어야 합니다. 최고(Better)가 아니라 유일함(Different)을 만드는 것, 그것이 브랜드의 경쟁력입니다.",
      },
      {
        no: "05",
        title: "Branding is Survival.",
        lead: "결국 브랜딩의 목적은 생존입니다.",
        body: "트렌드는 변하고 기술은 발전하며 경쟁자는 계속 등장합니다. 그럼에도 고객에게 선택받고 다시 선택받는 브랜드만이 살아남습니다. 브랜딩은 멋있어 보이기 위한 장식이 아니라 시장에서 끝까지 살아남기 위한 기업의 생존 전략입니다.",
      },
    ],
    flow: ["Be", "Relationship", "Experience", "Differentiation", "Survival"],
    closing:
      "‘어떤 브랜드가 될 것인가를 정하고,\n고객과 관계를 만들고,\n차별화된 경험을 제공할 때,\n브랜드는 결국 살아남습니다.’",
    image: "/assets/about.jpg",
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
  thumbnail: `/assets/media/archive-${String(((i + 3) % 12) + 1).padStart(2, "0")}.jpg`,
  sort_order: i,
}));
