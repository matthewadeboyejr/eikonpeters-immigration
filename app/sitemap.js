export default async function sitemap() {
  const baseUrl = "https://www.eikonpetersimmigration.com";

  // Static routes
  const routes = [
    "",
    "/about",
    "/contact",
    "/services",
    "/blog",
    "/guides",
    "/privacy"
  ];

  const staticMaps = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : 0.8
  }));

  // Fetch dynamic blog post slugs for the sitemap
  let dynamicBlogMaps = [];
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      const res = await fetch(`${supabaseUrl}/rest/v1/blog_posts?select=slug,created_at`, {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`
        },
        next: { revalidate: 3600 } // Cache sitemap queries for 1 hour
      });

      if (res.ok) {
        const posts = await res.json();
        dynamicBlogMaps = posts.map((post) => ({
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: new Date(post.created_at || new Date()).toISOString(),
          changeFrequency: "monthly",
          priority: 0.6
        }));
      }
    }
  } catch (err) {
    console.error("Error generating sitemap dynamic blog entries:", err);
  }

  return [...staticMaps, ...dynamicBlogMaps];
}
