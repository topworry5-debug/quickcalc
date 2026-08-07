"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { generateBreadcrumbSchema } from "../lib/schema";
import FavoriteButton from "./FavoriteButton";
import { recordRecentTool } from "@/lib/utils/personalization";

interface BreadcrumbsProps {
  toolName: string;
  toolSlug: string;
}

export default function Breadcrumbs({ toolName, toolSlug }: BreadcrumbsProps) {
  const toolHref = `/tools/${toolSlug}`;

  useEffect(() => {
    recordRecentTool(toolHref);
  }, [toolHref]);

  const schema = generateBreadcrumbSchema([
    { name: "Home", url: "https://quickcalc.cloud/" },
    { name: "Tools", url: "https://quickcalc.cloud/" },
    { name: toolName, url: `https://quickcalc.cloud/tools/${toolSlug}` },
  ]);

  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex items-center justify-between gap-4">
      {/* Breadcrumb JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <ol className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
        <li>
          <Link
            href="/"
            className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            Home
          </Link>
        </li>
        <li className="select-none text-zinc-300 dark:text-zinc-700 font-normal">
          {">"}
        </li>
        <li>
          <Link
            href="/"
            className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            Tools
          </Link>
        </li>
        <li className="select-none text-zinc-300 dark:text-zinc-700 font-normal">
          {">"}
        </li>
        <li className="text-zinc-800 dark:text-zinc-200 font-semibold truncate max-w-[180px] sm:max-w-none">
          {toolName}
        </li>
      </ol>

      <FavoriteButton toolHref={toolHref} showLabel size="sm" />
    </nav>
  );
}
