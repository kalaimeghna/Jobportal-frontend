import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import axios from "axios";

type Job = {
  _id: string;
  title: string;
  location: string;
  salary: number;
  createdAt?: string;
};

export default function Dashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // ================= FETCH JOBS =================
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError("");

        const user = JSON.parse(localStorage.getItem("user") || "null");

        // ROLE CHECK
        if (!user || user.role !== "employer") {
          setError("Only employers can access dashboard");
          setLoading(false);
          return;
        }

        const res = await API.get("/jobs?mine=true");

        const data = res.data.jobs || res.data;

        setJobs(Array.isArray(data) ? data : []);

      } catch (error) {
        console.log("Dashboard Error:", error);

        if (axios.isAxiosError(error)) {
          setError(
            error.response?.data?.message ||
            "Failed to load dashboard"
          );
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // ================= DELETE JOB =================
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/jobs/${id}`);

      setJobs((prev) => prev.filter((job) => job._id !== id));

      alert("Job deleted successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to delete job");
    }
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="text-center mt-10 text-2xl">
        Loading dashboard...
      </div>
    );
  }

  // ================= ERROR =================
  if (error) {
    return (
      <div className="text-center mt-10 text-red-600 text-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          Employer Dashboard
        </h1>

        <button
          onClick={() => navigate("/create-job")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
        >
          + Create Job
        </button>

      </div>

      {/* STATS */}
      <div className="mb-8">
        <div className="bg-white shadow-md rounded-xl p-6">

          <h2 className="text-2xl font-semibold">
            Total Jobs Posted
          </h2>

          <p className="text-4xl font-bold text-blue-600 mt-2">
            {jobs.length}
          </p>

        </div>
      </div>

      {/* EMPTY STATE */}
      {jobs.length === 0 ? (
        <div className="bg-white shadow rounded-xl p-6">
          <p className="text-gray-500">
            No jobs posted yet.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white shadow-lg rounded-xl p-6 border"
            >

              <h2 className="text-2xl font-bold mb-3">
                {job.title}
              </h2>

              <p className="text-gray-600 mb-2">
                📍 {job.location}
              </p>

              <p className="text-green-600 font-semibold mb-3">
                💰 ₹{job.salary}
              </p>

              {job.createdAt && (
                <p className="text-sm text-gray-500 mb-4">
                  Posted on{" "}
                  {new Date(job.createdAt).toLocaleDateString()}
                </p>
              )}

              <div className="flex gap-4 flex-wrap">

                <button
                  onClick={() => navigate(`/jobs/${job._id}`)}
                  className="text-blue-600 hover:underline"
                >
                  View
                </button>

                <button
                  onClick={() => navigate(`/edit-job/${job._id}`)}
                  className="text-green-600 hover:underline"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    navigate(`/job-applicants/${job._id}`)
                  }
                  className="text-purple-600 hover:underline"
                >
                  Applicants
                </button>

                <button
                  onClick={() => handleDelete(job._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}