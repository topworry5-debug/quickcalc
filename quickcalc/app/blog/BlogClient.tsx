"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Article, articles as defaultArticles } from "./articlesData";
import {
  Sparkles,
  Search,
  X,
  ArrowRight,
  Clock,
  BookOpen,
  TrendingUp,
  HeartPulse,
  Code2,
  ShieldCheck,
  Calendar,
  Layers,
} from "lucide-react";

interface BlogClientProps {
  articles: Article[];
}

const categoryIcons: Record<string, React.ReactNode> = {
  "Finance & Math": <TrendingUp size={14} />,
  "Health & Fitness": <HeartPulse size={14} />,
  "Utility & Programming": <Code2 size={14} />,
  "Security": <ShieldCheck size={14} />,
  "Time & Productivity": <Calendar size={14} />,
  "Utility & Shopping": <Layers size={14} />,
  "Life & Math": <Sparkles size={14} />,
};

export default function BlogClient({ articles: initialArticles }: BlogClientProps) {
  const allArticles = initialArticles || defaultArticles;
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set(allArticles.map((a) => a.category));
    return ["All", ...Array.from(set).sort()];
  }, [allArticles]);

  // Identify featured article (first article with featured: true, or first article in array)
  const featuredArticle = useMemo(() => {
    return allArticles.find((a) => a.featured) || allArticles[0];
  }, [allArticles]);

  // Filter remaining articles
  const filteredArticles = useMemo(() => {
    return allArticles.filter((article) => {
      const matchesCategory =
        selectedCategory === "All" || article.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [allArticles, selectedCategory, searchQuery]);

  // Non-featured articles for grid layout when on "All" view with no active search
  const gridArticles = useMemo(() => {
    if (selectedCategory === "All" && searchQuery.trim() === "" && featuredArticle) {
      return filteredArticles.filter((a) => a.slug !== featuredArticle.slug);
    }
    return filteredArticles;
  }, [filteredArticles, selectedCategory, searchQuery, featuredArticle]);

  const showFeaturedHero =
    selectedCategory === "All" && searchQuery.trim() === "" && featuredArticle;

  return (
    <div className="min-h-screen bg-base text-ink font-sans transition-colors flex flex-col justify-between">
      <div>
        {/* Navigation Header */}
        <Navbar />

        {/* Hero Section & Controls */}
        <main className="max-w-5xl mx-auto px-4 pt-10 sm:pt-14 pb-4">
          {/* Header Title */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20 mb-4">
              <BookOpen size={13} />
              <span>QuickCalc Insights & Guides</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-ink tracking-tight leading-tight">
              Engineering & Science Behind{" "}
              <span className="text-teal-600 dark:text-teal-400">Everyday Math</span>
            </h1>
            <p className="text-ink-muted text-sm sm:text-lg leading-relaxed mt-4">
              In-depth research, scientific formulas, and practical breakdowns of our primary calculators.
            </p>

            {/* Search Input Bar */}
            <div className="mt-8 max-w-xl mx-auto relative">
              <div className="relative flex items-center">
                <Search
                  size={18}
                  className="absolute left-4 text-ink-muted pointer-events-none"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles by title or topic..."
                  className="w-full h-12 pl-11 pr-10 rounded-2xl bg-base-card border border-surface-border text-ink text-sm sm:text-base placeholder:text-ink-muted focus:outline-none focus:border-teal-500/80 focus:ring-2 focus:ring-teal-500/20 shadow-sm transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3.5 p-1 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-muted transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
                    aria-label="Clear search"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Pills (Mobile-First Scrollable Row) */}
            <div className="mt-6 flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all min-h-[44px] ${
                      isActive
                        ? "bg-teal-600 text-white border border-teal-600 shadow-md shadow-teal-500/20"
                        : "bg-base-card text-ink-muted border border-surface-border hover:border-teal-500/40 hover:text-ink"
                    }`}
                  >
                    {cat !== "All" && categoryIcons[cat]}
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* FEATURED POST HERO CARD */}
          {showFeaturedHero && (
            <div className="mb-10">
              <Link
                href={`/blog/${featuredArticle.slug}`}
                className="group block bg-base-card border border-teal-500/40 dark:border-teal-500/30 rounded-3xl p-6 sm:p-8 shadow-lg shadow-teal-500/5 hover:shadow-2xl hover:-translate-y-1 transition-all duration-200"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  {/* Left Column: Icon Badge & Content */}
                  <div className="space-y-4 flex-grow max-w-3xl">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20">
                        <Sparkles size={12} />
                        <span>Featured Guide</span>
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-surface-muted/60 text-ink-muted border border-surface-border">
                        {categoryIcons[featuredArticle.category]}
                        <span>{featuredArticle.category}</span>
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-ink group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors leading-tight">
                      {featuredArticle.title}
                    </h2>

                    <p className="text-ink-muted text-sm sm:text-base leading-relaxed">
                      {featuredArticle.excerpt}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-medium text-ink-muted pt-2">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} className="text-teal-600 dark:text-teal-400" />
                        <span>{featuredArticle.date}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} className="text-teal-600 dark:text-teal-400" />
                        <span>{featuredArticle.readTime}</span>
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Icon & Action */}
                  <div className="flex md:flex-col items-center md:items-end justify-between shrink-0 gap-4 pt-4 md:pt-0 border-t md:border-t-0 border-surface-border">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-teal-500/10 dark:bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-3xl sm:text-4xl shadow-inner">
                      {featuredArticle.icon}
                    </div>
                    <div className="inline-flex items-center gap-1.5 text-sm font-bold text-teal-600 dark:text-teal-400 group-hover:translate-x-1.5 transition-transform">
                      <span>Read Featured Guide</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* ARTICLES CARD GRID (1 col mobile, 2 col tablet, 3 col desktop) */}
          {gridArticles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {gridArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="group flex flex-col justify-between bg-base-card border border-surface-border hover:border-teal-500/40 rounded-2xl p-5 sm:p-6 shadow-sm shadow-black/5 hover:shadow-xl hover:-translate-y-1 active:scale-[0.98] active:bg-surface-muted/60 transition-all duration-200"
                >
                  <div className="space-y-3">
                    {/* Header Row: Category Badge + Icon */}
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-surface-muted/80 text-ink-muted border border-surface-border">
                        {categoryIcons[article.category]}
                        <span>{article.category}</span>
                      </span>
                      <span className="text-2xl">{article.icon}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-heading font-bold text-ink group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors leading-snug line-clamp-2">
                      {article.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-ink-muted text-xs sm:text-sm leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>

                  {/* Card Bottom Meta & CTA */}
                  <div className="mt-5 pt-4 border-t border-surface-border/60 flex items-center justify-between text-xs font-medium text-ink-muted">
                    <span className="flex items-center gap-1 text-ink-muted">
                      <Clock size={12} />
                      <span>{article.readTime}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 font-bold text-teal-600 dark:text-teal-400 group-hover:translate-x-1 transition-transform">
                      <span>Read</span>
                      <ArrowRight size={13} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-12 sm:py-16 border border-dashed border-surface-border rounded-2xl bg-base-card max-w-lg mx-auto p-6 mt-6">
              <Search size={36} className="text-ink-muted mx-auto mb-3" />
              <p className="text-ink font-bold text-base sm:text-lg">No articles found</p>
              <p className="text-ink-muted text-xs sm:text-sm mt-1">
                No guides match &ldquo;{searchQuery}&rdquo; in {selectedCategory}. Try resetting your search or category filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-teal-600 text-white hover:bg-teal-700 transition-colors min-h-[44px]"
              >
                Reset Filters
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Shared Footer */}
      <Footer customText="Practical science breakdowns, mathematical modeling, and practical engineering guides." />
    </div>
  );
}
