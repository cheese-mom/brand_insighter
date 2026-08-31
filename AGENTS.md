# AGENTS.md — brand_insighter 홈페이지

이 파일은 이 프로젝트에서 작업하는 Codex(및 협업자)가 따라야 할 기준 문서다.
모든 구현·결정은 이 문서의 규칙을 우선한다.

---

## 1. 프로젝트 개요

- **대상**: 박재현 — 브랜드 전문가 / 브랜드 네이밍 디렉터
  (Instagram [@brand_insighter](https://www.instagram.com/brand_insighter/))
- **소속**: 한국브랜드마케팅연구소 대표 · 연세대 브랜드전문가과정 前 책임교수
- **목적**: 퍼스널 브랜딩 + 잠재 고객(브랜드 컨설팅/강연/아카데미) 유입
- **톤앤매너**: 모노크롬, 전문적이고 절제된 신뢰감
- **언어**: 한국어 (`<html lang="ko">`)

---

## 2. 기술 스택 (스캐폴딩 확정값)

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** — 설정은 `tailwind.config.*`가 아니라 `app/globals.css`의
  `@import "tailwindcss"` + `@theme` 블록으로 한다 (CSS-first 설정)
- **Supabase** — 콘텐츠 DB(Postgres) + 인증(Auth) + 이미지 저장(Storage).
  라이브 콘텐츠 편집 어드민의 백엔드 (아래 11장 참조)
- **배포**: Vercel (Git 연동 자동 배포, 커스텀 도메인 연결 예정)
- **폰트**: 한글 본문 Pretendard, 영문 디스플레이 헤딩은 두꺼운 그로테스크
  (예: Archivo / Anton 계열 — 디자인 확정 폰트와 대조 후 확정). `next/font`로 로드
- **라우팅 컨벤션**: 미들웨어는 Next 16 `proxy.ts`(구 `middleware.ts`) 사용

---

## 3. 디자인 소스

- **확정 디자인**: Figma `히포 공유중` (파일 키 `dNXkbJQ3YmL7hXTJdfdq7Y`).
  단, Dev Mode MCP 미사용 → **사용자가 제공한 스크린샷이 현재 구현 기준(SSOT)**이다.
- 색/폰트/간격은 스크린샷을 최대한 1:1로 재현하고, 정확한 수치 미상 부분은 사용자에게 확인.
- 추후 Figma Dev Mode MCP를 켜면 변수값으로 토큰을 정밀 보정한다.

---

## 4. 사이트 구조 (확정 — 멀티 페이지)

공통: **헤더(고정)** + 페이지 본문 + **CTA 배너** + **다크 푸터**

| 경로 | 페이지 | 주요 섹션 |
|------|--------|-----------|
| `/` | Home | 히어로 → Project 통계 → 브랜드 로고 마퀴 → Current Activities → Media & Archive → CTA |
| `/activity` | Activity | 제목 + 3×3 카드 그리드 + 페이지네이션 (카드 클릭 → 상세) |
| `/activity/[id]` | Activity 상세 | 날짜 + 제목 + 썸네일 + 본문 + 목록으로 링크 (SEO/GEO용 개별 인덱싱) |
| `/about` | About | 제목 + 좌 텍스트/우 흑백 인물 + Activity 미리보기 3장 |
| `/contact` | Contact | 제목 + 문의 폼 + 우측 안내문 + 대형 "Let's Build Your Brand" |

### 공통 헤더
- 좌측 로고: "브랜드 전문가"(작게) / **"박재현"**(굵게)
- 우측 내비: Home · Activity · About · Contact
- 하단 얇은 검정 보더

### 히어로 (Home)
- 좌측 멀티라인 카피: "대한민국 / 대표 브랜드를 만든 / 브랜드 네이밍 전문가," (회색)
  + **"박재현"**(검정 굵게) → 서브타이틀 → 본문 단락
- 우측: 강연 사진(마이크)

### Project 통계 (Home)
- 라벨 "Project" + 3지표: **+25** 경력 / **+400** 네이밍 프로젝트 / **+800** 수강생

### 브랜드 로고 마퀴 (Home)
- 협업 브랜드 로고(LG WHISEN 등) 가로 무한 슬라이드

### Current Activities (Home)
- 01 한국브랜드마케팅연구소 대표
- 02 마마무 브랜드 아카데미 운영
- 03 기업 브랜딩 컨설팅 & 강연
  (각 항목: 번호 + 제목 + 설명)

### Media & Archive (Home)
- 좌측 제목 + 우측 3열 그리드(미디어 썸네일, 현재 플레이스홀더)

### Activity 카드
- 썸네일 + 날짜(예: 2026.05.24) + 제목 + 발췌문. 목록 페이지는 3×3 + 페이지네이션(1–7)
- 카드 전체가 `/activity/[id]` 상세 페이지로 링크

### SEO / GEO
- `lib/site.ts`: 사이트 URL 단일 소스 (`NEXT_PUBLIC_SITE_URL` → `VERCEL_URL` → localhost 폴백).
  커스텀 도메인 확정 시 Vercel 환경변수에 `NEXT_PUBLIC_SITE_URL`만 설정하면 전체 반영
- 루트 레이아웃: metadataBase, title template(`%s | 박재현`), canonical, OG, twitter card
- `app/robots.ts`: /admin 차단 + AI 크롤러(GPTBot·ClaudeBot·PerplexityBot 등) 명시 허용
- `app/sitemap.ts`: 정적 4페이지 + Activity 상세 동적 포함 (force-dynamic)
- `app/manifest.ts`: 최소 웹 매니페스트
- `components/JsonLd.tsx`: Organization + Person + WebSite `@graph`(사이트 레이아웃 마운트),
  `BreadcrumbJsonLd`, `ArticleJsonLd` — 값은 `getSiteContent()`에서 가져와 어드민 편집 반영
- `app/llms.txt/route.ts`: AI 답변엔진용 llms.txt (Supabase 콘텐츠 기반, force-dynamic)
- OG 이미지는 미정 — 실제 사진 제공 시 `app/opengraph-image.png`(1200×630) 추가 후
  twitter card를 `summary_large_image`로 변경

### CTA 배너 "Let's Build Your Brand"
- 대형 헤비 영문 + 버튼 2개: **아카데미 알아보기** / **문의하기**
- Home/About/Activity: 배경 이미지(카메라 장비) 위 / Contact: 배경 없이 텍스트만

### Contact 폼
- 필드: 성함*, 회사명*, 이메일*, "필요하신 도움을 알려주세요"(드롭다운),
  설명*(textarea), [필수] 개인정보 보호정책 동의(체크박스), **Send** 버튼
- 우측: 안내 문구

### 공통 푸터 (다크)
- 한국브랜드마케팅연구소
- 대표 | 박재현
- Address | 서울 강남구 선릉로115길 24 5층
- 전화번호 | 02-541-5525
- 이메일 | saintbrand@naver.com
- 소셜: Instagram, YouTube 아이콘

---

## 5. 디자인 토큰 (스크린샷 기준 — 정밀값은 추후 보정)

Tailwind v4 `@theme`로 `app/globals.css`에 정의한다.

- **배경**: `#FFFFFF`
- **헤딩/주요 텍스트**: `#000000`
- **본문 muted**: 회색 `#666` ~ `#888`
- **히어로 보조 라인**: 연회색 `#BBB` ~ `#CCC`
- **푸터 배경**: 다크 `#1A1A1A`, 푸터 텍스트 연회색/흰색
- **플레이스홀더/그리드 박스**: `#E5E5E5`
- **보더/디바이더**: 연회색 `#E0E0E0`, 헤더 하단 검정 얇은 선

---

## 6. 디렉터리 구조

```
app/
  layout.tsx              # 루트 레이아웃 (html/body/폰트/메타) — 공통 chrome 없음
  globals.css             # Tailwind v4 @theme 토큰 + 베이스
  (site)/                 # 공개 사이트 (라우트 그룹)
    layout.tsx            # Header + main + Footer
    page.tsx              # Home
    activity/page.tsx     # Activity 목록
    about/page.tsx        # About
    contact/page.tsx      # Contact
  admin/                  # 어드민 (공개 chrome 없음)
    layout.tsx            # Supabase 설정 여부 게이트(미설정 시 안내)
    login/page.tsx        # 로그인
    actions.ts            # 서버 액션 (saveContent / activity CRUD / logout)
    (panel)/              # 인증 필요 영역
      layout.tsx          # 어드민 내비 + 인증 가드
      page.tsx            # 대시보드
      content/page.tsx    # 콘텐츠 편집
      activities/...      # Activity 목록 / new / [id] 편집
components/
  Header.tsx  Footer.tsx  CtaBanner.tsx  LogoMarquee.tsx
  ActivityCard.tsx  ActivityList.tsx  ContactForm.tsx
  admin/
    ContentEditor.tsx  ActivityForm.tsx  ImageUploader.tsx
lib/
  types.ts              # SiteContent / Activity 타입
  defaults.ts           # NAV/HEADER/BRANDS + 기본 콘텐츠(Supabase 미설정 시 폴백)
  content.ts            # 데이터 접근 (getSiteContent / getActivities…) + 폴백
  supabase/             # config / client(브라우저) / server / middleware
proxy.ts                # Next 16 미들웨어 (세션 갱신 + /admin 보호)
supabase/schema.sql     # DB 테이블·RLS·Storage 버킷 정의
.env.local.example      # Supabase 환경변수 템플릿
public/                 # 이미지/로고/아이콘
```

---

## 7. 코딩 컨벤션

- 컴포넌트는 **함수형 + TypeScript**, 파일명 **PascalCase**
- 스타일은 **Tailwind 유틸리티 우선**, 공통 값은 `globals.css`의 `@theme` 토큰으로
- **모바일 퍼스트 반응형 필수** (데스크톱 스크린샷 기준 → 모바일 레이아웃 별도 설계)
- **시맨틱 HTML** + 기본 접근성(폼 라벨, 대체텍스트, 포커스, 대비)
- SEO 메타데이터는 App Router `metadata` API로 관리 (title/description/OG)
- 이미지는 `next/image`, 내부 링크는 `next/link`
- 외부 링크는 `target="_blank" rel="noopener noreferrer"`
- 마퀴/페이지네이션/폼 등 인터랙션은 가벼운 클라이언트 컴포넌트(`"use client"`)로 분리

---

## 8. 개발 / 배포

```bash
npm run dev     # 로컬 개발 서버 (http://localhost:3000)
npm run build   # 프로덕션 빌드
npm run lint    # 린트
npm start       # 빌드 결과 실행
```

- 배포: Git push → Vercel 자동 배포 / 도메인은 Vercel 설정에서 연결

---

## 9. 콘텐츠 / 확인 필요 항목

- 콘텐츠/이미지/Activity 게시글은 **어드민(`/admin`)에서 편집** → Supabase에 저장 (11장)
- Supabase **미설정 시** 공개 사이트는 `lib/defaults.ts` 기본 콘텐츠로 정상 동작
- 실제 이미지(인물·강연·아카이브)는 어드민에서 업로드 전까지 회색 플레이스홀더 표시
- **브랜드 로고 마퀴(LG WHISEN)는 현재 정적**(`lib/defaults.ts`의 `BRANDS`) — 편집 대상 아님
- **Contact 폼 제출 처리 방식은 미정** → UI만 구현, 제출 로직은 추후 결정
- 영문 디스플레이 폰트 정확한 이름은 Figma 확인 또는 사용자 확인 후 확정

---

## 10. 데이터 흐름 / 렌더링

- 공개 페이지는 `lib/content.ts`의 `getSiteContent()` / `getActivities()`로 Supabase에서 읽고,
  실패하거나 미설정이면 **기본값으로 폴백**한다 (사이트가 항상 동작).
- 편집 즉시 반영을 위해 공개 페이지는 `export const dynamic = "force-dynamic"`.
  추가로 서버 액션이 저장 후 `revalidatePath("/", "layout")`로 갱신.
- 공개 읽기는 anon 키 + 쿠키 없는 클라이언트, 어드민 쓰기는 쿠키 세션 클라이언트(RLS 적용).

---

## 11. 어드민 / Supabase 설정

- **편집 범위**: 텍스트 워딩(히어로·About·Contact·통계·푸터) + 이미지 업로드 + Activity 게시글 CRUD.
- **인증**: Supabase Auth(이메일/비밀번호). 공개 회원가입 없음 — 대시보드에서 계정 직접 생성.
  `proxy.ts`가 `/admin`(로그인 제외)을 미인증 시 `/admin/login`으로 리다이렉트.
- **데이터 모델**: `site_content`(싱글톤 `id='main'`, JSONB), `activities` 테이블, Storage 버킷 `media`.
- **RLS**: 읽기는 공개, 쓰기는 `authenticated`만 (`supabase/schema.sql`).

### 최초 설정 순서
1. supabase.com 프로젝트 생성
2. SQL Editor에 `supabase/schema.sql` 실행
3. Authentication > Users에서 관리자 계정 추가 (Email 확인 끄기 권장)
4. `.env.local`에 `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   (새 `sb_publishable_...` 키) 입력 후 재시작. 구 anon 키도 폴백 지원되나 deprecated.
5. Vercel 배포 시 동일 환경변수를 프로젝트 설정에 추가
- **MCP**: `.mcp.json`에 Supabase MCP 서버 등록됨(project_ref `opxqydoebiquhhmcnhmq`).
  세션에서 MCP 도구를 쓰려면 인증 후 Codex 재시작이 필요할 수 있음.

---

## 12. 전역 규칙 상속

사용자 전역 `~/.Codex/AGENTS.md` 규칙을 이 프로젝트에서도 따른다:
- 법령·세제·정책·요율 등은 답변 전 최신 자료 검색 (기억 의존 금지)
- 라이브러리/프레임워크 최신 문서는 **Context7 MCP**로 확인
- UI 변경 후 브라우저 실동작 검증은 **Playwright MCP**
- Figma 참조는 **Figma MCP**(Dev Mode 활성화 시)
- 복잡한 문제 단계 분석은 **Sequential Thinking MCP**
