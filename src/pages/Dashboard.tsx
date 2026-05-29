import { useEffect, useState } from "react";
import API from "../services/api";
import axios from "axios";

// ================= TYPE =================
type Job = {
  _id: string;
  title: string;
  location: string;
  salary: string;
};

const getUser = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

export default function Dashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = getUser();

  // ================= FETCH JOBS =================
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setError("");

        // 🔥 IMPORTANT: employer-specific API (best practice)
        const res = await API.get("/jobs?mine=true");

        console.log("Dashboard API:", res.data);

        const jobList = res.data.jobs || res.data || [];

        setJobs(Array.isArray(jobList) ? jobList : []);

      } catch (error: unknown) {
        console.log("Dashboard error:", error);

        if (axios.isAxiosError(error)) {
          setError(error.response?.data?.message || "Failed to load jobs");
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
      <div className="text-center mt-10 text-2xl">
        Loading...
      </div>
    );
  }

  // ================= ROLE CHECK =================
  if (user?.role !== "employer") {
    return (
      <div className="p-10 text-red-500">
        Only employers can access dashboard
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        Employer Dashboard
      </h1>

      {/* ERROR */}
      {error && (
        <p className="text-red-500 mb-4">
          {error}
        </p>
      )}

      {/* EMPTY */}
      {!error && jobs.length === 0 ? (
        <div className="text-gray-500">
          No jobs posted yet
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">

          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white shadow-lg rounded-xl p-6 border"
            >

              <h2 className="text-2xl font-bold mb-3">
                {job.title}
              </h2>

              <p className="mb-2">
                📍 {job.location}
              </p>

              <p>
                💰 {job.salary}
              </p>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}