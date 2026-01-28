import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaTag, FaSignal, FaArrowRight } from "react-icons/fa";

const CourseCard = ({ course }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-emerald-500/10 hover:border-emerald-500/50 transition-all duration-300 flex flex-col h-full"
    >
      {/* Image Container with Overlay */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={course.thumbnailUrl || "https://placehold.co/600x400"}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur px-3 py-1 rounded-full border border-slate-700 text-[10px] uppercase font-bold text-emerald-400">
           {course.category}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h2 className="font-bold text-xl text-white mb-2 line-clamp-2 group-hover:text-emerald-400 transition-colors">
          {course.title}
        </h2>

        {/* Metadata */}
        <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
           <span className="flex items-center gap-1"><FaTag /> {course.category}</span>
           <span className="flex items-center gap-1"><FaSignal /> {course.difficulty}</span>
        </div>

        <div className="mt-auto pt-4 border-t border-slate-800 flex items-center justify-between">
           <span className="text-2xl font-extrabold text-white">
             ₹{course.price}
           </span>

           <Link
             to={`/courses/${course.slug}`}
             className="flex items-center gap-2 text-sm font-bold text-black bg-emerald-500 px-4 py-2 rounded-lg hover:bg-emerald-400 transition transform group-hover:translate-x-1"
           >
             View <FaArrowRight size={12} />
           </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;