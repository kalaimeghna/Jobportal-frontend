import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

type ApplicationStatus =
  | "applied"
  | "pending"
  | "shortlisted"
  | "interviewed"
  | "rejected";

type Application = {
  _id: string;
  jobTitle: string;
  applicantName: string;
  status: ApplicationStatus;
  createdAt: string;
  resumeUrl?: string;
};

export default function ApplicationDetails() {
  const { id } = useParams();
  const [app, setApp] = useState<Application | null>(null);
  const [loading, setLoading] = useState(false);

  // ================= FETCH SINGLE APPLICATION =================
  useEffect(() => {
    const fetchApp = async () => {
      try {
        setLoading(true);

        const res = await API.get(`/applications/me`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const raw = res.data;

        const data: Application[] = Array.isArray(raw)
          ? raw
          : Array.isArray(raw?.applications)
          ? raw.applications
          : [];

        const found = data.find((a) => a._id === id);

        setApp(found || null);
      } catch (err) {
        console.log(err);
        setApp(null);
      } finally {
        setLoading(false);
      }
    };

    fetchApp();
  }, [id]);

  // ================= UPDATE STATUS =================
  const updateStatus = async (status: ApplicationStatus) => {
    if (!id) return;

    try {
      await API.put(
        `/applications/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (app) {
        setApp({ ...app, status });
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-gray-500">
        Loading candidate...
      </div>
    );
  }

  if (!app) {
    return (
      <div className="p-6 text-red-500">
        Application not found
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      <h1 className="text-2xl font-bold mb-4">
        Candidate Details
      </h1>

      <div className="bg-white p-5 rounded shadow space-y-3">

        <p><b>Name:</b> {app.applicantName}</p>

        <p><b>Job:</b> {app.jobTitle}</p>

        <p><b>Status:</b> {app.status}</p>

        <p><b>Applied Date:</b> {new Date(app.createdAt).toLocaleDateString()}</p>

        {/* RESUME */}
        {app.resumeUrl && (
          <a
            href={app.resumeUrl}
            target="_blank"
            className="text-blue-600 underline"
          >
            View Resume
          </a>
        )}

        {/* ACTIONS */}
        <div className="flex gap-2 pt-3">

          <button
            onClick={() => updateStatus("shortlisted")}
            className="bg-green-500 text-white px-3 py-1 rounded"
          >
            Shortlist
          </button>

          <button
            onClick={() => updateStatus("interviewed")}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Interview
          </button>

          <button
            onClick={() => updateStatus("rejected")}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Reject
          </button>

        </div>
      </div>
    </div>
  );
}