import { useState, useEffect } from "react";
import API from "../services/api";

type Resume = {
  _id: string;
  resumeUrl: string;
};

export default function ResumeUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // ================= FETCH RESUMES =================
  const fetchResumes = async () => {
    try {
      const { data } = await API.get("/resume/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setResumes(data.resumes || []);
    } catch (error) {
      console.log(error);
      setResumes([]);
    } finally {
      setLoading(false);
    }
  };

  // ================= USE EFFECT (SAFE) =================
  useEffect(() => {
    let ignore = false;

    const load = async () => {
      if (ignore) return;
      await fetchResumes();
    };

    load();

    return () => {
      ignore = true;
    };
  }, []);

  // ================= UPLOAD =================
  const handleUpload = async () => {
    if (!file) return alert("Select file");

    const formData = new FormData();
    formData.append("resume", file);

    try {
      await API.post("/resume/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setFile(null);
      fetchResumes();
    } catch (err) {
      console.log(err);
      alert("Upload failed");
    }
  };

  // ================= DELETE =================
  const deleteResume = async (id: string) => {
    try {
      await API.delete(`/resume/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchResumes();
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return <div className="p-10 text-xl">Loading...</div>;
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Resume Upload</h1>

      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <button onClick={handleUpload} className="ml-3 bg-blue-600 text-white px-4 py-2">
        Upload
      </button>

      <div className="mt-10">
        {resumes.map((r) => (
          <div key={r._id} className="flex justify-between p-3 shadow mb-2">
            <a href={r.resumeUrl} target="_blank">
              View
            </a>

            <button onClick={() => deleteResume(r._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}