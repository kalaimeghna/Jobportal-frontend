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
  name: string;
  email: string;
  phone?: string;
  skills?: string[];
  experience?: string;
  resumeUrl?: string;
};

type Application = {
  _id: string;
  applicant: Applicant;
  status: string;
};

export default function EmployerApplications() {

  const [applications, setApplications] =
    useState<Application[]>([]);

  const [loading, setLoading] =
    useState(true);

  // ================= GET JOB ID =================

  const { id } = useParams();
  const jobId = id;

  // ================= FETCH APPLICATIONS =================

  useEffect(() => {

  console.log(jobId);

    const fetchApplications = async () => {

      try {

        const token =
          localStorage.getItem("token");

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

        console.log(data);

        setApplications(
          data.applications || []
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }
    };

    if (id) {
      fetchApplications();
    }

  }, [id]);

  // ================= UPDATE STATUS =================

  const updateStatus = async (
    applicationId: string,
    status: string
  ) => {

    try {

      const token =
        localStorage.getItem("token");

      await API.put(
        `/applications/status/${applicationId}`,
        { status },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      // UPDATE UI

      setApplications((prev) =>
        prev.map((app) =>
          app._id === applicationId
            ? {
                ...app,
                status,
              }
            : app
        )
      );

      alert(`Status updated to ${status}`);

    } catch (error) {

      console.log(error);

      alert("Failed to update status");

    }
  };

  // ================= LOADING =================

  if (loading) {

    return (
      <div className="text-center mt-10 text-xl">
        Loading...
      </div>
    );
  }

  return (

    <div className="max-w-6xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        Employer Applications
      </h1>

      {applications.length === 0 ? (

        <div className="bg-white p-6 rounded shadow">
          No applications found
        </div>

      ) : (

        <div className="grid md:grid-cols-2 gap-6">

          {applications.map((app) => (

            <div
              key={app._id}
              className="bg-white shadow-lg rounded-xl p-6 border"
            >

              {/* NAME */}

              <h2 className="text-2xl font-bold mb-3">
                {app.applicant?.name}
              </h2>

              {/* EMAIL */}

              <p className="mb-2 text-gray-700">
                📧 {app.applicant?.email}
              </p>

              {/* PHONE */}

              <p className="mb-2 text-gray-700">
                📞 {app.applicant?.phone || "N/A"}
              </p>

              {/* EXPERIENCE */}

              <p className="mb-2 text-gray-700">
                💼 {app.applicant?.experience || "N/A"}
              </p>

              {/* SKILLS */}

              <p className="mb-2 text-gray-700">
                🛠 Skills:
                {" "}
                {app.applicant?.skills?.length
                  ? app.applicant.skills.join(", ")
                  : "N/A"}
              </p>

              {/* STATUS */}

              <div className="mt-4">

                <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold">
                  {app.status}
                </span>

              </div>

              {/* BUTTONS */}

              <div className="mt-5 flex gap-3 flex-wrap">

                {/* VIEW RESUME */}

                {app.applicant?.resumeUrl ? (

                  <a
                    href={app.applicant.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                  >
                    View Resume
                  </a>

                ) : (

                  <button
                    disabled
                    className="bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed"
                  >
                    No Resume
                  </button>

                )}

                {/* INTERVIEW */}

                <button
                  onClick={() =>
                    updateStatus(
                      app._id,
                      "Interview"
                    )
                  }
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                >
                  Interview
                </button>

                {/* SELECTED */}

                <button
                  onClick={() =>
                    updateStatus(
                      app._id,
                      "Selected"
                    )
                  }
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                >
                  Selected
                </button>

                {/* REJECTED */}

                <button
                  onClick={() =>
                    updateStatus(
                      app._id,
                      "Rejected"
                    )
                  }
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                >
                  Rejected
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}