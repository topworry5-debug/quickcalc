/**
 * Lightweight client-side personalization utilities (localStorage-based)
 * 100% private, no backend/login needed.
 */

const RECENT_KEY = "quickcalc_recent_tools";
const FAVORITE_KEY = "quickcalc_favorite_tools";
const UPDATE_EVENT = "quickcalc_personalization_update";

function notifyUpdate(): void {
  if (typeof window !== "undefined") {
    try {
      window.dispatchEvent(new CustomEvent(UPDATE_EVENT));
    } catch (e) {
      console.warn("Failed to dispatch personalization event:", e);
    }
  }
}

export function getRecentToolHrefs(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(RECENT_KEY);
    if (!data) return [];
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.warn("localStorage unavailable or corrupted:", e);
    return [];
  }
}

export function recordRecentTool(href: string): void {
  if (typeof window === "undefined" || !href) return;
  try {
    const current = getRecentToolHrefs();
    const filtered = current.filter((h) => h !== href);
    const updated = [href, ...filtered].slice(0, 5); // Max 5 recent tools
    localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
    notifyUpdate();
  } catch (e) {
    console.warn("Failed to record recent tool:", e);
  }
}

export function getFavoriteHrefs(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(FAVORITE_KEY);
    if (!data) return [];
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.warn("localStorage unavailable or corrupted:", e);
    return [];
  }
}

export function isToolFavorite(href: string): boolean {
  const favorites = getFavoriteHrefs();
  return favorites.includes(href);
}

export function toggleFavoriteTool(href: string): boolean {
  if (typeof window === "undefined" || !href) return false;
  try {
    const current = getFavoriteHrefs();
    let updated: string[];
    let nowFavorite = false;
    if (current.includes(href)) {
      updated = current.filter((h) => h !== href);
      nowFavorite = false;
    } else {
      updated = [...current, href];
      nowFavorite = true;
    }
    localStorage.setItem(FAVORITE_KEY, JSON.stringify(updated));
    notifyUpdate();
    return nowFavorite;
  } catch (e) {
    console.warn("Failed to toggle favorite tool:", e);
    return false;
  }
}
