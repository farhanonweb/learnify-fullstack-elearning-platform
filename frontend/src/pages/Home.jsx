import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaCode,
  FaBrain,
  FaServer,
  FaChartLine,
  FaStar,
  FaSearch,
  FaPlay,
  FaCheckCircle,
  FaLaptopCode,
  FaChalkboardTeacher,
  FaQuoteLeft,
  FaUserGraduate,
  FaLock,
  FaRocket,
  FaUserPlus,
  FaArrowRight,
  FaQuoteRight,
  FaQuestionCircle
} from "react-icons/fa";

const Home = () => {
  // ================= STATE & LOGIC =================
  const [searchTerm, setSearchTerm] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);
  
  const videoRef = useRef(null);
  const courseSectionRef = useRef(null);
  
  // Parallax Effect
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Filter Courses Logic
  const filteredCourses = coursesData.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    course.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Auto Scroll to Courses when searching
  useEffect(() => {
    if (searchTerm && courseSectionRef.current) {
      courseSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [searchTerm]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <div className="bg-slate-950 text-white overflow-x-hidden font-sans selection:bg-emerald-500/30">
      
      {/* ================= HERO SECTION (Compact) ================= */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        {/* Animated Background */}
        <motion.div style={{ y }} className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-500/10 rounded-[100%] blur-[80px] -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 z-10 relative">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            
            {/* LEFT: TEXT & SEARCH */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6 shadow-md mx-auto lg:mx-0">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                New Courses Added Weekly
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4">
                Ready to offer an <br />
                <span className="relative inline-block">
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                    Impactful
                  </span>
                  {/* Underline SVG */}
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-emerald-500 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                  </svg>
                </span>{" "}
                Learning Experience?
              </h1>

              <p className="text-sm sm:text-base text-slate-400 max-w-lg mb-8 leading-relaxed mx-auto lg:mx-0">
                Master real-world skills with project-based learning. Join top companies by learning React, Node.js, AI, and more.
              </p>

              {/* COMPACT SEARCH BAR */}
              <div className="bg-white/5 backdrop-blur-md border border-slate-700 p-1.5 rounded-lg flex items-center shadow-xl max-w-md focus-within:border-emerald-500 transition-colors group mb-8 mx-auto lg:mx-0">
                <FaSearch className="text-slate-400 ml-3 group-focus-within:text-emerald-400 transition flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search (e.g. React, Java)..."
                  className="w-full bg-transparent px-3 py-2 text-white placeholder-slate-400 outline-none font-medium text-sm min-w-0"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button 
                  className="bg-emerald-500 hover:bg-emerald-400 text-black px-4 sm:px-5 py-2 rounded-md font-bold text-sm transition-transform active:scale-95 flex-shrink-0"
                >
                  Search
                </button>
              </div>

              {/* Mini Stats */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 text-slate-400 text-xs font-semibold">
                <div className="flex items-center gap-1.5"><FaCheckCircle className="text-emerald-500" /> 10k+ Learners</div>
                <div className="flex items-center gap-1.5"><FaCheckCircle className="text-emerald-500" /> Lifetime Access</div>
                <div className="flex items-center gap-1.5"><FaCheckCircle className="text-emerald-500" /> Projects</div>
              </div>
            </motion.div>

            {/* RIGHT: VIDEO PLAYER (Fixed Image) */}
            <motion.div 
              className="relative mt-4 lg:mt-0 max-w-xl mx-auto lg:max-w-none w-full"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div 
                className="relative rounded-xl overflow-hidden border border-slate-800 shadow-2xl shadow-emerald-500/10 group cursor-pointer aspect-video"
                onClick={togglePlay}
              >
                <video 
                  ref={videoRef}
                  loop 
                  controls={false}
                  className="w-full h-full object-cover bg-black"
                  poster="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                >
                  <source src="https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-screen-close-up-1728-large.mp4" type="video/mp4" />
                </video>

                {!isPlaying && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/20 transition">
                     <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 sm:p-5 rounded-full shadow-lg group-hover:scale-110 transition">
                        <FaPlay className="text-white text-xl sm:text-2xl ml-1" />
                     </div>
                  </div>
                )}
              </div>
              
              {/* Floating Badge (Compact) */}
              <div className="absolute -bottom-4 -left-4 bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-xl flex gap-3 items-center animate-bounce-slow z-20 hidden sm:flex">
                <div className="bg-emerald-500/20 p-2 rounded-full text-emerald-400">
                  <FaLaptopCode size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wide">Trending</p>
                  <p className="font-bold text-xs text-white">Full Stack Masterclass</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ================= LOGO STRIP (Compact) ================= */}
      <section className="border-y border-slate-800 bg-slate-900/50 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Trusted by Industry Leaders</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
             <span className="text-xl font-bold font-serif text-white">Google</span>
             <span className="text-xl font-bold font-sans text-white">Microsoft</span>
             <span className="text-xl font-bold font-mono text-white">Amazon</span>
             <span className="text-xl font-bold font-serif italic text-white">Netflix</span>
             <span className="text-xl font-bold font-sans text-white">Spotify</span>
          </div>
        </div>
      </section>

      {/* ================= NEW UNIQUE CATEGORIES ================= */}
      <section className="py-16 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
           <h3 className="font-bold text-2xl mb-8 text-center sm:text-left">Top Categories</h3>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: 'Web Development', desc: 'React, Next.js, MERN', icon: <FaCode />, color: 'text-blue-400', glow: 'group-hover:bg-blue-500/10' }, 
                { name: 'Data Science', desc: 'Python, Pandas, AI', icon: <FaChartLine />, color: 'text-purple-400', glow: 'group-hover:bg-purple-500/10' }, 
                { name: 'AI & ML', desc: 'TensorFlow, OpenAI', icon: <FaBrain />, color: 'text-emerald-400', glow: 'group-hover:bg-emerald-500/10' }, 
                { name: 'Cyber Security', desc: 'Ethical Hacking', icon: <FaLock />, color: 'text-red-400', glow: 'group-hover:bg-red-500/10' }
              ].map((cat, i) => (
                <div key={i} className="group relative overflow-hidden bg-slate-900 border border-slate-800 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:border-slate-600 hover:-translate-y-1 hover:shadow-xl">
                   
                   {/* Glow Effect Blob */}
                   <div className={`absolute -right-4 -top-4 w-20 h-20 rounded-full blur-2xl transition-colors duration-500 ${cat.glow} opacity-0 group-hover:opacity-100`} />

                   <div className={`${cat.color} text-4xl mb-4 transition-transform duration-300 group-hover:scale-110`}>
                     {cat.icon}
                   </div>
                   
                   <h4 className="font-bold text-lg text-white mb-1 group-hover:text-emerald-400 transition-colors">
                     {cat.name}
                   </h4>
                   <p className="text-xs text-slate-400 font-medium">
                     {cat.desc}
                   </p>

                   {/* Hidden Arrow appears on Hover */}
                   <div className="absolute bottom-4 right-4 text-slate-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                     <FaArrowRight />
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* ================= 3 STEPS (Tight & Clean) ================= */}
      <section className="py-20 bg-slate-900 relative overflow-hidden">
         <div className="absolute inset-0 bg-emerald-500/5 -z-10" />
         <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-12">Start Learning in 3 Steps</h2>

            <div className="grid md:grid-cols-3 gap-8 relative">
               <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-0.5 bg-slate-800 -z-10" />

               {[
                 { icon: <FaUserPlus />, title: "1. Create Account", desc: "Sign up freely." },
                 { icon: <FaSearch />, title: "2. Select Course", desc: "Choose your path." },
                 { icon: <FaRocket />, title: "3. Start Coding", desc: "Build projects." }
               ].map((step, i) => (
                 <div key={i} className="bg-slate-950/80 p-8 rounded-2xl border border-slate-800 backdrop-blur-sm flex flex-col items-center">
                    <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6 border-2 border-slate-700 text-emerald-400 text-3xl shadow-lg">
                       {step.icon}
                    </div>
                    <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                    <p className="text-sm text-slate-400">{step.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* ================= COURSES SECTION (FIXED HEADER) ================= */}
      <section ref={courseSectionRef} className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">
              Explore <span className="text-emerald-400">Courses</span>
            </h2>
            <p className="text-slate-400 text-sm">
              {searchTerm ? `Found ${filteredCourses.length} results for "${searchTerm}"` : "Hand-picked projects to build your portfolio."}
            </p>
          </div>
          <Link to="/courses" className="text-emerald-400 text-sm font-bold flex items-center gap-2 hover:underline bg-slate-900 px-4 py-2 rounded-full border border-slate-800 hover:border-emerald-500/50 transition">
            View All <FaArrowRight size={12} />
          </Link>
        </div>

        {filteredCourses.length > 0 ? (
          <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-emerald-500/20 scrollbar-track-slate-900/50 -mx-6 px-6 sm:mx-0 sm:px-0">
            {filteredCourses.map((course, i) => (
              <div key={i} className="min-w-[280px] md:min-w-[340px] snap-center">
                <div className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300 h-full flex flex-col hover:shadow-xl hover:shadow-emerald-900/10">
                  
                  {/* Course Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    {course.bestseller && (
                      <div className="absolute top-3 right-3 bg-yellow-500 text-black text-[10px] font-bold px-2 py-1 rounded shadow-sm">
                        BESTSELLER
                      </div>
                    )}
                    <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold uppercase border border-slate-700 text-slate-300">
                      {course.category}
                    </div>
                  </div>

                  {/* Course Content */}
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="font-bold text-lg mb-1 line-clamp-2 leading-snug group-hover:text-emerald-400 transition">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-500 mb-3">By {course.instructor}</p>
                    
                    <div className="flex items-center gap-1 text-amber-400 text-xs mb-4">
                      <span className="font-bold text-white text-sm">{course.rating}</span>
                      <div className="flex"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar className="text-slate-700" /></div>
                      <span className="text-slate-500 ml-1">({course.reviews})</span>
                    </div>

                    {/* Price & Action */}
                    <div className="mt-auto flex justify-between items-center border-t border-slate-800 pt-4">
                      <div className="flex flex-col">
                         {course.price === "Free" ? (
                             <span className="font-bold text-xl text-emerald-400">Free</span>
                         ) : (
                             <div className="flex items-baseline gap-2">
                               <span className="font-bold text-xl text-white">{course.price}</span>
                               <span className="text-xs text-slate-500 line-through">{course.oldPrice}</span>
                             </div>
                         )}
                      </div>
                      
                      <Link 
                        to="/login" 
                        className="flex items-center gap-2 text-xs font-bold bg-white text-black hover:bg-emerald-400 px-4 py-2 rounded-lg transition"
                      >
                        <FaLock size={10} /> Enroll
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-900/50 rounded-2xl border border-dashed border-slate-800">
             <div className="bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-500">
                <FaSearch size={24} />
             </div>
             <h3 className="text-xl font-bold text-slate-300">No courses found matching "{searchTerm}"</h3>
             <button onClick={() => setSearchTerm("")} className="mt-3 text-emerald-400 hover:text-emerald-300 text-sm font-semibold hover:underline">
                Clear Search & View All
             </button>
          </div>
        )}
      </section>

      {/* ================= INSTRUCTOR CTA (FIXED IMAGE) ================= */}
      <section className="py-16 bg-slate-900 border-y border-slate-800">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
           <div className="relative group order-2 md:order-1">
              <div className="absolute inset-0 bg-emerald-500/20 blur-3xl -z-10 rounded-full group-hover:bg-emerald-500/30 transition duration-500" />
              
              {/* ===> NEW IMAGE (STUDENT LEARNING CENTER) <=== */}
              <img 
                 src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                 alt="Students learning in a center" 
                 className="rounded-2xl shadow-2xl border border-slate-700 rotate-2 group-hover:rotate-0 transition duration-500 object-cover h-[300px] sm:h-[400px] w-full"
              />
           </div>
           <div className="order-1 md:order-2 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Become an Instructor</h2>
              <p className="text-slate-400 mb-8 text-base leading-relaxed">
                Instructors from around the world teach millions of students on Learnify. We provide the tools and skills to teach what you love.
              </p>
              <Link to="/signup" className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-emerald-400 transition shadow-lg hover:shadow-emerald-500/20 text-sm transform hover:-translate-y-1">
                 <FaChalkboardTeacher size={18} /> Start Teaching Today
              </Link>
           </div>
        </div>
      </section>

      {/* ================= REVIEWS SECTION ================= */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
           <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Loved by Students</h2>
              <div className="flex justify-center gap-1 text-yellow-400 text-xl">
                 <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
           </div>

           <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: "Alex Johnson", role: "Frontend Dev", text: "The React course is a game changer. I got my first job after completing the portfolio projects!" },
                { name: "Priya Patel", role: "Data Analyst", text: "Clear explanations and practical examples. The Python for Data Science track is amazing." },
                { name: "David Kim", role: "Full Stack Dev", text: "Best platform for hands-on learning. The community support is super helpful." }
              ].map((review, i) => (
                <div key={i} className="bg-slate-900 p-8 rounded-2xl border border-slate-800 relative shadow-lg">
                   <FaQuoteRight className="absolute top-6 right-6 text-emerald-500/10 text-5xl" />
                   <p className="text-slate-400 text-sm italic mb-6 leading-relaxed relative z-10">"{review.text}"</p>
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 font-bold text-lg">
                        {review.name[0]}
                      </div>
                      <div>
                         <h4 className="font-bold text-base text-white">{review.name}</h4>
                         <p className="text-xs text-slate-500 font-semibold">{review.role}</p>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section className="py-16 bg-slate-900 border-t border-slate-800">
         <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-10 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
               {[
                 { q: "Do I get a certificate after completion?", a: "Yes! Every course includes a certificate of completion that you can share on LinkedIn." },
                 { q: "Is there a refund policy?", a: "We offer a 30-day money-back guarantee if you are not satisfied with the course content." },
                 { q: "Do I need prior coding experience?", a: "Most of our courses are beginner-friendly. Advanced courses list prerequisites clearly." }
               ].map((item, i) => (
                 <div key={i} className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
                    <button 
                      onClick={() => toggleAccordion(i)}
                      className="w-full flex justify-between items-center p-5 text-left font-semibold hover:bg-slate-800 transition"
                    >
                       {item.q}
                       <FaQuestionCircle className={`text-emerald-500 transition-transform duration-300 ${activeAccordion === i ? "rotate-180" : ""}`} />
                    </button>
                    {activeAccordion === i && (
                      <div className="p-5 pt-0 text-sm text-slate-400 border-t border-slate-800/50 bg-slate-900/50 leading-relaxed">
                         {item.a}
                      </div>
                    )}
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* ================= FINAL CTA (Compact) ================= */}
      <section className="relative py-20 overflow-hidden text-center">
        <div className="absolute inset-0 bg-emerald-600/5 -z-10" />
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
            Unleash your <span className="text-emerald-400 underline decoration-wavy decoration-emerald-500/50">Growth</span> Potential
          </h2>
          <p className="text-slate-400 text-base md:text-lg mb-10 max-w-xl mx-auto">
            Join 10,000+ developers building the future. Start your first lesson in 2 minutes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md mx-auto">
             <Link
              to="/signup"
              className="w-full px-8 py-4 rounded-xl bg-emerald-500 text-black font-bold text-base hover:bg-emerald-400 transition transform hover:-translate-y-1 shadow-lg shadow-emerald-500/25"
            >
              Start Learning Free
            </Link>
            <Link
              to="/courses"
              className="w-full px-8 py-4 rounded-xl bg-slate-800 text-white font-semibold hover:bg-slate-700 transition border border-slate-700"
            >
              Explore Courses
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

/* ================= DATA ================= */

const coursesData = [
  {
    title: "The Complete React 19 & Next.js Guide",
    category: "Web Dev",
    rating: 4.8,
    reviews: "1,203",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&auto=format&fit=crop",
    instructor: "Farhan Gheri",
    price: "₹499",
    oldPrice: "₹3,499",
    bestseller: true
  },
  {
    title: "Java Data Structures & Algorithms Masterclass",
    category: "CS",
    rating: 4.9,
    reviews: "850",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop",
    instructor: "Dr. Angela Yu",
    price: "₹699",
    oldPrice: "₹4,999",
    bestseller: true
  },
  {
    title: "Python for Data Science and Machine Learning",
    category: "Data Science",
    rating: 4.7,
    reviews: "2.5k",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop",
    instructor: "Jose Portilla",
    price: "Free",
    oldPrice: "",
    bestseller: false
  },
  {
    // ===> REPLACED COURSE: FLUTTER (Mobile Development) <===
    title: "Flutter 3.0 & Dart - Build iOS & Android Apps",
    category: "Mobile Dev",
    rating: 4.7,
    reviews: "1,850",
    // ===> NEW MATCHING IMAGE <===
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&auto=format&fit=crop&q=80",
    instructor: "Maximilian S.",
    price: "₹649",
    oldPrice: "₹3,999",
    bestseller: false
  },
  {
    title: "Full Stack MERN Bootcamp 2026",
    category: "Web Dev",
    rating: 4.6,
    reviews: "3.2k",
    image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=600&auto=format&fit=crop",
    instructor: "Colt Steele",
    price: "₹1,299",
    oldPrice: "₹8,000",
    bestseller: true
  },
];

export default Home;