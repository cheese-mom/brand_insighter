"use client";

import { useRef, useState } from "react";
import { importReelFromUrl, saveContent } from "@/app/admin/actions";
import type { SiteContent } from "@/lib/types";
import ImageUploader from "./ImageUploader";

/* ---------- 라이브 미리보기 패널 ---------- */

const PREVIEW_PAGES = [
  { label: "Home", path: "/" },
  { label: "Philosophy", path: "/philosophy" },
  { label: "Contact", path: "/contact" },
] as const;

function PreviewPanel({
  previewRef,
  path,
  setPath,
  device,
  setDevice,
  onReload,
}: {
  previewRef: React.RefObject<HTMLIFrameElement | null>;
  path: string;
  setPath: (p: string) => void;
  device: "desktop" | "mobile";
  setDevice: (d: "desktop" | "mobile") => void;
  onReload: () => void;
}) {
  const ctrlBtn = (active: boolean) =>
    `border px-2.5 py-1 transition-colors ${
      active
        ? "border-ink bg-ink text-paper"
        : "border-line text-muted hover:text-ink"
    }`;

  return (
    <aside className="shrink-0 lg:sticky lg:top-6 lg:w-1/2 xl:w-[56%]">
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="text-sm font-medium text-ink">미리보기</span>
        <div className="flex items-center gap-1 text-xs">
          <button
            type="button"
            onClick={() => setDevice("desktop")}
            className={ctrlBtn(device === "desktop")}
          >
            PC
          </button>
          <button
            type="button"
            onClick={() => setDevice("mobile")}
            className={ctrlBtn(device === "mobile")}
          >
            모바일
          </button>
          <button
            type="button"
            onClick={onReload}
            title="새로고침"
            className="border border-line px-2.5 py-1 text-muted transition-colors hover:text-ink"
          >
            ↻
          </button>
          <a
            href={path}
            target="_blank"
            rel="noopener noreferrer"
            title="새 탭에서 열기"
            className="border border-line px-2.5 py-1 text-muted transition-colors hover:text-ink"
          >
            ↗
          </a>
        </div>
      </div>

      <div className="mb-2 flex flex-wrap gap-1 text-xs">
        {PREVIEW_PAGES.map((p) => (
          <button
            key={p.path}
            type="button"
            onClick={() => setPath(p.path)}
            className={`border px-3 py-1 transition-colors ${
              path === p.path
                ? "border-ink text-ink"
                : "border-line text-muted hover:text-ink"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="overflow-hidden border border-line bg-white">
        <div
          className="mx-auto bg-white"
          style={{ width: device === "mobile" ? 390 : "100%", maxWidth: "100%" }}
        >
          <iframe
            ref={previewRef}
            src={path}
            title="사이트 미리보기"
            className="h-[calc(100vh-12rem)] w-full"
          />
        </div>
      </div>
      <p className="mt-2 text-xs text-muted">
        저장하면 미리보기가 자동으로 갱신됩니다. (저장 전 입력은 반영되지 않음)
      </p>
    </aside>
  );
}

/* ---------- 작은 입력 헬퍼들 ---------- */

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border-b border-ink/70 bg-transparent pb-1.5 text-sm focus:outline-none"
      />
    </label>
  );
}

function Area({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full border border-line bg-neutral-50 p-3 text-sm focus:outline-none"
      />
      {hint && <span className="mt-1 block text-xs text-muted">{hint}</span>}
    </label>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-line py-8">
      <h2 className="font-display text-xl font-extrabold tracking-tight">{title}</h2>
      <div className="mt-5 space-y-5">{children}</div>
    </section>
  );
}

/** 문자열 배열 편집기 (히어로 보조 라인, 문단 등) */
function StringList({
  label,
  items,
  onChange,
  area = false,
  addLabel = "추가",
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  area?: boolean;
  addLabel?: string;
}) {
  const set = (i: number, v: string) =>
    onChange(items.map((it, idx) => (idx === i ? v : it)));
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  const add = () => onChange([...items, ""]);

  return (
    <div>
      <span className="mb-2 block text-sm font-medium text-ink">{label}</span>
      <div className="space-y-2">
        {items.map((it, i) => (
          <div key={i} className="flex gap-2">
            {area ? (
              <textarea
                value={it}
                onChange={(e) => set(i, e.target.value)}
                rows={2}
                className="flex-1 border border-line bg-neutral-50 p-2 text-sm focus:outline-none"
              />
            ) : (
              <input
                value={it}
                onChange={(e) => set(i, e.target.value)}
                className="flex-1 border-b border-ink/70 bg-transparent pb-1.5 text-sm focus:outline-none"
              />
            )}
            <button
              type="button"
              onClick={() => remove(i)}
              className="shrink-0 px-2 text-sm text-muted hover:text-red-600"
              aria-label="삭제"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={add}
        className="mt-2 text-sm text-muted underline hover:text-ink"
      >
        + {addLabel}
      </button>
    </div>
  );
}

/* ---------- 메인 에디터 ---------- */

export default function ContentEditor({ initial }: { initial: SiteContent }) {
  const [c, setC] = useState<SiteContent>(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [errMsg, setErrMsg] = useState<string | null>(null);

  const [reelUrl, setReelUrl] = useState("");
  const [reelBusy, setReelBusy] = useState(false);
  const [reelError, setReelError] = useState<string | null>(null);

  const addReel = async () => {
    if (!reelUrl.trim() || reelBusy) return;
    setReelBusy(true);
    setReelError(null);
    const res = await importReelFromUrl(reelUrl);
    if (res.ok) {
      setC((prev) => ({
        ...prev,
        mediaArchive: [...prev.mediaArchive, res.item],
      }));
      setReelUrl("");
    } else {
      setReelError(res.error);
    }
    setReelBusy(false);
  };

  const previewRef = useRef<HTMLIFrameElement>(null);
  const [previewPath, setPreviewPath] = useState("/");
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">(
    "desktop",
  );

  const reloadPreview = () => {
    const frame = previewRef.current;
    if (!frame) return;
    try {
      frame.contentWindow?.location.reload();
    } catch {
      // eslint-disable-next-line no-self-assign
      frame.src = frame.src;
    }
  };

  const save = async () => {
    setStatus("saving");
    setErrMsg(null);
    const res = await saveContent(c);
    if (res.ok) {
      setStatus("saved");
      reloadPreview();
      setTimeout(() => setStatus("idle"), 2500);
    } else {
      setStatus("error");
      setErrMsg(res.error ?? "저장 실패");
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
        {/* 좌측: 편집 폼 */}
        <div className="min-w-0 flex-1 pb-28">
          <h1 className="font-display text-3xl font-black tracking-tight">콘텐츠 편집</h1>
          <p className="mt-2 text-sm text-muted">
            줄바꿈은 입력한 그대로 사이트에 반영됩니다.
          </p>

      {/* 히어로 */}
      <Section title="히어로 (Home 상단)">
        <StringList
          label="보조 라인 (회색 텍스트, 한 줄씩)"
          items={c.hero.lines}
          onChange={(lines) => setC({ ...c, hero: { ...c.hero, lines } })}
          addLabel="라인 추가"
        />
        <Field
          label="강조 이름"
          value={c.hero.name}
          onChange={(v) => setC({ ...c, hero: { ...c.hero, name: v } })}
        />
        <Field
          label="서브타이틀"
          value={c.hero.subtitle}
          onChange={(v) => setC({ ...c, hero: { ...c.hero, subtitle: v } })}
        />
        <StringList
          label="본문 문단"
          items={c.hero.paragraphs}
          onChange={(paragraphs) => setC({ ...c, hero: { ...c.hero, paragraphs } })}
          area
          addLabel="문단 추가"
        />
        <ImageUploader
          label="인물 사진"
          aspect="aspect-[4/5]"
          value={c.hero.image}
          onChange={(image) => setC({ ...c, hero: { ...c.hero, image } })}
        />
      </Section>

      {/* 통계 */}
      <Section title="Project 통계">
        <div className="space-y-4">
          {c.stats.map((s, i) => (
            <div key={i} className="flex items-end gap-3">
              <div className="flex-1">
                <Field
                  label={`수치 ${i + 1}`}
                  value={s.value}
                  onChange={(v) =>
                    setC({
                      ...c,
                      stats: c.stats.map((it, idx) =>
                        idx === i ? { ...it, value: v } : it,
                      ),
                    })
                  }
                />
              </div>
              <div className="flex-1">
                <Field
                  label="라벨"
                  value={s.label}
                  onChange={(v) =>
                    setC({
                      ...c,
                      stats: c.stats.map((it, idx) =>
                        idx === i ? { ...it, label: v } : it,
                      ),
                    })
                  }
                />
              </div>
              <button
                type="button"
                onClick={() =>
                  setC({ ...c, stats: c.stats.filter((_, idx) => idx !== i) })
                }
                className="pb-1.5 text-sm text-muted hover:text-red-600"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setC({ ...c, stats: [...c.stats, { value: "", label: "" }] })
            }
            className="text-sm text-muted underline hover:text-ink"
          >
            + 통계 추가
          </button>
        </div>
      </Section>

      {/* Current Activities */}
      <Section title="Current Activities">
        <div className="space-y-6">
          {c.currentActivities.map((a, i) => (
            <div key={i} className="border border-line p-4">
              <div className="flex gap-3">
                <div className="w-20">
                  <Field
                    label="번호"
                    value={a.no}
                    onChange={(v) =>
                      setC({
                        ...c,
                        currentActivities: c.currentActivities.map((it, idx) =>
                          idx === i ? { ...it, no: v } : it,
                        ),
                      })
                    }
                  />
                </div>
                <div className="flex-1">
                  <Field
                    label="제목"
                    value={a.title}
                    onChange={(v) =>
                      setC({
                        ...c,
                        currentActivities: c.currentActivities.map((it, idx) =>
                          idx === i ? { ...it, title: v } : it,
                        ),
                      })
                    }
                  />
                </div>
              </div>
              <div className="mt-3">
                <Area
                  label="설명"
                  value={a.desc}
                  onChange={(v) =>
                    setC({
                      ...c,
                      currentActivities: c.currentActivities.map((it, idx) =>
                        idx === i ? { ...it, desc: v } : it,
                      ),
                    })
                  }
                />
              </div>
              <button
                type="button"
                onClick={() =>
                  setC({
                    ...c,
                    currentActivities: c.currentActivities.filter(
                      (_, idx) => idx !== i,
                    ),
                  })
                }
                className="mt-3 text-sm text-muted hover:text-red-600"
              >
                항목 삭제
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setC({
                ...c,
                currentActivities: [
                  ...c.currentActivities,
                  { no: "", title: "", desc: "" },
                ],
              })
            }
            className="text-sm text-muted underline hover:text-ink"
          >
            + 활동 추가
          </button>
        </div>
      </Section>

      {/* Media & Archive */}
      <Section title="Media & Archive (이미지 갤러리)">
        <p className="text-xs text-muted">
          인스타그램 링크는 공개 사이트에서 사진 클릭 시 팝업으로 재생되고, 그 외
          링크는 새 탭으로 열립니다. (비워두면 클릭해도 이동하지 않음)
        </p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {c.mediaArchive.map((item, i) => (
            <div key={i} className="space-y-2">
              <div className="aspect-[9/16] overflow-hidden border border-line bg-placeholder">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt="" className="h-full w-full object-cover" />
              </div>
              <input
                value={item.link}
                onChange={(e) =>
                  setC({
                    ...c,
                    mediaArchive: c.mediaArchive.map((m, idx) =>
                      idx === i ? { ...m, link: e.target.value } : m,
                    ),
                  })
                }
                placeholder="이동할 링크 (선택)"
                className="w-full border-b border-ink/40 bg-transparent pb-1 text-xs focus:border-ink focus:outline-none"
              />
              <button
                type="button"
                onClick={() =>
                  setC({
                    ...c,
                    mediaArchive: c.mediaArchive.filter((_, idx) => idx !== i),
                  })
                }
                className="text-xs text-muted underline hover:text-red-600"
              >
                제거
              </button>
            </div>
          ))}
        </div>
        <div className="space-y-1">
          <div className="flex items-end gap-2">
            <input
              value={reelUrl}
              onChange={(e) => setReelUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addReel())}
              placeholder="https://www.instagram.com/reel/..."
              className="w-full border-b border-ink/40 bg-transparent pb-1 text-xs focus:border-ink focus:outline-none"
            />
            <button
              type="button"
              onClick={addReel}
              disabled={reelBusy || !reelUrl.trim()}
              className="shrink-0 border border-ink px-3 py-1 text-xs transition-colors hover:bg-ink hover:text-paper disabled:cursor-not-allowed disabled:opacity-40"
            >
              {reelBusy ? "가져오는 중…" : "릴스 URL로 추가"}
            </button>
          </div>
          <p className="text-xs text-muted">
            릴스 URL을 붙여넣으면 썸네일을 자동으로 가져와 갤러리에 추가합니다.
          </p>
          {reelError && <p className="text-xs text-red-600">{reelError}</p>}
        </div>
        <ImageUploader
          label="이미지 추가"
          aspect="aspect-[9/16]"
          value={null}
          onChange={(url) =>
            url &&
            setC({
              ...c,
              mediaArchive: [...c.mediaArchive, { image: url, link: "" }],
            })
          }
        />
      </Section>

      {/* Philosophy */}
      <Section title="Philosophy 페이지">
        <Field
          label="소제목 (영문 라벨)"
          value={c.philosophy.label}
          onChange={(v) =>
            setC({ ...c, philosophy: { ...c.philosophy, label: v } })
          }
        />
        <Field
          label="한 줄 소개"
          value={c.philosophy.intro}
          onChange={(v) =>
            setC({ ...c, philosophy: { ...c.philosophy, intro: v } })
          }
        />
        <div>
          <span className="mb-2 block text-sm font-medium text-ink">원칙</span>
          <div className="space-y-6">
            {c.philosophy.principles.map((p, i) => {
              const update = (patch: Partial<typeof p>) =>
                setC({
                  ...c,
                  philosophy: {
                    ...c.philosophy,
                    principles: c.philosophy.principles.map((it, idx) =>
                      idx === i ? { ...it, ...patch } : it,
                    ),
                  },
                });
              return (
                <div key={i} className="border border-line p-4">
                  <div className="flex gap-3">
                    <div className="w-20">
                      <Field
                        label="번호"
                        value={p.no}
                        onChange={(no) => update({ no })}
                      />
                    </div>
                    <div className="flex-1">
                      <Field
                        label="제목 (영문)"
                        value={p.title}
                        onChange={(title) => update({ title })}
                      />
                    </div>
                  </div>
                  <div className="mt-3">
                    <Field
                      label="한 줄 요약 (굵게 표시)"
                      value={p.lead}
                      onChange={(lead) => update({ lead })}
                    />
                  </div>
                  <div className="mt-3">
                    <Area
                      label="설명"
                      value={p.body}
                      onChange={(body) => update({ body })}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setC({
                        ...c,
                        philosophy: {
                          ...c.philosophy,
                          principles: c.philosophy.principles.filter(
                            (_, idx) => idx !== i,
                          ),
                        },
                      })
                    }
                    className="mt-3 text-sm text-muted hover:text-red-600"
                  >
                    원칙 삭제
                  </button>
                </div>
              );
            })}
            <button
              type="button"
              onClick={() =>
                setC({
                  ...c,
                  philosophy: {
                    ...c.philosophy,
                    principles: [
                      ...c.philosophy.principles,
                      {
                        no: String(c.philosophy.principles.length + 1).padStart(2, "0"),
                        title: "",
                        lead: "",
                        body: "",
                      },
                    ],
                  },
                })
              }
              className="text-sm text-muted underline hover:text-ink"
            >
              + 원칙 추가
            </button>
          </div>
        </div>
        <StringList
          label="흐름 (단계별, 화살표로 연결되어 표시됨)"
          items={c.philosophy.flow}
          onChange={(flow) => setC({ ...c, philosophy: { ...c.philosophy, flow } })}
          addLabel="단계 추가"
        />
        <Area
          label="마무리 인용문"
          value={c.philosophy.closing}
          onChange={(v) =>
            setC({ ...c, philosophy: { ...c.philosophy, closing: v } })
          }
          hint="줄바꿈은 입력한 그대로 표시됩니다."
        />
        <ImageUploader
          label="인물 사진"
          aspect="aspect-[3/4]"
          value={c.philosophy.image}
          onChange={(image) =>
            setC({ ...c, philosophy: { ...c.philosophy, image } })
          }
        />
      </Section>

      {/* Contact */}
      <Section title="Contact 안내문">
        <StringList
          label="안내 문단"
          items={c.contact.paragraphs}
          onChange={(paragraphs) => setC({ ...c, contact: { paragraphs } })}
          area
          addLabel="문단 추가"
        />
      </Section>

      {/* Footer */}
      <Section title="푸터 / 연락처">
        <Field
          label="기관명"
          value={c.footer.org}
          onChange={(v) => setC({ ...c, footer: { ...c.footer, org: v } })}
        />
        <Field
          label="대표"
          value={c.footer.ceo}
          onChange={(v) => setC({ ...c, footer: { ...c.footer, ceo: v } })}
        />
        <Field
          label="주소"
          value={c.footer.address}
          onChange={(v) => setC({ ...c, footer: { ...c.footer, address: v } })}
        />
        <Field
          label="전화번호"
          value={c.footer.tel}
          onChange={(v) => setC({ ...c, footer: { ...c.footer, tel: v } })}
        />
        <Field
          label="이메일"
          value={c.footer.email}
          onChange={(v) => setC({ ...c, footer: { ...c.footer, email: v } })}
        />
        <Field
          label="Instagram URL"
          value={c.footer.instagram}
          onChange={(v) => setC({ ...c, footer: { ...c.footer, instagram: v } })}
        />
        <Field
          label="YouTube URL"
          value={c.footer.youtube}
          onChange={(v) => setC({ ...c, footer: { ...c.footer, youtube: v } })}
        />
      </Section>
        </div>

        {/* 우측: 라이브 미리보기 */}
        <PreviewPanel
          previewRef={previewRef}
          path={previewPath}
          setPath={setPreviewPath}
          device={previewDevice}
          setDevice={setPreviewDevice}
          onReload={reloadPreview}
        />
      </div>

      {/* 저장 바 */}
      <div className="fixed inset-x-0 bottom-0 border-t border-ink bg-paper/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1800px] items-center justify-between gap-4 px-4 py-4 lg:px-8">
          <span className="text-sm text-muted">
            {status === "saved" && "✓ 저장되었습니다."}
            {status === "error" && (
              <span className="text-red-600">{errMsg}</span>
            )}
          </span>
          <button
            type="button"
            onClick={save}
            disabled={status === "saving"}
            className="border border-ink bg-ink px-8 py-2.5 text-sm text-paper transition-opacity hover:opacity-85 disabled:opacity-50"
          >
            {status === "saving" ? "저장 중…" : "저장"}
          </button>
        </div>
      </div>
    </div>
  );
}
