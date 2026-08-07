"use client";

import Navbar from "@/components/Navbar";
import ToolIcon from "@/components/ToolIcon";
import HeroMiniDemo from "@/components/HeroMiniDemo";
import { Search, ArrowRight, X, Sparkles } from "lucide-react";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import AdSlot from "@/components/AdSlot";
import Footer from "@/components/Footer";
import { Tool } from "@/lib/toolsData";

interface HomeClientProps {
  initialTools: Tool[];
}

export default function HomeClient({ initialTools }: HomeClientProps) {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Initialize search query from 'q' parameter on mount
  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      setSearchQuery(q);
    }
  }, [searchParams]);

  const filteredTools = initialTools.filter((tool) => {
    const query = searchQuery.toLowerCase();
    return (
      tool.title.toLowerCase().includes(query) ||
      tool.description.toLowerCase().includes(query)
    );
  });

  const suggestions = searchQuery.trim() !== "" ? filteredTools.slice(0, 6) : [];

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (searchQuery.trim() === "") return;

    if (!isDropdownOpen) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter") {
        setIsDropdownOpen(true);
        setSelectedIndex(0);
        e.preventDefault();
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prevIndex) =>
        prevIndex < (suggestions.length > 0 ? suggestions.length - 1 : 0) ? prevIndex + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : (suggestions.length > 0 ? suggestions.length - 1 : 0)
      );
    } else if (e.key === "Enter") {
      if (suggestions.length > 0 && selectedIndex >= 0 && selectedIndex < suggestions.length) {
        e.preventDefault();
        const selectedTool = suggestions[selectedIndex];
        router.push(selectedTool.href);
        setIsDropdownOpen(false);
      }
    } else if (e.key === "Escape") {
      setIsDropdownOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-bg text-ink font-sans transition-colors duration-200">
      {/* Responsive Navigation Header with Mobile Drawer */}
      <Navbar />

      {/* Hero Section with subtle graph paper texture */}
      <div className="bg-graph-paper border-b border-surface-border/50">
        <section className="max-w-5xl mx-auto px-4 py-10 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content Area (Columns 1-7 on desktop) */}
            <div className="lg:col-span-7 space-y-5 text-left">
              {/* Trust Signal Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/10 dark:bg-teal-500/20 text-teal-700 dark:text-teal-300 border border-teal-500/20 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse motion-reduce:animate-none"></span>
                <span>31 Science-Backed Tools • 100% Free • No Sign-up</span>
              </div>

              {/* Space Grotesk Display Title */}
              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-heading font-extrabold tracking-tight text-ink leading-[1.15]">
                Instant Answers. <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-teal-600 via-indigo-600 to-teal-500 bg-clip-text text-transparent">Precision Results.</span>
              </h1>

              <p className="text-sm sm:text-base text-ink-muted leading-relaxed max-w-xl">
                QuickCalc provides fast, private, and mathematically exact calculators for your health, finance, and daily planning needs — right in your browser.
              </p>

              {/* Touch-Friendly Search Bar Container */}
              <div ref={searchContainerRef} className="relative max-w-lg pt-1">
                <label htmlFor="tool-search" className="sr-only">
                  Search tools
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-ink-muted pointer-events-none">
                    <Search size={20} />
                  </span>
                  <input
                    id="tool-search"
                    type="search"
                    enterKeyHint="search"
                    aria-label="Search tools"
                    value={searchQuery}
                    onFocus={() => {
                      if (searchQuery.trim() !== "") {
                        setIsDropdownOpen(true);
                      }
                    }}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setIsDropdownOpen(true);
                      setSelectedIndex(-1);
                    }}
                    placeholder="Search tools... (e.g. BMI, loan, password)"
                    className="w-full pl-11 pr-12 py-3.5 bg-base-card border border-surface-border rounded-xl text-sm sm:text-base text-ink placeholder-ink-muted focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-shadow min-h-[48px]"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setIsDropdownOpen(false);
                      }}
                      aria-label="Clear search query"
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center min-w-[44px] min-h-[44px] justify-center text-ink-muted hover:text-ink transition"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>

                {/* Suggestions Dropdown */}
                {isDropdownOpen && searchQuery.trim() !== "" && (
                  <div className="absolute left-0 right-0 top-full mt-2 z-50 bg-base-card border border-surface-border rounded-xl shadow-xl overflow-hidden max-h-[360px] overflow-y-auto">
                    {suggestions.length > 0 ? (
                      <div className="py-1">
                        {suggestions.map((tool, idx) => (
                          <Link
                            key={tool.href}
                            href={tool.href}
                            onClick={() => setIsDropdownOpen(false)}
                            onMouseEnter={() => setSelectedIndex(idx)}
                            className={`flex items-center gap-3 px-4 py-3 border-b last:border-b-0 border-surface-border/50 transition-colors text-left min-h-[44px] ${
                              selectedIndex === idx
                                ? "bg-surface-muted"
                                : "hover:bg-surface-muted/50"
                            }`}
                          >
                            <ToolIcon icon={tool.icon} category={tool.category} size="sm" />
                            <div className="flex-1 min-w-0">
                              <h3 className="text-sm font-semibold text-ink truncate">
                                {tool.title}
                              </h3>
                              <p className="text-xs text-ink-muted truncate">
                                {tool.description}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="px-4 py-4 text-center text-sm text-ink-muted">
                        No tools found for &ldquo;{searchQuery}&rdquo;
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right Interactive Mini-Demo (Columns 8-12 on desktop) */}
            <div className="lg:col-span-5 w-full pt-4 lg:pt-0">
              <HeroMiniDemo />
            </div>
          </div>
        </section>
      </div>

      {/* Main Tools Container */}
      <main id="all-tools" className="max-w-5xl mx-auto px-4 pt-8 sm:pt-12 pb-0">
        {/* AdSense Placement Ad-Slot-Home-Top */}
        <AdSlot slot="home-top" className="mb-8" />

        {/* Tools Grid or Empty State */}
        {filteredTools.length > 0 ? (
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {filteredTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className={`group block bg-base-card border rounded-2xl p-5 sm:p-6 shadow-sm shadow-black/5 hover:shadow-xl hover:-translate-y-1 active:scale-[0.98] active:bg-surface-muted/60 transition-all duration-200 motion-reduce:transition-none motion-reduce:hover:transform-none ${
                  tool.popular
                    ? "border-teal-500/40 dark:border-teal-500/30 shadow-teal-500/5"
                    : "border-surface-border hover:border-teal-500/40"
                }`}
              >
                <div className="flex flex-col h-full justify-between gap-4">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="flex items-center gap-3.5">
                        <ToolIcon icon={tool.icon} category={tool.category} size="lg" />
                        <h2 className="text-base sm:text-xl font-heading font-bold text-ink group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors leading-tight">
                          {tool.title}
                        </h2>
                      </div>
                      {tool.popular && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20 flex-shrink-0">
                          <Sparkles size={10} />
                          <span>Popular</span>
                        </span>
                      )}
                    </div>
                    <p className="text-ink-muted text-xs sm:text-sm leading-relaxed">
                      {tool.description}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-teal-600 dark:text-teal-400 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0 transition-transform">
                    <span>Open Calculator</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </section>
        ) : (
          <div className="text-center py-12 sm:py-16 border border-dashed border-surface-border rounded-xl bg-base-card max-w-lg mx-auto p-6">
            <Search size={36} className="text-ink-muted mx-auto mb-3" />
            <p className="text-ink font-bold text-base sm:text-lg">No tools found</p>
            <p className="text-ink-muted text-xs sm:text-sm mt-1">
              No tools match &ldquo;{searchQuery}&rdquo;. Try a different search term.
            </p>
          </div>
        )}

        {/* AdSense Placement Ad-Slot-Home-Bottom */}
        <AdSlot slot="home-bottom" className="mt-8" />
      </main>

      {/* Footer */}
      <Footer customText="Precision science-backed online calculators for health, finance, and productivity." />
    </div>
  );
}
