import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../api/supabase";

export const fetchJobs = createAsyncThunk("jobs/fetch", async () => {
  const { data, error } = await supabase.from("jobs").select("*");
  if (error) throw new Error(error.message);
  return data;
});
