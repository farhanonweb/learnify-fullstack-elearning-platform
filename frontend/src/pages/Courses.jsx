import { useEffect, useState } from "react";
import API from "../api/api";
import CourseCard from "../components/CourseCard";
import LoadingCard from "../components/LoadingCard";
import { motion } from "framer-motion";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/courses")
      .then((res) => {
        setCourses(res.data);
        setLoading(false);
      })
      .catch(() => {
        alert("Failed to load courses");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="bg-slate-950 min-h-screen px-6 py-14">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <LoadingCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 min-h-screen relative overflow-hidden text-white font-sans selection:bg-emerald-500/30">
      
      {/* Background Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        
        {/* 🔥 UNIQUE HEADING SECTION */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Smart Courses</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-base">
              Unlock your potential with industry-standard curriculums designed to get you hired.
            </p>
            
            {/* Decorative Line */}
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-cyan-400 mx-auto mt-6 rounded-full opacity-80"></div>
          </motion.div>
        </div>

        {/* 📚 COURSES GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((c) => (
            <CourseCard key={c._id} course={c} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;