import { useState } from "react";

import API from "../services/api";

import { useNavigate } from "react-router-dom";


export default function CreateJob() {

  const navigate =
    useNavigate();


  const [formData, setFormData] =
    useState({

      title: "",

      description: "",

      requirements: "",

      location: "",

      salary: "",

    });


  // ================= HANDLE CHANGE =================

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement
    >
  ) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });
  };


  // ================= HANDLE SUBMIT =================

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      const token =
        localStorage.getItem(
          "token"
        );


      const { data } =
        await API.post(

          "/jobs",

          {

            ...formData,

            // CONVERT TO ARRAY

            requirements:
              formData.requirements

                .split(",")

                .map((skill) =>
                  skill.trim()
                ),

          },

          {
            headers: {

              Authorization:
                `Bearer ${token}`,

            },
          }
        );


      alert(

        data.message ||

        "Job Created Successfully"

      );


      navigate("/jobs");

    } catch (error) {

  console.log(error);

  if (error instanceof Error) {

    alert(error.message);

  } else {

    alert("Failed to create job");

  }

}
  };


  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">

        Create Job

      </h1>


      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg max-w-xl"
      >

        {/* JOB TITLE */}

        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded-lg"
          required
        />


        {/* DESCRIPTION */}

        <textarea
          name="description"
          placeholder="Job Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded-lg"
          rows={5}
          required
        />


        {/* REQUIREMENTS */}

        <input
          type="text"
          name="requirements"
          placeholder="React,Node.js,MongoDB"
          value={formData.requirements}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded-lg"
          required
        />


        {/* LOCATION */}

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded-lg"
          required
        />


        {/* SALARY */}

        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={formData.salary}
          onChange={handleChange}
          className="w-full border p-3 mb-6 rounded-lg"
          required
        />


        {/* SUBMIT BUTTON */}

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
        >

          Post Job

        </button>

      </form>

    </div>
  );
}