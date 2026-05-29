import { useEffect, useState } from "react";
import API from "../services/api";

// ================= TYPE =================
type Job = {
  _id: string;
  title: string;
  location: string;
  salary: number;
};

export default function Dashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH JOBS =================
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await API.get("/jobs");

        console.log("API RESPONSE:", data);

        // 🔥 SAFE FIX (handles all backend formats)
        const jobList = data.jobs || data || [];

        setJobs(Array.isArray(jobList) ? jobList : []);

      } catch (error) {
        console.log("Dashboard error:", error);
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

  return (
    <div className="max-w-6xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        Dashboard
      </h1>

      {/* ================= EMPTY STATE ================= */}
      {jobs.length === 0 ? (
        <div className="text-gray-500">
          No jobs found
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
                💰 ₹{job.salary}
              </p>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}