import API from "../services/api";
import axios from "axios";
import { useState } from "react";

// ================= JOB TYPE =================
type ApplicationStatus =
  | "none"
  | "applied"
  | "pending"
  | "shortlisted"
  | "rejected";

interface Job {
  _id: string;
  title: string;
  description: string;
  location: string;
  salary: string;
  companyName?: string;
  applicationStatus?: ApplicationStatus;
}

export default function JobCard({ job }: { job: Job }) {
  const [status, setStatus] = useState<ApplicationStatus>(
    job.applicationStatus || "none"
  );

  const [loading, setLoading] = useState(false);

  // ================= APPLY =================
  const handleApply = async () => {
    if (status !== "none") return;

    try {
      setLoading(true);

      const res = await API.post(
        `/applications/apply/${job._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setStatus(res.data.status || "applied");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.message || "Apply failed");
      } else {
        alert("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  // ================= STATUS UI =================
  const getStatusColor = () => {
    switch (status) {
      case "applied":
      case "pending":
        return "bg-yellow-500";
      case "shortlisted":
        return "bg-green-600";
      case "rejected":
        return "bg-red-600";
      default:
        return "bg-blue-600";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "applied":
        return "Applied";
      case "pending":
        return "Pending";
      case "shortlisted":
        return "Shortlisted";
      case "rejected":
        return "Rejected";
      default:
        return "Apply Now";
    }
  };

  // ✅ FIXED: proper boolean
  const isDisabled: boolean = status !== "none";

  return (
    <div className="bg-white p-5 rounded-xl shadow border hover:shadow-lg transition">

      {/* TITLE */}
      <h2 className="text-xl font-bold text-gray-900">
        {job.title}
      </h2>

      {/* COMPANY */}
      {job.companyName && (
        <p className="text-sm text-gray-500 mt-1">
          🏢 {job.companyName}
        </p>
      )}

      {/* DESCRIPTION */}
      <p className="text-gray-600 mt-2 line-clamp-2">
        {job.description}
      </p>

      {/* INFO */}
      <div className="text-sm mt-3 text-gray-700 space-y-1">
        <p>📍 {job.location}</p>
        <p>💰 ₹{job.salary}</p>
      </div>

      {/* STATUS BADGE */}
      {status !== "none" && (
        <span
          className={`inline-block mt-3 px-3 py-1 text-white text-xs rounded ${getStatusColor()}`}
        >
          {getStatusText()}
        </span>
      )}

      {/* APPLY BUTTON */}
      <button
        onClick={handleApply}
        disabled={loading || isDisabled}
        className={`mt-4 w-full px-4 py-2 rounded text-white transition
          ${
            isDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }
        `}
      >
        {loading ? "Applying..." : getStatusText()}
      </button>
    </div>
  );
}