import { FaGraduationCap } from "react-icons/fa";

const Logo = () => {
  return (
    <div className="flex items-center gap-2 text-white">
      <div className="bg-white text-black p-2 rounded-lg">
        <FaGraduationCap size={18} />
      </div>
      <span className="text-xl font-bold tracking-wide">
        Learnify
      </span>
    </div>
  );
};

export default Logo;
