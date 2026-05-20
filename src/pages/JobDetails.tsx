import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";


// ================= TYPES =================

type Job = {
  _id: string;

  title: string;

  description: string;

  requirements: string;

  location: string;

  salary: string;

  createdBy?: {
    name: string;
  };
};


export default function JobDetails() {

  const { id } =
    useParams();

  const [job, setJob] =
    useState<Job | null>(
      null
    );

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    applying,
    setApplying,
  ] = useState(false);


  // ================= FETCH JOB =================

  useEffect(() => {

    const fetchJob =
      async () => {

        try {

          const res =
            await fetch(
              `http://localhost:5000/api/jobs/${id}`
            );

          const data =
            await res.json();

          setJob(data.job);

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }
      };

    fetchJob();

  }, [id]);


  // ================= APPLY JOB =================

  const handleApply =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        // CHECK LOGIN

        if (!token) {

          alert(
            "Please login first"
          );

          return;
        }

        setApplying(true);

        const res =
          await fetch(
            `http://localhost:5000/api/application/apply/${id}`,
            {
              method: "POST",

              headers: {

                Authorization:
                  `Bearer ${token}`,

              },
            }
          );

        const data =
          await res.json();

        alert(
          data.message
        );

      } catch (error) {

        console.log(error);

        alert(
          "Application failed"
        );

      } finally {

        setApplying(false);

      }
    };


  // ================= LOADING =================

  if (loading) {

    return (

      <h2 className="p-10 text-xl">

        Loading...

      </h2>
    );
  }


  // ================= JOB NOT FOUND =================

  if (!job) {

    return (

      <h2 className="p-10 text-xl text-red-600">

        Job not found

      </h2>
    );
  }


  // ================= UI =================

  return (

    <div className="max-w-4xl mx-auto p-6">

      <div className="bg-white rounded-xl shadow-lg p-8">

        {/* TITLE */}

        <h1 className="text-4xl font-bold mb-4">

          {job.title}

        </h1>


        {/* COMPANY */}

        <p className="text-lg text-gray-600 mb-6">

          🏢 {" "}

          {
            job.createdBy?.name ||
            "Company"
          }

        </p>


        {/* INFO */}

        <div className="grid md:grid-cols-2 gap-4 mb-8">

          <div className="bg-gray-100 p-4 rounded-lg">

            <p className="font-semibold">

              📍 Location

            </p>

            <p>

              {job.location}

            </p>

          </div>


          <div className="bg-gray-100 p-4 rounded-lg">

            <p className="font-semibold">

              💰 Salary

            </p>

            <p>

              ₹{job.salary}

            </p>

          </div>

        </div>


        {/* DESCRIPTION */}

        <div className="mb-8">

          <h2 className="text-2xl font-bold mb-3">

            Job Description

          </h2>

          <p className="text-gray-700 leading-7">

            {job.description}

          </p>

        </div>


        {/* REQUIREMENTS */}

        <div className="mb-8">

          <h2 className="text-2xl font-bold mb-3">

            Requirements

          </h2>

          <p className="text-gray-700 leading-7">

            {job.requirements}

          </p>

        </div>


        {/* APPLY BUTTON */}

        {
          localStorage.getItem("role") ===
          "jobseeker" ? (

            <button
              onClick={handleApply}
              disabled={applying}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
            >

              {
                applying
                  ? "Applying..."
                  : "Apply Now"
              }

            </button>

          ) : (

            <div className="text-red-600 font-semibold">

              Only Jobseekers can apply

            </div>

          )
        }

      </div>

    </div>
  );
}