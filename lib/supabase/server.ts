import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { SUPABASE_KEY, SUPABASE_URL } from "./config";

// 서버 컴포넌트 / 서버 액션용 Supabase 클라이언트 (쿠키 기반 세션).
// 인증 확인 및 RLS가 적용되는 쓰기 작업에 사용.
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(SUPABASE_URL, SUPABASE_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // 서버 컴포넌트에서 set 호출 시 발생 — 미들웨어가 세션을 갱신하므로 무시 가능
        }
      },
    },
  });
}
