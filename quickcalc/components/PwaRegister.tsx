"use client";

import { useEffect } from "react";

export default function PwaRegister() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      const isLocalhost =
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1" ||
        window.location.hostname === "::1" ||
        process.env.NODE_ENV !== "production";

      // On localhost/dev, always unregister SW to avoid caching stale webpack chunks
      if (isLocalhost) {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          for (const registration of registrations) {
            registration.unregister();
          }
        });
        if ("caches" in window) {
          caches.keys().then((keys) => {
            for (const key of keys) {
              caches.delete(key);
            }
          });
        }
        return;
      }

      const registerSw = () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((reg) => {
            // Check for updates
            reg.onupdatefound = () => {
              const installingWorker = reg.installing;
              if (installingWorker) {
                installingWorker.onstatechange = () => {
                  if (installingWorker.state === "installed" && navigator.serviceWorker.controller) {
                    console.log("QuickCalc PWA updated. Content cached for offline use.");
                  }
                };
              }
            };
          })
          .catch((err) => {
            console.log("Service worker registration skipped:", err);
          });
      };

      if (document.readyState === "complete") {
        registerSw();
      } else {
        window.addEventListener("load", registerSw);
        return () => window.removeEventListener("load", registerSw);
      }
    }
  }, []);

  return null;
}
