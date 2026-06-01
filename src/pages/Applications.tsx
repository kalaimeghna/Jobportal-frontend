import { useEffect, useState } from "react";
import API from "../services/api";

type Application = {
  _id: string;
  status: "pending" | "reviewed" | "interview" | "accepted" | "rejected";
  job: {
    _id: string;
    title: string;
    location?: string;
    salary?: string;
  };
  applicant: {
    _id: string;
    name: string;
    email: string;
    phone?: string;
  };
  createdAt: string;
};

export default function Applications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // ================= FETCH APPLICATIONS =================
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("token");

        const url =
          user?.role === "employer"
            ? "/applications/employer"
            : "/applications/me";

        const { data } = await API.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setApplications(
          Array.isArray(data?.applications) ? data.applications : []
        );
      } catch (error) {
        console.log("Error fetching applications:", error);
        setApplications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [user?.role]);

  // ================= STATUS COLOR (FIXED FOR BACKEND) =================
  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "text-green-600 font-semibold";
      case "rejected":
        return "text-red-600 font-semibold";
      case "interview":
        return "text-blue-600 font-semibold";
      case "reviewed":
        return "text-purple-600 font-semibold";
      default:
        return "text-yellow-600 font-semibold"; // pending
    }
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="p-10 text-xl font-medium">
        Loading applications...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">

      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-6">
        {user?.role === "employer"
          ? "Employer Applications (ATS)"
          : "My Applications"}
      </h1>

      {/* EMPTY STATE */}
      {applications.length === 0 ? (
        <p className="text-gray-600">No applications found</p>
      ) : (
        <div className="grid gap-5">

          {applications.map((app) => (
            <div
              key={app._id}
              className="bg-white shadow-md p-6 border rounded-xl hover:shadow-lg transition"
            >

              {/* JOB INFO */}
              <h2 className="text-2xl font-bold text-gray-800">
                {app.job?.title || "Job Deleted"}
              </h2>

              <p className="text-gray-600 mt-1">
                📍 {app.job?.location || "Not specified"}
              </p>

              <p className="text-gray-600">
                💰 {app.job?.salary ? `₹${app.job.salary}` : "Not specified"}
              </p>

              {/* APPLICANT INFO (EMPLOYER ONLY) */}
              {user?.role === "employer" && app.applicant && (
                <div className="mt-3 text-gray-700">
                  👤 {app.applicant.name} <br />
                  📧 {app.applicant.email}
                </div>
              )}

              {/* STATUS */}
              <p className="mt-3">
                Status:{" "}
                <span className={getStatusColor(app.status)}>
                  {app.status}
                </span>
              </p>

              {/* DATE */}
              <p className="text-sm text-gray-400 mt-2">
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