import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";


type User = {

  _id: string;

  name: string;

  email: string;

  role: string;

  skills?: string[];

  experience?: string;

  phone?: string;

};


export default function Profile() {

  const [
    user,
    setUser,
  ] = useState<User | null>(
    null
  );

  const [
    loading,
    setLoading,
  ] = useState(true);


  // ================= FETCH PROFILE =================

  useEffect(() => {

    const fetchProfile =
      async () => {

        try {

          const token =
            localStorage.getItem(
              "token"
            );

          const { data } =
            await API.get(
              "/auth/profile",
              {
                headers: {

                  Authorization:
                    `Bearer ${token}`,

                },
              }
            );

          setUser(data.user);

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }
      };

    fetchProfile();

  }, []);


  // ================= LOADING =================

  if (loading) {

    return (

      <div className="text-center mt-10 text-2xl">

        Loading...

      </div>
    );
  }


  // ================= NO USER =================

  if (!user) {

    return (

      <div className="text-center mt-10 text-2xl text-red-500">

        User not found

      </div>
    );
  }


  return (

    <div className="max-w-4xl mx-auto p-8">

      <div className="bg-white shadow-xl rounded-2xl p-8">

        {/* HEADING */}

        <h1 className="text-4xl font-bold mb-8">

          User Profile

        </h1>


        {/* NAME */}

        <div className="mb-5">

          <h2 className="text-lg font-semibold text-gray-600">

            Name

          </h2>

          <p className="text-2xl">

            {user.name}

          </p>

        </div>


        {/* EMAIL */}

        <div className="mb-5">

          <h2 className="text-lg font-semibold text-gray-600">

            Email

          </h2>

          <p className="text-2xl">

            {user.email}

          </p>

        </div>


        {/* ROLE */}

        <div className="mb-5">

          <h2 className="text-lg font-semibold text-gray-600">

            Role

          </h2>

          <p className="text-2xl capitalize">

            {user.role}

          </p>

        </div>


        {/* PHONE */}

        <div className="mb-5">

          <h2 className="text-lg font-semibold text-gray-600">

            Phone

          </h2>

          <p className="text-2xl">

            {user.phone || "N/A"}

          </p>

        </div>


        {/* EXPERIENCE */}

        <div className="mb-5">

          <h2 className="text-lg font-semibold text-gray-600">

            Experience

          </h2>

          <p className="text-2xl">

            {user.experience || "N/A"}

          </p>

        </div>


        {/* SKILLS */}

        <div className="mb-5">

          <h2 className="text-lg font-semibold text-gray-600">

            Skills

          </h2>

          <p className="text-2xl">

            {
              user.skills?.length
                ? user.skills.join(", ")
                : "N/A"
            }

          </p>

        </div>

      </div>

    </div>
  );
}