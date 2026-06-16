import {
  useState,
} from "react";


export default function ChangePassword() {

  const [
    oldPassword,
    setOldPassword,
  ] = useState("");

  const [
    newPassword,
    setNewPassword,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(false);


  // ================= HANDLE SUBMIT =================

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      try {

        setLoading(true);

        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await fetch(

            "https://jobport-backend-eyz6.onrender.com/api/auth/change-password",

            {
              method: "PUT",

              headers: {

                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${token}`,

              },

              body: JSON.stringify({

                oldPassword,

                newPassword,

              }),
            }
          );

        const data =
          await res.json();

        alert(
          data.message
        );

        if (data.success) {

          setOldPassword("");

          setNewPassword("");

        }

      } catch (error) {

        console.log(error);

        alert(
          "Password change failed"
        );

      } finally {

        setLoading(false);

      }
    };


  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6">

          Change Password

        </h1>


        <form
          onSubmit={handleSubmit}
        >

          {/* OLD PASSWORD */}

          <input
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) =>
              setOldPassword(
                e.target.value
              )
            }
            className="w-full border p-3 rounded-lg mb-4"
            required
          />


          {/* NEW PASSWORD */}

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(
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
                ? "Updating..."
                : "Change Password"
            }

          </button>

        </form>

      </div>

    </div>
  );
}