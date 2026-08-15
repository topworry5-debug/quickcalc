"use client";

import React, { useState, useEffect } from "react";
import { Download, X, Smartphone, Sparkles } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export default function InstallPwaPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user dismissed prompt recently (14-day threshold)
    try {
      const dismissedUntil = localStorage.getItem("quickcalc_pwa_dismissed_until");
      if (dismissedUntil && parseInt(dismissedUntil, 10) > Date.now()) {
        return;
      }
    } catch {
      // Ignore localStorage errors
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent automatic browser banner
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show native browser install dialog
    await deferredPrompt.prompt();

    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === "accepted") {
      console.log("User accepted the QuickCalc PWA install prompt");
    }

    setDeferredPrompt(null);
    setIsVisible(false);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    try {
      // Suppress prompt for 14 days (14 * 24 * 60 * 60 * 1000 = 1209600000ms)
      const fourteenDays = Date.now() + 1209600000;
      localStorage.setItem("quickcalc_pwa_dismissed_until", fourteenDays.toString());
    } catch {
      // Ignore localStorage errors
    }
  };

  if (!isVisible || !deferredPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 z-50 max-w-md bg-base-card border border-teal-500/30 rounded-2xl shadow-2xl p-4 sm:p-5 backdrop-blur-md animate-slide-up">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-600 dark:text-teal-400 shrink-0 shadow-inner">
            <Smartphone size={24} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="font-heading font-extrabold text-ink text-sm sm:text-base">
                Install QuickCalc App
              </h4>
              <span className="inline-flex items-center gap-0.5 text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20">
                <Sparkles size={10} />
                Offline
              </span>
            </div>
            <p className="text-xs text-ink-muted leading-relaxed mt-0.5">
              Add to home screen for instant, 100% offline access to 44+ calculators with zero ads.
            </p>
          </div>
        </div>

        <button
          onClick={handleDismiss}
          className="p-1.5 text-ink-muted hover:text-ink hover:bg-surface-muted rounded-xl transition min-h-[36px] min-w-[36px] flex items-center justify-center shrink-0"
          aria-label="Dismiss install prompt"
        >
          <X size={18} />
        </button>
      </div>

      <div className="mt-4 flex items-center justify-end gap-2 pt-3 border-t border-surface-border">
        <button
          onClick={handleDismiss}
          className="px-3.5 py-2 text-xs font-bold text-ink-muted hover:text-ink rounded-xl transition min-h-[40px]"
        >
          Not Now
        </button>
        <button
          onClick={handleInstallClick}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-md shadow-teal-500/20 transition active:scale-95 min-h-[40px]"
        >
          <Download size={15} />
          <span>Install QuickCalc</span>
        </button>
      </div>
    </div>
  );
}
