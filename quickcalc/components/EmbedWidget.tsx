"use client";

import React, { useState } from "react";

interface EmbedWidgetProps {
  url: string; // e.g., "https://quickcalc.cloud/tools/percentage-calculator"
  title: string; // e.g., "Percentage Calculator"
}

export default function EmbedWidget({ url, title }: EmbedWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // We append ?embed=true to the iframe source URL to trigger standalone mode
  const embedUrl = url.includes("?") ? `${url}&embed=true` : `${url}?embed=true`;

  const iframeCode = `<iframe src="${embedUrl}" width="100%" height="500" style="border:1px solid #e4e4e7; border-radius:8px;" allowfullscreen></iframe>
<div style="font-family:sans-serif; font-size:12px; color:#71717a; text-align:right; margin-top:4px;">
  Powered by <a href="${url}" target="_blank" rel="noopener" style="color:#2563eb; text-decoration:underline; font-weight:600;">QuickCalc ${title}</a>
</div>`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(iframeCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy embed code", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 mb-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors focus:outline-none"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
        {isOpen ? "Hide Embed Options" : "</> Embed this tool"}
      </button>

      {isOpen && (
        <div className="w-full max-w-md p-4 mt-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm text-left animate-in fade-in slide-in-from-top-2 duration-200">
          <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
            Copy the HTML code below to embed this calculator on your website:
          </p>
          <div className="relative">
            <textarea
              readOnly
              value={iframeCode}
              rows={4}
              className="w-full p-2.5 font-mono text-xs text-zinc-800 dark:text-zinc-200 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
              onClick={(e) => (e.target as HTMLTextAreaElement).select()}
            />
            <button
              onClick={handleCopy}
              className="absolute right-2 bottom-3 px-3 py-1 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-md shadow transition-colors flex items-center gap-1"
            >
              {copied ? (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  Copy Embed Code
                </>
              )}
            </button>
          </div>
          <div className="mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex flex-col gap-1.5">
            <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium">
              Live Preview of Attribution Link:
            </p>
            <div className="text-right text-[11px] font-sans text-zinc-500">
              Powered by{" "}
              <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                QuickCalc {title}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
