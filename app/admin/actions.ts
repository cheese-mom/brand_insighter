"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Activity, SiteContent } from "@/lib/types";

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

export async function createActivity(input: ActivityInput): Promise<Result> {
  try {
    const supabase = await requireUser();
    const { error } = await supabase.from("activities").insert(input);
    if (error) return { ok: false, error: error.message };
    revalidatePublic();
    revalidatePath("/admin/activities");
    return { ok: true };
  } catch {
    return { ok: false, error: "저장에 실패했습니다." };
  }
}

export async function updateActivity(
  id: string,
  input: ActivityInput,
): Promise<Result> {
  try {
    const supabase = await requireUser();
    const { error } = await supabase.from("activities").update(input).eq("id", id);
    if (error) return { ok: false, error: error.message };
    revalidatePublic();
    revalidatePath("/admin/activities");
    return { ok: true };
  } catch {
    return { ok: false, error: "저장에 실패했습니다." };
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
