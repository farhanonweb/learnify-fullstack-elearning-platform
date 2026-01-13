import { useEffect, useState } from "react";
import API from "../api/api";
import CourseCard from "../components/CourseCard";
import LoadingCard from "../components/LoadingCard";

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
      <div className="bg-slate-950 min-h-screen px-10 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <LoadingCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 min-h-screen px-10 py-14 text-white">
      
      {/* 🔥 UNIQUE HEADING SECTION */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-wide">
          Explore <span className="text-emerald-400">Smart Courses</span>
        </h1>
        <p className="text-gray-400 mt-3 max-w-xl mx-auto text-sm">
          Learn future-ready skills with industry-focused courses designed 
          for students & developers.
        </p>

        {/* underline glow */}
        <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-cyan-400 
        mx-auto mt-5 rounded-full"></div>
      </div>

      {/* 📚 COURSES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {courses.map((c) => (
          <CourseCard key={c._id} course={c} />
        ))}
      </div>
    </div>
  );
};

export default Courses;
