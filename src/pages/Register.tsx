import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("jobseeker");
  const [phone, setPhone] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [education, setEducation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const payload = {
        name,
        email,
        password,
        role,
        phone,
        skills: skills
          ? skills.split(",").map((s) => s.trim())
          : [],
        experience,
        education,
      };

      const { data } = await API.post("/auth/register", payload);

      console.log("REGISTER RESPONSE:", data);

      // ❌ IMPORTANT FIX:
      // DO NOT STORE TOKEN HERE

      alert("Registration successful. Please login.");

      navigate("/login");

    } catch (error: unknown) {
      console.log(error);

      if (axios.isAxiosError(error)) {
        alert(
          error.response?.data?.message ||
            "Registration failed"
        );
      } else {
        alert("Something went wrong");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">

      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg space-y-5"
      >

        <h1 className="text-3xl font-bold text-center">
          Create Account
        </h1>

        {/* NAME */}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-3 rounded-lg"
          required
        />

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-3 rounded-lg"
          required
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 rounded-lg"
          required
        />

        {/* PHONE */}
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        {/* SKILLS */}
        <input
          type="text"
          placeholder="React, Node.js"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        {/* EXPERIENCE */}
        <input
          type="text"
          placeholder="Experience"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        {/* EDUCATION */}
        <input
          type="text"
          placeholder="Education"
          value={education}
          onChange={(e) => setEducation(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        {/* ROLE */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border p-3 rounded-lg"
        >
          <option value="jobseeker">Job Seeker</option>
          <option value="employer">Employer</option>
        </select>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white w-full py-3 rounded-lg"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>

      </form>

    </div>
  );
}