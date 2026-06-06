import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

type Applicant = {
  _id: string;
  status: string;
  applicant: {
    name: string;
    email: string;
    phone?: string;
    skills?: string[];
    experience?: string;
  };
};

export default function Applicants() {
  const { id } = useParams();
  const [applications, setApplications] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH =================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const { data } = await API.get(
          `/applications/job/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setApplications(data.applications || []);
      } catch (err) {
        console.log("FETCH ERROR:", err);
        setApplications([]);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  // ================= STATUS UPDATE =================
  const updateStatus = async (appId: string, status: string) => {
    try {
      const token = localStorage.getItem("token");

      await API.put(
        `/applications/status/${appId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setApplications((prev) =>
        prev.map((app) =>
          app._id === appId ? { ...app, status } : app
        )
      );
    } catch (err) {
      console.log("UPDATE ERROR:", err);
    }
  };

  if (loading) return <div className="p-10">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Job Applicants
      </h1>

      {applications.length === 0 ? (
        <p>No applicants yet</p>
      ) : (
        applications.map((app) => (
          <div
            key={app._id}
            className="border p-4 mb-3 rounded"
          >
            <h2 className="font-bold">
              {app.applicant?.name}
            </h2>

            <p>{app.applicant?.email}</p>

            <p className="text-sm text-gray-500">
              Status: {app.status}
            </p>

            {/* STATUS BUTTONS */}
            <div className="flex gap-2 mt-3">

              <button
                onClick={() =>
                  updateStatus(app._id, "interview")
                }
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                Interview
              </button>

              <button
                onClick={() =>
                  updateStatus(app._id, "selected")
                }
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Select
              </button>

              <button
                onClick={() =>
                  updateStatus(app._id, "rejected")
                }
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}