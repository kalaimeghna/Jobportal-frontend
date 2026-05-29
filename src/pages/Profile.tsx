import { useEffect, useState } from "react";
import API from "../services/api";

// ================= USER TYPE =================
type User = {
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  skills?: string[];
  experience?: string;
  education?: string;
  profilePicture?: string;
};

// ================= INPUT TYPE =================
type InputEvent =
  React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    skills: "",
    experience: "",
    education: "",
  });

  const [file, setFile] = useState<File | null>(null);

  // ================= FETCH PROFILE =================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/users/profile");

        const data = res.data.user;

        setUser(data);

        setForm({
          name: data.name || "",
          phone: data.phone || "",
          skills: data.skills ? data.skills.join(", ") : "",
          experience: data.experience || "",
          education: data.education || "",
        });

      } catch (error) {
        console.log("Profile fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ================= INPUT CHANGE =================
  const handleChange = (e: InputEvent) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ================= FILE CHANGE =================
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // ================= UPDATE PROFILE =================
  const handleUpdate = async () => {
    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("phone", form.phone);
      formData.append("experience", form.experience);
      formData.append("education", form.education);

      formData.append(
        "skills",
        JSON.stringify(
          form.skills.split(",").map((s) => s.trim())
        )
      );

      if (file) {
        formData.append("profilePicture", file);
      }

      const res = await API.put("/users/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUser(res.data.user);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert("Profile updated successfully");

    } catch (error) {
      console.log(error);
      alert("Update failed");
    }
  };

  // ================= LOADING =================
  if (loading) {
    return <div className="p-6">Loading profile...</div>;
  }

  if (!user) {
    return <div className="p-6">User not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg">

      <h1 className="text-2xl font-bold mb-6">
        My Profile
      </h1>

      {/* PROFILE IMAGE */}
      <div className="flex items-center gap-4 mb-4">

        <img
          src={
            user.profilePicture
              ? `http://localhost:5000${user.profilePicture}`
              : "https://ui-avatars.com/api/?name=User"
          }
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://ui-avatars.com/api/?name=User";
          }}
          className="w-24 h-24 rounded-full border object-cover"
        />

      </div>

      {/* FILE UPLOAD */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="border p-2 w-full mb-3"
      />

      {/* NAME */}
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        className="border p-2 w-full mb-3"
      />

      {/* PHONE */}
      <input
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Phone"
        className="border p-2 w-full mb-3"
      />

      {/* SKILLS */}
      <input
        name="skills"
        value={form.skills}
        onChange={handleChange}
        placeholder="Skills (React, Node, MongoDB)"
        className="border p-2 w-full mb-3"
      />

      {/* EXPERIENCE */}
      <input
        name="experience"
        value={form.experience}
        onChange={handleChange}
        placeholder="Experience"
        className="border p-2 w-full mb-3"
      />

      {/* EDUCATION */}
      <input
        name="education"
        value={form.education}
        onChange={handleChange}
        placeholder="Education"
        className="border p-2 w-full mb-4"
      />

      {/* UPDATE BUTTON */}
      <button
        onClick={handleUpdate}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Update Profile
      </button>

    </div>
  );
}