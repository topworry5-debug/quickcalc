"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Download, Link as LinkIcon, Check, Share2, Loader2 } from "lucide-react";

export interface ShareResultData {
  toolName: string;
  toolSlug: string;
  category: string;
  resultValue: string;
  resultLabel: string;
  inputsSummary: Array<{ label: string; value: string }>;
  queryParams?: Record<string, string>;
}

interface ShareResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ShareResultData;
}

export default function ShareResultModal({ isOpen, onClose, data }: ShareResultModalProps) {
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(true);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Clean up object URLs on unmount or URL change to prevent memory leaks
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // Generate 1200x630 Canvas Image non-blocking asynchronously
  useEffect(() => {
    if (!isOpen) {
      setIsGenerating(true);
      setPreviewUrl("");
      return;
    }

    setIsGenerating(true);

    // Yield execution to main thread so browser paints the loading modal state first (<16ms INP)
    const animationFrameId = requestAnimationFrame(() => {
      const timerId = setTimeout(() => {
        generateCanvasCard();
      }, 40);

      return () => clearTimeout(timerId);
    });

    return () => cancelAnimationFrame(animationFrameId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, data]);

  const generateCanvasCard = () => {
    const canvas = canvasRef.current || document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 630;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 1. Background base fill
    ctx.fillStyle = "#0F172A";
    ctx.fillRect(0, 0, 1200, 630);

    // 2. Subtle radial gradient glow accents
    const bgGradient = ctx.createLinearGradient(0, 0, 1200, 630);
    bgGradient.addColorStop(0, "rgba(13, 148, 136, 0.25)");
    bgGradient.addColorStop(0.5, "rgba(15, 23, 42, 0.9)");
    bgGradient.addColorStop(1, "rgba(79, 70, 229, 0.2)");
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, 1200, 630);

    // 3. Grid lines texture
    ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
    ctx.lineWidth = 1;
    for (let x = 0; x < 1200; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 630);
      ctx.stroke();
    }
    for (let y = 0; y < 630; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1200, y);
      ctx.stroke();
    }

    // 4. Top Category Badge Pill
    const categoryText = (data.category || "HEALTH & FITNESS").toUpperCase();
    ctx.font = "bold 16px Inter, sans-serif";
    const badgeWidth = ctx.measureText(categoryText).width + 36;
    
    // Draw pill background
    ctx.fillStyle = "rgba(13, 148, 136, 0.2)";
    ctx.strokeStyle = "rgba(45, 212, 191, 0.4)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(80, 60, badgeWidth, 38, 19);
    ctx.fill();
    ctx.stroke();

    // Draw pill text
    ctx.fillStyle = "#2DD4BF";
    ctx.fillText(categoryText, 98, 84);

    // 5. Tool Title
    ctx.font = "bold 44px sans-serif";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(data.toolName, 80, 150);

    // 6. Main Metric Card Box Container
    ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
    ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(80, 185, 1040, 270, 24);
    ctx.fill();
    ctx.stroke();

    // Main Metric Value
    ctx.font = "bold 68px monospace";
    ctx.fillStyle = "#2DD4BF";
    ctx.fillText(data.resultValue, 120, 275);

    // Classification Label
    ctx.font = "bold 32px sans-serif";
    ctx.fillStyle = "#F8FAFC";
    ctx.fillText(data.resultLabel, 120, 335);

    // Inputs Summary Line
    if (data.inputsSummary && data.inputsSummary.length > 0) {
      const inputsText = data.inputsSummary.map((i) => `${i.label}: ${i.value}`).join("   •   ");
      ctx.font = "20px sans-serif";
      ctx.fillStyle = "#94A3B8";
      ctx.fillText(inputsText, 120, 400);
    }

    // 7. Bottom Branding Divider & Footer
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(80, 505);
    ctx.lineTo(1120, 505);
    ctx.stroke();

    // Brand Logo Text
    ctx.font = "bold 26px sans-serif";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("Quick", 80, 555);
    ctx.fillStyle = "#2DD4BF";
    ctx.fillText("Calc", 152, 555);

    // URL Sub-text
    ctx.font = "16px sans-serif";
    ctx.fillStyle = "#94A3B8";
    ctx.fillText("https://quickcalc.cloud", 80, 580);

    // Right Sub-text
    ctx.font = "16px sans-serif";
    ctx.fillStyle = "#64748B";
    ctx.textAlign = "right";
    ctx.fillText("100% Client-Side Privacy • Science-Backed Tools", 1120, 565);
    ctx.textAlign = "left";

    // Use async canvas.toBlob to avoid blocking main thread with synchronous toDataURL
    if (canvas.toBlob) {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            setPreviewUrl(url);
          }
          setIsGenerating(false);
        },
        "image/png",
        1.0
      );
    } else {
      try {
        const url = canvas.toDataURL("image/png");
        setPreviewUrl(url);
      } catch (e) {
        console.error("Failed to export canvas image", e);
      } finally {
        setIsGenerating(false);
      }
    }
  };

  // Download image handler
  const handleDownload = () => {
    if (!previewUrl) return;
    const a = document.createElement("a");
    a.href = previewUrl;
    a.download = `QuickCalc-${data.toolSlug}-result.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Copy shareable link with query parameters
  const handleCopyLink = async () => {
    const url = new URL(window.location.href);
    if (data.queryParams) {
      Object.entries(data.queryParams).forEach(([key, val]) => {
        if (val) url.searchParams.set(key, val);
      });
    }
    try {
      await navigator.clipboard.writeText(url.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error("Clipboard copy failed", e);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Share Calculation Result"
    >
      {/* Off-screen canvas element for drawing */}
      <canvas ref={canvasRef} className="hidden" />

      <div className="w-full max-w-2xl bg-base-card border border-surface-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-surface-border bg-base-card shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-600 dark:text-teal-400">
              <Share2 size={16} />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-ink text-base">
                Share Result Card
              </h3>
              <p className="text-xs text-ink-muted">
                Download a high-res 1200x630 share card or copy reproducible link
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-ink-muted hover:text-ink hover:bg-surface-muted transition min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body Preview Card */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          <div className="rounded-xl overflow-hidden border border-surface-border shadow-md bg-slate-950 min-h-[240px] flex items-center justify-center relative">
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center gap-3 p-8 text-center text-ink-muted">
                <Loader2 size={28} className="animate-spin text-teal-500" />
                <span className="text-sm font-semibold text-ink">
                  Generating high-res card...
                </span>
                <span className="text-xs text-ink-muted">
                  Creating 1200x630 crisp canvas image
                </span>
              </div>
            ) : previewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewUrl}
                alt={`${data.toolName} Result Card`}
                className="w-full h-auto object-cover animate-fade-in"
              />
            ) : (
              <div className="p-8 text-center text-ink-muted text-sm">
                Failed to render preview. Click download below to save image.
              </div>
            )}
          </div>
        </div>

        {/* Modal Action Buttons Footer */}
        <div className="p-4 border-t border-surface-border bg-surface-muted/40 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <button
            onClick={handleCopyLink}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-base-card hover:bg-surface-muted border border-surface-border text-ink font-bold text-xs shadow-sm transition active:scale-95 min-h-[44px]"
          >
            {copied ? (
              <>
                <Check size={16} className="text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400">Link Copied!</span>
              </>
            ) : (
              <>
                <LinkIcon size={16} className="text-teal-600 dark:text-teal-400" />
                <span>Copy Shareable Link</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            disabled={isGenerating || !previewUrl}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-white font-bold text-xs shadow-md transition active:scale-95 min-h-[44px] ${
              isGenerating || !previewUrl
                ? "bg-teal-600/50 cursor-not-allowed"
                : "bg-teal-600 hover:bg-teal-700 shadow-teal-500/20"
            }`}
          >
            {isGenerating ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Download size={16} />
                <span>Download Image Card (1200x630)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
