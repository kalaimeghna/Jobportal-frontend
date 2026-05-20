import {
  useState,
  useEffect,
} from "react";

import API from "../services/api";


// ================= TYPES =================

type Resume = {

  _id: string;

  resumeUrl: string;
};


export default function ResumeUpload() {

  const [file, setFile] =
    useState<File | null>(
      null
    );

  const [resumes, setResumes] =
    useState<Resume[]>([]);

  const [loading, setLoading] =
    useState(true);


  // ================= FETCH RESUMES =================

  const fetchResumes =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const { data } =
          await API.get(

            "/resume/my",

            {
              headers: {

                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setResumes(
          data.resumes
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };


  // ================= USE EFFECT =================

  useEffect(() => {

    const loadData =
      async () => {

        await fetchResumes();
      };

    loadData();

  }, []);


  // ================= HANDLE UPLOAD =================

  const handleUpload =
    async () => {

      if (!file) {

        alert(
          "Please select file"
        );

        return;
      }

      try {

        const formData =
          new FormData();

        formData.append(
          "resume",
          file
        );

        const token =
          localStorage.getItem(
            "token"
          );

        const { data } =
          await API.post(

            "/resume/upload",

            formData,

            {
              headers: {

                Authorization:
                  `Bearer ${token}`,

                "Content-Type":
                  "multipart/form-data",
              },
            }
          );

        alert(
          data.message
        );

        setFile(null);

        fetchResumes();

      } catch (error) {

        console.log(error);

        alert(
          "Upload failed"
        );
      }
    };


  // ================= DELETE RESUME =================

  const deleteResume =
    async (id: string) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const { data } =
          await API.delete(

            `/resume/${id}`,

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

        fetchResumes();

      } catch (error) {

        console.log(error);

        alert(
          "Delete failed"
        );
      }
    };


  // ================= LOADING =================

  if (loading) {

    return (

      <div className="p-10 text-xl">

        Loading...

      </div>
    );
  }


  return (

    <div className="p-10">

      {/* TITLE */}

      <h1 className="text-4xl font-bold mb-8">

        Resume Upload

      </h1>


      {/* FILE INPUT */}

      <div className="mb-6">

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) =>

            setFile(
              e.target.files?.[0] ||
              null
            )
          }
          className="border p-3 rounded-lg"
        />

      </div>


      {/* UPLOAD BUTTON */}

      <button
        onClick={handleUpload}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
      >

        Upload Resume

      </button>


      {/* RESUME LIST */}

      <div className="mt-10">

        <h2 className="text-2xl font-bold mb-4">

          My Resumes

        </h2>


        {
          resumes.length === 0 ? (

            <p className="text-gray-600">

              No resumes uploaded

            </p>

          ) : (

            resumes.map((resume) => (

              <div
                key={resume._id}
                className="bg-white shadow-lg rounded-xl p-4 mb-4 flex justify-between items-center"
              >

                {/* VIEW */}

                <a
                  href={
                    resume.resumeUrl
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >

                  View Resume

                </a>


                {/* DELETE */}

                <button
                  onClick={() =>
                    deleteResume(
                      resume._id
                    )
                  }
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >

                  Delete

                </button>

              </div>
            ))
          )
        }

      </div>

    </div>
  );
}