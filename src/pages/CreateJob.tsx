import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function CreateJob() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    company: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/jobs", form);

      alert(data.message || "Job created");

      navigate("/dashboard");

    } catch (error) {
      console.log("Job create error:", error);
      alert("Failed to create job");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">

      <h1 className="text-2xl font-bold mb-4">Create Job</h1>

      <form onSubmit={handleSubmit}>

        <input
          name="title"
          placeholder="Job Title"
          value={form.title}
          onChange={handleChange}
          className="border p-2 w-full mb-3"
          required
        />

        <textarea
          name="description"
          placeholder="Job Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 w-full mb-3"
          required
        />

        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="border p-2 w-full mb-3"
          required
        />

        <input
          name="salary"
          placeholder="Salary"
          value={form.salary}
          onChange={handleChange}
          className="border p-2 w-full mb-3"
          required
        />

        {/* IMPORTANT FIELD */}
        <input
          name="company"
          placeholder="Company ID"
          value={form.company}
          onChange={handleChange}
          className="border p-2 w-full mb-4"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 w-full"
        >
          Create Job
        </button>

      </form>

    </div>
  );
}