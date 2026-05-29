import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

// ================= TYPES =================
type Job = {
  _id: string;
  title: string;
  location: string;
  salary: string;
  createdBy?: {
    _id: string;
    name: string;
  };
};

export default function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  // ================= SAFE USER PARSE =================
  let user = null;
  try {
    const storedUser = localStorage.getItem("user");
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.log("User parse error:", error);
    user = null;
  }

  // ================= FETCH JOBS =================
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await API.get("/jobs");

        setJobs(Array.isArray(data.jobs) ? data.jobs : []);

      } catch (error) {
        console.log("Fetch jobs error:", error);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // ================= DELETE JOB =================
  const handleDelete = async (id: string) => {
    try {
      const confirmDelete = window.confirm("Delete this job?");
      if (!confirmDelete) return;

      await API.delete(`/jobs/${id}`);

      setJobs((prev) => prev.filter((job) => job._id !== id));

      alert("Job deleted successfully");

    } catch (error) {
      console.log("Delete error:", error);
      alert("Delete failed");
    }
  };

  // ================= LOADING =================
  if (loading) {
    return <div className="p-10 text-xl">Loading jobs...</div>;
  }

  return (
    <div className="p-10">

      <h1 className="text-4xl font-bold mb-8">Jobs</h1>

      {/* EMPTY STATE */}
      {jobs.length === 0 ? (
        <p className="text-gray-600">No jobs available</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">

          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white shadow-lg rounded-xl p-6 border"
            >

              {/* TITLE */}
              <h2 className="text-2xl font-bold">
                {job.title || "No Title"}
              </h2>

              {/* LOCATION */}
              <p className="mt-3 text-gray-700">
                📍 {job.location || "Not specified"}
              </p>

              {/* SALARY */}
              <p className="mt-2 text-gray-700">
                💰 ₹{job.salary || "0"}
              </p>

              {/* COMPANY / USER */}
              <p className="mt-2 text-gray-700">
                🏢 {job.createdBy?.name || "Unknown"}
              </p>

              {/* VIEW */}
              <Link to={`/jobs/${job._id}`}>
                <button className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                  View Details
                </button>
              </Link>

              {/* EDIT / DELETE ONLY OWNER */}
              {user && job.createdBy && user._id === job.createdBy._id && (
                <div className="flex gap-3 mt-5">

                  <Link to={`/edit-job/${job._id}`}>
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg">
                      Edit
                    </button>
                  </Link>

                  <button
                    onClick={() => handleDelete(job._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>

                </div>
              )}

            </div>
          ))}

        </div>
      )}

    </div>
  );
}