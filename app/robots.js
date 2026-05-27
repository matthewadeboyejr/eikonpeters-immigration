export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/admin/*", "/_next/"]
    },
    sitemap: "https://www.eikonpetersimmigration.com/sitemap.xml"
  };
}
