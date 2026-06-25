export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";

// 새 publishable 키(sb_publishable_...)를 우선 사용. 구 anon 키는 폴백으로만 지원(deprecated).
export const SUPABASE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "";

// Supabase 연결 정보가 모두 설정되었는지 여부.
// 미설정 시 사이트는 lib/defaults.ts 기본 콘텐츠로 동작하고 어드민은 안내 화면을 표시한다.
export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_KEY);

export const MEDIA_BUCKET = "media";
