import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";


type Applicant = {
  _id: string;
  status: string;
  resumeUrl?: string;
  coverLetterUrl?: string;
  applicant: {
    name: string;
    email: string;
    phone?: string;
  };
};

export default function Applicants() {
  const { id } = useParams<{ id: string }>();

  const [applications, setApplications] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const token = localStorage.getItem("token");

        const { data } = await API.get(
          `/api/applicants/job/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setApplications(data?.applications || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load applicants");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchApplicants();
  }, [id]);

  if (loading) return <div className="p-10">Loading...</div>;

  if (error) return <div className="p-10 text-red-600">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Job Applicants</h1>

      {applications.length === 0 ? (
        <p>No applicants yet</p>
      ) : (
        applications.map((app) => (
          <div key={app._id} className="border p-4 mb-3 rounded">
            <h2>{app.applicant.name}</h2>
            <p>{app.applicant.email}</p>
            <p>Status: {app.status}</p>
          </div>
        ))
      )}
    </div>
  );
}