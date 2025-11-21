import { createSlice } from "@reduxjs/toolkit";
import { fetchJobs } from "./thunks";

interface JobState {
  list: any[];
  loading: boolean;
  error: string | null;
}

const initialState: JobState = {
  list: [],
  loading: false,
  error: null,
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload; // ⬅ FIX DI SINI
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load jobs";
      });
  },
});

export default jobSlice.reducer;
