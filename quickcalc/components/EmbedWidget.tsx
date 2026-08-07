"use client";

import React, { useState } from "react";
import { Code, Copy, Check, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";

interface EmbedWidgetProps {
  url: string; // e.g., "https://quickcalc.cloud/tools/bmi-calculator"
  title: string; // e.g., "BMI Calculator"
}

export default function EmbedWidget({ url, title }: EmbedWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Extract slug from URL (e.g. /tools/bmi-calculator -> bmi-calculator)
  const slug = url.split("/tools/")[1] || "bmi-calculator";
  const embedUrl = `https://quickcalc.cloud/embed/${slug}`;

  const iframeCode = `<iframe src="${embedUrl}" width="100%" height="520" frameborder="0" style="border:1px solid #e2e8f0; border-radius:12px; overflow:hidden;" allowfullscreen></iframe>
<div style="font-family:sans-serif; font-size:12px; color:#64748b; text-align:right; margin-top:4px;">
  Powered by <a href="${url}" target="_blank" rel="noopener noreferrer" style="color:#0d9488; font-weight:600; text-decoration:underline;">QuickCalc ${title}</a>
</div>`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(iframeCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy embed code", err);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-8 bg-base-card border border-surface-border rounded-2xl shadow-sm overflow-hidden transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 sm:p-5 hover:bg-surface-muted/60 text-left transition-colors min-h-[48px]"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center">
            <Code size={18} />
          </div>
          <div>
            <h3 className="font-heading font-bold text-ink text-sm sm:text-base">
              Embed This Calculator on Your Website
            </h3>
            <p className="text-xs text-ink-muted">
              Get free responsive iframe code with built-in attribution for blogs & sites
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs font-bold text-teal-600 dark:text-teal-400">
          <span>{isOpen ? "Hide Embed Code" : "</> Get Code"}</span>
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>

      {isOpen && (
        <div className="p-4 sm:p-6 border-t border-surface-border bg-surface-muted/30 space-y-5 animate-fade-in">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-ink">
                HTML Iframe Snippet
              </label>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-sm transition active:scale-95 min-h-[36px]"
              >
                {copied ? (
                  <>
                    <Check size={14} />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy Snippet</span>
                  </>
                )}
              </button>
            </div>

            <textarea
              readOnly
              value={iframeCode}
              rows={4}
              onClick={(e) => (e.target as HTMLTextAreaElement).select()}
              className="w-full p-3 font-mono text-xs text-ink bg-base-card border border-surface-border rounded-xl focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/20 resize-none shadow-inner"
            />
          </div>

          {/* Live Preview Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">
                Live Embed Preview (600px Width Standard)
              </span>
              <a
                href={embedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-teal-600 dark:text-teal-400 font-bold hover:underline"
              >
                <span>Open Embed Route</span>
                <ExternalLink size={12} />
              </a>
            </div>

            <div className="rounded-xl overflow-hidden border border-surface-border bg-base-card p-2 shadow-md">
              <iframe
                src={`/embed/${slug}`}
                title={`QuickCalc ${title} Embed Preview`}
                className="w-full h-[520px] rounded-lg border-0 bg-transparent"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
