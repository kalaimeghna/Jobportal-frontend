import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

type Job = {
  _id: string;
  title: string;
  description: string;
  location: string;
  salary: number;
  company?: {
    _id: string;
    companyName: string;
  };
};

export default function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isJobseeker = user?.role === "jobseeker";

  // ================= FETCH JOB =================
  useEffect(() => {
    const fetchJob = async () => {
      try {
        if (!id) return;

        const res = await API.get(`/jobs/${id}`);
        setJob(res.data.job);
      } catch (error) {
        console.log("Fetch job error:", error);
        setJob(null);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  // ================= APPLY JOB =================
  const handleApply = async () => {
    try {
      if (!resumeFile) {
        alert("Please upload your resume");
        return;
      }

      setApplying(true);

      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("resume", resumeFile);
      formData.append("coverLetterUrl", coverLetter);

      const res = await API.post(
        `/applications/apply/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ FIXED
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(res.data.message || "Applied successfully");

      setResumeFile(null);
      setCoverLetter("");

    } catch (error) {
      console.log("Apply error:", error);
      alert("Error applying job");
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return <div className="p-10">Loading job...</div>;
  }

  if (!job) {
    return <div className="p-10 text-red-500">Job not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow rounded-lg">

      <h1 className="text-3xl font-bold mb-4">{job.title}</h1>

      <p className="text-gray-600 mb-2">
        🏢 {job.company?.companyName ?? "Company not available"}
      </p>

      <p className="text-gray-700 mb-2">📍 {job.location}</p>

      <p className="text-green-600 mb-4">💰 ₹{job.salary}</p>

      <p className="text-gray-700 mb-6">{job.description}</p>

      {isJobseeker && (
        <div className="border p-4 rounded mb-4">

          <input
            type="file"
            accept=".pdf"
            onChange={(e) =>
              setResumeFile(e.target.files?.[0] || null)
            }
            className="border p-2 w-full mb-3"
          />

          <textarea
            placeholder="Cover Letter (optional)"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            className="border p-2 w-full mb-3"
          />

          <button
            onClick={handleApply}
            disabled={applying}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded w-full"
          >
            {applying ? "Applying..." : "Apply Job"}
          </button>

        </div>
      )}

    </div>
  );
}