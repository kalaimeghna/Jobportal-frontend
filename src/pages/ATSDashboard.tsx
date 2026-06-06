import { useEffect, useState } from "react";
import API from "../services/api";

// ================= TYPES =================
type ApplicationStatus =
  | "pending"
  | "interview"
  | "selected"
  | "rejected";

type RawApplication = {
  _id: string;
  job?: {
    title?: string;
  };
  applicant?: {
    name?: string;
  };
  status?: ApplicationStatus;
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
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // ================= FETCH =================
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);

        const res = await API.get("/applications/my");

        const raw: RawApplication[] = res.data?.applications || [];

        const formatted: Application[] = raw.map((app) => ({
          _id: app._id,
          jobTitle: app.job?.title || "No Title",
          applicantName: app.applicant?.name || "Unknown",
          status: app.status || "pending",
          createdAt: app.createdAt || new Date().toISOString(),
        }));

        setApplications(formatted);
      } catch (err) {
        console.log("FETCH ERROR:", err);
        setApplications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  // ================= UPDATE STATUS =================
  const updateStatus = async (id: string, status: ApplicationStatus) => {
    try {
      await API.put(`/applications/status/${id}`, { status });

      setApplications((prev) =>
        prev.map((app) =>
          app._id === id ? { ...app, status } : app
        )
      );
    } catch (err) {
      console.log("STATUS ERROR:", err);
    }
  };

  // ================= FILTER =================
  const filteredApps = applications.filter((app) => {
    const matchesFilter = filter === "all" || app.status === filter;

    const matchesSearch =
      app.jobTitle.toLowerCase().includes(search.toLowerCase()) ||
      app.applicantName.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // ================= UI =================
  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      <h1 className="text-2xl font-bold mb-4">
        ATS Dashboard
      </h1>

      {/* SEARCH */}
      <input
        className="w-full p-2 border rounded mb-4"
        placeholder="Search job or candidate..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* FILTER */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {["all", "pending", "interview", "selected", "rejected"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 border rounded text-sm ${
              filter === f ? "bg-black text-white" : "bg-white"
            }`}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {/* LOADING */}
      {loading && <p>Loading...</p>}

      {/* EMPTY */}
      {!loading && filteredApps.length === 0 && (
        <p className="text-gray-500">No applications found</p>
      )}

      {/* LIST */}
      <div className="space-y-3">
        {filteredApps.map((app) => (
          <div
            key={app._id}
            className="bg-white p-4 border rounded flex justify-between items-center"
          >
            <div>
              <h2 className="font-bold">{app.jobTitle}</h2>
              <p className="text-sm text-gray-500">
                {app.applicantName}
              </p>
            </div>

            <div className="flex gap-2 items-center">

              <span className="px-3 py-1 text-xs bg-gray-200 rounded">
                {app.status}
              </span>

              <button
                onClick={() => updateStatus(app._id, "interview")}
                className="bg-blue-500 text-white px-2 py-1 text-xs rounded"
              >
                Interview
              </button>

              <button
                onClick={() => updateStatus(app._id, "selected")}
                className="bg-green-500 text-white px-2 py-1 text-xs rounded"
              >
                Select
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