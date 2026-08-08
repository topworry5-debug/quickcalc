"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

export function useCalculatorUrlState<T extends Record<string, string | number | undefined>>(
  params: T,
  onHydrate?: (searchParams: URLSearchParams) => void
) {
  const searchParams = useSearchParams();
  const isHydratedRef = useRef(false);

  // 1. Hydrate state from URL on initial load
  useEffect(() => {
    if (!isHydratedRef.current && searchParams) {
      isHydratedRef.current = true;
      if (onHydrate && Array.from(searchParams.keys()).length > 0) {
        onHydrate(searchParams);
      }
    }
  }, [searchParams, onHydrate]);

  // 2. Sync state changes to URL parameters using replaceState without page reloads
  useEffect(() => {
    if (typeof window === "undefined") return;

    const url = new URL(window.location.href);
    let changed = false;

    Object.entries(params).forEach(([key, value]) => {
      const stringVal = value !== undefined && value !== null ? String(value) : "";
      const currentVal = url.searchParams.get(key) || "";

      if (stringVal && stringVal !== currentVal) {
        url.searchParams.set(key, stringVal);
        changed = true;
      } else if (!stringVal && url.searchParams.has(key)) {
        url.searchParams.delete(key);
        changed = true;
      }
    });

    if (changed) {
      window.history.replaceState(null, "", url.toString());
    }
  }, [params]);
}
