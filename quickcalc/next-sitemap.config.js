/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://quickcalc.cloud",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  outDir: "public",
  exclude: ["/robots.txt"],
  additionalPaths: async (config) => {
    const toolSlugs = [
      "age-calculator",
      "ai-token-cost-calculator",
      "ats-resume-checker",
      "bmi-calculator",
      "budget-calculator",
      "calorie-calculator",
      "color-palette-generator",
      "currency-converter",
      "discount-calculator",
      "digital-storage-converter",
      "due-date-calculator",
      "freelance-rate-calculator",
      "gfr-kidney-function-calculator",
      "gpa-converter",
      "group-expense-splitter",
      "habit-cost-calculator",
      "inflation-calculator",
      "intermittent-fasting-calculator",
      "json-csv-converter",
      "loan-calculator",
      "macro-calculator",
      "pace-calculator",
      "paper-fabric-size-converter",
      "password-generator",
      "percentage-calculator",
      "pregnancy-weight-gain-calculator",
      "readability-score-calculator",
      "regex-tester",
      "retirement-calculator",
      "salary-take-home-calculator",
      "savings-growth-calculator",
      "shoe-size-converter",
      "sleep-cycle-calculator",
      "speech-time-calculator",
      "timezone-meeting-planner",
      "tip-calculator",
      "travel-time-fuel-calculator",
      "water-intake-calculator",
      "word-character-counter",
      "zakat-calculator"
    ];

    const staticPages = [
      { loc: "/changelog", changefreq: "monthly", priority: 0.6, lastmod: new Date().toISOString() },
    ];

    return [
      ...staticPages,
      ...toolSlugs.map((slug) => ({
        loc: `/tools/${slug}`,
        changefreq: "daily",
        priority: 0.8,
        lastmod: new Date().toISOString(),
      })),
    ];
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/login", "/api/*", "/_next/*"],
      },
    ],
  },
};
