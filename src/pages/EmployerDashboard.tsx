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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ================= FETCH MY JOBS =================
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        const { data } = await API.get("/jobs/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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
      <div className="p-10 text-xl font-semibold">
        Loading Employer Dashboard...
      </div>
    );
  }

  // ================= ERROR =================
  if (error) {
    return (
      <div className="p-10">
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

  // ================= UI =================
  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        Employer Dashboard
      </h1>

      {jobs.length === 0 ? (
        <div className="text-gray-500">
          <p className="mb-4">
            No jobs posted yet
          </p>

          <Link
            to="/create-job"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Create Job
          </Link>
        </div>
      ) : (
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

              <div className="flex gap-3 flex-wrap">
                {/* VIEW JOB */}
                <Link
                  to={`/jobs/${job._id}`}
                  className="border px-4 py-2 rounded"
                >
                  View Job
                </Link>

                {/* EDIT JOB */}
                <Link
                  to={`/edit-job/${job._id}`}
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Edit Job
                </Link>

                {/* VIEW APPLICANTS */}
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