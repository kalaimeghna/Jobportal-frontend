import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

type Company = {
  _id: string;
  companyName: string;
};

type ApiError = {
  response?: {
    data?: {
      message?: string;
    };
  };
};

export default function CreateJob() {
  const navigate = useNavigate();

  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    company: "",
  });

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const { data } = await API.get("/companies");

        const list = Array.isArray(data.companies)
          ? data.companies
          : [];

        setCompanies(list);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCompanies();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await API.post("/jobs", {
        ...form,
        salary: Number(form.salary),
      });

      alert(res.data.message || "Job created");
      navigate("/dashboard");

    } catch (error: unknown) {
      const err = error as ApiError;
      alert(err.response?.data?.message || "Failed to create job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">

      <h1 className="text-2xl font-bold mb-4">Create Job</h1>

      <form onSubmit={handleSubmit}>

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="border p-2 w-full mb-3"
          required
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 w-full mb-3"
          required
        />

        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          className="border p-2 w-full mb-3"
          required
        />

        <input
          name="salary"
          value={form.salary}
          onChange={handleChange}
          placeholder="Salary"
          className="border p-2 w-full mb-3"
          required
        />

        <select
          name="company"
          value={form.company}
          onChange={handleChange}
          className="border p-2 w-full mb-4"
          required
        >
          <option value="">Select Company</option>
          {companies.map((c) => (
            <option key={c._id} value={c._id}>
              {c.companyName}
            </option>
          ))}
        </select>

        <button
          className="bg-blue-600 text-white w-full py-2"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Job"}
        </button>

      </form>
    </div>
  );
}