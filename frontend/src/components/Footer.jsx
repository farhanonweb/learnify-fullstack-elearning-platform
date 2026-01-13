import { Link } from "react-router-dom";
import { FaGoogle, FaMicrosoft, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-slate-900 via-slate-950 to-black text-gray-300">
      
      {/* TOP COMPANIES */}
      <div className="text-center py-14 border-b border-slate-800">
        <p className="text-gray-400 mb-6">
          Leading companies trust{" "}
          <span className="text-white font-semibold">Learnify</span>{" "}
          to build future-ready skills.
        </p>

        <div className="flex justify-center gap-14 text-3xl text-gray-400">
          <FaGoogle className="hover:text-white transition" />
          <FaMicrosoft className="hover:text-white transition" />
          <FaFacebook className="hover:text-white transition" />
        </div>
      </div>

      {/* EXPLORE SKILLS */}
      <div className="max-w-6xl mx-auto py-16 px-6">
        <h3 className="text-white font-semibold mb-10">
          Explore top skills & certifications
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">
          <div>
            <h4 className="text-white font-semibold mb-4">In-demand Careers</h4>
            <Link to="/courses" className="block hover:text-white">Data Scientist</Link>
            <Link to="/courses" className="block hover:text-white">Full Stack Developer</Link>
            <Link to="/courses" className="block hover:text-white">AI Engineer</Link>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Web Development</h4>
            <Link to="/courses" className="block hover:text-white">JavaScript</Link>
            <Link to="/courses" className="block hover:text-white">React JS</Link>
            <Link to="/courses" className="block hover:text-white">Node.js</Link>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">IT Certifications</h4>
            <Link to="/courses" className="block hover:text-white">AWS</Link>
            <Link to="/courses" className="block hover:text-white">Azure</Link>
            <Link to="/courses" className="block hover:text-white">DevOps</Link>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Leadership</h4>
            <Link to="/courses" className="block hover:text-white">Management Skills</Link>
            <Link to="/courses" className="block hover:text-white">Productivity</Link>
            <Link to="/courses" className="block hover:text-white">Communication</Link>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="border-t border-slate-800 py-14">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 px-6 text-sm">
          
          <div>
            <h4 className="text-white font-semibold mb-3">Learnify</h4>
            <p className="text-gray-400">
              Learn industry-ready skills online.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">About</h4>
            <Link to="/" className="block hover:text-white">About us</Link>
            <Link to="/" className="block hover:text-white">Contact us</Link>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">
              Legal & Accessibility
            </h4>
            <Link to="/" className="block hover:text-white">Accessibility statement</Link>
            <Link to="/" className="block hover:text-white">Privacy policy</Link>
            <Link to="/" className="block hover:text-white">Sitemap</Link>
            <Link to="/" className="block hover:text-white">Terms</Link>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Resources</h4>
            <Link to="/" className="block hover:text-white">Blog</Link>
            <Link to="/" className="block hover:text-white">Help Center</Link>
            <Link to="/" className="block hover:text-white">Community</Link>
            <Link to="/" className="block hover:text-white">FAQs</Link>
          </div>
        </div>

        <p className="text-center text-gray-500 text-sm mt-12">
          © 2026 Learnify. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
