"use client";

import { createBrowserClient } from "@supabase/ssr";
import { SUPABASE_KEY, SUPABASE_URL } from "./config";

// 브라우저(클라이언트 컴포넌트)용 Supabase 클라이언트 — 로그인, 이미지 업로드 등에 사용
export function createClient() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_KEY);
}
