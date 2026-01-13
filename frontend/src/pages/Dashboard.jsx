import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

const Dashboard = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [coursesMap, setCoursesMap] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const userId = JSON.parse(atob(token.split(".")[1])).id;

    API.get(`/enrollments/me/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => setEnrollments(res.data));

    API.get("/courses").then((res) => {
      const map = {};
      res.data.forEach((course) => {
        map[course._id] = course;
      });
      setCoursesMap(map);
    });
  }, []);

  return (
    <div className="bg-slate-950 min-h-screen text-white px-10 py-14">
      
      {/* 🔥 DASHBOARD HEADING */}
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-wide">
          My <span className="text-cyan-400">Learning Dashboard</span>
        </h1>
        <p className="text-gray-400 mt-2 text-sm max-w-xl">
          Track your progress, continue learning, and download certificates
          once you complete your courses.
        </p>

        <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-emerald-400 
        mt-4 rounded-full"></div>
      </div>

      {/* ❌ EMPTY STATE */}
      {enrollments.length === 0 && (
        <div className="bg-slate-900 border border-slate-800 
        rounded-xl p-6 text-gray-400">
          You have not enrolled in any course yet.
        </div>
      )}

      {/* 📚 ENROLLED COURSES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {enrollments.map((e) => {
          const course = coursesMap[e.courseId];

          return (
            <div
              key={e._id}
              className="bg-slate-900 border border-slate-800 
              rounded-xl p-6 hover:border-cyan-400 transition"
            >
              <h2 className="text-lg font-bold mb-1">
                Course ID:
                <span className="text-emerald-400 ml-2">
                  {e.courseId}
                </span>
              </h2>

              <p className="text-gray-400 text-sm mb-4">
                Progress Completed:{" "}
                <span className="text-cyan-400 font-semibold">
                  {Object.keys(e.progress || {}).length}
                </span>{" "}
                lessons
              </p>

              {/* 🎯 ACTION BUTTONS */}
              <div className="flex flex-col gap-3">

                {/* Continue Learning */}
                <button
                  onClick={() => navigate("/courses")}
                  className="w-full py-2 rounded-lg 
                  bg-gradient-to-r from-cyan-400 to-emerald-400 
                  text-black font-semibold hover:opacity-90 transition"
                >
                  Continue Learning
                </button>

                {/* ✅ Download Certificate (UPDATED COLOR ONLY) */}
                {e.certificateIssued && course?.certificateFile && (
                  <a
                    href={`http://localhost:5000/${course.certificateFile}`}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 rounded-lg text-center
                    bg-gradient-to-r from-emerald-500 to-green-600
                    text-white font-semibold
                    hover:from-emerald-600 hover:to-green-700
                    transition"
                  >
                    Download Certificate 🎓
                  </a>
                )}

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
