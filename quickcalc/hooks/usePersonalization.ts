"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getRecentToolHrefs,
  getFavoriteHrefs,
  toggleFavoriteTool,
  recordRecentTool,
} from "@/lib/utils/personalization";
import { tools, Tool } from "@/lib/toolsData";

export function usePersonalization() {
  const [recentHrefs, setRecentHrefs] = useState<string[]>([]);
  const [favoriteHrefs, setFavoriteHrefs] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const syncState = useCallback(() => {
    setRecentHrefs(getRecentToolHrefs());
    setFavoriteHrefs(getFavoriteHrefs());
  }, []);

  useEffect(() => {
    setIsMounted(true);
    syncState();

    const handleUpdate = () => syncState();
    window.addEventListener("quickcalc_personalization_update", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("quickcalc_personalization_update", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [syncState]);

  const recentTools: Tool[] = isMounted
    ? (recentHrefs.map((href) => tools.find((t) => t.href === href)).filter(Boolean) as Tool[])
    : [];

  const favoriteTools: Tool[] = isMounted
    ? (favoriteHrefs.map((href) => tools.find((t) => t.href === href)).filter(Boolean) as Tool[])
    : [];

  const toggleFavorite = useCallback((href: string) => {
    return toggleFavoriteTool(href);
  }, []);

  const isFavorite = useCallback(
    (href: string) => {
      return favoriteHrefs.includes(href);
    },
    [favoriteHrefs]
  );

  return {
    isMounted,
    recentTools,
    favoriteTools,
    favoriteHrefs,
    toggleFavorite,
    isFavorite,
    recordRecentTool,
  };
}
