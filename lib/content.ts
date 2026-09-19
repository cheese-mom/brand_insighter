import { createClient } from "@supabase/supabase-js";
import { SUPABASE_KEY, SUPABASE_URL, isSupabaseConfigured } from "./supabase/config";
import { DEFAULT_ACTIVITIES, DEFAULT_CONTENT } from "./defaults";
import type { Activity, MediaItem, SiteContent } from "./types";
import { getYouTubeVideoId } from "./youtube";

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
            ...((item as MediaItem)?.embed === false ? { embed: false } : {}),
          },
    )
    .filter((m) => m.image);
}

// 구버전(About 페이지) 저장 데이터 — 인물 사진만 Philosophy 페이지로 이어받는다
type LegacyAbout = { about?: { image?: string | null } };

// 저장된 데이터에 누락 섹션이 있어도 기본값으로 보강
function mergeContent(data: Partial<SiteContent> | null): SiteContent {
  if (!data) return DEFAULT_CONTENT;

  // 버전 1 저장 데이터에는 새 영상을 보강한다. 어드민에서 다시 저장한 뒤에는
  // 버전 2 목록을 그대로 존중하므로 영상을 삭제해도 재등장하지 않는다.
  const currentActivityVideos = data.currentActivityVideos ?? DEFAULT_CONTENT.currentActivityVideos;
  const newVideo = DEFAULT_CONTENT.currentActivityVideos[1];
  const videos = data.currentActivityVideosVersion === 2 ||
    currentActivityVideos.some((video) => getYouTubeVideoId(video.url) === getYouTubeVideoId(newVideo.url))
    ? currentActivityVideos
    : [...currentActivityVideos, newVideo];

  const philosophy = { ...DEFAULT_CONTENT.philosophy, ...data.philosophy };
  const legacyImage = (data as LegacyAbout).about?.image;
  if (data.philosophy?.image === undefined && legacyImage) {
    philosophy.image = legacyImage;
  }

  return {
    hero: { ...DEFAULT_CONTENT.hero, ...data.hero },
    stats: data.stats ?? DEFAULT_CONTENT.stats,
    currentActivities: data.currentActivities ?? DEFAULT_CONTENT.currentActivities,
    currentActivityVideos: videos,
    currentActivityVideosVersion: DEFAULT_CONTENT.currentActivityVideosVersion,
    mediaArchive: normalizeMedia(data.mediaArchive) ?? DEFAULT_CONTENT.mediaArchive,
    philosophy,
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
      .eq("status", "published")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data as Activity[]) ?? [];
  } catch {
    return DEFAULT_ACTIVITIES;
  }
}

export async function getActivity(id: string): Promise<Activity | null> {
  // 기본 콘텐츠 id(default-N)는 uuid가 아니라 DB 조회가 불가 —
  // 목록이 폴백으로 렌더된 경우에도 상세 링크가 동작하도록 기본값에서 찾는다.
  if (!isSupabaseConfigured || id.startsWith("default-")) {
    return DEFAULT_ACTIVITIES.find((a) => a.id === id) ?? null;
  }
  try {
    const { data, error } = await readClient()
      .from("activities")
      .select("*")
      .eq("id", id)
      .eq("status", "published")
      .maybeSingle();
    if (error) throw error;
    return (data as Activity) ?? null;
  } catch {
    return null;
  }
}
