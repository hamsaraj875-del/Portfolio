import {FaHome,FaUser,FaProjectDiagram,} from "react-icons/fa";
import { MdOutlineContactMail } from "react-icons/md";
import { GiSkills } from "react-icons/gi";
import {useState} from "react";

const Navbar = () => {
  const [isOpen,setIsOpen] = useState(false);
  return (
    <nav className="fixed z-200 mb-24 top-5 left-1/2 -translate-x-1/2 z-50 w-full flex justify-center font-['Poppins']">
      <div
        className="
        mb-24
          w-[95%] max-w-6xl
          flex items-center justify-between
          px-5 py-3
          rounded-full
          bg-[#111827]/80
          backdrop-blur-xl
          border border-slate-700/50
          shadow-[0_8px_32px_rgba(0,0,0,0.5)]
        "
      >
        <h1 className="text-xl font-bold text-white">
          Hamsaraj V.C
        </h1>

        <ul className="hidden md:flex items-center gap-2">
          <li>
            <a
              href="#Intro"
              className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-300 group"
            >
              <FaHome className="text-gray-300 group-hover:text-purple-400 text-lg" />
              <span className="text-white group-hover:text-purple-400">
                Home
              </span>
            </a>
          </li>

          <li>
            <a
              href="#About"
              className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-300 group"
            >
              <FaUser className="text-gray-300 group-hover:text-purple-400 text-lg" />
              <span className="text-white group-hover:text-purple-400">
                About
              </span>
            </a>
          </li>

          <li>
            <a
              href="#Skills"
              className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-300 group"
            >
              <GiSkills className="text-gray-300 group-hover:text-purple-400 text-lg" />
              <span className="text-white group-hover:text-purple-400">
                Skills
              </span>
            </a>
          </li>

          <li>
            <a
              href="#Projects"
              className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-300 group"
            >
              <FaProjectDiagram className="text-gray-300 group-hover:text-purple-400 text-lg" />
              <span className="text-white group-hover:text-purple-400">
                Projects
              </span>
            </a>
          </li>

          <li>
            <a
              href="#Contact"
              className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-300 group"
            >
              <MdOutlineContactMail className="text-gray-300 group-hover:text-purple-400 text-lg" />
              <span className="text-white group-hover:text-purple-400">
                Contact
              </span>
            </a>
          </li>
        </ul>
        <button onClick={()=>setIsOpen(!isOpen)} className="md:hidden text-white text-3xl hover:text-purple-400 transition">
          {isOpen?'✕':'☰'}
        </button>
      </div>
      {isOpen && (
      <div className="md:hidden border border-gray-700 absolute top-15 right-8 w-[30%] bg-black flex flex-col items-center py-6 gap-6 rounded-b-2xl">
        <a href="#Intro" className="border border-gray-700 px-4 py-1 rounded-2xl hover:bg-gray-700" onClick={() => setIsOpen(false)}>Home</a>
        <a href="#About" className="border border-gray-700 px-4 py-1 rounded-2xl hover:bg-gray-700"  onClick={() => setIsOpen(false)}>About</a>
        <a href="#Skills" className="border border-gray-700 px-4 py-1 rounded-2xl hover:bg-gray-700"  onClick={() => setIsOpen(false)}>Skills</a>
        <a href="#Projects" className="border border-gray-700 px-4 py-1 rounded-2xl hover:bg-gray-700"  onClick={() => setIsOpen(false)}>Projects</a>
        <a href="#Contact" className="border border-gray-700 px-4 py-1 rounded-2xl hover:bg-gray-700"  onClick={() => setIsOpen(false)}>Contact</a>
      </div>
    )}
    </nav>
  );
};

export default Navbar;