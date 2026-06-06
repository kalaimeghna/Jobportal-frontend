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
        console.log(error);
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
        alert("Upload resume first");
        return;
      }

      setApplying(true);

      const token = localStorage.getItem("token");

      const formData = new FormData();

      // ⚠️ MUST MATCH backend multer field name
      formData.append("resume", resumeFile);

      formData.append("coverLetterUrl", coverLetter);

      const res = await API.post(
        `/applications/apply/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(res.data.message || "Applied successfully");

      setResumeFile(null);
      setCoverLetter("");
    } catch (error) {
      console.log(error);
      alert("Apply failed");
    } finally {
      setApplying(false);
    }
  };

  if (loading) return <div className="p-10">Loading...</div>;
  if (!job) return <div className="p-10 text-red-500">Job not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow rounded-lg">

      <h1 className="text-3xl font-bold mb-4">{job.title}</h1>

      <p className="text-gray-600">
        🏢 {job.company?.companyName || "Company"}
      </p>

      <p className="text-gray-700">📍 {job.location}</p>

      <p className="text-green-600 mb-4">💰 ₹{job.salary}</p>

      <p className="mb-6">{job.description}</p>

      {/* APPLY SECTION */}
      {isJobseeker && (
        <div className="border p-4 rounded">

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) =>
              setResumeFile(e.target.files?.[0] || null)
            }
            className="mb-3"
          />

          <textarea
            placeholder="Cover Letter"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            className="border p-2 w-full mb-3"
          />

          <button
            onClick={handleApply}
            disabled={applying}
            className="bg-green-600 text-white px-4 py-2 rounded w-full"
          >
            {applying ? "Applying..." : "Apply Now"}
          </button>

        </div>
      )}
    </div>
  );
}