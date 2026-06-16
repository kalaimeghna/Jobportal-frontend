import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "jobseeker",
    phone: "",
    skills: "",
    experience: "",
    education: "",
    location: "",
    bio: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      // Correct payload
      const payload = {
        ...formData,
        role: formData.role,
        skills: formData.skills
          ? formData.skills
              .split(",")
              .map((skill) => skill.trim())
          : [],
      };

      const { data } = await API.post(
        "/auth/register",
        payload
      );

      if (data.success) {
        alert("Registration successful. Please login.");
        navigate("/login");
      } else {
        setError(data.message || "Registration failed");
      }

    } catch (error) {
      console.log("REGISTER ERROR:", error);

      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.message
        : "Something went wrong";

      setError(errorMessage || "Registration failed");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">

      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl"
      >

        <h1 className="text-3xl font-bold text-center mb-6">
          Create Account
        </h1>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
            minLength={6}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            name="experience"
            placeholder="Experience"
            value={formData.experience}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            name="education"
            placeholder="Education"
            value={formData.education}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          >
            <option value="jobseeker">
              Job Seeker
            </option>

            <option value="employer">
              Employer
            </option>
          </select>

        </div>

        <input
          type="text"
          name="skills"
          placeholder="Skills (React, Node.js, MongoDB)"
          value={formData.skills}
          onChange={handleChange}
          className="border p-3 rounded-lg w-full mt-4"
        />

        <textarea
          name="bio"
          placeholder="Short Bio"
          value={formData.bio}
          onChange={handleChange}
          rows={4}
          className="border p-3 rounded-lg w-full mt-4"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded-lg mt-6"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center mt-5">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-medium"
          >
            Login
          </Link>
        </p>

      </form>

    </div>
  );
}