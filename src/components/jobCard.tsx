import API from "../services/api";
import axios from "axios";

// ================= JOB TYPE =================
interface Job {
  _id: string;
  title: string;
  description: string;
  location: string;
  salary: string;
}

interface Props {
  job: Job;
}

export default function JobCard({ job }: Props) {

  const handleApply = async () => {
    try {

      await API.post(
        `/applications/apply/${job._id}`
      );

      alert("Applied successfully");

    } catch (err: unknown) {

      if (axios.isAxiosError(err)) {

        alert(
          err.response?.data?.message ||
          "Error applying"
        );

      } else {

        alert("Something went wrong");
      }
    }
  };

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

      <button
        onClick={handleApply}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-3 hover:bg-blue-700"
      >
        Apply
      </button>

    </div>
  );
}