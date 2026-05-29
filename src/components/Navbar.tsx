import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

// ================= USER TYPE =================
type User = {
  _id: string;
  name: string;
  email: string;
  role: "employer" | "jobseeker";
};

// ================= GET USER =================
const getUser = (): User | null => {
  try {
    const data = localStorage.getItem("user");
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

export default function Navbar() {
  const [user, setUser] = useState<User | null>(getUser());
  const location = useLocation();

  // ================= SYNC USER =================
  useEffect(() => {
    const syncUser = () => setUser(getUser());

    window.addEventListener("storage", syncUser);
    syncUser();

    return () => window.removeEventListener("storage", syncUser);
  }, []);

  // ================= LOGOUT =================
  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/login";
  };

  // ================= ACTIVE LINK =================
  const isActive = (path: string) =>
    location.pathname === path ? "text-yellow-300 font-bold" : "";

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center flex-wrap gap-4">

      {/* LOGO */}
      <Link to="/" className="text-2xl font-bold">
        Job Portal
      </Link>

      {/* LINKS */}
      <div className="flex items-center gap-4 flex-wrap">

        <Link to="/" className={isActive("/")}>
          Home
        </Link>

        <Link to="/jobs" className={isActive("/jobs")}>
          Jobs
        </Link>

        <Link to="/companies" className={isActive("/companies")}>
          Companies
        </Link>

        {/* JOBSEEKER */}
        {user?.role === "jobseeker" && (
          <>
            <Link to="/recommended-jobs">
              Recommended Jobs
            </Link>

            <Link to="/applications">
              My Applications
            </Link>

            <Link to="/resume-upload">
              Resume
            </Link>
          </>
        )}

        {/* EMPLOYER */}
        {user?.role === "employer" && (
          <>
            {/* FIXED ROUTES (EXIST IN YOUR ROUTER) */}
            <Link to="/dashboard" className={isActive("/dashboard")}>
              Dashboard
            </Link>

            <Link to="/create-company" className={isActive("/create-company")}>
              Create Company
            </Link>

            <Link to="/create-job" className={isActive("/create-job")}>
              Create Job
            </Link>
          </>
        )}

        {/* PROFILE */}
        {user && (
          <Link to="/profile" className={isActive("/profile")}>
            Profile
          </Link>
        )}

        {/* PASSWORD */}
        {user && (
          <Link to="/change-password">
            Change Password
          </Link>
        )}

        {/* AUTH */}
        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {/* LOGOUT */}
        {user && (
          <button
            onClick={logoutHandler}
            className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        )}

      </div>
    </nav>
  );
}