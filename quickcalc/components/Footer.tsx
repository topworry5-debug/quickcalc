"use client";

import React from "react";
import Link from "next/link";

interface FooterProps {
  customText?: string;
}

export default function Footer({ customText }: FooterProps) {
  const defaultText = "Elegant, science-backed lifestyle modeling solutions.";
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 mt-24 py-12 bg-white dark:bg-zinc-900 text-center text-xs text-zinc-500 dark:text-zinc-500">
      <div className="max-w-5xl mx-auto px-4 space-y-4">
        <p className="font-medium text-zinc-700 dark:text-zinc-400">✨ QuickCalc Suite</p>
        
        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-zinc-600 dark:text-zinc-400 font-medium">
          <Link href="/about" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
            About
          </Link>
          <Link href="/privacy-policy" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
            Terms of Use
          </Link>
          <Link href="/contact" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
            Contact
          </Link>
        </div>

        <p>&copy; {new Date().getFullYear()} QuickCalc. All rights reserved. {customText || defaultText}</p>
      </div>
    </footer>
  );
}
