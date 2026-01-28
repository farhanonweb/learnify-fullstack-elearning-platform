import { useEffect, useState } from "react";
import API from "../api/api";
import toast from "react-hot-toast";
import {
  FaPlus,
  FaTrash,
  FaEdit,
  FaBookOpen,
  FaUpload,
  FaLayerGroup,
  FaRupeeSign,
  FaImage,
  FaCube,
  FaChalkboardTeacher,
  FaTimes,
  FaSave,
} from "react-icons/fa";

const Admin = () => {
  // ================= LOGIC (NO CHANGE) =================
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  // Modal State
  const [activeModal, setActiveModal] = useState(null); // 'price', 'thumbnail', 'lesson'
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [modalInput, setModalInput] = useState(""); 
  const [lessonData, setLessonData] = useState({ title: "", content: "", order: "" });

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
      setTitle(""); setSlug(""); setPrice(""); setCategory("");
      setDifficulty(""); setDescription(""); setThumbnailUrl("");
      fetchCourses();
    } catch {
      toast.error("Only admin can create course ❌");
    }
  };

  const handleDeleteCourse = async (id) => {
    if (!window.confirm("Delete course?")) return;
    await API.delete(`/courses/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchCourses();
  };

  // MODAL HANDLERS
  const openModal = (type, course) => {
    setActiveModal(type);
    setSelectedCourse(course);
    if (type === "price") setModalInput(course.price);
    if (type === "thumbnail") setModalInput(course.thumbnailUrl || "");
    if (type === "lesson") setLessonData({ title: "", content: "", order: "" });
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedCourse(null);
  };

  const handleSaveChanges = async () => {
    if (!selectedCourse) return;

    try {
      if (activeModal === "price") {
        await API.put(
          `/courses/${selectedCourse._id}`,
          { price: modalInput },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Price updated 💰");
      } else if (activeModal === "thumbnail") {
        await API.put(
          `/courses/${selectedCourse._id}`,
          { thumbnailUrl: modalInput },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Thumbnail updated 🖼️");
      } else if (activeModal === "lesson") {
        await API.put(
          `/courses/${selectedCourse._id}`,
          {
            lessons: [
              ...selectedCourse.lessons,
              {
                title: lessonData.title,
                contentHtml: lessonData.content,
                order: Number(lessonData.order),
              },
            ],
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Lesson added 📚");
      }

      fetchCourses();
      closeModal();
    } catch {
      toast.error("Update failed ❌");
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
        toast.error("Upload failed");
      }
    };
    input.click();
  };

  // ================= DESIGN (Responsive & Unique) =================
  return (
    <div className="bg-slate-950 min-h-screen text-white px-4 md:px-8 py-10 font-sans selection:bg-emerald-500/30">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER & STATS */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 border-b border-slate-800 pb-8 gap-6">
          <div className="w-full lg:w-auto">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
              Admin <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Control Panel</span>
            </h1>
            <p className="text-slate-400 text-sm md:text-base">
              Manage your courses, content, and certificates efficiently.
            </p>
          </div>
          
          {/* Responsive Stats Grid */}
          <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
            <div className="bg-slate-900 border border-slate-800 px-5 py-3 rounded-xl flex items-center gap-3 shadow-lg">
              <div className="bg-blue-500/10 p-2.5 rounded-lg text-blue-400"><FaCube size={18} /></div>
              <div><p className="text-[10px] text-slate-400 uppercase font-bold">Courses</p><p className="text-xl font-bold">{courses.length}</p></div>
            </div>
            <div className="bg-slate-900 border border-slate-800 px-5 py-3 rounded-xl flex items-center gap-3 shadow-lg">
              <div className="bg-purple-500/10 p-2.5 rounded-lg text-purple-400"><FaChalkboardTeacher size={18} /></div>
              <div><p className="text-[10px] text-slate-400 uppercase font-bold">Lessons</p><p className="text-xl font-bold">{courses.reduce((acc,c)=> acc + (c.lessons?.length || 0), 0)}</p></div>
            </div>
          </div>
        </div>

        {/* CREATE COURSE FORM */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 mb-16 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] -z-10" />
          
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
            <span className="w-1 h-6 bg-emerald-500 rounded-full"></span> Create New Course
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Input placeholder="Course Title" value={title} setValue={setTitle} />
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="Price (₹)" value={price} setValue={setPrice} />
                <div className="relative">
                   <select 
                     value={difficulty} 
                     onChange={(e) => setDifficulty(e.target.value)}
                     className="w-full p-3 rounded-lg bg-black/40 border border-slate-700 focus:border-emerald-500 outline-none text-sm text-slate-300 appearance-none"
                   >
                     <option value="" disabled>Select Difficulty</option>
                     <option value="Beginner">Beginner</option>
                     <option value="Intermediate">Intermediate</option>
                     <option value="Advanced">Advanced</option>
                   </select>
                </div>
              </div>
              <Input placeholder="Thumbnail URL" value={thumbnailUrl} setValue={setThumbnailUrl} />
            </div>
            <div className="space-y-4">
              <Input placeholder="Slug (e.g. react-mastery)" value={slug} setValue={setSlug} />
              <Input placeholder="Category (e.g. Web Dev)" value={category} setValue={setCategory} />
              <textarea 
                placeholder="Description..." 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                rows="3" 
                className="w-full bg-black/40 border border-slate-700 rounded-lg p-3 text-sm focus:border-emerald-500 outline-none text-white resize-none transition" 
              />
            </div>
          </div>
          <button onClick={handleCreate} className="mt-8 w-full lg:w-auto px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-bold rounded-xl hover:opacity-90 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-transform active:scale-95">
            <FaPlus /> Create Course
          </button>
        </div>

        {/* COURSE LIST */}
        <div>
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <FaLayerGroup className="text-emerald-500" /> Managed Courses
          </h2>

          <div className="grid grid-cols-1 gap-6">
            {courses.map((c) => (
              <div key={c._id} className="group bg-slate-900 border border-slate-800 p-5 rounded-xl flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 hover:border-emerald-500/30 transition-all shadow-md hover:shadow-lg">
                
                {/* Info */}
                <div className="flex gap-5 items-center w-full lg:w-auto">
                  {c.thumbnailUrl ? (
                    <img src={c.thumbnailUrl} alt="thumb" className="w-16 h-16 md:w-20 md:h-20 rounded-lg object-cover border border-slate-700" />
                  ) : (
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg bg-slate-800 flex items-center justify-center text-slate-600"><FaImage size={24}/></div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-base md:text-lg font-bold text-white group-hover:text-emerald-400 transition mb-1.5">{c.title}</h3>
                    <div className="flex flex-wrap gap-2 text-[10px] md:text-xs text-slate-400 font-semibold uppercase tracking-wide">
                      <span className="bg-slate-800 px-2 py-1 rounded border border-slate-700">{c.category}</span>
                      <span className="bg-slate-800 px-2 py-1 rounded border border-slate-700 text-emerald-400 flex items-center gap-1"><FaRupeeSign size={10}/> {c.price}</span>
                      <span className="bg-slate-800 px-2 py-1 rounded border border-slate-700 text-blue-400">{c.lessons?.length || 0} Lessons</span>
                    </div>
                  </div>
                </div>

                {/* Buttons - Mobile Responsive Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full lg:w-auto lg:flex lg:flex-wrap justify-end">
                  <AdminActionBtn onClick={() => openModal("price", c)} icon={<FaEdit />} label="Price" color="blue" />
                  <AdminActionBtn onClick={() => openModal("thumbnail", c)} icon={<FaImage />} label="Photo" color="purple" />
                  <AdminActionBtn onClick={() => openModal("lesson", c)} icon={<FaBookOpen />} label="Lesson" color="cyan" />
                  <AdminActionBtn onClick={() => handleUploadCertificate(c._id)} icon={<FaUpload />} label="Cert" color="green" />
                  
                  {/* Delete Button (Full width on very small screens if needed, otherwise distinct) */}
                  <button 
                    onClick={() => handleDeleteCourse(c._id)} 
                    className="col-span-2 sm:col-span-1 lg:ml-4 flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white rounded-lg transition border border-red-500/30"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))}

            {courses.length === 0 && (
              <div className="text-center py-20 text-slate-500 bg-slate-900/30 rounded-2xl border border-dashed border-slate-800">
                <FaCube className="mx-auto text-4xl mb-4 opacity-50" />
                <p>No courses found. Start by creating one above.</p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* 🔥 MODAL (Responsive) */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl w-full max-w-md shadow-2xl relative animate-fade-in-up mx-4">
            <button onClick={closeModal} className="absolute top-4 right-4 text-slate-500 hover:text-white transition"><FaTimes size={20}/></button>
            
            <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
              <span className="text-emerald-400">
                {activeModal === "price" && <FaRupeeSign />}
                {activeModal === "thumbnail" && <FaImage />}
                {activeModal === "lesson" && <FaBookOpen />}
              </span>
              {activeModal === "price" && "Update Price"}
              {activeModal === "thumbnail" && "Update Photo URL"}
              {activeModal === "lesson" && "Add New Lesson"}
            </h3>

            {/* Price/Thumbnail Input */}
            {(activeModal === "price" || activeModal === "thumbnail") && (
              <Input placeholder="Enter new value..." value={modalInput} setValue={setModalInput} />
            )}

            {/* Lesson Inputs */}
            {activeModal === "lesson" && (
              <div className="space-y-4">
                <Input placeholder="Lesson Title" value={lessonData.title} setValue={(val) => setLessonData({ ...lessonData, title: val })} />
                <textarea placeholder="Lesson Content (HTML allowed)" value={lessonData.content} onChange={(e) => setLessonData({ ...lessonData, content: e.target.value })} rows="5" className="w-full bg-black/40 border border-slate-700 rounded-lg p-3 text-sm focus:border-emerald-500 outline-none text-white resize-none transition" />
                <Input placeholder="Order (e.g. 1)" value={lessonData.order} setValue={(val) => setLessonData({ ...lessonData, order: val })} />
              </div>
            )}

            <button onClick={handleSaveChanges} className="mt-6 w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-lg flex items-center justify-center gap-2 transition shadow-lg shadow-emerald-500/20">
              <FaSave /> Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

/* 🔹 Reusable Components */
const Input = ({ placeholder, value, setValue }) => (
  <input placeholder={placeholder} value={value} onChange={(e) => setValue(typeof setValue === 'function' ? e.target.value : setValue)} className="w-full p-3.5 rounded-lg bg-black/40 border border-slate-700 focus:border-emerald-500 outline-none text-sm text-white placeholder-slate-600 transition" />
);

const AdminActionBtn = ({ onClick, icon, label, color }) => {
  const colors = {
    blue: "bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white border-blue-500/30",
    purple: "bg-purple-500/10 text-purple-400 hover:bg-purple-500 hover:text-white border-purple-500/30",
    cyan: "bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500 hover:text-white border-cyan-500/30",
    green: "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white border-emerald-500/30",
  };
  return <button onClick={onClick} className={`flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold rounded-lg transition border ${colors[color]}`}>{icon} {label}</button>;
};

export default Admin;