import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

type Applicant = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  skills?: string[];
  experience?: string;
  resumeUrl?: string;
};

type Application = {
  _id: string;
  status: string;
  applicant: Applicant;
};

export default function EmployerApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { id } = useParams();
  const jobId = id;

  // ================= FETCH APPLICATIONS =================
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        setError("");

        if (!jobId) return;

        const { data } = await API.get(
          `/applications/job/${jobId}`
        );

        setApplications(data?.applications || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load applications");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [jobId]);

  // ================= UPDATE STATUS =================
  const updateStatus = async (id: string, status: string) => {
    try {
      await API.put(`/applications/status/${id}`, { status });

      setApplications((prev) =>
        prev.map((app) =>
          app._id === id ? { ...app, status } : app
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="text-center mt-10 text-xl">
        Loading applications...
      </div>
    );
  }

  // ================= ERROR =================
  if (error) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-600 text-lg mb-4">{error}</p>

        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        Employer Applications
      </h1>

      {applications.length === 0 ? (
        <div className="bg-white shadow-md rounded-lg p-6 text-gray-600">
          No applications found
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {applications.map((app) => (
            <div
              key={app._id}
              className="bg-white shadow-lg rounded-xl p-6 border"
            >
              <h2 className="text-2xl font-bold mb-3">
                {app.applicant?.name}
              </h2>

              <p>📧 {app.applicant?.email}</p>
              <p>📞 {app.applicant?.phone || "N/A"}</p>
              <p>💼 {app.applicant?.experience || "N/A"}</p>

              <p className="mt-2">
                🛠{" "}
                {app.applicant?.skills?.length
                  ? app.applicant.skills.join(", ")
                  : "N/A"}
              </p>

              {/* STATUS */}
              <div className="mt-4">
                <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold">
                  {app.status}
                </span>
              </div>

              {/* BUTTONS */}
              <div className="mt-5 flex gap-3 flex-wrap">
                {app.applicant?.resumeUrl ? (
                  <a
                    href={app.applicant.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    View Resume
                  </a>
                ) : (
                  <button
                    disabled
                    className="bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed"
                  >
                    No Resume
                  </button>
                )}

                <button
                  onClick={() =>
                    updateStatus(app._id, "Interview")
                  }
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                >
                  Interview
                </button>

                <button
                  onClick={() =>
                    updateStatus(app._id, "Selected")
                  }
                  className="bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  Selected
                </button>

                <button
                  onClick={() =>
                    updateStatus(app._id, "Rejected")
                  }
                  className="bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Rejected
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}