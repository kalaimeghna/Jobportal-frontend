import { useEffect, useState } from "react";
import API from "../services/api";

// ================= TYPES =================

type Job = {
  _id: string;
  title: string;
  description: string;
  location: string;
  salary: number;
  requirements: string | string[]; // ✅ FIXED
};

export default function RecommendedJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ================= FETCH JOBS =================

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Please login to view recommended jobs");
          setLoading(false);
          return;
        }

        const response = await API.get("/jobs/recommended", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setJobs(response.data.jobs || []);
      } catch (err) {
        console.log(err);
        setError("Failed to load recommended jobs");
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
        Loading recommended jobs...
      </div>
    );
  }

  // ================= ERROR =================

  if (error) {
    return (
      <div className="p-10 text-red-600 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-8">
        Recommended Jobs
      </h1>

      {/* NO JOBS */}
      {jobs.length === 0 ? (
        <p className="text-gray-600">
          No recommended jobs found
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              {/* TITLE */}
              <h2 className="text-2xl font-bold mb-3">
                {job.title}
              </h2>

              {/* LOCATION */}
              <p className="mb-2">
                📍 {job.location}
              </p>

              {/* SALARY */}
              <p className="mb-3">
                💰 ₹{job.salary}
              </p>

              {/* DESCRIPTION */}
              <p className="text-gray-600 mb-4">
                {job.description}
              </p>

              {/* REQUIREMENTS (SAFE HANDLING) */}
              <div className="flex flex-wrap gap-2">
                {(Array.isArray(job.requirements)
                  ? job.requirements
                  : job.requirements?.split(",") || []
                ).map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}