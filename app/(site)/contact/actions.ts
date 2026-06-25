"use server";

import { createClient } from "@supabase/supabase-js";
import {
  SUPABASE_KEY,
  SUPABASE_URL,
  isSupabaseConfigured,
} from "@/lib/supabase/config";

export type ContactInput = {
  name: string;
  company: string;
  email: string;
  help_type: string;
  message: string;
};

type Result = { ok: boolean; error?: string };

// 공개 Contact 폼 제출 → contact_submissions 저장 (RLS: anon insert 허용)
export async function submitContact(input: ContactInput): Promise<Result> {
  // Supabase 미설정이어도 사이트는 동작해야 하므로 성공으로 처리(데이터는 저장되지 않음)
  if (!isSupabaseConfigured) return { ok: true };

  const name = input.name.trim();
  const email = input.email.trim();
  const message = input.message.trim();
  if (!name || !email || !message) {
    return { ok: false, error: "필수 항목을 입력해 주세요." };
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: { persistSession: false },
    });
    const { error } = await supabase.from("contact_submissions").insert({
      name,
      company: input.company.trim(),
      email,
      help_type: input.help_type.trim(),
      message,
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch {
    return { ok: false, error: "제출에 실패했습니다. 잠시 후 다시 시도해 주세요." };
  }
}
