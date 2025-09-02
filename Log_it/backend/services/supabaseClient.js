const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
  throw new Error("Supabase env missing. Set SUPABASE_URL / SUPABASE_SERVICE_KEY");
}

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY, {
  auth: { persistSession: false },
});

module.exports = supabase;