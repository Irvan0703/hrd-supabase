import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../api/supabase";

// login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }: { email: string; password: string }, thunkAPI) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw new Error(error.message);
      if (!data.user) throw new Error("User not found");

      const userId = data.user.id;

      // 🔥 Ambil role dari tabel profiles
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .single();

      if (profileError)  {
        console.error("RLS / DB error:", profileError);
        throw new Error(
          `Gagal membaca role dari profiles (STATUS ${status}). Periksa policy RLS.` 
        );
      }

      return {
        user: {
          ...data.user,
          role: profile.role, // <-- tambahkan role
        },
        session: data.session,
      };
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);


// register
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    { email, password, role }: { email: string; password: string; role: string },
    thunkAPI
  ) => {
    try {
      // 1. Buat akun di auth.users
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw new Error(error.message);
      if (!data.user) throw new Error("Failed to create user");

      const userId = data.user.id;

      // 2. Insert ke tabel profiles
      const { error: profileError } = await supabase.from("profiles").insert({
        id: userId,
        role: role,        // <-- TAMBAHKAN ROLE DI SINI
        full_name: "",     // jika ada
      });

      if (profileError) throw new Error(profileError.message);

      return {
        user: {
          id: data.user.id,
          email: data.user.email,
          role, // ← dari input form
        },
        session: data.session,
      };
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);


// logout
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
  return null;
});
