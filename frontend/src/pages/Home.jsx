import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaCode, FaBrain, FaServer, FaChartLine } from "react-icons/fa";

const Home = () => {
  return (
    <div className="bg-slate-950 text-white">

      {/* 🚀 HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden py-28 text-center 
        bg-gradient-to-br from-slate-950 via-slate-900 to-black"
      >
        <div className="absolute inset-0 bg-gradient-to-r 
        from-emerald-400/10 to-cyan-400/10 blur-3xl"></div>

        <h1 className="relative text-4xl md:text-6xl font-extrabold mb-6">
          Learn <span className="text-emerald-400">Future-Ready</span> Skills
        </h1>

        <p className="relative text-gray-400 max-w-xl mx-auto mb-10 text-lg">
          Industry-focused courses in Web, Backend, AI & Modern Technologies.
        </p>

        <div className="relative flex justify-center gap-4">
          <Link
            to="/courses"
            className="px-8 py-3 rounded-lg 
            bg-gradient-to-r from-emerald-400 to-cyan-400 
            text-black font-semibold"
          >
            Explore Courses
          </Link>

          <Link
            to="/signup"
            className="px-8 py-3 rounded-lg 
            border border-emerald-400 text-emerald-400 
            hover:bg-emerald-400 hover:text-black transition"
          >
            Get Started
          </Link>
        </div>
      </motion.div>

      {/* 📚 POPULAR TRACKS */}
      <div className="max-w-6xl mx-auto py-24 px-6">
        <h2 className="text-3xl font-bold text-center mb-6">
          Popular <span className="text-cyan-400">Learning Tracks</span>
        </h2>

        <p className="text-gray-400 text-center max-w-3xl mx-auto mb-14">
          Choose learning paths designed around real-world projects,
          practical skills, and industry use-cases.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { icon: <FaCode />, label: "Web Development" },
            { icon: <FaBrain />, label: "Artificial Intelligence" },
            { icon: <FaServer />, label: "Backend & APIs" },
            { icon: <FaChartLine />, label: "Data & Analytics" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-slate-900 border border-slate-800 
              rounded-xl p-8 text-center 
              hover:border-emerald-400 hover:scale-105 transition"
            >
              <div className="text-3xl mb-4 text-emerald-400 flex justify-center">
                {item.icon}
              </div>
              <p className="font-semibold">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 💡 WHY LEARNIFY */}
      <div className="bg-slate-900 py-24">
        <h2 className="text-3xl font-bold text-center mb-4">
          Why Choose <span className="text-emerald-400">Learnify</span>
        </h2>

        {/* ✅ NEW SHORT LINE */}
        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-14">
          A modern learning platform focused on real skills, real projects,
          and real career outcomes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 
        max-w-6xl mx-auto px-6">
          {[
            {
              title: "Beginner Friendly",
              desc: "Simple explanations with real-world examples.",
            },
            {
              title: "Real Projects",
              desc: "Build portfolio-ready applications step by step.",
            },
            {
              title: "Career Focused",
              desc: "Skills aligned with real industry requirements.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-black border border-slate-800 
              p-8 rounded-xl hover:border-cyan-400 transition"
            >
              <h3 className="font-bold mb-3 text-lg text-cyan-400">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 🎯 LEARNING APPROACH + CTA */}
      <div className="py-24 text-center 
      bg-gradient-to-r from-emerald-400/10 to-cyan-400/10">

        <h3 className="text-2xl font-bold mb-4">
          How Learning Works at <span className="text-emerald-400">Learnify</span>
        </h3>

        <p className="text-gray-400 max-w-3xl mx-auto mb-12">
          Our courses are carefully designed to help you learn faster,
          practice better, and become job-ready with confidence.
        </p>

        <div className="max-w-5xl mx-auto mb-16 px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-900 border border-slate-800 
            rounded-xl p-6 hover:border-emerald-400 transition">
              <h3 className="text-emerald-400 font-semibold mb-2">
                Project-Based Learning
              </h3>
              <p className="text-gray-400 text-sm">
                Work on hands-on projects that simulate real company problems.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 
            rounded-xl p-6 hover:border-cyan-400 transition">
              <h3 className="text-cyan-400 font-semibold mb-2">
                Structured Learning Path
              </h3>
              <p className="text-gray-400 text-sm">
                Learn step-by-step from fundamentals to advanced concepts.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 
            rounded-xl p-6 hover:border-emerald-400 transition">
              <h3 className="text-emerald-400 font-semibold mb-2">
                Career-Ready Skills
              </h3>
              <p className="text-gray-400 text-sm">
                Skills aligned with hiring expectations and interviews.
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-4xl font-extrabold mb-4">
          Start Your Learning Journey
        </h2>

        <p className="text-gray-400 mb-8">
          Build real projects, gain confidence, and move closer to your career goals.
        </p>

        <Link
          to="/signup"
          className="inline-block px-10 py-3 rounded-lg 
          bg-gradient-to-r from-emerald-400 to-cyan-400 
          text-black font-semibold hover:scale-105 transition"
        >
          Create Free Account
        </Link>
      </div>

    </div>
  );
};

export default Home;
