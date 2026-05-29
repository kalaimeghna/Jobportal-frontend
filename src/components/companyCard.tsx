import { useNavigate } from "react-router-dom";

type Company = {
  _id?: string;
  companyName: string;
  description: string;
  logo: string;
};

export default function CompanyCard({ company }: { company: Company }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/company/${company._id}`)}
      className="border rounded-xl p-4 shadow flex gap-4 items-center cursor-pointer hover:shadow-lg transition"
    >
      {/* LOGO */}
      {company.logo && (
        <img
          src={company.logo}
          alt="logo"
          className="w-16 h-16 rounded-full object-cover"
        />
      )}

      {/* DETAILS */}
      <div>
        <h2 className="text-xl font-bold">
          {company.companyName}
        </h2>

        <p className="text-gray-600 line-clamp-2">
          {company.description}
        </p>
      </div>
    </div>
  );
}