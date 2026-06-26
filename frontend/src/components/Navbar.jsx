const Navbar = ()=>{
  return(
    <>
      <nav className=" flex w-full font-['Poppins'] z-50 min-h-20 justify-center items-center fixed bg-black backdrop-blur-md px-10 py-4">
        <div className="max-w-7xl w-full mx-auto px-2 py-2 flex items-center justify-between">
          
          <h1 className="text-2xl font-bold text-white ml-10">
            Hamsaraj V.C
          </h1>

          <ul className="hidden md:flex items-center bg-gray-800  px-4 py-2 rounded-xl gap-8 text-white font-medium">
            <li>
              <a href="#Intro" className="hover:text-purple-400 transition">
                Home
              </a>
            </li>
            <li>
              <a href="#Footer" className="hover:text-purple-400 transition">
                About
              </a>
            </li>
            <li>
              <a href="#Skills" className="hover:text-purple-400 transition">
                Skills
              </a>
            </li>
            <li>
              <a href="#Projects" className="hover:text-purple-400 transition">
                Projects
              </a>
            </li>
            <li>
              <a href="#Footer" className="hover:text-purple-400 transition">
                Contact
              </a>
            </li>
          </ul>
          <button className="md:hidden text-white text-2xl">
            ☰
          </button>

        </div>
      </nav>

    </>
  )
}
export default Navbar;