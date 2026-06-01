import { useEffect, useState } from "react";
import API from "../services/api";

// ================= TYPES =================
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
};

// ================= CARD COMPONENT (OUTSIDE) =================
function Card({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) {
  return (
    <div className={`p-4 rounded shadow bg-white border-l-4 ${color}`}>
      <h2 className="text-gray-600 text-sm">{title}</h2>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

export default function ATSAnalytics() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);

  // ================= FETCH =================
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await API.get("/applications/me", {
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

        const safe = data.map((app) => ({
          _id: app._id,
          jobTitle: app.jobTitle ?? "No Title",
          applicantName: app.applicantName ?? "Unknown",
          status: app.status ?? "applied",
          createdAt: app.createdAt ?? new Date().toISOString(),
        }));

        setApplications(safe);
      } catch (err) {
        console.log(err);
        setApplications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ================= STATS =================
  const total = applications.length;

  const shortlisted = applications.filter(
    (a) => a.status === "shortlisted"
  ).length;

  const interviewed = applications.filter(
    (a) => a.status === "interviewed"
  ).length;

  const rejected = applications.filter(
    (a) => a.status === "rejected"
  ).length;

  const applied = applications.filter(
    (a) => a.status === "applied" || a.status === "pending"
  ).length;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      <h1 className="text-2xl font-bold mb-6">
        ATS Analytics Dashboard
      </h1>

      {loading && (
        <p className="text-gray-500 mb-4">
          Loading analytics...
        </p>
      )}

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        <Card title="Total Applications" value={total} color="border-gray-500" />

        <Card title="Applied / Pending" value={applied} color="border-yellow-500" />

        <Card title="Shortlisted" value={shortlisted} color="border-green-500" />

        <Card title="Interviewed" value={interviewed} color="border-blue-500" />

        <Card title="Rejected" value={rejected} color="border-red-500" />

      </div>
    </div>
  );
}