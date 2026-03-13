import { createClient } from "@supabase/supabase-js";

const MONDAY_API = "https://api.monday.com/v2";
const STUDENTS_BOARD = "18398134588";
const BUCKET = "student-images";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function mondayQuery(query) {
  const res = await fetch(MONDAY_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.MONDAY_API_KEY,
    },
    body: JSON.stringify({ query }),
  });
  if (!res.ok) throw new Error(`Monday API ${res.status}`);
  return res.json();
}

async function fetchAllStudentsFromMonday() {
  const students = [];
  let query = `{
    boards(ids: ${STUDENTS_BOARD}) {
      items_page(limit: 500) {
        cursor
        items { id name assets { id public_url } }
      }
    }
  }`;
  let result = await mondayQuery(query);
  let page = result.data.boards[0].items_page;
  students.push(...page.items);

  while (page.cursor) {
    query = `{ next_items_page(limit: 500, cursor: "${page.cursor}") { cursor items { id name assets { id public_url } } } }`;
    result = await mondayQuery(query);
    page = result.data.next_items_page;
    students.push(...page.items);
  }
  console.log(`Fetched ${students.length} from Monday.com`);
  return students;
}

// Fetch ALL rows from Supabase (bypasses 1000 limit)
async function fetchAllFromSupabase(table, select, filter) {
  const all = [];
  const PAGE = 1000;
  let offset = 0;
  while (true) {
    let q = supabase.from(table).select(select).range(offset, offset + PAGE - 1);
    if (filter) q = filter(q);
    const { data, error } = await q;
    if (error) throw error;
    all.push(...data);
    if (data.length < PAGE) break;
    offset += PAGE;
  }
  return all;
}

async function downloadImage(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const ct = res.headers.get("content-type") || "";
    return { buffer: Buffer.from(await res.arrayBuffer()), contentType: ct };
  } catch {
    return null;
  }
}

function extFromCt(ct) {
  if (ct.includes("png")) return "png";
  if (ct.includes("webp")) return "webp";
  if (ct.includes("gif")) return "gif";
  return "jpg";
}

async function main() {
  console.log("=== Remaining Student Image Migration ===\n");

  // Get all non-migrated students from DB
  const remaining = await fetchAllFromSupabase(
    "students",
    "id, monday_id, name",
    (q) => q.not("image_url", "like", "%supabase%")
  );
  console.log(`${remaining.length} students still need images\n`);

  if (remaining.length === 0) {
    console.log("All done!");
    return;
  }

  // Fetch Monday.com data
  const mondayStudents = await fetchAllStudentsFromMonday();

  // Build monday_id map first (exact match)
  const mondayById = new Map();
  mondayStudents.forEach((s) => mondayById.set(s.id, s));

  // Build name map for fallback (name -> array of items)
  const mondayByName = new Map();
  mondayStudents.forEach((s) => {
    const key = s.name.trim().toLowerCase();
    if (!mondayByName.has(key)) mondayByName.set(key, []);
    mondayByName.get(key).push(s);
  });

  let uploaded = 0, failed = 0, noMatch = 0, noImage = 0;
  const CONCURRENCY = 10;

  for (let i = 0; i < remaining.length; i += CONCURRENCY) {
    const batch = remaining.slice(i, i + CONCURRENCY);

    await Promise.all(
      batch.map(async (dbStudent) => {
        // Try monday_id first, then name
        let mondayItem = mondayById.get(dbStudent.monday_id);
        if (!mondayItem) {
          const byName = mondayByName.get(dbStudent.name.trim().toLowerCase());
          mondayItem = byName?.[0]; // Take first match
        }

        if (!mondayItem) {
          noMatch++;
          return;
        }

        const imageUrl = mondayItem.assets?.[0]?.public_url;
        if (!imageUrl) {
          noImage++;
          return;
        }

        const img = await downloadImage(imageUrl);
        if (!img) {
          failed++;
          return;
        }

        const ext = extFromCt(img.contentType);
        const filePath = `${dbStudent.monday_id}.${ext}`;

        const { error: upErr } = await supabase.storage
          .from(BUCKET)
          .upload(filePath, img.buffer, {
            contentType: img.contentType,
            upsert: true,
          });

        if (upErr) {
          console.error(`  Upload fail ${dbStudent.name}:`, upErr.message);
          failed++;
          return;
        }

        const { data: urlData } = supabase.storage
          .from(BUCKET)
          .getPublicUrl(filePath);

        const { error: dbErr } = await supabase
          .from("students")
          .update({ image_url: urlData.publicUrl })
          .eq("id", dbStudent.id);

        if (dbErr) {
          failed++;
          return;
        }

        uploaded++;
      })
    );

    const done = Math.min(i + CONCURRENCY, remaining.length);
    if (done % 100 === 0 || done === remaining.length) {
      console.log(
        `Progress: ${done}/${remaining.length} | uploaded: ${uploaded} | failed: ${failed} | no match: ${noMatch} | no image: ${noImage}`
      );
    }
  }

  console.log(`\n=== Complete ===`);
  console.log(`Uploaded:  ${uploaded}`);
  console.log(`No match:  ${noMatch}`);
  console.log(`No image:  ${noImage}`);
  console.log(`Failed:    ${failed}`);

  // Final count
  const { count: migrated } = await supabase
    .from("students")
    .select("*", { count: "exact", head: true })
    .like("image_url", "%supabase%");
  const { count: total } = await supabase
    .from("students")
    .select("*", { count: "exact", head: true });
  console.log(`\nTotal migrated: ${migrated}/${total}`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
