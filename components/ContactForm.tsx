"use client";

import { useState } from "react";
import { submitContact } from "@/app/(site)/contact/actions";

const HELP_OPTIONS = [
  "브랜드 네이밍",
  "브랜드 전략 컨설팅",
  "강연 / 세미나",
  "브랜드 아카데미",
  "기타 문의",
];

export default function ContactForm({ defaultHelp = "" }: { defaultHelp?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setSubmitting(true);
    setError(null);
    const res = await submitContact({
      name: String(data.get("name") ?? ""),
      company: String(data.get("company") ?? ""),
      email: String(data.get("email") ?? ""),
      help_type: String(data.get("help") ?? ""),
      message: String(data.get("message") ?? ""),
    });
    setSubmitting(false);
    if (res.ok) {
      setSubmitted(true);
      form.reset();
    } else {
      setError(res.error ?? "제출에 실패했습니다.");
    }
  };

  const fieldBase =
    "w-full border-0 border-b border-ink/80 bg-transparent pb-2 text-sm text-ink placeholder:text-muted focus:border-ink focus:outline-none focus:ring-0";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="sr-only">
            성함
          </label>
          <input id="name" name="name" required placeholder="성함 *" className={fieldBase} />
        </div>
        <div>
          <label htmlFor="company" className="sr-only">
            회사명
          </label>
          <input
            id="company"
            name="company"
            required
            placeholder="회사명 *"
            className={fieldBase}
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="sr-only">
          이메일
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="이메일 *"
          className={fieldBase}
        />
      </div>

      <div>
        <label htmlFor="help" className="sr-only">
          필요하신 도움
        </label>
        <select
          id="help"
          name="help"
          defaultValue={defaultHelp}
          required
          className={`${fieldBase} appearance-none bg-[length:14px] bg-[right_center] bg-no-repeat pr-6`}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
          }}
        >
          <option value="" disabled>
            필요하신 도움을 알려주세요.
          </option>
          {HELP_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-3 block text-sm text-ink">
          설명*
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="문의를 자세히 설명해주세요."
          className="w-full border-b border-ink/80 bg-neutral-100 p-4 text-sm text-ink placeholder:text-muted focus:outline-none"
        />
      </div>

      <label className="flex items-center gap-3 text-sm text-ink">
        <input
          type="checkbox"
          required
          className="h-4 w-4 accent-ink"
        />
        [필수] 개인정보 보호정책에 동의합니다.
      </label>

      <div className="pt-2 text-center">
        <button
          type="submit"
          disabled={submitting}
          className="border border-ink px-12 py-3 text-sm text-ink transition-colors hover:bg-ink hover:text-paper disabled:opacity-50"
        >
          {submitting ? "전송 중…" : "Send"}
        </button>
        {submitted && (
          <p className="mt-4 text-sm text-muted">
            문의가 접수되었습니다. 빠른 시일 내에 회신드리겠습니다.
          </p>
        )}
        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      </div>
    </form>
  );
}
