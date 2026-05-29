import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";

type Company = {
  _id: string;
  companyName: string;
  description: string;
  location: string;
  logo?: string;
};

type Job = {
  _id: string;
  title: string;
  location: string;
  salary: number;
};

export default function CompanyDetails() {
  const { id } = useParams();

  const [company, setCompany] = useState<Company | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Company ID:", id); // 🔥 DEBUG FIX

    const fetchCompany = async () => {
      try {
        if (!id) return;

        const { data } = await API.get(`/companies/${id}`);

        setCompany(data.company);
        setJobs(data.company.jobs || []);

      } catch (error) {
        console.log("Company fetch error:", error);
        setCompany(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [id]);

  if (loading) return <div className="p-10">Loading...</div>;

  if (!company) {
    return <div className="p-10 text-red-500">Company not found</div>;
  }

  return (
    <div className="p-10 max-w-5xl mx-auto">

      {/* COMPANY CARD */}
      <div className="bg-white shadow-lg rounded-xl p-8">

        <div className="flex items-center gap-6">

          <img
            src={
              company.logo ||
              "https://ui-avatars.com/api/?name=Company"
            }
            className="w-24 h-24 rounded-full"
          />

          <div>
            <h1 className="text-3xl font-bold">
              {company.companyName}
            </h1>

            <p className="text-gray-600">
              📍 {company.location}
            </p>
          </div>

        </div>

        <p className="mt-6 text-gray-700">
          {company.description}
        </p>

      </div>

      {/* JOBS */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Jobs</h2>

        {jobs.length === 0 ? (
          <p>No jobs found</p>
        ) : (
          jobs.map((job) => (
            <div key={job._id} className="p-4 border rounded mb-3">
              <h3 className="font-bold">{job.title}</h3>
              <p>{job.location}</p>
              <p>₹{job.salary}</p>

              <Link
                to={`/jobs/${job._id}`}
                className="text-blue-600"
              >
                View Job
              </Link>
            </div>
          ))
        )}
      </div>

    </div>
  );
}