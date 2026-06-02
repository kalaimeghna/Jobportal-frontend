import { useEffect, useState } from "react";
import API from "../services/api";

type Job = {
  _id: string;
  title: string;
  description: string;
  location: string;
  salary: number | string;
  matchPercent?: number;
  matchedSkills?: string[];
  missingSkills?: string[];
};

export default function RecommendedJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);

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

        console.log("Recommended Jobs API:", response.data);

        // ✅ SAFE HANDLING (supports multiple backend formats)
        const data =
          response.data.recommendedJobs ||
          response.data.jobs ||
          [];

        setJobs(data);
      } catch (err) {
        console.log("Recommended Jobs Error:", err);
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
      <div className="p-10 text-xl text-center">
        Loading recommended jobs...
      </div>
    );
  }

  // ================= ERROR =================
  if (error) {
    return (
      <div className="p-10 text-red-600 text-center text-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="p-10 max-w-6xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        Recommended Jobs for You
      </h1>

      {jobs.length === 0 ? (
        <p className="text-gray-500">
          No recommended jobs found. Update your profile skills.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="p-6 bg-white shadow rounded-xl border"
            >
              <h2 className="text-xl font-bold">
                {job.title}
              </h2>

              <p className="text-gray-600 mt-1">
                📍 {job.location}
              </p>

              <p className="mt-1 font-semibold text-green-600">
                💰 ₹ {job.salary}
              </p>

              {/* MATCH PERCENT */}
              {job.matchPercent !== undefined && (
                <p className="mt-3 text-blue-600 font-bold">
                  🎯 {job.matchPercent}% Match
                </p>
              )}

              {/* MATCHED SKILLS */}
              {job.matchedSkills &&
                job.matchedSkills.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm text-green-700 font-semibold">
                      Matched Skills:
                    </p>

                    <div className="flex flex-wrap gap-2 mt-1">
                      {job.matchedSkills.map((skill, i) => (
                        <span
                          key={i}
                          className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              {/* MISSING SKILLS */}
              {job.missingSkills &&
                job.missingSkills.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm text-red-700 font-semibold">
                      Missing Skills:
                    </p>

                    <div className="flex flex-wrap gap-2 mt-1">
                      {job.missingSkills.map((skill, i) => (
                        <span
                          key={i}
                          className="bg-red-100 text-red-700 px-2 py-1 rounded text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}