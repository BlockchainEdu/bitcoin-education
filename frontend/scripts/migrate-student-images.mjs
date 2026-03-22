import { createClient } from "@supabase/supabase-js";

const MONDAY_API = "https://api.monday.com/v2";
const STUDENTS_BOARD = "18398134588";
const BUCKET = "student-images";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ─── Monday.com helpers ───

async function mondayQuery(query) {
  const res = await fetch(MONDAY_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.MONDAY_API_KEY,
    },
    body: JSON.stringify({ query }),
  });
  if (!res.ok) throw new Error(`Monday API ${res.status}: ${await res.text()}`);
  return res.json();
}

async function fetchAllStudentsFromMonday() {
  const students = [];

  // First page
  let query = `{
    boards(ids: ${STUDENTS_BOARD}) {
      items_page(limit: 500) {
        cursor
        items {
          id
          name
          assets { id public_url }
          column_values { id value text }
        }
      }
    }
  }`;

  let result = await mondayQuery(query);
  let page = result.data.boards[0].items_page;
  students.push(...page.items);
  console.log(`Fetched ${students.length} students from Monday.com...`);

  // Paginate
  while (page.cursor) {
    query = `{
      next_items_page(limit: 500, cursor: "${page.cursor}") {
        cursor
        items {
          id
          name
          assets { id public_url }
          column_values { id value text }
        }
      }
    }`;
    result = await mondayQuery(query);
    page = result.data.next_items_page;
    students.push(...page.items);
    console.log(`Fetched ${students.length} students from Monday.com...`);
  }

  return students;
}

function getImageUrl(item) {
  // Primary: asset public_url
  if (item.assets?.[0]?.public_url) return item.assets[0].public_url;

  // Fallback: files column value
  const filesCv = item.column_values?.find((c) => c.id === "files");
  if (!filesCv) return null;

  try {
    const parsed = JSON.parse(filesCv.value);
    return (
      parsed?.files?.[0]?.public_url ||
      parsed?.files?.[0]?.url ||
      null
    );
  } catch {
    return null;
  }
}

// ─── Supabase Storage helpers ───

async function ensureBucket() {
  const { data: buckets } = await supabase.storage.listBuckets();
  if (buckets?.find((b) => b.name === BUCKET)) {
    console.log(`Bucket "${BUCKET}" exists.`);
    return;
  }
  const { error } = await supabase.storage.createBucket(BUCKET, {
    public: true,
    fileSizeLimit: 5 * 1024 * 1024, // 5MB
  });
  if (error) throw new Error(`Create bucket: ${error.message}`);
  console.log(`Created bucket "${BUCKET}" (public).`);
}

async function downloadImage(url) {
  const res = await fetch(url);
  if (!res.ok) return null;
  const contentType = res.headers.get("content-type") || "";
  const buffer = Buffer.from(await res.arrayBuffer());
  return { buffer, contentType };
}

function extFromContentType(ct) {
  if (ct.includes("png")) return "png";
  if (ct.includes("webp")) return "webp";
  if (ct.includes("gif")) return "gif";
  return "jpg";
}

// ─── Main ───

async function main() {
  console.log("=== Student Image Migration ===\n");

  // 1. Ensure storage bucket
  await ensureBucket();

  // 2. Fetch fresh student data from Monday.com
  console.log("\nFetching students from Monday.com...");
  const mondayStudents = await fetchAllStudentsFromMonday();
  console.log(`Total: ${mondayStudents.length} students\n`);

  // 3. Get students from Supabase to map monday_id -> supabase id
  const { data: dbStudents } = await supabase
    .from("students")
    .select("id, monday_id, name");

  const dbMap = new Map();
  for (const s of dbStudents) {
    dbMap.set(s.monday_id, s);
  }

  // 4. Process images
  let uploaded = 0, skipped = 0, failed = 0, noImage = 0;
  const CONCURRENCY = 10;
  const total = mondayStudents.length;

  for (let i = 0; i < mondayStudents.length; i += CONCURRENCY) {
    const batch = mondayStudents.slice(i, i + CONCURRENCY);

    await Promise.all(
      batch.map(async (item) => {
        const imageUrl = getImageUrl(item);
        const dbStudent = dbMap.get(item.id);

        if (!dbStudent) {
          skipped++;
          return;
        }

        if (!imageUrl) {
          noImage++;
          return;
        }

        try {
          const img = await downloadImage(imageUrl);
          if (!img) {
            failed++;
            return;
          }

          const ext = extFromContentType(img.contentType);
          const filePath = `${item.id}.${ext}`;

          const { error: uploadErr } = await supabase.storage
            .from(BUCKET)
            .upload(filePath, img.buffer, {
              contentType: img.contentType,
              upsert: true,
            });

          if (uploadErr) {
            console.error(`  Upload error ${item.name}:`, uploadErr.message);
            failed++;
            return;
          }

          // Get public URL
          const { data: urlData } = supabase.storage
            .from(BUCKET)
            .getPublicUrl(filePath);

          // Update DB
          const { error: updateErr } = await supabase
            .from("students")
            .update({ image_url: urlData.publicUrl })
            .eq("id", dbStudent.id);

          if (updateErr) {
            console.error(`  DB update error ${item.name}:`, updateErr.message);
            failed++;
            return;
          }

          uploaded++;
        } catch (err) {
          console.error(`  Error ${item.name}:`, err.message);
          failed++;
        }
      })
    );

    const done = Math.min(i + CONCURRENCY, total);
    if (done % 100 === 0 || done === total) {
      console.log(`Progress: ${done}/${total} (uploaded: ${uploaded}, failed: ${failed}, no image: ${noImage})`);
    }
  }

  console.log(`\n=== Complete ===`);
  console.log(`Uploaded:  ${uploaded}`);
  console.log(`No image:  ${noImage}`);
  console.log(`Failed:    ${failed}`);
  console.log(`Skipped:   ${skipped} (not in DB)`);

  // Verify a sample
  const { data: sample } = await supabase
    .from("students")
    .select("name, image_url")
    .like("image_url", "%supabase%")
    .limit(3);

  if (sample?.length) {
    console.log("\nSample migrated URLs:");
    sample.forEach((s) => console.log(`  ${s.name} -> ${s.image_url}`));
  }
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
