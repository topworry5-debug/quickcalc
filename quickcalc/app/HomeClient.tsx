"use client";

import Navbar from "@/components/Navbar";
import ToolIcon from "@/components/ToolIcon";
import HeroMiniDemo from "@/components/HeroMiniDemo";
import TrustDifferentiationBar from "@/components/TrustDifferentiationBar";
import FactualPlatformProof from "@/components/FactualPlatformProof";
import ScrollReveal from "@/components/ScrollReveal";
import RecentlyUsedBar from "@/components/RecentlyUsedBar";
import FavoriteButton from "@/components/FavoriteButton";
import { usePersonalization } from "@/hooks/usePersonalization";
import { Search, ArrowRight, X, Sparkles, Star } from "lucide-react";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import AdSlot from "@/components/AdSlot";
import Footer from "@/components/Footer";
import { Tool } from "@/lib/toolsData";

interface HomeClientProps {
  initialTools: Tool[];
}

export default function HomeClient({ initialTools }: HomeClientProps) {
  const searchParams = useSearchParams();
  const { isMounted, favoriteHrefs } = usePersonalization();

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Sync search query from URL params if present (e.g., /?q=bmi)
  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      setSearchQuery(q);
    }
  }, [searchParams]);

  // Handle clicking outside the search dropdown to close it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const baseCategories = [
    "All",
    "Health",
    "Finance",
    "Converter",
    "Utility/Dev",
    "Planning",
  ];

  // Include "Favorites" option if user has favorited any tools
  const categories =
    isMounted && favoriteHrefs.length > 0
      ? ["All", "Favorites", ...baseCategories.slice(1)]
      : baseCategories;

  // Filter tools based on category & search query
  const filteredTools = initialTools.filter((tool) => {
    const matchesCategory =
      selectedCategory === "All"
        ? true
        : selectedCategory === "Favorites"
        ? favoriteHrefs.includes(tool.href)
        : tool.category === selectedCategory;

    const matchesSearch =
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Search dropdown quick results (max 5)
  const quickSearchResults = searchQuery.trim()
    ? initialTools
        .filter(
          (tool) =>
            tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tool.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5)
    : [];

  return (
    <div className="min-h-screen bg-base text-ink font-sans transition-colors flex flex-col justify-between">
      <div>
        {/* Navigation Header */}
        <Navbar />

        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-surface-border bg-graph-paper pt-12 sm:pt-16 pb-14 sm:pb-20">
          <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content Column (Columns 1-7 on desktop) */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20">
                <Sparkles size={14} className="animate-pulse" />
                <span>31+ Precision Utility Calculators</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-ink tracking-tight leading-[1.1]">
                Everyday Calculations,{" "}
                <span className="text-teal-600 dark:text-teal-400">
                  Perfected.
                </span>
              </h1>

              <p className="text-base sm:text-xl text-ink-muted leading-relaxed font-normal max-w-2xl mx-auto lg:mx-0">
                Instantly compute clinical health metrics, compound financial projections, and unit conversions. Built for extreme precision and total privacy.
              </p>

              {/* Mobile-First Search Input Bar with Dropdown Quick-Results */}
              <div ref={searchContainerRef} className="relative max-w-xl mx-auto lg:mx-0 pt-2">
                <div className="relative flex items-center">
                  <Search
                    size={20}
                    className="absolute left-4 text-ink-muted pointer-events-none"
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setIsSearchFocused(true);
                    }}
                    onFocus={() => setIsSearchFocused(true)}
                    placeholder="Search any calculator (e.g. BMI, Loan, Regex, Salary)..."
                    aria-label="Search calculators"
                    className="w-full h-12 sm:h-14 pl-12 pr-10 rounded-2xl bg-base-card border border-surface-border text-ink text-sm sm:text-base placeholder:text-ink-muted focus:outline-none focus:border-teal-500/80 focus:ring-2 focus:ring-teal-500/20 shadow-md transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setIsSearchFocused(false);
                      }}
                      className="absolute right-3.5 p-1 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-muted transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                      aria-label="Clear search"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>

                {/* Instant Quick-Search Dropdown Menu */}
                {isSearchFocused && searchQuery.trim().length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-base-card border border-surface-border rounded-2xl shadow-2xl z-50 overflow-hidden animate-fade-in">
                    {quickSearchResults.length > 0 ? (
                      <div className="py-2 divide-y divide-surface-border/60">
                        {quickSearchResults.map((tool) => (
                          <Link
                            key={tool.href}
                            href={tool.href}
                            onClick={() => setIsSearchFocused(false)}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-surface-muted transition-colors text-left group min-h-[44px]"
                          >
                            <ToolIcon icon={tool.icon} category={tool.category} size="sm" />
                            <div className="flex-1 min-w-0">
                              <h3 className="text-sm font-semibold text-ink truncate group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                                {tool.title}
                              </h3>
                              <p className="text-xs text-ink-muted truncate">
                                {tool.description}
                              </p>
                            </div>
                            <ArrowRight size={14} className="text-ink-muted group-hover:translate-x-1 transition-transform" />
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

            {/* Right Interactive Mini-Demo */}
            <div className="lg:col-span-5 w-full pt-4 lg:pt-0">
              <HeroMiniDemo />
            </div>
          </div>
        </section>
      </div>

      {/* Main Tools Container */}
      <main id="all-tools" className="max-w-5xl mx-auto px-4 pt-8 sm:pt-12 pb-0 w-full">
        {/* Confident Differentiation Trust Stat-Cards */}
        <TrustDifferentiationBar />

        {/* Lightweight Personalization Recently Used Row */}
        <RecentlyUsedBar />

        {/* Category Filter Pills */}
        <div className="mb-8 flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            const isFavTab = cat === "Favorites";
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all min-h-[44px] active:scale-95 ${
                  isActive
                    ? isFavTab
                      ? "bg-amber-500 text-white shadow-md shadow-amber-500/20 scale-105"
                      : "bg-teal-600 text-white shadow-md shadow-teal-500/20 scale-105"
                    : isFavTab
                    ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 hover:bg-amber-500/20"
                    : "bg-base-card text-ink-muted hover:text-ink border border-surface-border hover:border-teal-500/30"
                }`}
              >
                {isFavTab && <Star size={14} className="fill-current" />}
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* AdSense Placement Ad-Slot-Home-Top */}
        <AdSlot slot="home-top" className="mb-8" />

        {/* Tools Grid or Empty State */}
        {filteredTools.length > 0 ? (
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {filteredTools.map((tool, index) => (
              <ScrollReveal key={tool.href} delayMs={(index % 4) * 60}>
                <Link
                  href={tool.href}
                  className={`group relative block bg-base-card border rounded-2xl p-5 sm:p-6 shadow-sm shadow-black/5 hover:shadow-xl hover:-translate-y-1 active:scale-[0.98] active:bg-surface-muted/60 transition-all duration-200 ${
                    tool.popular
                      ? "border-teal-500/40 dark:border-teal-500/30 shadow-teal-500/5"
                      : "border-surface-border hover:border-teal-500/40"
                  }`}
                >
                  <div className="flex flex-col h-full justify-between gap-4">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="flex items-center gap-3.5 min-w-0 pr-2">
                          <ToolIcon icon={tool.icon} category={tool.category} size="lg" />
                          <h2 className="text-base sm:text-xl font-heading font-bold text-ink group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors leading-tight truncate">
                            {tool.title}
                          </h2>
                        </div>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          {tool.popular && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20">
                              Popular
                            </span>
                          )}
                          <FavoriteButton toolHref={tool.href} />
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-ink-muted leading-relaxed line-clamp-2">
                        {tool.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-surface-border/60 text-xs font-semibold text-ink-muted group-hover:text-teal-600 dark:group-hover:text-teal-400">
                      <span className="uppercase tracking-wider text-[10px] font-extrabold">{tool.category}</span>
                      <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>Open Tool</span>
                        <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </section>
        ) : (
          <div className="text-center py-12 sm:py-16 border border-dashed border-surface-border rounded-2xl bg-base-card max-w-lg mx-auto p-6">
            <Search size={36} className="text-ink-muted mx-auto mb-3" />
            <p className="text-ink font-bold text-base sm:text-lg">No calculators found</p>
            <p className="text-ink-muted text-xs sm:text-sm mt-1">
              {selectedCategory === "Favorites"
                ? "You haven't added any favorite calculators yet. Click the star icon on any tool to save it here!"
                : `No tools match "${searchQuery}" in ${selectedCategory}. Try searching for another keyword or clearing your filter.`}
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-teal-600 text-white font-bold text-xs shadow-sm hover:bg-teal-700 transition"
            >
              Reset Search & Filters
            </button>
          </div>
        )}

        {/* Factual Platform Metrics & Proof */}
        <FactualPlatformProof />
      </main>

      {/* Footer Component */}
      <Footer customText="Precision science-backed online calculators for health, finance, and productivity." />
    </div>
  );
}
