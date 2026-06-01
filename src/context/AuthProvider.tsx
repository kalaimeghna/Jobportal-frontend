import { useState } from "react";
import { AuthContext } from "./AuthContext";
import type { User } from "./AuthContext";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

// ✅ safe initial load (NO useEffect = NO loop error)
const getInitialUser = (): User | null => {
  try {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!storedUser || !token) return null;

    return JSON.parse(storedUser);
  } catch {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    return null;
  }
};

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(getInitialUser);

  // ================= LOGOUT =================
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};