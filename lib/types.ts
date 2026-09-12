// 사이트 콘텐츠 / Activity 타입 정의

export type Stat = { value: string; label: string };

export type CurrentActivity = { no: string; title: string; desc: string };

// Philosophy 페이지의 원칙 하나 (예: ① Branding is Be.)
export type Principle = {
  no: string; // 표시 번호 (01, 02…)
  title: string; // 영문 제목 (Branding is Be.)
  lead: string; // 한 줄 요약 (굵게 표시)
  body: string; // 본문 설명
};

// Media & Archive 갤러리 항목 (이미지 + 클릭 시 이동할 링크)
// embed: false — 인스타그램이 임베드를 차단한 게시물. 팝업 대신 새 탭으로 연다.
export type MediaItem = { image: string; link: string; embed?: boolean };

export type SiteContent = {
  hero: {
    lines: string[]; // 회색 보조 라인 (예: ["대한민국", "대표 브랜드를 만든", "브랜드 네이밍 전문가,"])
    name: string; // 강조 이름 (박재현)
    subtitle: string;
    paragraphs: string[];
    image: string | null; // 인물 사진 URL
  };
  stats: Stat[];
  currentActivities: CurrentActivity[];
  mediaArchive: MediaItem[]; // 갤러리 이미지(+클릭 링크) 목록
  philosophy: {
    label: string; // 상단 소제목 (BRAND PHILOSOPHY 5)
    intro: string; // 한 줄 소개 (박재현이 생각하는 브랜드의 다섯 가지 원칙)
    principles: Principle[];
    flow: string[]; // 원칙 흐름 (Be → Relationship → …) — 단계별 문자열
    closing: string; // 마무리 인용문 (줄바꿈 유지)
    image: string | null; // 인물 사진 URL
  };
  contact: {
    paragraphs: string[];
  };
  footer: {
    org: string;
    ceo: string;
    address: string;
    tel: string;
    email: string;
    instagram: string;
    youtube: string;
  };
};

export type Activity = {
  id: string;
  date: string; // 표시용 (예: 2026.05.24)
  title: string;
  excerpt: string;
  body: string;
  thumbnail: string | null; // 이미지 URL
  sort_order: number;
  created_at?: string;
};

// Contact 폼 제출 내역
export type ContactSubmission = {
  id: string;
  name: string;
  company: string;
  email: string;
  help_type: string;
  message: string;
  is_read: boolean;
  created_at: string;
};
