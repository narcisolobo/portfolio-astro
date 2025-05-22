import { getSecret } from "astro:env/server";
import { createClient } from "@supabase/supabase-js";

console.log("HEY LOOK OVER HERE!!!");
console.log(getSecret("SUPABASE_URL"));

export const supabase = createClient(
  getSecret("SUPABASE_URL")!,
  getSecret("SUPABASE_SERVICE_ROLE_KEY")!,
);
