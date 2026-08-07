/**
 * Schema.org JSON-LD Generators for QuickCalc.cloud
 */

export interface FAQ {
  question: string;
  answer: string;
}

export interface SoftwareAppInput {
  name: string;
  description: string;
  slug: string;
  category: string;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface HowToStepInput {
  name: string;
  text: string;
  url?: string;
}

/**
 * Maps QuickCalc category strings to valid Schema.org applicationCategory values.
 */
function mapCategoryToSchema(category: string): string {
  const norm = category.trim().toLowerCase();
  if (norm.includes("health")) {
    return "HealthApplication";
  }
  if (norm.includes("finance")) {
    return "FinanceApplication";
  }
  if (norm.includes("converter") || norm.includes("utility") || norm.includes("dev") || norm.includes("planning")) {
    return "UtilitiesApplication";
  }
  if (norm.includes("education")) {
    return "EducationApplication";
  }
  return "UtilitiesApplication";
}

/**
 * Generates a valid Schema.org FAQPage JSON-LD object.
 */
export function generateFAQSchema(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };
}

/**
 * Generates a valid Schema.org HowTo JSON-LD object.
 */
export function generateHowToSchema(name: string, description: string, steps: HowToStepInput[]) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": name,
    "description": description,
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
      ...(step.url ? { "url": step.url } : {}),
    })),
  };
}

/**
 * Generates a valid Schema.org WebApplication JSON-LD object.
 */
export function generateSoftwareAppSchema({ name, description, slug, category }: SoftwareAppInput) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": name,
    "description": description,
    "applicationCategory": mapCategoryToSchema(category),
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
    },
    "url": `https://quickcalc.cloud/tools/${slug}`,
  };
}

/**
 * Generates a valid Schema.org BreadcrumbList JSON-LD object.
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url,
    })),
  };
}
