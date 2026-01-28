import { Link, useNavigate } from "react-router-dom";
import { FaGraduationCap } from "react-icons/fa";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const token = localStorage.getItem("token");

  let role = null;
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      role = payload.role;
    } catch (err) {
      console.error("Invalid token");
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // 👈 Yahan change kiya hai: Ab Home page par jayega
    setOpen(false);
  };

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* 🔷 LOGO */}
        <div className="flex items-center gap-3 select-none">
          <div
            className="w-9 h-9 rounded-xl 
            bg-gradient-to-br from-emerald-400 to-cyan-500 
            flex items-center justify-center shadow-lg"
          >
            <FaGraduationCap className="text-black" size={16} />
          </div>

          <div className="leading-tight">
            <h1 className="text-lg font-black tracking-wide">
              Learn<span className="text-emerald-400">ify</span>
            </h1>
            <p className="text-[9px] text-gray-400 tracking-widest">
              SMART LEARNING
            </p>
          </div>
        </div>

        {/* 🔗 DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-3 text-sm font-medium">
          <NavLink to="/" label="Home" />
          <NavLink to="/courses" label="Courses" />

          {!token && (
            <>
              <Link
                to="/login"
                className="px-3 py-1.5 rounded-lg 
                border border-emerald-400 text-emerald-400 
                hover:bg-emerald-400 hover:text-black transition"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="px-3 py-1.5 rounded-lg 
                bg-gradient-to-r from-emerald-400 to-cyan-400 
                text-black font-semibold hover:opacity-90 transition"
              >
                Signup
              </Link>
            </>
          )}

          {token && (
            <>
              <NavLink to="/dashboard" label="Dashboard" />

              {role === "admin" && (
                <Link
                  to="/admin"
                  className="px-2 py-1 rounded-lg 
                  bg-red-500 text-white hover:bg-red-600 transition"
                >
                  Admin
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="px-2 py-1 rounded-lg 
                border border-red-400 text-red-400 
                hover:bg-red-400 hover:text-black transition"
              >
                Logout
              </button>
            </>
          )}
        </nav>

        {/* 🍔 MOBILE HAMBURGER (FULL 3 LINES) */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col justify-center gap-1.5 w-8 h-8"
        >
          <span
            className={`h-[2px] w-full bg-white rounded transition ${
              open ? "rotate-45 translate-y-[6px]" : ""
            }`}
          />
          <span
            className={`h-[2px] w-full bg-white rounded transition ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-[2px] w-full bg-white rounded transition ${
              open ? "-rotate-45 -translate-y-[6px]" : ""
            }`}
          />
        </button>
      </div>

      {/* 📱 MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 px-4 py-4 space-y-3">
          <MobileLink to="/" label="Home" setOpen={setOpen} />
          <MobileLink to="/courses" label="Courses" setOpen={setOpen} />

          {!token && (
            <>
              <MobileLink to="/login" label="Login" setOpen={setOpen} />
              <MobileLink to="/signup" label="Signup" setOpen={setOpen} />
            </>
          )}

          {token && (
            <>
              <MobileLink to="/dashboard" label="Dashboard" setOpen={setOpen} />

              {role === "admin" && (
                <MobileLink to="/admin" label="Admin" setOpen={setOpen} />
              )}

              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 rounded-lg 
                border border-red-400 text-red-400 
                hover:bg-red-400 hover:text-black transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

/* 🔹 Desktop NavLink */
const NavLink = ({ to, label }) => (
  <Link
    to={to}
    className="relative text-gray-300 hover:text-white transition group"
  >
    {label}
    <span
      className="absolute left-0 -bottom-1 w-0 h-[2px] 
      bg-emerald-400 group-hover:w-full transition-all"
    />
  </Link>
);

/* 📱 Mobile NavLink */
const MobileLink = ({ to, label, setOpen }) => (
  <Link
    to={to}
    onClick={() => setOpen(false)}
    className="block px-3 py-2 rounded-lg 
    text-gray-300 hover:bg-slate-800 hover:text-white transition"
  >
    {label}
  </Link>
);

export default Header;