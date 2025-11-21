import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../api/supabase";

export const fetchCandidates = createAsyncThunk(
  "candidates/fetchAll",
  async () => {
    const { data, error } = await supabase
      .from("applications")
      .select(`
        id,
        status,
        created_at,
        job_id,
        applicants:applicant_id (
          full_name,
          email,
          phone
        )
      `)
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return data;
  }
);
