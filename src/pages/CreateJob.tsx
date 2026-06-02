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
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    company: "",
  });

  // ================= USER (SAFE OUTSIDE EFFECT) =================
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // ================= FETCH COMPANIES =================
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setFetching(true);
        setError("");

        // ROLE CHECK (NO setState here anymore → fixes warning)
        if (!user || user.role !== "employer") {
          setError("Only employers can create jobs");
          return;
        }

        const { data } = await API.get("/companies");

        setCompanies(Array.isArray(data.companies) ? data.companies : []);

      } catch (err) {
        console.log(err);
        setError("Failed to load companies");
      } finally {
        setFetching(false);
      }
    };

    fetchCompanies();
  }, [user?.role]);

  // ================= HANDLE INPUT =================
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================= SUBMIT JOB =================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      if (!form.company) {
        setError("Please select a company");
        return;
      }

      const res = await API.post("/jobs", {
        ...form,
        salary: Number(form.salary),
      });

      alert(res.data.message || "Job created successfully");

      navigate("/dashboard");

    } catch (error: unknown) {
      const err = error as ApiError;

      setError(
        err.response?.data?.message || "Failed to create job"
      );

    } finally {
      setLoading(false);
    }
  };

  // ================= LOADING =================
  if (fetching) {
    return (
      <div className="text-center mt-10 text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">

      <h1 className="text-2xl font-bold mb-4">
        Create Job
      </h1>

      {/* ERROR */}
      {error && (
        <div className="bg-red-100 text-red-600 p-3 mb-3 rounded">
          {error}
        </div>
      )}

      {/* FORM */}
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
          <option value="">
            Select Company
          </option>

          {companies.map((c) => (
            <option key={c._id} value={c._id}>
              {c.companyName}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white w-full py-2"
        >
          {loading ? "Creating..." : "Create Job"}
        </button>

      </form>
    </div>
  );
}