
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa"; // Icons imported
import API from "../api/api";

const Login = () => {
  // ================= LOGIC =================
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // States to toggle visibility
  const [showEmail, setShowEmail] = useState(false); // Default hidden
  const [showPassword, setShowPassword] = useState(false); // Default hidden

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      alert("Login successful 🔓");
      window.location.href = "/dashboard";
    } catch (err) {
      alert("Invalid credentials ❌");
      console.error(err.response?.data);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden font-sans selection:bg-emerald-500/30">
      
      {/* Background Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 md:p-10 shadow-2xl relative z-10"
      >
        
        {/* 🔐 HEADING */}
        <div className="mb-10 text-center">
          <div className="inline-block p-3 rounded-full bg-slate-800/50 mb-4 border border-slate-700">
             <span className="text-2xl">👋</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-2">
            Welcome <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Back</span>
          </h1>
          <p className="text-slate-400 text-sm">
            Enter your credentials to access your account.
          </p>
        </div>

        {/* 📝 FORM FIELDS */}
        <div className="space-y-5">
          
          {/* EMAIL INPUT (With Hide/Show Feature) */}
          <div className="relative group">
            {/* Left Icon (Envelope) */}
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaEnvelope className="text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
            </div>
            
            <input
              placeholder="Email address"
              // Logic: Agar showEmail true hai to 'text', nahi to 'password'
              type={showEmail ? "text" : "password"} 
              className="w-full bg-slate-950 border border-slate-800 text-white text-sm rounded-xl py-4 pl-11 pr-12 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder-slate-600"
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Right Icon (Eye Toggle) */}
            <button 
              type="button"
              onClick={() => setShowEmail(!showEmail)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-emerald-400 cursor-pointer transition-colors"
            >
              {showEmail ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>

          {/* PASSWORD INPUT (With Hide/Show Feature) */}
          <div className="relative group">
            {/* Left Icon (Lock) */}
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaLock className="text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
            </div>

            <input
              placeholder="Password"
              // Logic: Agar showPassword true hai to 'text', nahi to 'password'
              type={showPassword ? "text" : "password"}
              className="w-full bg-slate-950 border border-slate-800 text-white text-sm rounded-xl py-4 pl-11 pr-12 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder-slate-600"
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Right Icon (Eye Toggle) */}
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-emerald-400 cursor-pointer transition-colors"
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <a href="#" className="text-xs text-slate-400 hover:text-emerald-400 transition">
              Forgot Password?
            </a>
          </div>
        </div>

        {/* 🚀 LOGIN BUTTON */}
        <button
          onClick={handleLogin}
          className="w-full mt-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-bold text-lg hover:opacity-90 transition-transform active:scale-[0.98] shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
        >
          Sign In <FaArrowRight size={16} />
        </button>

        {/* 🔗 FOOTER */}
        <div className="mt-8 text-center border-t border-slate-800 pt-6">
          <p className="text-slate-400 text-sm">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-emerald-400 font-semibold hover:text-emerald-300 hover:underline transition"
            >
              Create one
            </Link>
          </p>
        </div>

      </motion.div>
    </div>
  );
};

export default Login;
