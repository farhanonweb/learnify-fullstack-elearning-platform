import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBookOpen, FaCheckCircle, FaAward, FaPlayCircle } from "react-icons/fa";
import API from "../api/api";

const Dashboard = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [coursesMap, setCoursesMap] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const userId = JSON.parse(atob(token.split(".")[1])).id;

    // Fetch Enrollments
    API.get(`/enrollments/me/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => setEnrollments(res.data));

    // Fetch Courses Details
    API.get("/courses").then((res) => {
      const map = {};
      res.data.forEach((course) => {
        map[course._id] = course;
      });
      setCoursesMap(map);
    });
  }, []);

  // Calculate Stats
  const totalEnrolled = enrollments.length;
  const completedCourses = enrollments.filter(e => e.completed).length; // Assuming 'completed' flag exists or logic
  const certificatesEarned = enrollments.filter(e => e.certificateIssued).length;

  return (
    <div className="bg-slate-950 min-h-screen text-white px-6 py-14 font-sans selection:bg-emerald-500/30">
      
      <div className="max-w-6xl mx-auto">
        
        {/* 🔥 HEADER & STATS */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Learning Dashboard</span>
          </h1>
          <p className="text-slate-400">Welcome back! Here's your progress overview.</p>
        </div>

        {/* 📊 STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
           <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center gap-4 shadow-lg">
              <div className="bg-blue-500/10 p-4 rounded-full text-blue-400"><FaBookOpen size={24}/></div>
              <div>
                 <h3 className="text-2xl font-bold">{totalEnrolled}</h3>
                 <p className="text-sm text-slate-400">Enrolled Courses</p>
              </div>
           </div>
           <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center gap-4 shadow-lg">
              <div className="bg-emerald-500/10 p-4 rounded-full text-emerald-400"><FaCheckCircle size={24}/></div>
              <div>
                 <h3 className="text-2xl font-bold">{completedCourses}</h3>
                 <p className="text-sm text-slate-400">Completed</p>
              </div>
           </div>
           <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center gap-4 shadow-lg">
              <div className="bg-yellow-500/10 p-4 rounded-full text-yellow-400"><FaAward size={24}/></div>
              <div>
                 <h3 className="text-2xl font-bold">{certificatesEarned}</h3>
                 <p className="text-sm text-slate-400">Certificates</p>
              </div>
           </div>
        </div>

        {/* ❌ EMPTY STATE */}
        {enrollments.length === 0 && (
          <div className="text-center py-20 bg-slate-900/50 rounded-3xl border border-dashed border-slate-800">
            <h3 className="text-xl font-bold text-slate-300 mb-2">No courses found</h3>
            <p className="text-slate-500 mb-6">You haven't enrolled in any courses yet.</p>
            <button 
              onClick={() => navigate("/courses")}
              className="bg-emerald-500 hover:bg-emerald-400 text-black px-6 py-3 rounded-lg font-bold transition"
            >
              Explore Courses
            </button>
          </div>
        )}

        {/* 📚 COURSE CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {enrollments.map((e) => {
            const course = coursesMap[e.courseId];
            const progressCount = Object.keys(e.progress || {}).length;
            
            // Dummy total lessons if not available (replace with actual logic)
            const totalLessons = course?.lessons?.length || 10; 
            const percent = Math.min(100, Math.round((progressCount / totalLessons) * 100));

            return (
              <div
                key={e._id}
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300 shadow-xl flex flex-col"
              >
                <div className="p-6 flex-grow">
                  {/* Course Title */}
                  <h2 className="text-xl font-bold mb-2 line-clamp-1 text-white">
                    {course?.title || `Course ID: ${e.courseId}`}
                  </h2>
                  <p className="text-xs text-emerald-400 font-semibold uppercase tracking-wider mb-6">
                    {course?.category || "Web Development"}
                  </p>

                  {/* Progress Bar */}
                  <div className="mb-2 flex justify-between text-xs font-semibold text-slate-400">
                     <span>Progress</span>
                     <span>{percent}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-6">
                     <div 
                       className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-500"
                       style={{ width: `${percent}%` }}
                     />
                  </div>

                  <div className="flex gap-4 text-sm text-slate-400">
                     <span className="flex items-center gap-1"><FaBookOpen/> {progressCount}/{totalLessons} Lessons</span>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="bg-slate-950/50 p-4 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => navigate(`/courses/${course?.slug || ''}`)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold transition"
                  >
                    <FaPlayCircle /> Continue
                  </button>

                  {e.certificateIssued && course?.certificateFile && (
                    <a
                      href={`http://localhost:5000/${course.certificateFile}`}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-white font-semibold transition"
                    >
                      <FaAward className="text-yellow-400" /> Certificate
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;