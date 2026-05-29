import { useEffect, useState } from "react";
import API from "../services/api";

type Application = {
  _id: string;
  status: string;
  job: {
    _id: string;
    title: string;
    location: string;
    salary: number;
  };
  createdAt: string;
};

export default function Applications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH APPLICATIONS =================
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const { data } = await API.get("/applications");

        setApplications(data.applications || []);
      } catch (error) {
        console.log("Fetch applications error:", error);
        setApplications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  // ================= LOADING =================
  if (loading) {
    return <div className="p-10 text-xl">Loading applications...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-6">
        My Applications
      </h1>

      {/* EMPTY STATE */}
      {applications.length === 0 ? (
        <p className="text-gray-600">
          No applications found
        </p>
      ) : (
        <div className="grid gap-5">

          {applications.map((app) => (
            <div
              key={app._id}
              className="bg-white shadow-md rounded-xl p-6 border"
            >

              {/* JOB TITLE */}
              <h2 className="text-2xl font-bold">
                {app.job?.title || "Job Deleted"}
              </h2>

              {/* LOCATION */}
              <p className="text-gray-700 mt-2">
                📍 {app.job?.location || "N/A"}
              </p>

              {/* SALARY */}
              <p className="text-green-600 mt-2">
                💰 ₹{app.job?.salary || 0}
              </p>

              {/* STATUS */}
              <p className="mt-3">
                Status:{" "}
                <span
                  className={
                    app.status === "pending"
                      ? "text-yellow-500"
                      : app.status === "accepted"
                      ? "text-green-600"
                      : "text-red-500"
                  }
                >
                  {app.status}
                </span>
              </p>

              {/* DATE */}
              <p className="text-sm text-gray-500 mt-2">
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