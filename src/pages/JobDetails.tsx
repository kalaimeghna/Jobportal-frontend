import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

// ================= TYPES =================
type Job = {
  _id: string;
  title: string;
  description: string;
  location: string;
  salary: number;
  createdBy?: {
    _id: string;
    name: string;
  };
};

type ApiError = {
  response?: {
    data?: {
      message?: string;
    };
  };
};

export default function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  // ================= FETCH JOB =================
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const { data } = await API.get(`/jobs/${id}`);
        setJob(data.job);
      } catch (error: unknown) {
        console.log("Fetch job error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  // ================= APPLY JOB =================
  const handleApply = async () => {
    try {
      setApplying(true);

      const res = await API.post(`/applications/${id}`);

      alert(res.data.message || "Applied successfully");

    } catch (error: unknown) {
      console.log("Apply error:", error);

      const err = error as ApiError;

      alert(
        err.response?.data?.message ||
          "Already applied or something went wrong"
      );

    } finally {
      setApplying(false);
    }
  };

  // ================= LOADING =================
  if (loading) {
    return <div className="p-10">Loading job...</div>;
  }

  // ================= NOT FOUND =================
  if (!job) {
    return <div className="p-10 text-red-500">Job not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow rounded-lg">

      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-4">
        {job.title}
      </h1>

      {/* COMPANY */}
      <p className="text-gray-600 mb-2">
        🏢 {job.createdBy?.name || "Unknown Company"}
      </p>

      {/* LOCATION */}
      <p className="text-gray-700 mb-2">
        📍 {job.location}
      </p>

      {/* SALARY */}
      <p className="text-green-600 mb-4">
        💰 ₹{job.salary}
      </p>

      {/* DESCRIPTION */}
      <p className="text-gray-700 leading-relaxed mb-6">
        {job.description}
      </p>

      {/* APPLY BUTTON */}
      <button
        onClick={handleApply}
        disabled={applying}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded"
      >
        {applying ? "Applying..." : "Apply Job"}
      </button>

    </div>
  );
}