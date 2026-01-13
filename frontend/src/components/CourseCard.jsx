import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CourseCard = ({ course }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="border rounded shadow hover:shadow-lg transition"
    >
      <img
        src={course.thumbnailUrl || "https://placehold.co/600x400"}
        alt={course.title}
        className="w-full h-40 object-cover rounded-t"
      />

      <div className="p-4">
        <h2 className="font-bold text-lg">{course.title}</h2>

        <p className="text-gray-600 text-sm">
          {course.category} • {course.difficulty}
        </p>

        <p className="mt-2 font-semibold">
          ₹{course.price}
        </p>

        <Link
          to={`/courses/${course.slug}`}
          className="block mt-4 text-center bg-black text-white py-2 rounded"
        >
          View Course
        </Link>
      </div>
    </motion.div>
  );
};

export default CourseCard;
