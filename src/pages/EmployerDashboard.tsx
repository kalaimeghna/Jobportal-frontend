import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import API from "../services/api";

// ================= TYPES =================
type Job = {
  _id: string;
  title: string;
  location: string;
  salary: string;
};

export default function EmployerDashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ================= FETCH MY JOBS =================
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError("");

        // ❌ NO TOKEN NEEDED (API interceptor handles it)
        const { data } = await API.get("/jobs/my");

        setJobs(data?.jobs || []);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          console.error("STATUS:", err.response?.status);
          console.error("ERROR:", err.response?.data);

          setError(
            err.response?.data?.message ||
              "Failed to load employer jobs"
          );
        } else {
          setError("Something went wrong");
        }

        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="p-10 text-center text-xl font-semibold">
        Loading Employer Dashboard...
      </div>
    );
  }

  // ================= ERROR =================
  if (error) {
    return (
      <div className="p-10 text-center">
        <p className="text-red-600 text-lg mb-4">
          {error}
        </p>

        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        Employer Dashboard
      </h1>

      {/* ================= EMPTY STATE ================= */}
      {jobs.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          <p className="text-lg mb-4">
            No jobs posted yet 🚀
          </p>

          <Link
            to="/create-job"
            className="bg-green-600 text-white px-6 py-2 rounded"
          >
            Create Your First Job
          </Link>
        </div>
      ) : (
        // ================= JOB LIST =================
        <div className="grid md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white border shadow rounded-xl p-6"
            >
              <h2 className="text-2xl font-bold mb-2">
                {job.title}
              </h2>

              <p className="text-gray-600">
                📍 {job.location}
              </p>

              <p className="text-green-600 mb-4">
                💰 {job.salary}
              </p>

              {/* ================= ACTIONS ================= */}
              <div className="flex gap-3 flex-wrap">
                <Link
                  to={`/jobs/${job._id}`}
                  className="border px-4 py-2 rounded"
                >
                  View Job
                </Link>

                <Link
                  to={`/edit-job/${job._id}`}
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Edit Job
                </Link>

                <Link
                  to={`/job-applicants/${job._id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  View Applicants
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}