import { useEffect, useState } from "react";
import API from "../services/api";

type Job = {
  _id: string;
  title: string;
  description: string;
  location: string;
  salary: number;
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

        // ✅ IMPORTANT FIX
        setJobs(response.data.recommendedJobs || []);
      } catch (err) {
        console.log(err);
        setError("Failed to load recommended jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <div className="p-10 text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="p-10 text-red-600">{error}</div>;
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Recommended Jobs
      </h1>

      {jobs.length === 0 ? (
        <p>No recommended jobs found</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div key={job._id} className="p-5 shadow rounded-lg">
              <h2 className="text-xl font-bold">{job.title}</h2>

              <p className="text-gray-600">{job.location}</p>
              <p>₹ {job.salary}</p>

              {/* MATCH SCORE */}
              {job.matchPercent !== undefined && (
                <p className="text-green-600 font-bold mt-2">
                  {job.matchPercent}% Match
                </p>
              )}

              {/* SKILLS */}
              <div className="flex flex-wrap gap-2 mt-3">
                {(job.matchedSkills || []).map((skill, i) => (
                  <span
                    key={i}
                    className="bg-green-100 text-green-700 px-2 py-1 rounded"
                  >
                    {skill}
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