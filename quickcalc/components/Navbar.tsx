"use client";

import React, { useState } from "react";
import Link from "next/link";
import HeaderLogo from "@/components/HeaderLogo";
import ThemeToggle from "@/components/ThemeToggle";
import CommandPalette from "@/components/CommandPalette";
import { Menu, X, Sparkles, BookOpen, Info, ShieldCheck, Mail, FileText, Search } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <>
      <header className="border-b border-surface-border bg-base-card/90 backdrop-blur-md sticky top-0 z-40 transition-colors">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <HeaderLogo />

          {/* Desktop Navigation Links & Search Trigger */}
          <nav className="hidden sm:flex items-center gap-4">
            {/* Command Palette Trigger Button */}
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              aria-label="Open search command palette (Cmd+K)"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-muted/80 hover:bg-surface-border/60 text-ink-muted hover:text-ink border border-surface-border text-xs font-semibold transition active:scale-95 min-h-[40px]"
            >
              <Search size={14} className="text-teal-600 dark:text-teal-400" />
              <span>Search...</span>
              <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-base-card border border-surface-border text-[10px] font-mono text-ink-muted font-bold">
                <span className="text-[9px]">⌘</span>K
              </kbd>
            </button>

            <Link
              href="/blog"
              className="text-sm font-medium text-ink-muted hover:text-ink transition-colors"
            >
              Blog
            </Link>
            <div className="text-sm font-medium text-surface-border">|</div>
            <div className="text-sm font-medium text-ink-muted flex items-center gap-1.5">
              <Sparkles size={14} className="text-teal-600 dark:text-teal-400" />
              <span>Ultimate Calculator Suite</span>
            </div>
            <ThemeToggle />
          </nav>

          {/* Mobile Nav Right (Search + ThemeToggle + Hamburger Menu Button) */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              aria-label="Open search overlay"
              className="flex items-center justify-center w-11 h-11 rounded-xl bg-surface-muted/60 text-ink hover:bg-surface-muted transition-colors min-h-[44px] min-w-[44px]"
            >
              <Search size={18} />
            </button>
            <ThemeToggle />
            <button
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
              className="flex items-center justify-center w-11 h-11 rounded-xl bg-surface-muted/60 text-ink hover:bg-surface-muted transition-colors min-h-[44px] min-w-[44px]"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Slide-in / Dropdown Drawer */}
        {isMobileMenuOpen && (
          <div className="sm:hidden border-t border-surface-border bg-base-card px-4 py-4 shadow-xl space-y-1 animate-fade-in motion-reduce:animate-none">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsCommandPaletteOpen(true);
              }}
              className="w-full flex items-center justify-between px-3 py-3 rounded-xl bg-surface-muted/80 border border-surface-border text-base font-semibold text-ink transition-colors min-h-[48px] mb-2"
            >
              <span className="flex items-center gap-3">
                <Search size={18} className="text-teal-600 dark:text-teal-400" />
                <span>Search Everything...</span>
              </span>
              <kbd className="px-2 py-0.5 rounded bg-base-card text-xs font-mono border border-surface-border text-ink-muted">⌘K</kbd>
            </button>
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-3 rounded-xl text-base font-semibold text-ink hover:bg-surface-muted transition-colors min-h-[48px]"
            >
              <Sparkles size={18} className="text-teal-600 dark:text-teal-400" />
              <span>All Calculators</span>
            </Link>
            <Link
              href="/blog"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-3 rounded-xl text-base font-semibold text-ink hover:bg-surface-muted transition-colors min-h-[48px]"
            >
              <BookOpen size={18} className="text-teal-600 dark:text-teal-400" />
              <span>Blog Articles</span>
            </Link>
            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-3 rounded-xl text-base font-semibold text-ink hover:bg-surface-muted transition-colors min-h-[48px]"
            >
              <Info size={18} className="text-teal-600 dark:text-teal-400" />
              <span>About QuickCalc</span>
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-3 rounded-xl text-base font-semibold text-ink hover:bg-surface-muted transition-colors min-h-[48px]"
            >
              <Mail size={18} className="text-teal-600 dark:text-teal-400" />
              <span>Contact Us</span>
            </Link>
            <Link
              href="/privacy-policy"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-3 rounded-xl text-base font-semibold text-ink hover:bg-surface-muted transition-colors min-h-[48px]"
            >
              <ShieldCheck size={18} className="text-teal-600 dark:text-teal-400" />
              <span>Privacy Policy</span>
            </Link>
            <Link
              href="/terms"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-3 rounded-xl text-base font-semibold text-ink hover:bg-surface-muted transition-colors min-h-[48px]"
            >
              <FileText size={18} className="text-teal-600 dark:text-teal-400" />
              <span>Terms of Service</span>
            </Link>
          </div>
        )}
      </header>

      {/* Global Command Palette Modal Component */}
      <CommandPalette isOpen={isCommandPaletteOpen} setIsOpen={setIsCommandPaletteOpen} />
    </>
  );
}
