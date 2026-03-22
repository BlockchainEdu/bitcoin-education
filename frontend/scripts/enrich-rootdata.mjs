#!/usr/bin/env node
/**
 * Enrich students with RootData bios.
 * Uses the ser_inv (search) endpoint which returns bios in results.
 * Matches by name + title/company for accuracy.
 *
 * Usage: node scripts/enrich-rootdata.mjs [university_name]
 * Example: node scripts/enrich-rootdata.mjs "Stanford University"
 */

import { createClient } from "@supabase/supabase-js";

const ROOTDATA_API = "https://api.rootdata.com/open/ser_inv";
const ROOTDATA_KEY = process.env.ROOTDATA_API_KEY;
if (!ROOTDATA_KEY) { console.error("Set ROOTDATA_API_KEY in .env"); process.exit(1); }

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://wcfimahdcjrldadzzubk.supabase.co",
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
if (!process.env.SUPABASE_SERVICE_ROLE_KEY) { console.error("Set SUPABASE_SERVICE_ROLE_KEY in .env"); process.exit(1); }

const university = process.argv[2] || "Stanford University";
const RATE_LIMIT_MS = 650; // ~100 req/min = 600ms between, add buffer

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// Extract company name from title like "Founder at Injective" → "Injective"
function extractCompany(title) {
  if (!title) return "";
  const match = title.match(/(?:at|of|@)\s+(.+?)$/i);
  return match ? match[1].trim() : "";
}

// Normalize name for comparison
function normName(n) {
  return (n || "")
    .toLowerCase()
    .replace(/[^a-z\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// Score how well a RootData result matches our student
function matchScore(student, result) {
  if (result.type !== 3) return 0; // type 3 = people

  const sName = normName(student.name);
  const rName = normName(result.name);

  // Exact name match
  if (sName === rName) return 100;

  // First + last name match
  const sParts = sName.split(" ");
  const rParts = rName.split(" ");
  if (sParts.length >= 2 && rParts.length >= 2) {
    if (sParts[0] === rParts[0] && sParts[sParts.length - 1] === rParts[rParts.length - 1]) {
      return 90;
    }
  }

  // Partial match (first name + company overlap)
  if (sParts[0] === rParts[0]) {
    const company = extractCompany(student.title).toLowerCase();
    const intro = (result.introduce || "").toLowerCase();
    if (company && intro.includes(company)) return 80;
    return 30; // first name only, not reliable
  }

  return 0;
}

async function searchPerson(student) {
  const company = extractCompany(student.title);
  const query = company ? `${student.name} ${company}` : student.name;

  try {
    const res = await fetch(ROOTDATA_API, {
      method: "POST",
      headers: {
        apikey: ROOTDATA_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    const json = await res.json();
    if (json.result !== 200 || !json.data) return null;

    // Find best matching person (type 3)
    let best = null;
    let bestScore = 0;

    for (const item of json.data) {
      const score = matchScore(student, item);
      if (score > bestScore) {
        bestScore = score;
        best = item;
      }
    }

    // Only accept matches with score >= 80 (name match + company context)
    if (bestScore >= 80 && best?.introduce) {
      return {
        bio: best.introduce,
        rootdata_id: best.id,
        rootdata_url: best.rootdataurl || null,
        score: bestScore,
      };
    }

    return null;
  } catch (err) {
    console.error(`  Error searching ${student.name}:`, err.message);
    return null;
  }
}

async function main() {
  console.log(`\nEnriching students from: ${university}`);
  console.log("=".repeat(50));

  // Fetch students
  const { data: students, error } = await supabase
    .from("students")
    .select("id, name, title")
    .eq("university", university)
    .order("name");

  if (error) {
    console.error("Supabase error:", error.message);
    process.exit(1);
  }

  console.log(`Found ${students.length} students\n`);

  let matched = 0;
  let noMatch = 0;
  let errors = 0;
  const results = [];

  for (let i = 0; i < students.length; i++) {
    const student = students[i];
    const progress = `[${i + 1}/${students.length}]`;

    const result = await searchPerson(student);

    if (result) {
      matched++;
      results.push({ id: student.id, name: student.name, ...result });
      console.log(`${progress} ✓ ${student.name} (score: ${result.score}) — ${result.bio.slice(0, 80)}...`);
    } else {
      noMatch++;
      console.log(`${progress} ✗ ${student.name}`);
    }

    // Rate limiting
    if (i < students.length - 1) {
      await sleep(RATE_LIMIT_MS);
    }
  }

  console.log("\n" + "=".repeat(50));
  console.log(`Results: ${matched} matched, ${noMatch} no match, ${errors} errors`);
  console.log(`Match rate: ${((matched / students.length) * 100).toFixed(1)}%`);

  // Save results to JSON for review before writing to DB
  const outPath = `scripts/rootdata-${university.toLowerCase().replace(/\s+/g, "-")}.json`;
  const fs = await import("fs");
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2));
  console.log(`\nResults saved to ${outPath}`);
  console.log(`Review the file, then run: node scripts/apply-rootdata-bios.mjs "${university}"`);
}

main().catch(console.error);
