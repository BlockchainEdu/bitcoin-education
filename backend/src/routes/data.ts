import { Router } from "express";
import { db } from "../db";
import { university, student, job } from "../db/schema";
import { desc, eq, isNotNull, sql } from "drizzle-orm";

const router = Router();

// GET /api/data/home — data for homepage getStaticProps
router.get("/home", async (req, res) => {
  try {
    const rows = await db
      .select()
      .from(university)
      .orderBy(desc(university.num_people));

    const universities = (rows || []).map((u) => ({
      id: String(u.id),
      name: u.name,
      image: u.image_url,
      peopleCount: u.num_people || 0,
    }));

    const [{ count: memberCount }] = await db
      .select({ count: sql`count(*)::int` })
      .from(student);

    const avatarRows = await db
      .select({ image_url: student.image_url })
      .from(student)
      .where(isNotNull(student.image_url))
      .limit(50);

    const shuffled = (avatarRows || []).sort(() => Math.random() - 0.5);
    const memberAvatars = shuffled.slice(0, 8).map((s) => s.image_url);

    return res.json({ universities, memberAvatars, memberCount: memberCount || 0 });
  } catch (err) {
    console.error("[data/home]", err);
    return res.status(500).json({ error: "Failed to load home data" });
  }
});

// GET /api/data/universities/:slug — data for university page getStaticProps
router.get("/universities/:slug", async (req, res) => {
  try {
    const slug = req.params.slug;

    const [uni] = await db
      .select()
      .from(university)
      .where(eq(university.slug, slug));

    if (!uni) return res.status(404).json({ error: "Not found" });

    const members = await db
      .select()
      .from(student)
      .where(eq(student.university, uni.name));

    return res.json({
      university: {
        id: String(uni.id),
        name: uni.name,
        image: uni.image_url,
        slug: uni.slug,
        peopleCount: uni.num_people || 0,
      },
      members: (members || []).map((m) => ({
        id: String(m.id),
        name: m.name,
        title: m.title || "",
        image: m.image_url,
        linkedin: m.linkedin,
        twitter: m.twitter,
      })),
    });
  } catch (err) {
    console.error("[data/universities]", err);
    return res.status(500).json({ error: "Failed to load university data" });
  }
});

// GET /api/data/university-slugs — for getStaticPaths
router.get("/university-slugs", async (req, res) => {
  try {
    const unis = await db
      .select({ slug: university.slug })
      .from(university);
    return res.json(unis);
  } catch (err) {
    return res.status(500).json({ error: "Failed to load slugs" });
  }
});

// GET /api/data/sitemap — data for sitemap generation
router.get("/sitemap", async (req, res) => {
  try {
    const unis = await db.select({ slug: university.slug }).from(university);
    return res.json({ universities: unis });
  } catch (err) {
    return res.status(500).json({ error: "Failed to load sitemap data" });
  }
});

export default router;
