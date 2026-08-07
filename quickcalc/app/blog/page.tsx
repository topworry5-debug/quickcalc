import type { Metadata } from "next";
import BlogClient from "./BlogClient";
import { articles } from "./articlesData";

export const metadata: Metadata = {
  title: "Insights Blog - Practical Guides, Science & Math Behind Tools | QuickCalc",
  description: "Explore in-depth, well-researched articles exploring health modeling, physical fitness metrics, cryptographic security, password entropy, and global timezone mechanics.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogListingPage() {
  return <BlogClient articles={articles} />;
}
