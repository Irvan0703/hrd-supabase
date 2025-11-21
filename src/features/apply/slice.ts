import { createSlice } from "@reduxjs/toolkit";
import { applyJob } from "./thunks";

interface ApplyState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: ApplyState = {
  loading: false,
  error: null,
  success: false,
};

const applySlice = createSlice({
  name: "apply",
  initialState,
  reducers: {
    resetApply: (state) => {
      state.success = false;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(applyJob.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(applyJob.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(applyJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetApply } = applySlice.actions;
export default applySlice.reducer;
