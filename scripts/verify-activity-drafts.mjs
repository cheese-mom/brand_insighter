import nextEnv from "@next/env";
import assert from "node:assert/strict";

nextEnv.loadEnvConfig(process.cwd());
const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
async function read(query) {
  const res = await fetch(base + "/rest/v1/activities?" + query, { headers: { apikey: key } });
  assert.equal(res.status, 200);
  return res.json();
}
const visible = await read("select=id,status");
assert.ok(visible.every((row) => row.status === "published"));
const drafts = await read("select=id&status=eq.draft");
assert.equal(drafts.length, 0);
console.log(JSON.stringify({ publicRows: visible.length, anonymousDrafts: drafts.length, result: "PASS" }));
