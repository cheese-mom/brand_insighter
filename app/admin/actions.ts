"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { MEDIA_BUCKET } from "@/lib/supabase/config";
import { parseInstagramUrl, canonicalInstagramUrl } from "@/lib/instagram";
import type { Activity, MediaItem, SiteContent } from "@/lib/types";

type Result = { ok: boolean; error?: string };

function revalidatePublic() {
  revalidatePath("/", "layout"); // 레이아웃(푸터 포함) + 모든 페이지
}

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("UNAUTHORIZED");
  return supabase;
}

export async function saveContent(content: SiteContent): Promise<Result> {
  try {
    const supabase = await requireUser();
    const { error } = await supabase
      .from("site_content")
      .upsert({ id: "main", data: content, updated_at: new Date().toISOString() });
    if (error) return { ok: false, error: error.message };
    revalidatePublic();
    return { ok: true };
  } catch {
    return { ok: false, error: "저장에 실패했습니다. 다시 로그인해 주세요." };
  }
}

export type ActivityInput = Omit<Activity, "id" | "created_at">;

function activityPayload(input: ActivityInput) {
  const status = input.status ?? "draft";
  if (!["draft", "published"].includes(status)) throw new Error("잘못된 상태");
  if (!input.title.trim()) throw new Error("제목을 입력해 주세요.");
  if (status === "published" && !input.body.trim()) throw new Error("발행하려면 본문을 작성해 주세요.");
  return { title: input.title, date: input.date, excerpt: input.excerpt, body: input.body,
    thumbnail: input.thumbnail, sort_order: input.sort_order, status,
    category: input.category ?? "브랜드 인사이트", geo_questions: input.geo_questions ?? "",
    content_outline: input.content_outline ?? "", editorial_notes: input.editorial_notes ?? "" };
}

export async function createActivity(input: ActivityInput): Promise<Result> {
  try {
    const supabase = await requireUser();
    const payload = activityPayload(input);
    const { error } = await supabase.from("activities").insert(payload);
    if (error) return { ok: false, error: error.message };
    revalidatePublic();
    revalidatePath("/admin/activities");
    return { ok: true };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "저장에 실패했습니다." };
  }
}

export async function updateActivity(
  id: string,
  input: ActivityInput,
): Promise<Result> {
  try {
    const supabase = await requireUser();
    const payload = activityPayload(input);
    const { error } = await supabase.from("activities").update(payload).eq("id", id);
    if (error) return { ok: false, error: error.message };
    revalidatePublic();
    revalidatePath("/admin/activities");
    return { ok: true };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "저장에 실패했습니다." };
  }
}

export async function deleteActivity(id: string): Promise<Result> {
  try {
    const supabase = await requireUser();
    const { error } = await supabase.from("activities").delete().eq("id", id);
    if (error) return { ok: false, error: error.message };
    revalidatePublic();
    revalidatePath("/admin/activities");
    return { ok: true };
  } catch {
    return { ok: false, error: "삭제에 실패했습니다." };
  }
}

/* ---------- 인스타 릴스 가져오기 ---------- */

export type ReelImportResult =
  | { ok: true; item: MediaItem }
  | { ok: false; error: string };

// 릴 페이지의 og:image 메타태그에서 썸네일 URL을 추출한다.
// (Meta oEmbed의 thumbnail_url은 앱 ID/토큰 없이는 제공되지 않아 og:image를 사용)
async function fetchReelThumbnailUrl(canonicalUrl: string): Promise<string> {
  const pageRes = await fetch(canonicalUrl, {
    headers: {
      // 크롤러 UA에는 로그인 월 없이 og 메타태그가 포함된 HTML이 내려온다.
      "User-Agent":
        "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
    },
    signal: AbortSignal.timeout(10_000),
    cache: "no-store",
  });
  if (!pageRes.ok) throw new Error(`page ${pageRes.status}`);
  const html = await pageRes.text();
  const m = html.match(/<meta property="og:image" content="([^"]+)"/);
  if (!m) throw new Error("no og:image");
  return m[1].replace(/&amp;/g, "&");
}

// 인스타그램이 해당 게시물의 임베드를 허용하는지 확인한다.
// (일부 게시물은 음원 라이선스 등의 이유로 임베드가 차단됨 — 이 경우 새 탭으로 열어야 함)
async function checkEmbeddable(canonicalUrl: string): Promise<boolean> {
  try {
    const res = await fetch(
      // 무버전 oEmbed 엔드포인트는 공개 게시물에 한해 토큰 없이 호출 가능
      `https://graph.facebook.com/instagram_oembed?url=${encodeURIComponent(canonicalUrl)}`,
      { signal: AbortSignal.timeout(10_000), cache: "no-store" },
    );
    return res.ok;
  } catch {
    return true; // 확인 실패(네트워크 등) 시에는 임베드 가능으로 간주
  }
}

// 릴스/게시물 URL을 받아 썸네일을 조회하고, 서명 만료되는 CDN 이미지를
// Storage에 재호스팅한 뒤 갤러리 아이템을 반환한다.
// 저장은 하지 않음 — 에디터가 로컬 상태에 추가하고 기존 저장 버튼으로 저장한다.
export async function importReelFromUrl(reelUrl: string): Promise<ReelImportResult> {
  const ref = parseInstagramUrl(reelUrl.trim());
  if (!ref) {
    return { ok: false, error: "인스타그램 릴스/게시물 URL이 아닙니다." };
  }
  try {
    const supabase = await requireUser();

    const canonicalUrl = canonicalInstagramUrl(ref);
    const [thumbnailUrl, embeddable] = await Promise.all([
      fetchReelThumbnailUrl(canonicalUrl),
      checkEmbeddable(canonicalUrl),
    ]);

    const imgRes = await fetch(thumbnailUrl, {
      signal: AbortSignal.timeout(15_000),
    });
    if (!imgRes.ok) throw new Error(`thumbnail ${imgRes.status}`);
    const contentType = imgRes.headers.get("content-type") ?? "image/jpeg";
    const buf = await imgRes.arrayBuffer();

    const path = `ig-${ref.shortcode}-${crypto.randomUUID()}.jpg`;
    const { error: uploadError } = await supabase.storage
      .from(MEDIA_BUCKET)
      .upload(path, buf, { contentType, cacheControl: "3600", upsert: false });
    if (uploadError) throw uploadError;
    const { data } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path);

    return {
      ok: true,
      item: {
        image: data.publicUrl,
        link: canonicalUrl,
        ...(embeddable ? {} : { embed: false }),
      },
    };
  } catch {
    return {
      ok: false,
      error:
        "썸네일을 가져오지 못했습니다. 이미지를 직접 업로드하고 링크를 입력해 주세요.",
    };
  }
}

/* ---------- Contact 문의 내역 ---------- */

export async function setContactRead(
  id: string,
  isRead: boolean,
): Promise<Result> {
  try {
    const supabase = await requireUser();
    const { error } = await supabase
      .from("contact_submissions")
      .update({ is_read: isRead })
      .eq("id", id);
    if (error) return { ok: false, error: error.message };
    revalidatePath("/admin/contacts");
    return { ok: true };
  } catch {
    return { ok: false, error: "처리에 실패했습니다." };
  }
}

export async function deleteContact(id: string): Promise<Result> {
  try {
    const supabase = await requireUser();
    const { error } = await supabase
      .from("contact_submissions")
      .delete()
      .eq("id", id);
    if (error) return { ok: false, error: error.message };
    revalidatePath("/admin/contacts");
    return { ok: true };
  } catch {
    return { ok: false, error: "삭제에 실패했습니다." };
  }
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
