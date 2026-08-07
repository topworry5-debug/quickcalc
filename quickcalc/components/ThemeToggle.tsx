"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("theme");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (saved === "dark" || (!saved && systemDark)) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  };

  if (!mounted) {
    return <div className="w-10 h-10 rounded-xl border border-surface-border bg-base-card" />;
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className="relative p-2 rounded-xl transition-all duration-200 bg-base-card hover:bg-surface-muted active:scale-90 text-ink focus:outline-none flex items-center justify-center w-10 h-10 shadow-sm border border-surface-border overflow-hidden"
    >
      <div
        className={`transition-all duration-300 transform ${
          theme === "dark" ? "rotate-90 scale-0 opacity-0 absolute" : "rotate-0 scale-100 opacity-100"
        }`}
      >
        <Moon size={18} className="text-indigo-600 dark:text-indigo-400" />
      </div>
      <div
        className={`transition-all duration-300 transform ${
          theme === "light" ? "-rotate-90 scale-0 opacity-0 absolute" : "rotate-0 scale-100 opacity-100"
        }`}
      >
        <Sun size={18} className="text-amber-500" />
      </div>
    </button>
  );
}
