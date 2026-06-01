import { useNavigate } from "react-router-dom";

type Company = {
  _id?: string;
  companyName: string;
  description: string;
  logo?: string;
  location?: string;
  industry?: string;
  website?: string;
  verified?: boolean;
};

export default function CompanyCard({ company }: { company: Company }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!company._id) return;
    navigate(`/company/${company._id}`);
  };

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      className="border rounded-xl p-4 shadow-sm bg-white flex gap-4 items-center cursor-pointer hover:shadow-lg hover:scale-[1.01] transition-all duration-200"
    >
      {/* LOGO */}
      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
        {company.logo ? (
          <img
            src={company.logo}
            alt={company.companyName}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-xs text-gray-400">No Logo</span>
        )}
      </div>

      {/* CONTENT */}
      <div className="flex-1">
        {/* Header */}
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-gray-900">
            {company.companyName}
          </h2>

          {company.verified && (
            <span className="text-green-600 text-xs font-semibold">
              ✔ Verified
            </span>
          )}
        </div>

        {/* Meta Info */}
        <div className="text-sm text-gray-500 flex gap-3 mt-1">
          {company.location && <span>📍 {company.location}</span>}
          {company.industry && <span>🏢 {company.industry}</span>}
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mt-2 line-clamp-2">
          {company.description}
        </p>

        {/* Website */}
        {company.website && (
          <a
            href={company.website}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 text-sm mt-2 inline-block hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            Visit Website
          </a>
        )}
      </div>
    </div>
  );
}