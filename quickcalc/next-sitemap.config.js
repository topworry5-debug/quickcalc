/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://quickcalc.cloud",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  outDir: "public",
  exclude: ["/robots.txt"],
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
