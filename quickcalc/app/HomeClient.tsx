"use client";

import ThemeToggle from "@/components/ThemeToggle";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import AdSlot from "@/components/AdSlot";
import Footer from "@/components/Footer";

interface Tool {
  title: string;
  description: string;
  icon: string;
  href: string;
  color: string;
  textColor: string;
}

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
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-[family-name:var(--font-geist-sans)]">
      {/* Navigation Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-zinc-900 dark:text-white">
            <span>✨ QuickCalc</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/blog" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
              Blog
            </Link>
            <div className="text-sm font-medium text-zinc-300 dark:text-zinc-700 hidden sm:block">|</div>
            <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400 hidden sm:block">
              Ultimate Calculator Suite
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-5xl mx-auto px-4 py-16 sm:py-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-6">
            Elegant, Science-Backed <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500 bg-clip-text text-transparent">Calculator Suite</span>
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            QuickCalc offers a collection of beautiful, fully featured, and highly responsive tools tailored directly for your health, finance, and educational calculation needs. Designed with precision, ease-of-use, and accessibility in mind.
          </p>
        </div>

        {/* Category Intro Section */}
        <div className="max-w-3xl mx-auto mb-12 text-center space-y-4">
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Whether you need to check a health metric, project a financial plan, or convert technical data, our <strong>free online calculators</strong> provide <strong>instant results</strong> with <strong>no sign-up required</strong>. We have carefully organized our resources into three core areas to ensure you can find what you need in seconds.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Our <strong>Health & Wellness</strong> tools empower you to monitor fitness, nutrition, and personal wellness goals with ease and precision. Our <strong>Finance & Money</strong> calculators help you analyze loan options, calculate take-home pay, and manage your savings effectively. Finally, our <strong>Productivity & Education</strong> converters and meeting planners streamline your daily study, work, and developmental tasks.
          </p>
        </div>

        {/* Dynamic Search Bar Container */}
        <div ref={searchContainerRef} className="relative max-w-md mx-auto mb-12">
          <label htmlFor="tool-search" className="sr-only">
            Search tools
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-zinc-400 pointer-events-none">
              🔍
            </span>
            <input
              id="tool-search"
              type="text"
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
              placeholder="Search tools... (e.g. BMI, tax, password)"
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent shadow-sm transition"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setIsDropdownOpen(false);
                }}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs font-semibold text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition"
              >
                Clear
              </button>
            )}
          </div>

          {/* Suggestions Dropdown */}
          {isDropdownOpen && searchQuery.trim() !== "" && (
            <div className="absolute left-0 right-0 top-full mt-2 z-50 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-lg overflow-hidden max-h-[400px] overflow-y-auto">
              {suggestions.length > 0 ? (
                <div className="py-1">
                  {suggestions.map((tool, idx) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      onClick={() => setIsDropdownOpen(false)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex items-center gap-3 px-4 py-3 border-b last:border-b-0 border-zinc-100 dark:border-zinc-800/50 transition-colors text-left ${
                        selectedIndex === idx
                          ? "bg-zinc-50 dark:bg-zinc-800/60"
                          : "hover:bg-zinc-50 dark:hover:bg-zinc-800/30"
                      }`}
                    >
                      <div className={`flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-r ${tool.color} flex items-center justify-center text-xl text-white shadow-inner`}>
                        {tool.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-zinc-900 dark:text-white truncate">
                          {tool.title}
                        </h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                          {tool.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="px-4 py-4 text-center text-sm text-zinc-500 dark:text-zinc-400">
                  No tools found for &ldquo;{searchQuery}&rdquo;
                </div>
              )}
            </div>
          )}
        </div>

        {/* AdSense Placement Ad-Slot-Home-Top */}
        <div className="mb-12">
          <AdSlot slot="home-top" />
        </div>

        {/* Tools Grid or Empty State */}
        {filteredTools.length > 0 ? (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group block bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div className="p-6 sm:p-8 flex flex-col h-full justify-between">
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${tool.color} flex items-center justify-center text-2xl text-white shadow-inner`}>
                        {tool.icon}
                      </div>
                      <h2 className="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-zinc-950 dark:group-hover:text-zinc-200 transition-colors">
                        {tool.title}
                      </h2>
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6">
                      {tool.description}
                    </p>
                  </div>
                  <div className={`inline-flex items-center gap-2 text-sm font-semibold ${tool.textColor} group-hover:underline`}>
                    Open Calculator &rarr;
                  </div>
                </div>
              </Link>
            ))}
          </section>
        ) : (
          <div className="text-center py-16 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-900/50 max-w-lg mx-auto">
            <span className="text-4xl mb-4 block">🔍</span>
            <p className="text-zinc-800 dark:text-zinc-200 font-bold text-lg">No tools found</p>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
              No tools match &ldquo;{searchQuery}&rdquo;. Try a different search term.
            </p>
          </div>
        )}

        {/* AdSense Placement Ad-Slot-Home-Bottom */}
        <div className="mt-16">
          <AdSlot slot="home-bottom" />
        </div>
      </main>

      {/* Footer */}
      <Footer customText="Elegant, science-backed lifestyle modeling solutions." />
    </div>
  );
}
