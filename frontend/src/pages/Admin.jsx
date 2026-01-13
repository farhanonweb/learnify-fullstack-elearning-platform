import { useEffect, useState } from "react";
import API from "../api/api";
import toast from "react-hot-toast";

const Admin = () => {
  const [courses, setCourses] = useState([]);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  const token = localStorage.getItem("token");

  const fetchCourses = async () => {
    try {
      const res = await API.get("/courses");
      setCourses(res.data);
    } catch {
      toast.error("Failed to load courses");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleCreate = async () => {
    if (!title || !slug || !price || !category || !difficulty || !description) {
      toast.error("All fields required");
      return;
    }

    try {
      await API.post(
        "/courses",
        { title, slug, price, category, difficulty, description, thumbnailUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Course created ✅");
      setTitle("");
      setSlug("");
      setPrice("");
      setCategory("");
      setDifficulty("");
      setDescription("");
      setThumbnailUrl("");
      fetchCourses();
    } catch {
      toast.error("Only admin can create course ❌");
    }
  };

  const handleUploadCertificate = (courseId) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/pdf";

    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("certificate", file);

      try {
        await API.post(`/courses/${courseId}/certificate`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("Certificate uploaded 🎓");
        fetchCourses();
      } catch {
        toast.error("Certificate upload failed");
      }
    };

    input.click();
  };

  const handleEditPrice = async (course) => {
    const newPrice = prompt("Enter new price", course.price);
    if (!newPrice) return;
    await API.put(
      `/courses/${course._id}`,
      { price: newPrice },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchCourses();
  };

  const handleEditThumbnail = async (course) => {
    const url = prompt("Enter thumbnail URL", course.thumbnailUrl || "");
    if (!url) return;
    await API.put(
      `/courses/${course._id}`,
      { thumbnailUrl: url },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchCourses();
  };

  const handleAddLesson = async (course) => {
    const title = prompt("Lesson title");
    const contentHtml = prompt("Lesson content");
    const order = prompt("Lesson order");
    if (!title || !contentHtml || !order) return;

    await API.put(
      `/courses/${course._id}`,
      {
        lessons: [
          ...course.lessons,
          { title, contentHtml, order: Number(order) },
        ],
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchCourses();
  };

  const handleDeleteCourse = async (id) => {
    if (!window.confirm("Delete course?")) return;
    await API.delete(`/courses/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchCourses();
  };

  return (
    <div className="bg-black min-h-screen text-white px-10 py-14">

      {/* 🔥 ADMIN HEADER */}
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-red-400 tracking-wide">
          Admin Control Panel
        </h1>
        <p className="text-gray-400 text-sm mt-2 max-w-xl">
          Manage courses, lessons, pricing, thumbnails, and certificates.
        </p>

        <div className="w-28 h-1 bg-red-500 mt-4 rounded-full"></div>
      </div>

      {/* ➕ CREATE COURSE */}
      <div className="bg-slate-900 border border-slate-800 
      rounded-xl p-8 mb-14 shadow-lg">

        <h2 className="text-lg font-bold mb-6 text-emerald-400">
          Create New Course
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input placeholder="Title" value={title} setValue={setTitle} />
          <Input placeholder="Slug" value={slug} setValue={setSlug} />
          <Input placeholder="Price" value={price} setValue={setPrice} />
          <Input placeholder="Category" value={category} setValue={setCategory} />
          <Input placeholder="Difficulty" value={difficulty} setValue={setDifficulty} />
          <Input placeholder="Thumbnail URL" value={thumbnailUrl} setValue={setThumbnailUrl} />
        </div>

        <textarea
          placeholder="Course Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-4 w-full p-3 rounded-lg bg-black border border-slate-700 
          focus:border-emerald-400 outline-none"
        />

        <button
          onClick={handleCreate}
          className="mt-6 px-6 py-2 rounded-lg 
          bg-gradient-to-r from-emerald-400 to-cyan-400 
          text-black font-semibold hover:opacity-90 transition"
        >
          Create Course
        </button>
      </div>

      {/* 📚 COURSE LIST */}
      <div className="space-y-6">
        {courses.map((c) => (
          <div
            key={c._id}
            className="bg-slate-900 border border-slate-800 
            rounded-xl p-6 hover:border-red-500 transition"
          >
            <h3 className="text-lg font-bold text-emerald-400">
              {c.title}
            </h3>

            <div className="flex gap-3 mt-4 flex-wrap">
              <AdminBtn onClick={() => handleEditPrice(c)} label="Edit Price" />
              <AdminBtn onClick={() => handleEditThumbnail(c)} label="Change Photo" />
              <AdminBtn onClick={() => handleAddLesson(c)} label="Add Lesson" />

              <button
                onClick={() => handleUploadCertificate(c._id)}
                className="px-3 py-1 rounded-lg 
                bg-green-600 hover:bg-green-700 transition"
              >
                Upload Certificate 🎓
              </button>

              <button
                onClick={() => handleDeleteCourse(c._id)}
                className="px-3 py-1 rounded-lg 
                bg-red-600 hover:bg-red-700 transition"
              >
                Delete Course
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* 🔹 Reusable Input */
const Input = ({ placeholder, value, setValue }) => (
  <input
    placeholder={placeholder}
    value={value}
    onChange={(e) => setValue(e.target.value)}
    className="w-full p-3 rounded-lg bg-black 
    border border-slate-700 focus:border-emerald-400 outline-none"
  />
);

/* 🔹 Reusable Button */
const AdminBtn = ({ onClick, label }) => (
  <button
    onClick={onClick}
    className="px-3 py-1 rounded-lg 
    border border-slate-600 
    hover:border-cyan-400 hover:text-cyan-400 transition"
  >
    {label}
  </button>
);

export default Admin;
