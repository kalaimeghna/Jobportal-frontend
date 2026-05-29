import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import axios from "axios";

// ================= USER TYPE CHECK =================
const getUser = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

export default function CreateCompany() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const user = getUser();

  const [formData, setFormData] = useState({
    companyName: "",
    description: "",
    location: "",
    logo: "",
    website: "",
    industry: "",
    companySize: "",
    foundedYear: "",
  });

  // ================= HANDLE CHANGE =================
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= HANDLE SUBMIT =================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ❌ ROLE CHECK FIX
    if (user?.role !== "employer") {
      alert("Only employers can create companies");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...formData,
        foundedYear: formData.foundedYear
          ? Number(formData.foundedYear)
          : undefined,
      };

      const res = await API.post("/companies", payload);

      alert(res.data.message || "Company created successfully");

      navigate("/companies");

    } catch (error: unknown) {
      console.log("Create company error:", error);

      if (axios.isAxiosError(error)) {
        alert(
          error.response?.data?.message ||
            "Failed to create company"
        );
      } else {
        alert("Unexpected error occurred");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-xl"
      >

        <h1 className="text-3xl font-bold text-center mb-6">
          Create Company
        </h1>

        {/* COMPANY NAME */}
        <input
          name="companyName"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-3"
          required
        />

        {/* DESCRIPTION */}
        <textarea
          name="description"
          placeholder="Company Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-3"
          required
        />

        {/* LOCATION */}
        <input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-3"
          required
        />

        {/* LOGO */}
        <input
          name="logo"
          placeholder="Logo URL"
          value={formData.logo}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-3"
        />

        {/* WEBSITE */}
        <input
          name="website"
          placeholder="Website"
          value={formData.website}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-3"
        />

        {/* INDUSTRY */}
        <input
          name="industry"
          placeholder="Industry"
          value={formData.industry}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-3"
        />

        {/* COMPANY SIZE */}
        <input
          name="companySize"
          placeholder="Company Size"
          value={formData.companySize}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-3"
        />

        {/* FOUNDED YEAR */}
        <input
          name="foundedYear"
          placeholder="Founded Year"
          value={formData.foundedYear}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-5"
        />

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Creating..." : "Create Company"}
        </button>

      </form>

    </div>
  );
}