import { supabase } from "./supabase";
import { nanoid } from "nanoid";

// 1. Insert ke candidates
export async function createCandidate(jobId: string) {
  const candidateId = "cand_" + nanoid(12);

  const { data, error } = await supabase
    .from("candidates")
    .insert({
      id: candidateId,
      job_id: jobId,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

// 2. Insert attributes
export async function saveCandidateAttributes(
  candidateId: string,
  attrs: Record<string, string>
) {
  const rows = Object.entries(attrs).map(([key, value], i) => ({
    candidate_id: candidateId,
    key,
    label: key.replace(/_/g, " ").toUpperCase(),
    value,
    order: i + 1,
  }));

  const { error } = await supabase
    .from("candidate_attributes")
    .insert(rows);

  if (error) throw new Error(error.message);
}

// 3. Upload file (CV / Foto)
export async function uploadFile(file: File, folder: string) {
  const fileName = `${folder}-${nanoid(6)}-${file.name}`;

  const { error } = await supabase.storage
    .from("applications")
    .upload(fileName, file);

  if (error) throw new Error(error.message);

  const { data } = supabase.storage
    .from("applications")
    .getPublicUrl(fileName);

  return data.publicUrl;
}
