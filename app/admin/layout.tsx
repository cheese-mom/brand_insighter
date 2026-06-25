import type { Metadata } from "next";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const metadata: Metadata = {
  title: "관리자 | 박재현",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isSupabaseConfigured) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-24">
        <h1 className="font-display text-3xl font-black tracking-tight">
          어드민 설정 필요
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          콘텐츠 편집 어드민을 사용하려면 Supabase 연결이 필요합니다. 아래 순서로
          설정하세요.
        </p>
        <ol className="mt-6 space-y-3 text-sm leading-relaxed text-ink">
          <li>
            1. <span className="font-semibold">supabase.com</span> 에서 프로젝트를
            생성합니다.
          </li>
          <li>
            2. 프로젝트의 <span className="font-semibold">SQL Editor</span> 에{" "}
            <code className="rounded bg-neutral-100 px-1.5 py-0.5">
              supabase/schema.sql
            </code>{" "}
            내용을 붙여넣고 실행합니다.
          </li>
          <li>
            3. <span className="font-semibold">Authentication &gt; Users</span> 에서
            관리자 이메일/비밀번호 계정을 추가합니다.
          </li>
          <li>
            4. <code className="rounded bg-neutral-100 px-1.5 py-0.5">.env.local</code>{" "}
            에 <code>NEXT_PUBLIC_SUPABASE_URL</code>,{" "}
            <code>NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</code>(sb_publishable_…)를 채우고
            서버를 재시작합니다.
          </li>
        </ol>
        <p className="mt-6 text-xs text-muted">
          설정 전까지 공개 사이트는 기본 콘텐츠로 정상 동작합니다.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
