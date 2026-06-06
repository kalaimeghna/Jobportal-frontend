import { useEffect, useState } from "react";
import API from "../services/api";

type User = {
  name: string;
  email: string;
  phone?: string;
  location?: string;
  headline?: string;

  skills?: string[];
  experience?: string;
  education?: string;

  profilePicture?: string;
  role?: string;

  companyName?: string;
  companyDescription?: string;
  companyLocation?: string;
  companyWebsite?: string;
  industry?: string;
};

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [user, setUser] = useState<User | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    location: "",
    headline: "",

    skills: "",
    experience: "",
    education: "",

    companyName: "",
    companyDescription: "",
    companyLocation: "",
    companyWebsite: "",
    industry: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/users/profile");

        const data = res.data.user;

        setUser(data);

        setForm({
          name: data.name || "",
          phone: data.phone || "",
          location: data.location || "",
          headline: data.headline || "",

          skills: data.skills?.join(", ") || "",
          experience: data.experience || "",
          education: data.education || "",

          companyName: data.companyName || "",
          companyDescription: data.companyDescription || "",
          companyLocation: data.companyLocation || "",
          companyWebsite: data.companyWebsite || "",
          industry: data.industry || "",
        });
      } catch (err) {
        console.error("Profile fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    try {
      setUpdating(true);

      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("phone", form.phone);
      formData.append("location", form.location);
      formData.append("headline", form.headline);

      if (user?.role === "jobseeker") {
        formData.append("skills", form.skills);
        formData.append("experience", form.experience);
        formData.append("education", form.education);
      }

      if (user?.role === "employer") {
        formData.append("companyName", form.companyName);
        formData.append(
          "companyDescription",
          form.companyDescription
        );
        formData.append(
          "companyLocation",
          form.companyLocation
        );
        formData.append(
          "companyWebsite",
          form.companyWebsite
        );
        formData.append("industry", form.industry);
      }

      if (file) {
        formData.append("profilePicture", file);
      }

      const res = await API.put(
        "/users/profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUser(res.data.user);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center">
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6 text-center">
        User not found
      </div>
    );
  }

  const imageSrc = user.profilePicture
    ? `${import.meta.env.VITE_API_URL}/${user.profilePicture}`
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
        user.name
      )}`;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-6">

        <h1 className="text-3xl font-bold mb-6">
          My Profile
        </h1>

        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-8">
          <img
            src={imageSrc}
            alt="Profile"
            className="w-32 h-32 rounded-full border object-cover"
          />

          <input
            type="file"
            accept="image/*"
            className="mt-4"
            onChange={(e) =>
              setFile(
                e.target.files?.[0] || null
              )
            }
          />
        </div>

        {/* Basic Information */}
        <h2 className="text-xl font-semibold mb-4">
          Basic Information
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            className="border p-2 rounded"
          />

          <input
            type="text"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) =>
              setForm({
                ...form,
                phone: e.target.value,
              })
            }
            className="border p-2 rounded"
          />

          <input
            type="text"
            placeholder="Location"
            value={form.location}
            onChange={(e) =>
              setForm({
                ...form,
                location: e.target.value,
              })
            }
            className="border p-2 rounded"
          />

          <input
            type="text"
            placeholder="Professional Headline"
            value={form.headline}
            onChange={(e) =>
              setForm({
                ...form,
                headline: e.target.value,
              })
            }
            className="border p-2 rounded"
          />
        </div>

        {/* Job Seeker Fields */}
        {user.role === "jobseeker" && (
          <>
            <h2 className="text-xl font-semibold mt-8 mb-4">
              Professional Details
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Skills (React, Node.js, MongoDB)"
                value={form.skills}
                onChange={(e) =>
                  setForm({
                    ...form,
                    skills: e.target.value,
                  })
                }
                className="border p-2 rounded w-full"
              />

              <textarea
                rows={4}
                placeholder="Experience"
                value={form.experience}
                onChange={(e) =>
                  setForm({
                    ...form,
                    experience: e.target.value,
                  })
                }
                className="border p-2 rounded w-full"
              />

              <textarea
                rows={4}
                placeholder="Education"
                value={form.education}
                onChange={(e) =>
                  setForm({
                    ...form,
                    education: e.target.value,
                  })
                }
                className="border p-2 rounded w-full"
              />
            </div>
          </>
        )}

        {/* Employer Fields */}
        {user.role === "employer" && (
          <>
            <h2 className="text-xl font-semibold mt-8 mb-4">
              Company Information
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Company Name"
                value={form.companyName}
                onChange={(e) =>
                  setForm({
                    ...form,
                    companyName: e.target.value,
                  })
                }
                className="border p-2 rounded w-full"
              />

              <textarea
                rows={4}
                placeholder="Company Description"
                value={form.companyDescription}
                onChange={(e) =>
                  setForm({
                    ...form,
                    companyDescription:
                      e.target.value,
                  })
                }
                className="border p-2 rounded w-full"
              />

              <input
                type="text"
                placeholder="Company Location"
                value={form.companyLocation}
                onChange={(e) =>
                  setForm({
                    ...form,
                    companyLocation:
                      e.target.value,
                  })
                }
                className="border p-2 rounded w-full"
              />

              <input
                type="text"
                placeholder="Company Website"
                value={form.companyWebsite}
                onChange={(e) =>
                  setForm({
                    ...form,
                    companyWebsite:
                      e.target.value,
                  })
                }
                className="border p-2 rounded w-full"
              />

              <input
                type="text"
                placeholder="Industry"
                value={form.industry}
                onChange={(e) =>
                  setForm({
                    ...form,
                    industry: e.target.value,
                  })
                }
                className="border p-2 rounded w-full"
              />
            </div>
          </>
        )}

        <button
          onClick={handleUpdate}
          disabled={updating}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded mt-8"
        >
          {updating
            ? "Updating..."
            : "Update Profile"}
        </button>
      </div>
    </div>
  );
}