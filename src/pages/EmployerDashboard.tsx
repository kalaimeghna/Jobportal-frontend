import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

  // ================= FETCH MY JOBS =================
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");

        const { data } = await API.get("/jobs/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setJobs(data.jobs || []);
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
      <div className="p-10 text-xl">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        Employer Dashboard
      </h1>

      {jobs.length === 0 ? (
        <p className="text-gray-500">
          No jobs posted yet
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">

          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white shadow-lg border rounded-xl p-6"
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

              {/* ACTION BUTTONS */}
              <div className="flex gap-3">

                <Link
                  to={`/jobs/${job._id}/applicants`}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  View Applicants
                </Link>

                <Link
                  to={`/jobs/${job._id}`}
                  className="border px-4 py-2 rounded"
                >
                  View Job
                </Link>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}