import React from "react";
import Link from "next/link";
import { tools, Tool } from "@/lib/toolsData";
import ToolIcon from "@/components/ToolIcon";
import { ArrowRight } from "lucide-react";

interface RelatedToolsProps {
  currentSlug: string;
}

export default function RelatedTools({ currentSlug }: RelatedToolsProps) {
  // Find current tool
  const currentTool = tools.find(
    (t) => t.href === `/tools/${currentSlug}` || t.href.endsWith(currentSlug)
  );

  if (!currentTool) return null;

  // Custom relationship logic including overlap for Currency Converter
  const isRelated = (toolA: Tool, toolB: Tool): boolean => {
    if (toolA.href === toolB.href) return false;

    // Direct category match
    if (toolA.category === toolB.category) return true;

    // Cross-matching for Currency Converter (belongs to both Finance and Converter categories)
    const isFinA = toolA.category === "Finance" || toolA.href === "/tools/currency-converter";
    const isFinB = toolB.category === "Finance" || toolB.href === "/tools/currency-converter";
    if (isFinA && isFinB) return true;

    const isConvA = toolA.category === "Converter" || toolA.href === "/tools/currency-converter";
    const isConvB = toolB.category === "Converter" || toolB.href === "/tools/currency-converter";
    if (isConvA && isConvB) return true;

    return false;
  };

  // 1. Get primary related tools
  const relatedCandidates = tools.filter((t) => isRelated(currentTool, t));

  // 2. Select 3-4 other tools. Let's aim for 4 if possible, or at least 3.
  const selected: Tool[] = [];
  relatedCandidates.forEach((t) => {
    if (selected.length < 4) {
      selected.push(t);
    }
  });

  // 3. Fallback to popular high-traffic tools if fewer than 3 matches
  const popularFallbackHrefs = [
    "/tools/loan-calculator",
    "/tools/bmi-calculator",
    "/tools/gpa-converter",
    "/tools/water-intake-calculator",
  ];

  if (selected.length < 3) {
    for (const href of popularFallbackHrefs) {
      if (selected.length >= 3) break;
      const fallbackTool = tools.find((t) => t.href === href);
      if (
        fallbackTool &&
        fallbackTool.href !== currentTool.href &&
        !selected.some((s) => s.href === fallbackTool.href)
      ) {
        selected.push(fallbackTool);
      }
    }
  }

  return (
    <section className="max-w-4xl mx-auto border-t border-surface-border mt-16 pt-12">
      <h2 className="text-2xl font-heading font-bold text-ink mb-6">
        You Might Also Like
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {selected.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group block border border-surface-border bg-base-card p-4 sm:p-5 rounded-xl shadow-sm hover:shadow-md hover:border-teal-500/40 transition duration-200"
          >
            <div className="flex items-center gap-3 mb-3">
              <ToolIcon icon={tool.icon} category={tool.category} size="sm" />
              <h3 className="font-heading font-bold text-ink text-sm sm:text-base group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors truncate">
                {tool.title}
              </h3>
            </div>
            <p className="text-xs text-ink-muted leading-relaxed line-clamp-2 mb-3">
              {tool.description}
            </p>
            <div className="inline-flex items-center gap-1 text-xs font-semibold text-teal-600 dark:text-teal-400 group-hover:translate-x-0.5 transition-transform">
              <span>Open Tool</span>
              <ArrowRight size={12} />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
