"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToolIcon from "@/components/ToolIcon";
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

  // Filter articles based on selected category & search query
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

  // Exclude featured article from standard grid if viewing "All" with no search query
  const gridArticles = useMemo(() => {
    if (selectedCategory === "All" && searchQuery.trim() === "" && featuredArticle) {
      return filteredArticles.filter((a) => a.slug !== featuredArticle.slug);
    }
    return filteredArticles;
  }, [filteredArticles, selectedCategory, searchQuery, featuredArticle]);

  return (
    <div className="min-h-screen bg-base text-ink font-sans transition-colors flex flex-col justify-between">
      <div>
        {/* Top Header Navigation */}
        <Navbar />

        {/* Main Container */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-16 w-full flex-grow">
          {/* Hero Header Section */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20">
              <BookOpen size={14} />
              <span>Guides & Science Deep Dives</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-ink tracking-tight">
              QuickCalc Insights Hub
            </h1>
            <p className="text-ink-muted text-base sm:text-lg leading-relaxed font-medium">
              Clear, well-researched math breakdowns, clinical models, and financial strategies behind everyday calculation formulas.
            </p>

            {/* Client-Side Search Bar */}
            <div className="relative max-w-md mx-auto mt-6">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none"
              />
              <input
                type="text"
                placeholder="Search articles by title, formula, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-10 py-3 rounded-2xl bg-base-card border border-surface-border text-ink placeholder-ink-muted text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500 shadow-sm transition-all min-h-[44px]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-ink-muted hover:text-ink rounded-lg"
                  title="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Tabs / Pills */}
          <div className="mb-10 overflow-x-auto pb-2 scrollbar-none">
            <div className="flex items-center gap-2 min-w-max justify-start sm:justify-center px-1">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all min-h-[44px] ${
                      isActive
                        ? "bg-teal-600 text-white shadow-md shadow-teal-500/20 scale-105"
                        : "bg-base-card text-ink-muted hover:text-ink border border-surface-border hover:border-teal-500/30"
                    }`}
                  >
                    {cat !== "All" && categoryIcons[cat]}
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* FEATURED POST HERO CARD (Rendered on 'All' tab with no active search) */}
          {selectedCategory === "All" && searchQuery.trim() === "" && featuredArticle && (
            <div className="mb-12">
              <Link
                href={`/blog/${featuredArticle.slug}`}
                className="group block bg-base-card border border-surface-border hover:border-teal-500/50 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg shadow-black/5 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
              >
                {/* Background Subtle Accent Gradient */}
                <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                  <div className="space-y-4 max-w-3xl">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20">
                        <Sparkles size={13} />
                        <span>Featured Guide</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-surface-muted text-ink-muted border border-surface-border">
                        {categoryIcons[featuredArticle.category]}
                        <span>{featuredArticle.category}</span>
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-ink group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors leading-tight">
                      {featuredArticle.title}
                    </h2>

                    <p className="text-ink-muted text-sm sm:text-base leading-relaxed line-clamp-3 font-medium">
                      {featuredArticle.excerpt}
                    </p>

                    <div className="flex items-center gap-4 text-xs font-semibold text-ink-muted pt-2">
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
                    <ToolIcon icon={featuredArticle.icon} category={featuredArticle.category} size="lg" />
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
                      <ToolIcon icon={article.icon} category={article.category} size="sm" />
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
