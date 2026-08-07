import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToolIcon from "@/components/ToolIcon";
import ScrollReveal from "@/components/ScrollReveal";
import { categoriesData } from "../categoryData";
import { tools } from "@/lib/toolsData";
import { articles } from "@/app/blog/articlesData";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, Calculator, BookOpen, ChevronLeft } from "lucide-react";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return categoriesData.map((cat) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = categoriesData.find((c) => c.slug === params.slug);

  if (!category) {
    return {
      title: "Category Not Found | QuickCalc",
    };
  }

  return {
    title: category.seoTitle,
    description: category.metaDescription,
    alternates: {
      canonical: `/category/${category.slug}`,
    },
    openGraph: {
      title: category.seoTitle,
      description: category.metaDescription,
      url: `https://quickcalc.cloud/category/${category.slug}`,
      siteName: "QuickCalc",
      images: ["/og-image.png"],
    },
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = categoriesData.find((c) => c.slug === params.slug);

  if (!category) {
    notFound();
  }

  // Filter tools for this category
  const categoryTools = tools.filter((tool) =>
    category.toolCategories.includes(tool.category)
  );

  // Filter articles for this category
  const categoryArticles = articles.filter((article) =>
    category.blogCategories.includes(article.category)
  );

  // JSON-LD Schema
  const breadcrumbSchema = {
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
        "name": "Categories",
        "item": "https://quickcalc.cloud/#all-tools"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": category.name,
        "item": `https://quickcalc.cloud/category/${category.slug}`
      }
    ]
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": category.title,
    "description": category.metaDescription,
    "url": `https://quickcalc.cloud/category/${category.slug}`,
  };

  return (
    <div className="min-h-screen bg-base text-ink font-sans transition-colors flex flex-col justify-between">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-16 w-full flex-grow">
        {/* Breadcrumb Back Link */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-teal-600 dark:text-teal-400 hover:underline min-h-[44px]"
          >
            <ChevronLeft size={16} />
            <span>Back to All Categories</span>
          </Link>
        </div>

        {/* Hero Category Header Section */}
        <header className="mb-12 border-b border-surface-border pb-10">
          <div className="flex items-center gap-3 mb-4">
            <ToolIcon icon={category.icon} category={category.name} size="lg" />
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20">
              {category.name} Hub
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-ink tracking-tight leading-tight mb-4">
            {category.title}
          </h1>

          <p className="text-base sm:text-lg text-ink-muted leading-relaxed font-medium max-w-3xl">
            {category.introParagraph}
          </p>
        </header>

        {/* SECTION 1: Interactive Tools Grid */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Calculator size={22} className="text-teal-600 dark:text-teal-400" />
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-ink">
              Interactive {category.name} Calculators ({categoryTools.length})
            </h2>
          </div>

          {categoryTools.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {categoryTools.map((tool, index) => (
                <ScrollReveal key={tool.href} delayMs={(index % 3) * 60}>
                  <Link
                    href={tool.href}
                    className={`group flex flex-col justify-between h-full bg-base-card border rounded-2xl p-5 sm:p-6 shadow-sm shadow-black/5 hover:shadow-xl hover:-translate-y-1 active:scale-[0.98] transition-all duration-200 ${
                      tool.popular
                        ? "border-teal-500/40 dark:border-teal-500/30 shadow-teal-500/5"
                        : "border-surface-border hover:border-teal-500/40"
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <ToolIcon icon={tool.icon} category={tool.category} size="md" />
                          <h3 className="text-base sm:text-lg font-heading font-bold text-ink group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors leading-snug">
                            {tool.title}
                          </h3>
                        </div>
                        {tool.popular && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20 shrink-0">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-ink-muted leading-relaxed line-clamp-2">
                        {tool.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-surface-border/60 flex items-center justify-between text-xs font-semibold text-teal-600 dark:text-teal-400">
                      <span>Launch Tool</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <p className="text-ink-muted text-sm">No calculators currently listed in this category.</p>
          )}
        </section>

        {/* SECTION 2: In-Depth Blog Guides Grid */}
        {categoryArticles.length > 0 && (
          <section className="pt-10 border-t border-surface-border">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen size={22} className="text-teal-600 dark:text-teal-400" />
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-ink">
                In-Depth Guides & Formulas ({categoryArticles.length})
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {categoryArticles.map((article, index) => (
                <ScrollReveal key={article.slug} delayMs={(index % 3) * 60}>
                  <Link
                    href={`/blog/${article.slug}`}
                    className="group flex flex-col justify-between h-full bg-base-card border border-surface-border hover:border-teal-500/40 rounded-2xl p-5 sm:p-6 shadow-sm shadow-black/5 hover:shadow-xl hover:-translate-y-1 active:scale-[0.98] transition-all duration-200"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-surface-muted text-ink-muted border border-surface-border">
                          {article.category}
                        </span>
                        <ToolIcon icon={article.icon} category={article.category} size="sm" />
                      </div>

                      <h3 className="text-base sm:text-lg font-heading font-bold text-ink group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors leading-snug line-clamp-2">
                        {article.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-ink-muted leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-surface-border/60 flex items-center justify-between text-xs font-medium text-ink-muted">
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        <span>{article.readTime}</span>
                      </span>
                      <span className="inline-flex items-center gap-1 font-bold text-teal-600 dark:text-teal-400 group-hover:translate-x-1 transition-transform">
                        <span>Read Guide</span>
                        <ArrowRight size={13} />
                      </span>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer customText={`Precision ${category.name} calculation suite & clinical guides.`} />
    </div>
  );
}
