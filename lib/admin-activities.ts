import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { Activity } from "@/lib/types";

export async function getAdminActivities(): Promise<Activity[]> {
  const db = await createClient();
  const { data: { user } } = await db.auth.getUser();
  if (!user) throw new Error("UNAUTHORIZED");
  const { data, error } = await db.from("activities").select("*").order("sort_order").order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getAdminActivity(id: string): Promise<Activity | null> {
  const db = await createClient();
  const { data: { user } } = await db.auth.getUser();
  if (!user) throw new Error("UNAUTHORIZED");
  const { data, error } = await db.from("activities").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data;
}
