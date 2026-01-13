import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

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
    return <div className="p-10">Loading...</div>;
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
    <div className="bg-slate-950 min-h-screen text-white px-6 py-14">
      <div className="max-w-4xl mx-auto">

        {/* Thumbnail */}
        <img
          src={course.thumbnailUrl || "https://placehold.co/800x400"}
          className="w-full h-72 object-cover rounded-2xl mb-8"
        />

        {/* Course Info */}
        <h1 className="text-4xl font-extrabold">
          {course.title}
        </h1>

        <p className="text-gray-400 mt-2">
          {course.category} • {course.difficulty}
        </p>

        <p className="mt-6 text-gray-300">
          {course.description}
        </p>

        <p className="mt-6 text-2xl font-bold text-emerald-400">
          ₹{course.price}
        </p>

        {/* Enroll Button */}
        {!enrollment && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={enrollCourse}
            className="mt-8 px-8 py-3 rounded-lg 
            bg-gradient-to-r from-emerald-400 to-cyan-400 
            text-black font-semibold"
          >
            Enroll Now
          </motion.button>
        )}

        {/* Progress + Lessons */}
        {enrollment && (
          <>
            {/* Progress */}
            <div className="mt-10">
              <p className="mb-2">
                Progress:{" "}
                <span className="text-cyan-400">
                  {progressPercent}%
                </span>
              </p>

              <div className="w-full bg-black h-3 rounded-full overflow-hidden">
                <div
                  className="h-3 bg-gradient-to-r from-cyan-400 to-emerald-400"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Lessons */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">
                Lessons
              </h2>

              {course.lessons?.map((lesson) => {
                const done = enrollment.progress?.[lesson._id];

                return (
                  <div
                    key={lesson._id}
                    className="bg-slate-900 border border-slate-800 
                    rounded-xl p-5 mb-4 flex justify-between items-center"
                  >
                    <span>{lesson.title}</span>

                    <button
                      disabled={done}
                      onClick={() => markComplete(lesson._id)}
                      className={`px-4 py-1.5 rounded-lg font-semibold transition ${
                        done
                          ? "bg-green-600 text-white cursor-not-allowed"
                          : "bg-black border border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-black"
                      }`}
                    >
                      {done ? "Completed" : "Mark Complete"}
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;
