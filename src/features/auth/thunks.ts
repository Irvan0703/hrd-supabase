import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../api/supabase";

// login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }: { email: string; password: string }) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
    if (!data.user) throw new Error("User not found");

    return { user: data.user, session: data.session };
  }
);

// register
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ email, password }: { email: string; password: string }) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw new Error(error.message);
    if (!data.user) throw new Error("Failed to create user");

    return { user: data.user, session: data.session };
  }
);

// logout
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
  return null;
});
