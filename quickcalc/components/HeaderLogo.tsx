"use client";

import Link from "next/link";
import { Calculator } from "lucide-react";

export default function HeaderLogo() {
  return (
    <Link href="/" className="flex items-center gap-2 font-extrabold text-lg text-ink hover:opacity-90 transition-opacity">
      <div className="w-7 h-7 rounded-lg bg-teal-500/10 dark:bg-teal-500/20 border border-teal-500/20 flex items-center justify-center text-teal-600 dark:text-teal-400 shadow-sm">
        <Calculator size={16} strokeWidth={2.5} />
      </div>
      <span className="font-heading tracking-tight font-extrabold text-lg">Quick<span className="text-teal-600 dark:text-teal-400">Calc</span></span>
    </Link>
  );
}
