import { useState } from "react";
import API from "../api/api";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    <div className="min-h-screen bg-slate-950 
    flex items-center justify-center px-6 text-white">

      <div className="w-full max-w-md bg-slate-900 
      border border-slate-800 rounded-2xl p-8 shadow-xl">

        {/* 🧠 HEADING */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold tracking-wide">
            Create Your <span className="text-emerald-400">Account</span>
          </h1>
          <p className="text-gray-400 text-sm mt-2">
            Start learning skills that shape your future
          </p>
        </div>

        {/* 👤 NAME */}
        <input
          placeholder="Full Name"
          className="w-full mb-4 p-3 rounded-lg 
          bg-black border border-slate-700 
          focus:border-emerald-400 outline-none"
          onChange={(e) => setName(e.target.value)}
        />

        {/* ✉️ EMAIL */}
        <input
          placeholder="Email address"
          className="w-full mb-4 p-3 rounded-lg 
          bg-black border border-slate-700 
          focus:border-emerald-400 outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* 🔒 PASSWORD */}
        <input
          placeholder="Password"
          type="password"
          className="w-full mb-6 p-3 rounded-lg 
          bg-black border border-slate-700 
          focus:border-emerald-400 outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* 🚀 SIGNUP BUTTON */}
        <button
          onClick={handleSignup}
          className="w-full py-3 rounded-lg 
          bg-gradient-to-r from-emerald-400 to-cyan-400 
          text-black font-semibold hover:opacity-90 transition"
        >
          Create Account
        </button>

        {/* 🔗 FOOTER */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-emerald-400 hover:underline"
          >
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
