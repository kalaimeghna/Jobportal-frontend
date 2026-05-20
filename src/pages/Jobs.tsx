import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";

import {
  Link,
} from "react-router-dom";


// ================= TYPES =================

type Job = {

  _id: string;

  title: string;

  location: string;

  salary: string;

  createdBy?: {

    _id: string;

    name: string;

  };

};


export default function Jobs() {

  const [
    jobs,
    setJobs,
  ] = useState<Job[]>([]);


  // ================= LOGGED USER =================

  const user =
    JSON.parse(
      localStorage.getItem(
        "user"
      ) || "{}"
    );


  // ================= FETCH JOBS =================

  useEffect(() => {

    const fetchJobs =
      async () => {

        try {

          const { data } =
            await API.get(
              "/jobs"
            );

          setJobs(data.jobs);

        } catch (error) {

          console.log(error);

        }
      };

    fetchJobs();

  }, []);


  // ================= DELETE JOB =================

  const handleDelete =
    async (id: string) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const confirmDelete =
          window.confirm(
            "Delete this job?"
          );

        if (!confirmDelete)
          return;

        await API.delete(
          `/jobs/${id}`,
          {
            headers: {

              Authorization:
                `Bearer ${token}`,

            },
          }
        );

        // REMOVE FROM UI
        setJobs(

          jobs.filter(
            (job) =>
              job._id !== id
          )
        );

        alert(
          "Job Deleted Successfully"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Delete Failed"
        );

      }
    };


  return (

    <div className="p-10">

      <h1 className="text-4xl font-bold mb-8">

        Jobs

      </h1>


      <div className="grid md:grid-cols-3 gap-6">

        {jobs.map((job) => (

          <div
            key={job._id}
            className="bg-white shadow-lg rounded-xl p-6 border"
          >

            {/* TITLE */}

            <h2 className="text-2xl font-bold">

              {job.title}

            </h2>


            {/* LOCATION */}

            <p className="mt-3 text-gray-700">

              📍 {job.location}

            </p>


            {/* SALARY */}

            <p className="mt-2 text-gray-700">

              💰 ₹{job.salary}

            </p>


            {/* COMPANY */}

            <p className="mt-2 text-gray-700">

              🏢
              {" "}

              {
                job.createdBy?.name
              }

            </p>


            {/* VIEW DETAILS */}

            <Link
              to={`/jobs/${job._id}`}
            >

              <button className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">

                View Details

              </button>

            </Link>


            {/* EMPLOYER ONLY */}

            {
              user?._id ===
              job.createdBy?._id && (

                <div className="flex gap-3 mt-5">

                  {/* EDIT */}

                  <Link
                    to={`/edit-job/${job._id}`}
                  >

                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg">

                      Edit

                    </button>

                  </Link>


                  {/* DELETE */}

                  <button
                    onClick={() =>
                      handleDelete(
                        job._id
                      )
                    }
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                  >

                    Delete

                  </button>

                </div>
              )
            }

          </div>
        ))}

      </div>

    </div>
  );
}