import { createContext } from "react";

export type User = {
  _id: string;
  name: string;
  email: string;
  role: "jobseeker" | "employer" | "admin";
};

export type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
};

// ✅ IMPORTANT: allow null safely
export const AuthContext = createContext<AuthContextType | null>(null);