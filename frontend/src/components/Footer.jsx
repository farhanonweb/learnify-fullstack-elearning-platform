
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaCheckCircle
} from "react-icons/fa";

const Footer = () => {
  // ================= STATE FOR SUBSCRIPTION =================
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() === "") return;
    
    setSubscribed(true);
    setEmail(""); 
  };

  // Function to handle "Privacy" & "Cookies" click
  const showDemoContent = (e, title) => {
    e.preventDefault();
    alert(`[DEMO] ${title}\n\nHere you would typically display the legal text for ${title}. Since this is a demo, this popup confirms the link is working!`);
  };

  return (
    <footer className="bg-slate-950 text-gray-300 border-t border-slate-800 font-sans mt-auto">

      {/* ================= TOP: NEWSLETTER SECTION ================= */}
      <div className="bg-slate-900/50 py-12 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Stay ahead of the curve
            </h3>
            <p className="text-gray-400 text-sm">
              Join our newsletter for the latest coding trends, free tutorials, and course updates directly to your inbox.
            </p>
          </div>

          {/* ===> LOGIC FOR SUBSCRIBE BUTTON <=== */}
          <div>
            {subscribed ? (
              // FIX: Renamed component to start with Uppercase (MotionDiv)
              <MotionDiv 
                className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 flex items-center gap-3 text-emerald-400 font-semibold"
              >
                <FaCheckCircle size={20} />
                <span>Thanks for subscribing! We'll keep you updated.</span>
              </MotionDiv>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 placeholder-slate-500 transition"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button 
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-3 rounded-lg transition whitespace-nowrap"
                >
                  Subscribe Now
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* ================= MAIN FOOTER CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-sm">

        {/* COL 1: BRAND & CONTACT INFO */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">
            Learnify<span className="text-emerald-500">.</span>
          </h2>
          <p className="text-gray-400 mb-6 leading-relaxed">
            Empowering developers worldwide with industry-ready skills. Start your journey today with our expert-led courses.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-black transition">
                <FaEnvelope size={14} />
              </div>
              <a href="mailto:farhangheri77@gmail.com" className="hover:text-white transition">
                farhangheri77@gmail.com
              </a>
            </div>
            
            <div className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-black transition">
                <FaPhoneAlt size={14} />
              </div>
              <a href="tel:+918160142273" className="hover:text-white transition">
                +91-8160142273
              </a>
            </div>

            <div className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-black transition">
                <FaMapMarkerAlt size={14} />
              </div>
              <span>Gujarat, India</span>
            </div>
          </div>
        </div>

        {/* COL 2: TRENDING COURSES */}
        <div>
          <h3 className="text-white font-bold text-lg mb-6">Trending Courses</h3>
          <ul className="space-y-3">
            <li><Link to="/courses" className="hover:text-emerald-400 transition block py-1">Full Stack Development</Link></li>
            <li><Link to="/courses" className="hover:text-emerald-400 transition block py-1">Data Science & AI</Link></li>
            <li><Link to="/courses" className="hover:text-emerald-400 transition block py-1">Flutter Mobile Dev</Link></li>
            <li><Link to="/courses" className="hover:text-emerald-400 transition block py-1">DevOps & Kubernetes</Link></li>
            <li><Link to="/courses" className="hover:text-emerald-400 transition block py-1">Java Spring Boot</Link></li>
            <li><Link to="/courses" className="hover:text-emerald-400 transition block py-1">Python for Beginners</Link></li>
          </ul>
        </div>

        {/* COL 3: COMPANY LINKS */}
        <div>
          <h3 className="text-white font-bold text-lg mb-6">Company</h3>
          <ul className="space-y-3">
            <li><Link to="/" className="hover:text-emerald-400 transition block py-1">About Us</Link></li>
            <li><Link to="/" className="hover:text-emerald-400 transition block py-1">Success Stories</Link></li>
            <li><Link to="/" className="hover:text-emerald-400 transition block py-1">Become an Instructor</Link></li>
            <li><Link to="/" className="hover:text-emerald-400 transition block py-1">Careers / Hiring</Link></li>
            <li><Link to="/" className="hover:text-emerald-400 transition block py-1">Privacy Policy</Link></li>
            <li><Link to="/" className="hover:text-emerald-400 transition block py-1">Terms of Service</Link></li>
          </ul>
        </div>

        {/* COL 4: SOCIAL MEDIA */}
        <div>
          <h3 className="text-white font-bold text-lg mb-6">Join Community</h3>
          <p className="text-gray-400 mb-6 text-xs">
            Connect with 50,000+ developers. Follow us for daily tips and updates.
          </p>
          <div className="flex gap-3">
            <a href="#" className="bg-slate-900 p-3 rounded-lg border border-slate-800 hover:border-emerald-500 hover:text-emerald-400 transition">
              <FaFacebookF size={18} />
            </a>
            <a href="#" className="bg-slate-900 p-3 rounded-lg border border-slate-800 hover:border-emerald-500 hover:text-emerald-400 transition">
              <FaTwitter size={18} />
            </a>
            <a href="#" className="bg-slate-900 p-3 rounded-lg border border-slate-800 hover:border-emerald-500 hover:text-emerald-400 transition">
              <FaLinkedinIn size={18} />
            </a>
            <a href="#" className="bg-slate-900 p-3 rounded-lg border border-slate-800 hover:border-emerald-500 hover:text-emerald-400 transition">
              <FaInstagram size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM BAR ================= */}
      <div className="border-t border-slate-900 bg-black/30">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()} Learnify. Developed by <span className="text-emerald-500 font-semibold">Farhan Gheri</span>.
          </p>
          <div className="flex gap-6">
            <button onClick={(e) => showDemoContent(e, "Privacy Policy")} className="hover:text-white transition">Privacy</button>
            <button onClick={(e) => showDemoContent(e, "Cookies Policy")} className="hover:text-white transition">Cookies</button>
            <button onClick={(e) => showDemoContent(e, "Support Center")} className="hover:text-white transition">Support</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

// FIX: Renamed to MotionDiv (Capitalized) to fix the error
const MotionDiv = ({ children, className }) => (
  <div className={`${className} animate-fade-in-up`}>
    {children}
  </div>
);

export default Footer;
