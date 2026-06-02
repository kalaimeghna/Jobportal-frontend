import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

// ================= TYPES =================
type Job = {
  _id: string;
  title: string;
  location: string;
  salary: number | string;
  createdBy?: {
    _id: string;
    name: string;
  };
};

type User = {
  _id?: string;
  id?: string;
  name?: string;
  role?: string;
};

export default function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ================= USER =================
  const storedUser = localStorage.getItem("user");
  const user: User | null = storedUser ? JSON.parse(storedUser) : null;

  const userId = user?._id || user?.id;

  // ================= FETCH JOBS =================
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError("");

        const { data } = await API.get("/jobs");

        const list = Array.isArray(data.jobs) ? data.jobs : data;

        setJobs(Array.isArray(list) ? list : []);
      } catch (err) {
        console.log("Fetch jobs error:", err);
        setError("Failed to load jobs");
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
    } catch (err) {
      console.log("Delete error:", err);
      alert("Delete failed");
    }
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="p-10 text-xl text-center">
        Loading jobs...
      </div>
    );
  }

  // ================= ERROR =================
  if (error) {
    return (
      <div className="p-10 text-red-600 text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="p-10 max-w-6xl mx-auto">

      <h1 className="text-4xl font-bold mb-8">
        Jobs
      </h1>

      {/* EMPTY STATE */}
      {jobs.length === 0 ? (
        <p className="text-gray-600">
          No jobs available
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">

          {jobs.map((job) => {
            const jobOwnerId = job.createdBy?._id;

            return (
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

                {/* OWNER */}
                <p className="mt-2 text-gray-700">
                  🏢 {job.createdBy?.name || "Unknown"}
                </p>

                {/* VIEW */}
                <Link to={`/jobs/${job._id}`}>
                  <button className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full">
                    View Details
                  </button>
                </Link>

                {/* OWNER ACTIONS */}
                {userId &&
                  jobOwnerId &&
                  userId === jobOwnerId && (
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
            );
          })}

        </div>
      )}
    </div>
  );
}