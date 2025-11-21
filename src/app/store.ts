import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/slice";
import jobReducer from "../features/jobs/slice"
import candidateReducer from "../features/candidates/slice"
import applyReducer from "../features/apply/slice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobReducer,
    candidates: candidateReducer,
    apply: applyReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
