import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";

type Job = {
  _id: string;
  title: string;
  location: string;
  salary: number;
};

type Company = {
  _id: string;
  companyName: string;
  description: string;
  location: string;
  logo?: string;
  industry?: string;
  website?: string;
  companySize?: string;
  jobs?: Job[];
};

export default function CompanyDetails() {
  const { id } = useParams();

  const [company, setCompany] = useState<Company | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ================= FETCH COMPANY =================
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        if (!id) return;

        setLoading(true);
        setError("");

        const { data } = await API.get(`/companies/${id}`);

        const companyData = data.company || null;

        setCompany(companyData);

        // FIX: support both backend formats
        setJobs(companyData?.jobs || data.jobs || []);

      } catch (error) {
        console.log("Company fetch error:", error);
        setError("Failed to load company details");
        setCompany(null);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [id]);

  // ================= LOADING =================
  if (loading) {
    return <div className="p-10 text-xl">Loading company...</div>;
  }

  // ================= ERROR =================
  if (error) {
    return <div className="p-10 text-red-500">{error}</div>;
  }

  if (!company) {
    return <div className="p-10 text-red-500">Company not found</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-8">

      {/* ================= COMPANY HEADER ================= */}
      <div className="bg-white shadow-lg rounded-xl p-6">

        <div className="flex items-center gap-5">

          <img
            src={
              company.logo ||
              `https://ui-avatars.com/api/?name=${company.companyName}`
            }
            className="w-20 h-20 rounded-full"
          />

          <div>
            <h1 className="text-3xl font-bold">
              {company.companyName}
            </h1>

            <p className="text-gray-600">
              📍 {company.location}
            </p>

            <p className="text-gray-500">
              {company.industry}
            </p>
          </div>

        </div>

        <p className="mt-4 text-gray-700">
          {company.description}
        </p>

        {company.website && (
          <a
            href={company.website}
            target="_blank"
            className="text-blue-600 underline mt-2 inline-block"
          >
            Visit Website
          </a>
        )}

      </div>

      {/* ================= JOBS ================= */}
      <div className="mt-10">

        <h2 className="text-2xl font-bold mb-4">
          Jobs at {company.companyName}
        </h2>

        {jobs.length === 0 ? (
          <p className="text-gray-500">
            No jobs available at this company yet
          </p>
        ) : (
          <div className="grid gap-4">

            {jobs.map((job) => (
              <Link
                key={job._id}
                to={`/jobs/${job._id}`}
                className="bg-white border shadow rounded-xl p-5 hover:shadow-lg transition"
              >
                <h3 className="text-xl font-bold">
                  {job.title}
                </h3>

                <p className="text-gray-600">
                  📍 {job.location}
                </p>

                <p className="text-green-600">
                  💰 ₹{job.salary}
                </p>

              </Link>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}