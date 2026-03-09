import { getAllPostsMeta } from "../lib/posts";

const SITE_URL = "https://www.blockchainedu.org";

function SitemapXml() {
  return null;
}

export async function getServerSideProps({ res }) {
  const staticPages = [
    "",
    "/about",
    "/blog",
    "/contact",
    "/donate",
    "/opportunities",
    "/programs",
    "/alumni",
    "/team",
    "/learn",
    "/clubs",
    "/professors",
    "/impact",
    "/get-involved",
    "/get-funding",
    "/volunteer",
    "/subscribe",
  ];

  const posts = getAllPostsMeta();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages
  .map(
    (path) => `  <url>
    <loc>${SITE_URL}${path}</loc>
    <changefreq>${path === "" ? "weekly" : path === "/blog" ? "weekly" : "monthly"}</changefreq>
    <priority>${path === "" ? "1.0" : "0.8"}</priority>
  </url>`
  )
  .join("\n")}
${posts
  .map(
    (post) => `  <url>
    <loc>${SITE_URL}/blog/${post.slug}</loc>
    <lastmod>${new Date(post.date).toISOString().split("T")[0]}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.7</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");
  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default SitemapXml;
