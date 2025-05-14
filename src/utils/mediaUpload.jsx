import { createClient } from "@supabase/supabase-js";

// ❗ Use public (anon) key, not service role key
const SUPABASE_URL = "https://fqchfixofctbyywmfdnr.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxY2hmaXhvZmN0Ynl5d21mZG5yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY2MjUzMTUsImV4cCI6MjA2MjIwMTMxNX0.dNAuRXo8ekU1f97O6M4J4B4QIKpwoXLaIhbdRMYYYTQ";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default async function mediaUpload(file) {
    if (!file) {
        throw new Error("No file selected");
    }

    const timestamp = new Date().getTime();
    const fileName = `${timestamp}_${file.name}`;

    const { data, error } = await supabase.storage
        .from("images")
        .upload(fileName, file, {
            upsert: false,
            cacheControl: "3600",
        });

    if (error) {
        throw new Error("Upload failed: " + error.message);
    }

    const { data: publicData } = supabase
        .storage
        .from("images")
        .getPublicUrl(fileName);

    return publicData.publicUrl;
}
