"use client";

import React from "react";
import { ShieldCheck, Zap, EyeOff, BookOpen } from "lucide-react";

export default function TrustDifferentiationBar() {
  const callouts = [
    {
      icon: ShieldCheck,
      color: "text-teal-600 dark:text-teal-400 bg-teal-500/10 border-teal-500/20",
      title: "100% Client-Side & Private",
      description: "Calculations execute locally in your browser — zero data sent to any server.",
    },
    {
      icon: Zap,
      color: "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20",
      title: "Instant Results, No Sign-Up",
      description: "No accounts, no paywalls, no email capture. Open any tool and compute immediately.",
    },
    {
      icon: EyeOff,
      color: "text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
      title: "Clean & Distraction-Free",
      description: "No pop-ups, forced video ads, or annoying click-traps obscuring your output.",
    },
    {
      icon: BookOpen,
      color: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      title: "Verifiable Formulas",
      description: "Built on published WHO, clinical, and financial amortization standards.",
    },
  ];

  return (
    <section className="w-full mb-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {callouts.map((c) => {
          const IconComp = c.icon;
          return (
            <div
              key={c.title}
              className="bg-base-card border border-surface-border rounded-2xl p-4 sm:p-5 shadow-sm hover:border-teal-500/30 hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${c.color}`}>
                  <IconComp size={20} strokeWidth={2.2} />
                </div>
                <div>
                  <h3 className="text-sm font-heading font-extrabold text-ink tracking-tight group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-xs text-ink-muted leading-relaxed mt-1">
                    {c.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
