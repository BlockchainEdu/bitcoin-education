import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import readingTime from "reading-time";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function slugFromFile(filename) {
  return filename.replace(/\.md$/, "");
}

function safeTime(value) {
  const t = new Date(value || "").getTime();
  return Number.isFinite(t) ? t : 0;
}

function normalizeMeta(data, slug, content) {
  const rt = readingTime(content || "");
  return {
    slug,
    title: data?.title || slug,
    excerpt: data?.excerpt || "",
    date: data?.date || "",
    author: data?.author || "",
    cover: data?.cover || "",
    featured: Boolean(data?.featured),
    tags: Array.isArray(data?.tags) ? data.tags : [],
    readingMinutes: Math.max(1, Math.round(rt.minutes || 0)),
  };
}

export function getAllPostsMeta() {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));

  const posts = files
    .map((filename) => {
      const slug = slugFromFile(filename);
      const fullPath = path.join(POSTS_DIR, filename);
      const raw = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(raw);
      return normalizeMeta(data, slug, content);
    })
    .sort((a, b) => safeTime(b.date) - safeTime(a.date));

  return posts;
}

export function getPostsPage(page = 1, pageSize = 9) {
  const all = getAllPostsMeta();
  const total = all.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(Math.max(1, Number(page) || 1), totalPages);
  const start = (currentPage - 1) * pageSize;
  const items = all.slice(start, start + pageSize);

  return {
    items,
    total,
    totalPages,
    currentPage,
  };
}

export async function getPostBySlug(slug) {
  // Prevent path traversal — slug must resolve inside POSTS_DIR
  if (!slug || /[\/\\]|\.\./.test(slug)) {
    throw new Error("Invalid slug");
  }
  const fullPath = path.join(POSTS_DIR, `${slug}.md`);
  if (!fullPath.startsWith(POSTS_DIR)) {
    throw new Error("Invalid slug");
  }
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  const processed = await remark()
    .use(html, { sanitize: false })
    .process(content || "");
  const contentHtml = processed.toString();

  return {
    slug,
    meta: normalizeMeta(data, slug, content),
    contentHtml,
  };
}
