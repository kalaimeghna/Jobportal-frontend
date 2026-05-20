import type { Job } from "../types";

interface Props {
  job: Job;
}

export default function JobCard({
  job,
}: Props) {
  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold">
        {job.title}
      </h2>

      <p className="text-gray-600">
        {job.description}
      </p>

      <p className="mt-2">
        📍 {job.location}
      </p>

      <p>
        💰 ₹{job.salary}
      </p>

      <button className="bg-blue-600 text-white px-4 py-2 rounded mt-3">
        Apply
      </button>
    </div>
  );
}