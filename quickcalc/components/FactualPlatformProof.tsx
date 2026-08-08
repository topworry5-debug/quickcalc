"use client";

import React from "react";
import { ShieldCheck, Cpu, Code2, BookOpenCheck } from "lucide-react";

export default function FactualPlatformProof() {
  const stats = [
    {
      icon: Cpu,
      value: "31+",
      label: "Precision Calculators",
      subtext: "Across Health, Finance, Utility & Planning",
    },
    {
      icon: ShieldCheck,
      value: "100%",
      label: "Client-Side Private",
      subtext: "0% server data logging across all tools",
    },
    {
      icon: Code2,
      value: "5",
      label: "Public REST APIs",
      subtext: "CORS-enabled endpoints for developers",
    },
    {
      icon: BookOpenCheck,
      value: "100%",
      label: "Cited Formulas",
      subtext: "Published WHO & financial standards",
    },
  ];

  return (
    <section className="w-full my-12 pt-8 border-t border-surface-border">
      <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-ink tracking-tight">
            Platform Metrics & Verification
          </h2>
          <p className="text-xs sm:text-sm text-ink-muted max-w-xl mx-auto">
            QuickCalc is engineered for speed, mathematical exactness, and strict user privacy.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((s) => {
            const IconComp = s.icon;
            return (
              <div
                key={s.label}
                className="bg-base-card border border-surface-border rounded-2xl p-4 text-center shadow-sm space-y-1.5"
              >
                <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center mx-auto mb-2">
                  <IconComp size={18} />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
                  {s.value}
                </div>
                <div className="text-xs font-bold text-ink">
                  {s.label}
                </div>
                <div className="text-[11px] text-ink-muted">
                  {s.subtext}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
