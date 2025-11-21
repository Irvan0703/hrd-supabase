import { createSlice } from "@reduxjs/toolkit";
import { fetchCandidates } from "./thunks";

interface CandidateState {
  list: any[];
  loading: boolean;
  error: string | null;
}

const initialState: CandidateState = {
  list: [],
  loading: false,
  error: null,
};

const candidateSlice = createSlice({
  name: "candidates",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCandidates.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCandidates.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchCandidates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      });
  },
});

export default candidateSlice.reducer;
