import { useState } from "react";

import {useNavigate,Link,} from "react-router-dom";

import API from "../services/api";


export default function Login() {

  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });


  // ================= HANDLE CHANGE =================
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value,
    });

  };


  // ================= HANDLE SUBMIT =================
  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {

    e.preventDefault();

    try {

      const { data } =
        await API.post(
          "/auth/login",
          formData
        );

      console.log(data);

      // ================= SAVE TOKEN =================
      localStorage.setItem(
        "token",
        data.token
      );


      // ================= SAVE USER =================
      localStorage.setItem(
        "user",

        JSON.stringify({

          _id:
            data._id ||
            data.user?._id,

          name:
            data.name ||
            data.user?.name,

          email:
            data.email ||
            data.user?.email,

          role:
            data.role ||
            data.user?.role,

        })
      );


      alert(
        "Login Successful"
      );

      // Redirect
      navigate(
        "/dashboard"
      );

    } catch (error) {

      console.log(error);

      alert(
        "Login Failed"
      );

    }
  };


  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >

        {/* Heading */}
        <h1 className="text-4xl font-bold text-center mb-8">

          Login

        </h1>


        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-5"
          required
        />


        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-6"
          required
        />


        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg"
        >
          Login
        </button>


        {/* Register Link */}
        <p className="text-center mt-6">

          Don't have account?

          <Link
            to="/register"
            className="text-blue-600 ml-2"
          >
            Register
          </Link>

        </p>

      </form>

    </div>
  );
}