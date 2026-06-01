import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

type Company = {
  _id: string;
  companyName: string;
  description: string;
  location: string;
  logo?: string;
};

export default function Companies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchCompanies = async () => {
      try {
        const { data } = await API.get("/companies");

        if (!isMounted) return;

        console.log("Companies API:", data);

        setCompanies(data.companies || []);
      } catch (error) {
        console.log("Error fetching companies:", error);

        if (isMounted) setCompanies([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCompanies();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10 text-xl">
        Loading companies...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">Companies</h1>

      {companies.length === 0 ? (
        <p className="text-gray-500">No companies found</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">

          {companies.map((company) => (
            <Link
              key={company._id}
              to={`/companies/${company._id}`}
              className="bg-white border rounded-xl p-5 shadow hover:shadow-lg transition"
            >

              <img
                src={
                  company.logo ||
                  "https://ui-avatars.com/api/?name=Company"
                }
                className="w-16 h-16 rounded-full mb-4"
              />

              <h2 className="text-xl font-bold">
                {company.companyName}
              </h2>

              <p className="text-gray-600">
                📍 {company.location}
              </p>

              <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                {company.description}
              </p>

            </Link>
          ))}

        </div>
      )}
    </div>
  );
}