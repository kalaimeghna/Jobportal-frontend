import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import API from "../services/api";


export default function Register() {

  const navigate =
    useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [role, setRole] =
    useState("jobseeker");

  const [loading, setLoading] =
    useState(false);


  // ================= HANDLE REGISTER =================

  const handleRegister =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      setLoading(true);

      try {

        // ================= API REQUEST =================

        const { data } =
          await API.post(
            "/auth/register",
            {
              name,
              email,
              password,
              role,
            }
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
          "Registration Successful"
        );


        // ================= REDIRECT =================

        navigate("/login");

      } catch (error: unknown) {

        if (
          axios.isAxiosError(error)
        ) {

          alert(

            error.response?.data
              ?.message ||

            "Registration Failed"
          );

        } else {

          alert(
            "Something went wrong"
          );
        }

      } finally {

        setLoading(false);
      }
    };


  return (

    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4"
      >

        {/* HEADING */}

        <h1 className="text-3xl font-bold text-center">

          Register

        </h1>


        {/* NAME */}

        <div>

          <label className="block mb-1 font-medium">

            Name

          </label>

          <input
            type="text"
            placeholder="Enter Name"
            className="w-full border p-3 rounded"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            required
          />

        </div>


        {/* EMAIL */}

        <div>

          <label className="block mb-1 font-medium">

            Email

          </label>

          <input
            type="email"
            placeholder="Enter Email"
            className="w-full border p-3 rounded"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            required
          />

        </div>


        {/* PASSWORD */}

        <div>

          <label className="block mb-1 font-medium">

            Password

          </label>

          <input
            type="password"
            placeholder="Enter Password"
            className="w-full border p-3 rounded"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            required
          />

        </div>


        {/* ROLE */}

        <div>

          <label className="block mb-1 font-medium">

            Role

          </label>

          <select
            className="w-full border p-3 rounded"
            value={role}
            onChange={(e) =>
              setRole(
                e.target.value
              )
            }
          >

            <option value="jobseeker">

              Job Seeker

            </option>

            <option value="employer">

              Employer

            </option>

          </select>

        </div>


        {/* BUTTON */}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded"
        >

          {loading
            ? "Registering..."
            : "Register"}

        </button>

      </form>

    </div>
  );
}