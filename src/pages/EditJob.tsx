import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import API from "../services/api";


export default function EditJob() {

  const { id } =
    useParams();

  const navigate =
    useNavigate();


  // ================= STATES =================

  const [
    title,
    setTitle,
  ] = useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [
    requirements,
    setRequirements,
  ] = useState("");

  const [
    location,
    setLocation,
  ] = useState("");

  const [
    salary,
    setSalary,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(false);


  // ================= FETCH JOB =================

  useEffect(() => {

    const fetchJob =
      async () => {

        try {

          const { data } =
            await API.get(
              `/jobs/${id}`
            );

          setTitle(
            data.job.title
          );

          setDescription(
            data.job.description
          );

          setRequirements(
            data.job.requirements
          );

          setLocation(
            data.job.location
          );

          setSalary(
            data.job.salary
              .toString()
          );

        } catch (error) {

          console.log(error);

          alert(
            "Failed to load job"
          );

        }
      };

    fetchJob();

  }, [id]);


  // ================= UPDATE JOB =================

  const submitHandler =
    async (
      e: React.FormEvent<HTMLFormElement>
    ) => {

      e.preventDefault();

      try {

        setLoading(true);

        const token =
          localStorage.getItem(
            "token"
          );

        await API.put(

          `/jobs/${id}`,

          {
            title,
            description,
            requirements,
            location,
            salary,
          },

          {
            headers: {

              Authorization:
                `Bearer ${token}`,

            },
          }
        );

        alert(
          "Job updated successfully"
        );

        navigate(
          "/dashboard"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Failed to update job"
        );

      } finally {

        setLoading(false);

      }
    };


  return (

    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-8">

      <h1 className="text-3xl font-bold mb-6 text-center">

        Edit Job

      </h1>


      <form
        onSubmit={
          submitHandler
        }
        className="space-y-5"
      >

        {/* TITLE */}

        <div>

          <label className="block font-semibold mb-2">

            Job Title

          </label>

          <input
            type="text"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
            required
            className="w-full border rounded-lg p-3"
          />

        </div>


        {/* DESCRIPTION */}

        <div>

          <label className="block font-semibold mb-2">

            Description

          </label>

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            required
            rows={4}
            className="w-full border rounded-lg p-3"
          />

        </div>


        {/* REQUIREMENTS */}

        <div>

          <label className="block font-semibold mb-2">

            Requirements

          </label>

          <input
            type="text"
            value={requirements}
            onChange={(e) =>
              setRequirements(
                e.target.value
              )
            }
            required
            className="w-full border rounded-lg p-3"
          />

        </div>


        {/* LOCATION */}

        <div>

          <label className="block font-semibold mb-2">

            Location

          </label>

          <input
            type="text"
            value={location}
            onChange={(e) =>
              setLocation(
                e.target.value
              )
            }
            required
            className="w-full border rounded-lg p-3"
          />

        </div>


        {/* SALARY */}

        <div>

          <label className="block font-semibold mb-2">

            Salary

          </label>

          <input
            type="number"
            value={salary}
            onChange={(e) =>
              setSalary(
                e.target.value
              )
            }
            required
            className="w-full border rounded-lg p-3"
          />

        </div>


        {/* BUTTON */}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
        >

          {
            loading
              ? "Updating..."
              : "Update Job"
          }

        </button>

      </form>

    </div>
  );
}