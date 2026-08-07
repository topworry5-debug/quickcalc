import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { tools } from "@/lib/toolsData";
import EmbedWidgetClient from "./EmbedWidgetClient";

interface EmbedPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return tools.map((tool) => ({
    slug: tool.href.replace("/tools/", ""),
  }));
}

export async function generateMetadata({ params }: EmbedPageProps): Promise<Metadata> {
  const slug = params.slug;
  const tool = tools.find((t) => t.href === `/tools/${slug}`);

  if (!tool) {
    return {
      title: "Embed Calculator | QuickCalc",
    };
  }

  return {
    title: `Embed ${tool.title} | QuickCalc`,
    description: `Lightweight embedded version of ${tool.title}. Powered by QuickCalc.`,
    alternates: {
      canonical: `/tools/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function EmbedPage({ params }: EmbedPageProps) {
  const slug = params.slug;
  const tool = tools.find((t) => t.href === `/tools/${slug}`);

  if (!tool) {
    notFound();
  }

  return <EmbedWidgetClient tool={tool} slug={slug} />;
}
