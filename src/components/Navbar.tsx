import { Link } from "react-router-dom";

export default function Navbar() {

  // ================= GET USER =================

  const user =
    localStorage.getItem("user")

      ? JSON.parse(
          localStorage.getItem("user")!
        )

      : null;


  // ================= LOGOUT =================

  const logoutHandler = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    window.location.href =
      "/login";
  };


  return (

    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center flex-wrap gap-4">

      {/* LOGO */}

      <Link
        to="/"
        className="text-2xl font-bold"
      >

        Job Portal

      </Link>


      {/* NAV LINKS */}

      <div className="flex items-center gap-4 flex-wrap">

        {/* HOME */}

        <Link
          to="/"
          className="hover:text-gray-200 transition"
        >

          Home

        </Link>


        {/* JOBS */}

        <Link
          to="/jobs"
          className="hover:text-gray-200 transition"
        >

          Jobs

        </Link>


        {/* COMPANIES */}

        <Link
          to="/companies"
          className="hover:text-gray-200 transition"
        >

          Companies

        </Link>


        {/* RECOMMENDED JOBS */}

        {
          user?.role === "jobseeker" && (

            <Link
              to="/recommended-jobs"
              className="hover:text-gray-200 transition"
            >

              Recommended Jobs

            </Link>
          )
        }


        {/* EMPLOYER LINKS */}

        {
          user?.role === "employer" && (
            <>

              <Link
                to="/create-company"
                className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
              >

                Create Company

              </Link>


              <Link
                to="/create-job"
                className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
              >

                Create Job

              </Link>


              <Link
                to="/dashboard"
                className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
              >

                Dashboard

              </Link>

            </>
          )
        }


        {/* JOB SEEKER LINKS */}

        {
          user?.role === "jobseeker" && (
            <>

              <Link
                to="/applications"
                className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
              >

                My Applications

              </Link>


              <Link
                to="/resume-upload"
                className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
              >

                Resume

              </Link>

            </>
          )
        }


        {/* PROFILE */}

        {
          user && (

            <Link
              to="/profile"
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
            >

              Profile

            </Link>
          )
        }


        {/* CHANGE PASSWORD */}

        {
          user && (

            <Link
              to="/change-password"
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
            >

              Change Password

            </Link>
          )
        }


        {/* LOGIN / REGISTER */}

        {
          !user && (
            <>

              <Link
                to="/login"
                className="hover:text-gray-200 transition"
              >

                Login

              </Link>


              <Link
                to="/register"
                className="hover:text-gray-200 transition"
              >

                Register

              </Link>

            </>
          )
        }


        {/* LOGOUT */}

        {
          user && (

            <button
              onClick={
                logoutHandler
              }
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
            >

              Logout

            </button>
          )
        }

      </div>

    </nav>
  );
}