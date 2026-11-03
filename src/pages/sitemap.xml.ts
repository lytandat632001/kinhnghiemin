import { getCollection } from "astro:content";
import { products, site } from "../config/site";

export const prerender = true;

const escapeXml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

export async function GET() {
  const posts = (await getCollection("blog")).filter((post) => !post.data.draft);
  const paths = [
    "/",
    "/san-pham/",
    "/blog/",
    "/bao-gia/",
    "/lien-he/",
    ...products.map((product) => `/san-pham/${product.slug}/`),
    ...posts.map((post) => `/blog/${post.id}/`),
  ];

  const baseUrl = site.siteUrl.replace(/\/+$/, "");
  const urls = [...new Set(paths)]
    .sort()
    .map((path) => `  <url><loc>${escapeXml(`${baseUrl}${path}`)}</loc></url>`)
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
