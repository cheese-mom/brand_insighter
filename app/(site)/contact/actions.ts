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
  website?: string;
};

type Result = { ok: boolean; error?: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function singleLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

async function sendContactNotification(
  submissionId: string,
  input: Omit<ContactInput, "website">,
) {
  const apiKey = process.env.RESEND_API_KEY;
  const emailDomain = process.env.RESEND_EMAIL_DOMAIN;
  const from =
    process.env.CONTACT_FROM_EMAIL ||
    (emailDomain
      ? `Brand Insighter <contact@${emailDomain}>`
      : undefined);
  const to = process.env.CONTACT_NOTIFICATION_TO || "saintbrand@naver.com";

  if (!apiKey || !from) {
    console.warn(
      "Contact email notification skipped: RESEND_API_KEY or a sending domain is missing.",
    );
    return;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": `contact-${submissionId}`,
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: input.email,
      subject: `[홈페이지 문의] ${singleLine(input.name)} · ${singleLine(input.help_type)}`,
      text: [
        "홈페이지에서 새 문의가 접수되었습니다.",
        "",
        `성함: ${input.name}`,
        `회사명: ${input.company}`,
        `이메일: ${input.email}`,
        `문의 유형: ${input.help_type}`,
        "",
        "문의 내용",
        input.message,
        "",
        `문의 ID: ${submissionId}`,
      ].join("\n"),
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Resend ${response.status}: ${detail.slice(0, 500)}`);
  }
}

// 공개 Contact 폼 제출 → contact_submissions 저장 (RLS: anon insert 허용)
export async function submitContact(input: ContactInput): Promise<Result> {
  const name = input.name.trim();
  const company = input.company.trim();
  const email = input.email.trim();
  const helpType = input.help_type.trim();
  const message = input.message.trim();
  // 사람에게 보이지 않는 필드를 채운 봇 요청은 조용히 종료한다.
  if (input.website?.trim()) return { ok: true };
  if (!name || !company || !email || !helpType || !message) {
    return { ok: false, error: "필수 항목을 입력해 주세요." };
  }
  if (!EMAIL_PATTERN.test(email)) {
    return { ok: false, error: "올바른 이메일 주소를 입력해 주세요." };
  }
  if (
    name.length > 100 ||
    company.length > 100 ||
    email.length > 254 ||
    helpType.length > 100 ||
    message.length > 5000
  ) {
    return { ok: false, error: "입력 가능한 글자 수를 초과했습니다." };
  }
  if (!isSupabaseConfigured) {
    return { ok: false, error: "문의 접수 기능이 아직 설정되지 않았습니다." };
  }

  try {
    const submissionId = crypto.randomUUID();
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: { persistSession: false },
    });
    const { error } = await supabase.from("contact_submissions").insert({
      id: submissionId,
      name,
      company,
      email,
      help_type: helpType,
      message,
    });
    if (error) return { ok: false, error: error.message };

    try {
      await sendContactNotification(submissionId, {
        name,
        company,
        email,
        help_type: helpType,
        message,
      });
    } catch (error) {
      // DB 저장은 완료됐으므로 사용자 접수는 성공으로 유지한다.
      console.error("Contact email notification failed:", error);
    }

    return { ok: true };
  } catch {
    return { ok: false, error: "제출에 실패했습니다. 잠시 후 다시 시도해 주세요." };
  }
}
