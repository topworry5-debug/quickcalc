import React from "react";
import Link from "next/link";

interface BreadcrumbsProps {
  toolName: string;
  toolSlug: string;
}

export default function Breadcrumbs({ toolName, toolSlug }: BreadcrumbsProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://quickcalc.cloud"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Tools",
        "item": "https://quickcalc.cloud"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": toolName,
        "item": `https://quickcalc.cloud/tools/${toolSlug}`
      }
    ]
  };

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
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
        <li className="text-zinc-800 dark:text-zinc-200 font-semibold truncate max-w-[200px] sm:max-w-none">
          {toolName}
        </li>
      </ol>
    </nav>
  );
}
