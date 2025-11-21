import type { User } from "@supabase/supabase-js";

export interface AuthState {
  user: User | null;
  session: any | null;
  loading: boolean;
  error: string | null;
}
