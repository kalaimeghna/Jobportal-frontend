import {
  useState,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";


export default function ResetPassword() {

  const { token } =
    useParams();

  const navigate =
    useNavigate();

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(false);


  // ================= HANDLE RESET =================

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      try {

        setLoading(true);

        const res =
          await fetch(

            `http://localhost:5000/api/auth/reset-password/${token}`,

            {
              method: "PUT",

              headers: {

                "Content-Type":
                  "application/json",

              },

              body: JSON.stringify({

                password,

              }),
            }
          );

        const data =
          await res.json();

        alert(
          data.message
        );

        if (data.success) {

          navigate("/login");

        }

      } catch (error) {

        console.log(error);

        alert(
          "Password reset failed"
        );

      } finally {

        setLoading(false);

      }
    };


  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold mb-6 text-center">

          Reset Password

        </h1>


        <form
          onSubmit={handleSubmit}
        >

          {/* PASSWORD */}

          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="w-full border p-3 rounded-lg mb-4"
            required
          />


          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
          >

            {
              loading
                ? "Resetting..."
                : "Reset Password"
            }

          </button>

        </form>

      </div>

    </div>
  );
}