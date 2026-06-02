import { useEffect, useState } from "react";
import API from "../services/api";

type User = {
  name: string;
  email: string;
  phone?: string;
  skills?: string[];
  experience?: string;
  education?: string;
  profilePicture?: string;
  profilePic?: string;
  role?: string;
};

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
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
          skills: data.skills?.join(", ") || "",
          experience: data.experience || "",
          education: data.education || "",
        });
      } catch (err) {
        console.log("Profile fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ================= UPDATE PROFILE =================
  const handleUpdate = async () => {
    try {
      setUpdating(true);

      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("phone", form.phone);
      formData.append("experience", form.experience);
      formData.append("education", form.education);
      formData.append("skills", form.skills);

      if (file) {
        formData.append("profilePicture", file);
      }

      const res = await API.put("/users/profile", formData);

      setUser(res.data.user);

      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Profile updated successfully");

    } catch (err) {
      console.log("Update error:", err);
      alert("Update failed");
    } finally {
      setUpdating(false);
    }
  };

  // ================= LOADING =================
  if (loading) return <div className="p-6">Loading...</div>;
  if (!user) return <div className="p-6">User not found</div>;

  // ================= IMAGE FIX =================
  const imageSrc =
    user.profilePicture ||
    user.profilePic ||
    "https://ui-avatars.com/api/?name=User";

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg">

      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      {/* PROFILE IMAGE */}
      <img
        src={imageSrc}
        className="w-24 h-24 rounded-full mb-4"
      />

      {/* FILE UPLOAD */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-3"
      />

      {/* INPUTS */}
      <input
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        placeholder="Name"
        className="border p-2 w-full my-2"
      />

      <input
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        placeholder="Phone"
        className="border p-2 w-full my-2"
      />

      <input
        value={form.skills}
        onChange={(e) => setForm({ ...form, skills: e.target.value })}
        placeholder="Skills (comma separated)"
        className="border p-2 w-full my-2"
      />

      <input
        value={form.experience}
        onChange={(e) => setForm({ ...form, experience: e.target.value })}
        placeholder="Experience"
        className="border p-2 w-full my-2"
      />

      <input
        value={form.education}
        onChange={(e) => setForm({ ...form, education: e.target.value })}
        placeholder="Education"
        className="border p-2 w-full my-2"
      />

      {/* BUTTON */}
      <button
        onClick={handleUpdate}
        disabled={updating}
        className="bg-blue-600 text-white px-4 py-2 w-full"
      >
        {updating ? "Updating..." : "Update Profile"}
      </button>

    </div>
  );
}