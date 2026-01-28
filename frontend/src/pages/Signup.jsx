
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock, FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa";
import API from "../api/api";

const Signup = () => {
  // ================= LOGIC =================
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Toggle State for Password Visibility
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async () => {
    try {
      await API.post("/auth/signup", {
        name,
        email,
        password,
      });

      alert("Signup successful ✔");
      window.location.href = "/login";
    } catch (err) {
      alert("Signup failed ❌");
      console.error(err.response?.data);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden font-sans selection:bg-emerald-500/30">
      
      {/* Background Decorative Blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 md:p-10 shadow-2xl relative z-10"
      >
        
        {/* 🧠 HEADING */}
        <div className="mb-8 text-center">
          <div className="inline-block p-3 rounded-full bg-slate-800/50 mb-4 border border-slate-700">
             <span className="text-2xl">🚀</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">
            Create <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Account</span>
          </h1>
          <p className="text-slate-400 text-sm">
            Join us and start learning future-ready skills today.
          </p>
        </div>

        {/* 📝 FORM FIELDS */}
        <div className="space-y-5">
          
          {/* FULL NAME */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaUser className="text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
            </div>
            <input
              placeholder="Full Name"
              type="text"
              className="w-full bg-slate-950 border border-slate-800 text-white text-sm rounded-xl py-4 pl-11 pr-4 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder-slate-600"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* EMAIL */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaEnvelope className="text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
            </div>
            <input
              placeholder="Email address"
              type="email"
              className="w-full bg-slate-950 border border-slate-800 text-white text-sm rounded-xl py-4 pl-11 pr-4 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder-slate-600"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* PASSWORD (With Toggle) */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaLock className="text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
            </div>
            <input
              placeholder="Create Password"
              type={showPassword ? "text" : "password"}
              className="w-full bg-slate-950 border border-slate-800 text-white text-sm rounded-xl py-4 pl-11 pr-12 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder-slate-600"
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* Eye Icon Logic */}
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-emerald-400 cursor-pointer transition-colors"
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>

        </div>

        {/* 🚀 SIGNUP BUTTON */}
        <button
          onClick={handleSignup}
          className="w-full mt-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-bold text-lg hover:opacity-90 transition-transform active:scale-[0.98] shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
        >
          Get Started <FaArrowRight size={16} />
        </button>

        {/* 🔗 FOOTER */}
        <div className="mt-8 text-center border-t border-slate-800 pt-6">
          <p className="text-slate-400 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-emerald-400 font-semibold hover:text-emerald-300 hover:underline transition"
            >
              Login here
            </Link>
          </p>
        </div>

      </motion.div>
    </div>
  );
};

export default Signup;  