import { useEffect, useState } from "react";
import API from "../services/api";

// ================= TYPES =================
type Job = {
  title: string;
  location?: string;
  salary?: string;
};

type Application = {
  _id: string;
  status: string;
  createdAt: string;
  job?: Job;
};

export default function Applications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ================= FETCH APPLICATIONS =================
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");

        const { data } = await API.get("/applications/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setApplications(data?.applications || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load applications");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="p-10 text-center text-lg">
        Loading applications...
      </div>
    );
  }

  // ================= ERROR =================
  if (error) {
    return (
      <div className="p-10 text-center text-red-600">
        {error}
      </div>
    );
  }

  // ================= UI =================
  return (
    <div className="max-w-5xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        My Applications
      </h1>

      {applications.length === 0 ? (
        <p className="text-gray-500">
          No applications found
        </p>
      ) : (
        <div className="space-y-4">

          {applications.map((app) => (
            <div
              key={app._id}
              className="border p-4 rounded shadow bg-white"
            >

              {/* JOB TITLE */}
              <h2 className="text-xl font-bold">
                {app.job?.title || "No Job Title"}
              </h2>

              {/* STATUS */}
              <p className="text-gray-600 mt-1">
                Status:{" "}
                <span className="font-semibold">
                  {app.status}
                </span>
              </p>

              {/* DATE */}
              <p className="text-sm text-gray-400">
                Applied on:{" "}
                {new Date(app.createdAt).toLocaleDateString()}
              </p>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}