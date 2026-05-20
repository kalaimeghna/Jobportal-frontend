import {
  useState,
} from "react";

import API from "../services/api";

import {
  useNavigate,
} from "react-router-dom";


export default function CreateCompany() {

  const navigate =
    useNavigate();


  const [formData, setFormData] =
    useState({

      companyName: "",

      description: "",

      location: "",

      logo: "",
    });


  // ================= HANDLE CHANGE =================

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };


  // ================= SUBMIT =================

  const handleSubmit =
    async (
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

            "/company",

            formData,

            {
              headers: {

                Authorization:
                  `Bearer ${token}`,
              },
            }
          );


        alert(
          data.message
        );

        navigate("/");

      } catch (error) {

        console.log(error);

        alert(
          "Failed to create company"
        );
      }
    };


  return (

    <div className="p-10">

      <h1 className="text-4xl font-bold mb-8">

        Create Company

      </h1>


      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 max-w-xl"
      >

        {/* COMPANY NAME */}

        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded-lg"
          required
        />


        {/* DESCRIPTION */}

        <textarea
          name="description"
          placeholder="Company Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded-lg"
          rows={5}
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


        {/* LOGO */}

        <input
          type="text"
          name="logo"
          placeholder="Logo URL"
          value={formData.logo}
          onChange={handleChange}
          className="w-full border p-3 mb-6 rounded-lg"
        />


        {/* BUTTON */}

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >

          Create Company

        </button>

      </form>

    </div>
  );
}