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
      "bmi-calculator",
      "budget-calculator",
      "calorie-calculator",
      "color-palette-generator",
      "currency-converter",
      "discount-calculator",
      "due-date-calculator",
      "gpa-converter",
      "group-expense-splitter",
      "habit-cost-calculator",
      "inflation-calculator",
      "json-csv-converter",
      "loan-calculator",
      "pace-calculator",
      "paper-fabric-size-converter",
      "password-generator",
      "percentage-calculator",
      "pregnancy-weight-gain-calculator",
      "regex-tester",
      "retirement-calculator",
      "salary-take-home-calculator",
      "savings-growth-calculator",
      "shoe-size-converter",
      "sleep-cycle-calculator",
      "timezone-meeting-planner",
      "tip-calculator",
      "travel-time-fuel-calculator",
      "water-intake-calculator",
      "word-character-counter",
      "zakat-calculator"
    ];

    return toolSlugs.map((slug) => ({
      loc: `/tools/${slug}`,
      changefreq: "daily",
      priority: 0.8,
      lastmod: new Date().toISOString(),
    }));
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
