import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

// Next.js 16 proxy 컨벤션 (구 middleware). 세션 갱신 + /admin 보호.
export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  // 정적 자원 제외, 나머지 경로에서 세션 갱신 (특히 /admin)
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
