import { createClient } from "@supabase/supabase-js";
import { SUPABASE_KEY, SUPABASE_URL, isSupabaseConfigured } from "./supabase/config";
import { DEFAULT_ACTIVITIES, DEFAULT_CONTENT } from "./defaults";
import type { Activity, MediaItem, SiteContent } from "./types";

const CONTENT_ID = "main";

// 공개 페이지 읽기 전용 클라이언트 (쿠키 없음, anon 키)
function readClient() {
  return createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: { persistSession: false },
  });
}

// mediaArchive 정규화: 구버전 string[] / 신버전 {image,link}[] 모두 수용
function normalizeMedia(raw: unknown): MediaItem[] | null {
  if (!Array.isArray(raw)) return null;
  return raw
    .map((item): MediaItem =>
      typeof item === "string"
        ? { image: item, link: "" }
        : {
            image: String((item as MediaItem)?.image ?? ""),
            link: String((item as MediaItem)?.link ?? ""),
          },
    )
    .filter((m) => m.image);
}

// 저장된 데이터에 누락 섹션이 있어도 기본값으로 보강
function mergeContent(data: Partial<SiteContent> | null): SiteContent {
  if (!data) return DEFAULT_CONTENT;
  return {
    hero: { ...DEFAULT_CONTENT.hero, ...data.hero },
    stats: data.stats ?? DEFAULT_CONTENT.stats,
    currentActivities: data.currentActivities ?? DEFAULT_CONTENT.currentActivities,
    mediaArchive: normalizeMedia(data.mediaArchive) ?? DEFAULT_CONTENT.mediaArchive,
    about: { ...DEFAULT_CONTENT.about, ...data.about },
    contact: { ...DEFAULT_CONTENT.contact, ...data.contact },
    footer: { ...DEFAULT_CONTENT.footer, ...data.footer },
  };
}

export async function getSiteContent(): Promise<SiteContent> {
  if (!isSupabaseConfigured) return DEFAULT_CONTENT;
  try {
    const { data, error } = await readClient()
      .from("site_content")
      .select("data")
      .eq("id", CONTENT_ID)
      .maybeSingle();
    if (error) throw error;
    return mergeContent((data?.data as Partial<SiteContent>) ?? null);
  } catch {
    return DEFAULT_CONTENT;
  }
}

export async function getActivities(): Promise<Activity[]> {
  if (!isSupabaseConfigured) return DEFAULT_ACTIVITIES;
  try {
    const { data, error } = await readClient()
      .from("activities")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data as Activity[]) ?? [];
  } catch {
    return DEFAULT_ACTIVITIES;
  }
}

export async function getActivity(id: string): Promise<Activity | null> {
  if (!isSupabaseConfigured) {
    return DEFAULT_ACTIVITIES.find((a) => a.id === id) ?? null;
  }
  try {
    const { data, error } = await readClient()
      .from("activities")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error) throw error;
    return (data as Activity) ?? null;
  } catch {
    return null;
  }
}
