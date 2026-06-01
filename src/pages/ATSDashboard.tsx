import { useEffect, useState } from "react";
import API from "../services/api";

// ================= TYPES =================
type ApplicationStatus =
  | "applied"
  | "pending"
  | "shortlisted"
  | "interviewed"
  | "rejected";

type RawApplication = {
  _id?: string;
  jobTitle?: string;
  applicantName?: string;
  status?: string;
  createdAt?: string;
};

type Application = {
  _id: string;
  jobTitle: string;
  applicantName: string;
  status: ApplicationStatus;
  createdAt: string;
};

export default function ATSDashboard() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // ================= FETCH =================
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);

        const res = await API.get("/applications/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const raw = res.data;

        const data: RawApplication[] =
          Array.isArray(raw)
            ? raw
            : Array.isArray(raw?.applications)
            ? raw.applications
            : Array.isArray(raw?.data)
            ? raw.data
            : [];

        const safeData: Application[] = data.map((app) => ({
          _id: app._id ?? Math.random().toString(),
          jobTitle: app.jobTitle ?? "No Title",
          applicantName: app.applicantName ?? "Unknown",
          status: (app.status as ApplicationStatus) ?? "applied",
          createdAt: app.createdAt ?? new Date().toISOString(),
        }));

        setApplications(safeData);
      } catch (err) {
        console.log(err);
        setApplications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  // ================= STATUS UPDATE =================
  const updateStatus = async (id: string, status: ApplicationStatus) => {
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

      setApplications((prev) =>
        prev.map((app) =>
          app._id === id ? { ...app, status } : app
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  // ================= FILTER + SEARCH =================
  const filteredApps = applications.filter((app) => {
    const matchesFilter =
      filter === "all" || app.status === filter;

    const matchesSearch =
      app.jobTitle.toLowerCase().includes(search.toLowerCase()) ||
      app.applicantName.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // ================= COLOR =================
  const getColor = (status: ApplicationStatus) => {
    switch (status) {
      case "applied":
      case "pending":
        return "bg-yellow-500";
      case "shortlisted":
        return "bg-green-600";
      case "interviewed":
        return "bg-blue-600";
      case "rejected":
        return "bg-red-600";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* TITLE */}
      <h1 className="text-2xl font-bold mb-4">
        ATS Dashboard (Recruiter Panel)
      </h1>

      {/* SEARCH BAR */}
      <input
        type="text"
        placeholder="Search job or candidate..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      {/* FILTER */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {["all", "applied", "pending", "shortlisted", "interviewed", "rejected"].map(
          (f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 border rounded text-sm ${
                filter === f ? "bg-black text-white" : "bg-white"
              }`}
            >
              {f.toUpperCase()}
            </button>
          )
        )}
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-gray-500 mb-3">Loading...</p>
      )}

      {/* EMPTY STATE */}
      {!loading && filteredApps.length === 0 && (
        <p className="text-gray-500">No applications found</p>
      )}

      {/* LIST */}
      <div className="space-y-3">
        {filteredApps.map((app) => (
          <div
            key={app._id}
            className="bg-white p-4 border rounded flex justify-between items-center shadow"
          >

            {/* LEFT */}
            <div>
              <h2 className="font-bold">{app.jobTitle}</h2>
              <p className="text-sm text-gray-500">
                {app.applicantName}
              </p>
              <p className="text-xs text-gray-400">
                {new Date(app.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* RIGHT */}
            <div className="flex gap-2 items-center">

              <span
                className={`text-white text-xs px-3 py-1 rounded ${getColor(
                  app.status
                )}`}
              >
                {app.status}
              </span>

              <button
                onClick={() => updateStatus(app._id, "shortlisted")}
                className="bg-green-500 text-white px-2 py-1 text-xs rounded"
              >
                Shortlist
              </button>

              <button
                onClick={() => updateStatus(app._id, "interviewed")}
                className="bg-blue-500 text-white px-2 py-1 text-xs rounded"
              >
                Interview
              </button>

              <button
                onClick={() => updateStatus(app._id, "rejected")}
                className="bg-red-500 text-white px-2 py-1 text-xs rounded"
              >
                Reject
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}