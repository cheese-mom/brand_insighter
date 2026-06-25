"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { setContactRead, deleteContact } from "@/app/admin/actions";
import type { ContactSubmission } from "@/lib/types";

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}.${p(d.getMonth() + 1)}.${p(d.getDate())} ${p(
    d.getHours(),
  )}:${p(d.getMinutes())}`;
}

export default function ContactList({ items }: { items: ContactSubmission[] }) {
  const router = useRouter();
  const [openId, setOpenId] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <p className="mt-8 border-y border-line py-10 text-center text-sm text-muted">
        접수된 문의가 없습니다.
      </p>
    );
  }

  const toggleOpen = async (item: ContactSubmission) => {
    const next = openId === item.id ? null : item.id;
    setOpenId(next);
    // 펼치면 자동으로 읽음 처리
    if (next && !item.is_read) {
      await setContactRead(item.id, true);
      router.refresh();
    }
  };

  const markRead = async (item: ContactSubmission, isRead: boolean) => {
    setBusyId(item.id);
    await setContactRead(item.id, isRead);
    setBusyId(null);
    router.refresh();
  };

  const remove = async (item: ContactSubmission) => {
    if (!confirm("이 문의를 삭제할까요?")) return;
    setBusyId(item.id);
    const res = await deleteContact(item.id);
    setBusyId(null);
    if (res.ok) {
      if (openId === item.id) setOpenId(null);
      router.refresh();
    }
  };

  return (
    <div className="mt-8 divide-y divide-line border-y border-line">
      {items.map((item) => {
        const open = openId === item.id;
        return (
          <div key={item.id}>
            <button
              type="button"
              onClick={() => toggleOpen(item)}
              className="flex w-full items-center gap-4 py-4 text-left transition-colors hover:bg-neutral-50"
            >
              <span
                className={`h-2 w-2 shrink-0 rounded-full ${
                  item.is_read ? "bg-transparent" : "bg-ink"
                }`}
                aria-hidden
              />
              <div className="min-w-0 flex-1">
                <p
                  className={`truncate text-sm ${
                    item.is_read ? "text-ink" : "font-bold text-ink"
                  }`}
                >
                  {item.name || "(이름 없음)"}
                  {item.company && (
                    <span className="text-muted"> · {item.company}</span>
                  )}
                </p>
                <p className="truncate text-xs text-muted">
                  {item.help_type && `[${item.help_type}] `}
                  {item.message}
                </p>
              </div>
              <span className="hidden shrink-0 text-xs text-muted sm:block">
                {formatDate(item.created_at)}
              </span>
              <span className="shrink-0 text-xs text-muted">
                {open ? "▲" : "▼"}
              </span>
            </button>

            {open && (
              <div className="space-y-4 bg-neutral-50 px-4 py-5 text-sm">
                <dl className="grid grid-cols-[5rem_1fr] gap-y-2 text-ink">
                  <dt className="text-muted">이메일</dt>
                  <dd>
                    <a
                      href={`mailto:${item.email}`}
                      className="underline underline-offset-2 hover:text-ink"
                    >
                      {item.email || "—"}
                    </a>
                  </dd>
                  <dt className="text-muted">회사명</dt>
                  <dd>{item.company || "—"}</dd>
                  <dt className="text-muted">도움 분야</dt>
                  <dd>{item.help_type || "—"}</dd>
                  <dt className="text-muted">접수일시</dt>
                  <dd>{formatDate(item.created_at)}</dd>
                </dl>

                <div>
                  <p className="mb-1.5 text-muted">문의 내용</p>
                  <p className="whitespace-pre-line leading-relaxed text-ink">
                    {item.message || "—"}
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-1">
                  <button
                    type="button"
                    disabled={busyId === item.id}
                    onClick={() => markRead(item, !item.is_read)}
                    className="border border-ink px-4 py-1.5 text-xs transition-colors hover:bg-neutral-100 disabled:opacity-50"
                  >
                    {item.is_read ? "안읽음으로 표시" : "읽음으로 표시"}
                  </button>
                  <a
                    href={`mailto:${item.email}`}
                    className="border border-ink bg-ink px-4 py-1.5 text-xs text-paper transition-opacity hover:opacity-85"
                  >
                    답장하기
                  </a>
                  <button
                    type="button"
                    disabled={busyId === item.id}
                    onClick={() => remove(item)}
                    className="ml-auto text-xs text-red-600 underline disabled:opacity-50"
                  >
                    삭제
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
