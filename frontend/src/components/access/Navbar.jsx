import {FaHome,FaUser,FaProjectDiagram,} from "react-icons/fa";
import { MdOutlineContactMail } from "react-icons/md";
import { GiSkills } from "react-icons/gi";
import {useState} from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [password,setPassword] = useState("");
  const [passkey,setPasskey] = useState("");
  const [isOpen,setIsOpen] = useState(false);
  const [admin,setAdmin] = useState(false);
  const [error,setError] = useState(false);

  const submitHandler = async(e)=>{
    e.preventDefault();
    const data = {password,passkey}
    const response = await fetch("http://localhost:3000/verification",{
      method:'POST',
      headers:{'content-Type':'application/json'},
      body:JSON.stringify(data)
    });
    const result = await response.json();
    if(result.success){
      setPassword("");
      setPasskey("");
      navigate("admin/");
    }else{
      setError(true);
    }
  }

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
          <li>
            <a
            onClick={()=>setAdmin(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full hover:cursor-pointer hover:bg-white/10 transition-all duration-300 group"
            >
              <FaUser className="text-gray-300 group-hover:text-purple-400 text-lg" />
              <span className="text-white group-hover:text-purple-400">
                Admin
              </span>
            </a>
          </li>
        </ul>
        <button onClick={()=>setIsOpen(!isOpen)} className="md:hidden hover:cursor-pointer text-white text-3xl hover:text-purple-400 transition">
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
      {admin && (
      <form onSubmit={(e)=>submitHandler(e)} className="absolute left-1/2 top-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-xl border backdrop-blur-2xl border-gray-700 bg-[#111827]/80 p-6 shadow-xl">
        <div className="flex justify-end">
          <button type="button" onClick={()=>setAdmin(false)} className="text-lg text-gray-400 transition hover:cursor-pointer hover:text-white">
            ✕
          </button>
        </div>
        <h2 className="mb-5 text-center text-xl font-semibold text-white">
          Admin Verification
        </h2>
        <div className="mb-4 flex flex-col gap-2">
          {error &&<div className="w-full px-2 h-fit text-red-500 border border-red-700 rounded-xl">
            <p className="w-fit h-fit text-center" >Invalid Password or Pass key !</p>
          </div>}
          <label htmlFor="password" className="text-sm text-gray-300">
            Password
          </label>
          <input
            id="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            type="password"
            placeholder="Enter password"
            className="rounded-md border border-gray-700 bg-zinc-800 px-3 py-2 text-white outline-none transition focus:border-blue-500"
          />
        </div>
        <div className="mb-6 flex flex-col gap-2">
          <label htmlFor="passkey" className="text-sm text-gray-300">
            Passkey
          </label>
          <input
            value={passkey}
            onChange={(e)=>setPasskey(e.target.value)}
            id="passkey"
            placeholder="Enter passkey"
            className="rounded-md border border-gray-700 bg-zinc-800 px-3 py-2 text-white outline-none transition focus:border-blue-500"
          />
        </div>
        <button type="submit" className="w-full rounded-md bg-blue-600 py-2 font-medium text-white transition hover:bg-blue-700">
          Verify
        </button>
      </form>
    )}
    </nav>
  );
};

export default Navbar;