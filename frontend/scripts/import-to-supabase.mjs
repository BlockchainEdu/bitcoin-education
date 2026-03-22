import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const migrationDir = resolve(__dirname, "../migration");

// Use service role key to bypass RLS
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function importTable(tableName, fileName) {
  const data = JSON.parse(readFileSync(resolve(migrationDir, fileName), "utf8"));
  console.log(`\nImporting ${data.length} rows into "${tableName}"...`);

  // Supabase has a limit per request, batch by 500
  const BATCH = 500;
  let inserted = 0;

  for (let i = 0; i < data.length; i += BATCH) {
    const batch = data.slice(i, i + BATCH);
    const { error, count } = await supabase
      .from(tableName)
      .upsert(batch, { onConflict: "monday_id" });

    if (error) {
      console.error(`  Error at batch ${i / BATCH + 1}:`, error.message);
      return false;
    }
    inserted += batch.length;
    console.log(`  Batch ${Math.floor(i / BATCH) + 1}: ${inserted}/${data.length}`);
  }

  console.log(`  ✓ ${tableName}: ${inserted} rows imported`);
  return true;
}

async function verifyTable(tableName) {
  const { count, error } = await supabase
    .from(tableName)
    .select("*", { count: "exact", head: true });

  if (error) {
    console.error(`  Verify error for ${tableName}:`, error.message);
    return;
  }
  console.log(`  ${tableName}: ${count} rows in database`);
}

async function main() {
  console.log("=== Supabase Data Import ===");
  console.log("URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);

  // Check connection
  const { error: connErr } = await supabase.from("universities").select("id").limit(1);
  if (connErr) {
    console.error("Connection failed:", connErr.message);
    process.exit(1);
  }
  console.log("Connected to Supabase.\n");

  // Import in order (universities first since students reference them)
  const results = await Promise.all([
    importTable("universities", "import_universities.json"),
    importTable("scholarships", "import_scholarships.json"),
  ]);

  if (results.every(Boolean)) {
    await importTable("students", "import_students.json");
  }

  // Verify counts
  console.log("\n=== Verification ===");
  await verifyTable("universities");
  await verifyTable("students");
  await verifyTable("scholarships");
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
