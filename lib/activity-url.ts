import type { Activity } from "./types";

export function getActivityIdentifier(activity: Pick<Activity, "id" | "slug">) {
  return activity.slug || activity.id;
}

export function getActivityPath(activity: Pick<Activity, "id" | "slug">) {
  return `/activity/${getActivityIdentifier(activity)}`;
}
