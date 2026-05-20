import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import API from "../services/api";


type Applicant = {
  _id: string;

  status: string;

  applicant: {
    name: string;
    email: string;
  };
};


export default function JobApplicants() {

  const { id } =
    useParams();

  const [
    applications,
    setApplications,
  ] = useState<
    Applicant[]
  >([]);


  // FETCH APPLICATIONS
  useEffect(() => {

    const fetchApplications =
      async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const { data } =
          await API.get(
            `/applications/job/${id}`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setApplications(
          data.applications
        );

      } catch (error) {

        console.log(error);

      }
    };

    fetchApplications();

  }, [id]);


  // UPDATE STATUS
  const updateStatus =
    async (
      appId: string,
      status: string
    ) => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      await API.put(
        `/applications/status/${appId}`,
        { status },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      alert(
        "Status Updated"
      );

      // UPDATE UI
      setApplications(
        applications.map(
          (app) =>
            app._id === appId
              ? {
                  ...app,
                  status,
                }
              : app
        )
      );

    } catch (error) {

      console.log(error);

    }
  };


  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">

        Applicants

      </h1>


      <div className="space-y-5">

        {applications.map(
          (app) => (

          <div
            key={app._id}
            className="bg-white shadow-md rounded-lg p-5"
          >

            <h2 className="text-xl font-bold">

              {
                app.applicant
                  ?.name
              }

            </h2>


            <p className="text-gray-600">

              {
                app.applicant
                  ?.email
              }

            </p>


            <p className="mt-2 font-semibold">

              Status:
              {" "}
              {app.status}

            </p>


            <div className="flex gap-3 mt-4">

              <button
                onClick={() =>
                  updateStatus(
                    app._id,
                    "Interview"
                  )
                }
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >

                Interview

              </button>


              <button
                onClick={() =>
                  updateStatus(
                    app._id,
                    "Selected"
                  )
                }
                className="bg-green-600 text-white px-4 py-2 rounded"
              >

                Selected

              </button>


              <button
                onClick={() =>
                  updateStatus(
                    app._id,
                    "Rejected"
                  )
                }
                className="bg-red-600 text-white px-4 py-2 rounded"
              >

                Reject

              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}