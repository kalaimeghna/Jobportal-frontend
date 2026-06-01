import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../Redux/store";
import { logout } from "../Redux/authSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  // ================= AUTH STATE =================
  const reduxUser = useSelector((state: RootState) => state.auth.user);
  const storageUser = JSON.parse(localStorage.getItem("user") || "null");

  const user = reduxUser || storageUser;

  // ================= LOGOUT =================
  const logoutHandler = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // ================= ACTIVE LINK =================
  const isActive = (path: string) =>
    location.pathname === path
      ? "text-yellow-300 font-bold"
      : "hover:text-yellow-200";

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center flex-wrap gap-4">

      {/* LOGO */}
      <Link to="/" className="text-2xl font-bold">
        Job Portal
      </Link>

      <div className="flex items-center gap-4 flex-wrap">

        {/* COMMON LINKS */}
        <Link to="/" className={isActive("/")}>Home</Link>
        <Link to="/jobs" className={isActive("/jobs")}>Jobs</Link>
        <Link to="/companies" className={isActive("/companies")}>Companies</Link>

        {/* JOBSEEKER LINKS */}
        {user?.role === "jobseeker" && (
          <>
            <Link to="/applications" className={isActive("/applications")}>
              My Applications
            </Link>
            <Link to="/resume-upload" className={isActive("/resume-upload")}>
              Resume
            </Link>
          </>
        )}

        {/* EMPLOYER LINKS */}
        {user?.role === "employer" && (
          <>
            <Link to="/create-company" className={isActive("/create-company")}>
              Create Company
            </Link>

            <Link to="/create-job" className={isActive("/create-job")}>
              Create Job
            </Link>

            <Link to="/dashboard" className={isActive("/dashboard")}>
              Dashboard
            </Link>

            {/* ⭐ ATS DASHBOARD */}
            <Link
              to="/ats-dashboard"
              className={isActive("/ats-dashboard")}
            >
              ATS Dashboard
            </Link>
          </>
        )}

        {/* COMMON AUTHENTICATED LINKS */}
        {user && (
          <>
            <Link to="/profile" className={isActive("/profile")}>
              Profile
            </Link>

            <Link to="/change-password" className={isActive("/change-password")}>
              Change Password
            </Link>
          </>
        )}

        {/* AUTH LINKS */}
        {!user ? (
          <>
            <Link to="/login" className={isActive("/login")}>
              Login
            </Link>
            <Link to="/register" className={isActive("/register")}>
              Register
            </Link>
          </>
        ) : (
          <button
            onClick={logoutHandler}
            className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        )}

      </div>
    </nav>
  );
}