import { useState } from "react";
import API from "../api/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    <div className="min-h-screen bg-slate-950 
    flex items-center justify-center px-6 text-white">

      <div className="w-full max-w-md bg-slate-900 
      border border-slate-800 rounded-2xl p-8 shadow-xl">

        {/* 🔐 HEADING */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold tracking-wide">
            Welcome <span className="text-emerald-400">Back</span>
          </h1>
          <p className="text-gray-400 text-sm mt-2">
            Login to continue your learning journey
          </p>
        </div>

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

        {/* 🚀 LOGIN BUTTON */}
        <button
          onClick={handleLogin}
          className="w-full py-3 rounded-lg 
          bg-gradient-to-r from-emerald-400 to-cyan-400 
          text-black font-semibold hover:opacity-90 transition"
        >
          Login
        </button>

        {/* 🔗 FOOTER */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-emerald-400 hover:underline"
          >
            Create one
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
