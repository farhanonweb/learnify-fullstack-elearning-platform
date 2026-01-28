import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FaCheckCircle, FaLock, FaPlayCircle, FaSignal, FaLayerGroup } from "react-icons/fa";

const CourseDetail = () => {
  const { slug } = useParams();

  const [course, setCourse] = useState(null);
  const [enrollment, setEnrollment] = useState(null);

  const token = localStorage.getItem("token");

  // 🔹 Fetch course
  useEffect(() => {
    API.get(`/courses/${slug}`)
      .then((res) => setCourse(res.data))
      .catch(() => toast.error("Course not found"));
  }, [slug]);

  // 🔹 Fetch enrollment
  useEffect(() => {
    if (!token || !course) return;

    const payload = JSON.parse(atob(token.split(".")[1]));
    const userId = payload.id;

    API.get(`/enrollments/me/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        const found = res.data.find(
          (e) => e.courseId === course._id
        );
        setEnrollment(found || null);
      })
      .catch(() => {});
  }, [course, token]);

  // 🔹 Enroll
  const enrollCourse = async () => {
    if (!token) {
      toast.error("Please login first");
      window.location.href = "/login";
      return;
    }

    const payload = JSON.parse(atob(token.split(".")[1]));
    const userId = payload.id;

    try {
      await API.post(
        "/enrollments/enroll",
        { userId, courseId: course._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Enrolled successfully 🎉");

      const res = await API.get(`/enrollments/me/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const found = res.data.find(
        (e) => e.courseId === course._id
      );
      setEnrollment(found);
    } catch {
      toast.error("Enrollment failed");
    }
  };

  // 🔹 Mark lesson complete
  const markComplete = async (lessonId) => {
    try {
      await API.put(
        `/enrollments/${enrollment._id}/progress`,
        {
          progress: {
            ...enrollment.progress,
            [lessonId]: true,
          },
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Lesson completed ✅");

      const payload = JSON.parse(atob(token.split(".")[1]));
      const userId = payload.id;

      const res = await API.get(`/enrollments/me/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updated = res.data.find(
        (e) => e.courseId === course._id
      );
      setEnrollment(updated);
    } catch {
      toast.error("Failed to update progress");
    }
  };

  if (!course) {
    return (
      <div className="bg-slate-950 min-h-screen flex items-center justify-center text-emerald-400">
        <span className="loading loading-spinner loading-lg">Loading Course...</span>
      </div>
    );
  }

  const totalLessons = course.lessons?.length || 0;
  const completedLessons = enrollment?.progress
    ? Object.keys(enrollment.progress).length
    : 0;

  const progressPercent =
    totalLessons === 0
      ? 0
      : Math.round((completedLessons / totalLessons) * 100);

  return (
    <div className="bg-slate-950 min-h-screen text-white font-sans selection:bg-emerald-500/30 pb-20">
      
      {/* HEADER BANNER */}
      <div className="relative h-80 w-full">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent z-10" />
        <img 
          src={course.thumbnailUrl || "https://placehold.co/1200x600"}
          className="w-full h-full object-cover"
          alt={course.title}
        />
        <div className="absolute bottom-0 left-0 w-full p-6 z-20 max-w-7xl mx-auto">
           <div className="flex flex-wrap gap-3 mb-3 text-xs font-semibold uppercase tracking-wider">
              <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1">
                 <FaLayerGroup /> {course.category}
              </span>
              <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full border border-purple-500/30 flex items-center gap-1">
                 <FaSignal /> {course.difficulty}
              </span>
           </div>
           <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-2 shadow-sm">{course.title}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10 mt-8">
        
        {/* LEFT COLUMN: DESCRIPTION & LESSONS */}
        <div className="md:col-span-2">
           <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8 shadow-xl">
              <h2 className="text-xl font-bold mb-4 border-b border-slate-800 pb-2">About this Course</h2>
              <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                {course.description}
              </p>
           </div>

           {/* PROGRESS BAR (Only if enrolled) */}
           {enrollment && (
             <div className="mb-8 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                <div className="flex justify-between items-end mb-2">
                   <span className="text-sm font-semibold text-gray-300">Your Progress</span>
                   <span className="text-lg font-bold text-emerald-400">{progressPercent}%</span>
                </div>
                <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                  <div
                    className="h-3 bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-700 ease-out"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
             </div>
           )}

           {/* LESSONS LIST */}
           <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <FaPlayCircle className="text-emerald-500" /> Course Content
              </h2>
              
              <div className="space-y-4">
                {course.lessons?.map((lesson, index) => {
                  const done = enrollment?.progress?.[lesson._id];

                  return (
                    <motion.div
                      key={lesson._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`group border rounded-xl p-5 flex justify-between items-center transition-all ${
                        done 
                        ? "bg-slate-900/50 border-emerald-500/30" 
                        : "bg-slate-900 border-slate-800 hover:border-emerald-500/50"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                         <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${done ? 'bg-emerald-500 text-black' : 'bg-slate-800 text-gray-400'}`}>
                            {index + 1}
                         </div>
                         <span className={`font-medium ${done ? 'text-gray-400 line-through' : 'text-gray-200'}`}>
                            {lesson.title}
                         </span>
                      </div>

                      {enrollment ? (
                        <button
                          disabled={done}
                          onClick={() => markComplete(lesson._id)}
                          className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition ${
                            done
                              ? "text-emerald-500 flex items-center gap-1 cursor-default"
                              : "bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/20"
                          }`}
                        >
                          {done ? <><FaCheckCircle /> Completed</> : "Mark Done"}
                        </button>
                      ) : (
                        <FaLock className="text-slate-600" />
                      )}
                    </motion.div>
                  );
                })}
              </div>
           </div>
        </div>

        {/* RIGHT COLUMN: PRICE & ENROLL (Sticky) */}
        <div className="md:col-span-1">
           <div className="sticky top-24 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
              <div className="text-3xl font-extrabold text-white mb-2">
                 ₹{course.price}
                 <span className="text-sm font-normal text-gray-500 ml-2 line-through">₹{course.price * 2}</span>
              </div>
              <p className="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6">50% Off Limited Time</p>

              {!enrollment ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={enrollCourse}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-bold text-lg shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all"
                >
                  Enroll Now
                </motion.button>
              ) : (
                <div className="w-full py-4 rounded-xl bg-slate-800 text-center text-gray-300 font-semibold border border-slate-700">
                   Already Enrolled
                </div>
              )}

              <div className="mt-6 text-sm text-gray-400 space-y-3">
                 <p className="flex items-center gap-2"><FaCheckCircle className="text-emerald-500"/> Full Lifetime Access</p>
                 <p className="flex items-center gap-2"><FaCheckCircle className="text-emerald-500"/> Certificate of Completion</p>
                 <p className="flex items-center gap-2"><FaCheckCircle className="text-emerald-500"/> Mobile & TV Access</p>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default CourseDetail;