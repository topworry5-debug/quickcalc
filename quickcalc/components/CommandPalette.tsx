"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, Calculator, BookOpen, CornerDownLeft } from "lucide-react";
import ToolIcon from "@/components/ToolIcon";
import FavoriteButton from "@/components/FavoriteButton";
import { tools } from "@/lib/toolsData";
import { articles } from "@/app/blog/articlesData";

interface SearchItem {
  id: string;
  title: string;
  description: string;
  category: string;
  href: string;
  icon: string;
  type: "tool" | "article";
}

interface CommandPaletteProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

// Pre-combine tools & articles into unified search items
const allSearchItems: SearchItem[] = [
  ...tools.map((t) => ({
    id: `tool-${t.href}`,
    title: t.title,
    description: t.description,
    category: t.category,
    href: t.href,
    icon: t.icon,
    type: "tool" as const,
  })),
  ...articles.map((a) => ({
    id: `article-${a.slug}`,
    title: a.title,
    description: a.excerpt,
    category: a.category,
    href: `/blog/${a.slug}`,
    icon: a.icon,
    type: "article" as const,
  })),
];

export default function CommandPalette({ isOpen, setIsOpen }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Global Cmd+K / Ctrl+K keyboard trigger
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, setIsOpen]);

  // Lock body scroll & focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Filter items based on query
  const filteredItems = allSearchItems.filter((item) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  });

  const toolResults = filteredItems.filter((i) => i.type === "tool");
  const articleResults = filteredItems.filter((i) => i.type === "article");
  const flatResults = [...toolResults, ...articleResults];

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Handle arrow key navigation & enter selection
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      setIsOpen(false);
      return;
    }

    if (flatResults.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < flatResults.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : flatResults.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const selected = flatResults[selectedIndex];
      if (selected) {
        setIsOpen(false);
        router.push(selected.href);
      }
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (!listRef.current) return;
    const activeEl = listRef.current.querySelector(`[data-index="${selectedIndex}"]`);
    if (activeEl) {
      activeEl.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsOpen(false);
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Search calculators and guides"
    >
      <div className="w-full h-full sm:h-auto sm:max-w-2xl bg-base-card sm:border sm:border-surface-border sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-full sm:max-h-[85vh]">
        {/* Search Header Input */}
        <div className="relative flex items-center p-3 sm:p-4 border-b border-surface-border bg-base-card shrink-0">
          <Search size={20} className="absolute left-4 sm:left-5 text-ink-muted pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Type to search calculators or articles..."
            className="w-full pl-10 sm:pl-12 pr-12 py-2 sm:py-3 bg-transparent text-ink text-base sm:text-lg placeholder:text-ink-muted focus:outline-none"
            aria-label="Search command palette"
          />
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-3.5 p-1.5 rounded-xl text-ink-muted hover:text-ink hover:bg-surface-muted transition min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close search overlay"
          >
            <X size={20} />
          </button>
        </div>

        {/* Results List */}
        <div ref={listRef} className="flex-1 overflow-y-auto p-2 sm:p-3 space-y-4">
          {flatResults.length > 0 ? (
            <>
              {/* Tool Results Section */}
              {toolResults.length > 0 && (
                <div>
                  <div className="px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-ink-muted flex items-center gap-1.5">
                    <Calculator size={13} className="text-teal-600 dark:text-teal-400" />
                    <span>Calculators & Tools ({toolResults.length})</span>
                  </div>
                  <div className="mt-1 space-y-1">
                    {toolResults.map((item) => {
                      const itemFlatIndex = flatResults.findIndex((i) => i.id === item.id);
                      const isSelected = itemFlatIndex === selectedIndex;
                      return (
                        <Link
                          key={item.id}
                          href={item.href}
                          data-index={itemFlatIndex}
                          onClick={() => setIsOpen(false)}
                          onMouseEnter={() => setSelectedIndex(itemFlatIndex)}
                          className={`flex items-center gap-3.5 p-3 rounded-xl transition-all text-left min-h-[48px] ${
                            isSelected
                              ? "bg-teal-500/10 dark:bg-teal-500/20 border border-teal-500/30 text-ink"
                              : "hover:bg-surface-muted border border-transparent text-ink"
                          }`}
                        >
                          <ToolIcon icon={item.icon} category={item.category} size="sm" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-ink truncate">
                                {item.title}
                              </h4>
                              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-surface-muted text-ink-muted border border-surface-border shrink-0">
                                {item.category}
                              </span>
                            </div>
                            <p className="text-xs text-ink-muted truncate mt-0.5">
                              {item.description}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            <FavoriteButton toolHref={item.href} size="sm" />
                            {isSelected && (
                              <CornerDownLeft size={16} className="text-teal-600 dark:text-teal-400" />
                            )}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Article Results Section */}
              {articleResults.length > 0 && (
                <div>
                  <div className="px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-ink-muted flex items-center gap-1.5">
                    <BookOpen size={13} className="text-indigo-600 dark:text-indigo-400" />
                    <span>In-Depth Guides ({articleResults.length})</span>
                  </div>
                  <div className="mt-1 space-y-1">
                    {articleResults.map((item) => {
                      const itemFlatIndex = flatResults.findIndex((i) => i.id === item.id);
                      const isSelected = itemFlatIndex === selectedIndex;
                      return (
                        <Link
                          key={item.id}
                          href={item.href}
                          data-index={itemFlatIndex}
                          onClick={() => setIsOpen(false)}
                          onMouseEnter={() => setSelectedIndex(itemFlatIndex)}
                          className={`flex items-center gap-3.5 p-3 rounded-xl transition-all text-left min-h-[48px] ${
                            isSelected
                              ? "bg-indigo-500/10 dark:bg-indigo-500/20 border border-indigo-500/30 text-ink"
                              : "hover:bg-surface-muted border border-transparent text-ink"
                          }`}
                        >
                          <ToolIcon icon={item.icon} category={item.category} size="sm" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-ink truncate">
                                {item.title}
                              </h4>
                              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-surface-muted text-ink-muted border border-surface-border shrink-0">
                                Guide
                              </span>
                            </div>
                            <p className="text-xs text-ink-muted truncate mt-0.5">
                              {item.description}
                            </p>
                          </div>
                          {isSelected && (
                            <CornerDownLeft size={16} className="text-indigo-600 dark:text-indigo-400 shrink-0" />
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 text-ink-muted text-sm">
              No tools or guides found matching &ldquo;{query}&rdquo;
            </div>
          )}
        </div>

        {/* Footer Shortcut Bar */}
        <div className="hidden sm:flex items-center justify-between px-4 py-2.5 bg-surface-muted/60 border-t border-surface-border text-xs text-ink-muted font-medium shrink-0">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-base-card border border-surface-border text-[10px] font-mono font-bold">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-base-card border border-surface-border text-[10px] font-mono font-bold">↓</kbd>
              <span>Navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-base-card border border-surface-border text-[10px] font-mono font-bold">↵</kbd>
              <span>Select</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-base-card border border-surface-border text-[10px] font-mono font-bold">Esc</kbd>
              <span>Close</span>
            </span>
          </div>
          <span className="text-[11px] font-bold text-teal-600 dark:text-teal-400">QuickCalc Search</span>
        </div>
      </div>
    </div>
  );
}
