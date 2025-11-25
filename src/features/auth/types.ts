export interface AuthUser {
  id: string;
  email?: string;
  role: string;
}

export interface AuthState {
  user: AuthUser  | null;
  session: any | null;
  loading: boolean;
  error: string | null;
}
