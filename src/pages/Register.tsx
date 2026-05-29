import { useState } from "react";

import axios from "axios";

import {
  useNavigate,
  Link,
} from "react-router-dom";

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

  const [phone, setPhone] =
    useState("");

  const [skills, setSkills] =
    useState("");

  const [experience, setExperience] =
    useState("");

  const [education, setEducation] =
    useState("");

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
              phone,

              skills:
                skills
                  .split(",")
                  .map(
                    (skill) =>
                      skill.trim()
                  ),

              experience,
              education,
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

            ...data.user,

            token:
              data.token,
          })
        );


        alert(
          "Registration Successful"
        );


        // ================= REDIRECT =================

        navigate("/login");

      } catch (error: unknown) {

        console.log(error);

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

    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">

      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg space-y-5"
      >

        {/* HEADING */}

        <h1 className="text-3xl font-bold text-center">

          Create Account

        </h1>


        {/* NAME */}

        <div>

          <label className="block mb-1 font-medium">

            Name

          </label>

          <input
            type="text"
            placeholder="Enter Name"
            className="w-full border p-3 rounded-lg"
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
            className="w-full border p-3 rounded-lg"
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
            className="w-full border p-3 rounded-lg"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            required
          />

        </div>


        {/* PHONE */}

        <div>

          <label className="block mb-1 font-medium">

            Phone

          </label>

          <input
            type="text"
            placeholder="Enter Phone Number"
            className="w-full border p-3 rounded-lg"
            value={phone}
            onChange={(e) =>
              setPhone(
                e.target.value
              )
            }
          />

        </div>


        {/* SKILLS */}

        <div>

          <label className="block mb-1 font-medium">

            Skills

          </label>

          <input
            type="text"
            placeholder="React, Node.js, MongoDB"
            className="w-full border p-3 rounded-lg"
            value={skills}
            onChange={(e) =>
              setSkills(
                e.target.value
              )
            }
          />

        </div>


        {/* EXPERIENCE */}

        <div>

          <label className="block mb-1 font-medium">

            Experience

          </label>

          <input
            type="text"
            placeholder="2 Years"
            className="w-full border p-3 rounded-lg"
            value={experience}
            onChange={(e) =>
              setExperience(
                e.target.value
              )
            }
          />

        </div>


        {/* EDUCATION */}

        <div>

          <label className="block mb-1 font-medium">

            Education

          </label>

          <input
            type="text"
            placeholder="B.Tech Computer Science"
            className="w-full border p-3 rounded-lg"
            value={education}
            onChange={(e) =>
              setEducation(
                e.target.value
              )
            }
          />

        </div>


        {/* ROLE */}

        <div>

          <label className="block mb-1 font-medium">

            Role

          </label>

          <select
            className="w-full border p-3 rounded-lg"
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
          className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded-lg font-semibold transition"
        >

          {loading
            ? "Registering..."
            : "Register"}

        </button>


        {/* LOGIN LINK */}

        <p className="text-center text-gray-600">

          Already have an account?

          <Link
            to="/login"
            className="text-blue-600 ml-1 font-semibold"
          >

            Login

          </Link>

        </p>

      </form>

    </div>
  );
}