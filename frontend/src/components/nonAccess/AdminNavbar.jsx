import { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaBell,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";

const AdminNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#111827]/80 backdrop-blur-lg border-b border-gray-700">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-lg font-bold text-white">
            H
          </div>

          <div>
            <h1 className="text-xl font-semibold text-white">
              Portfolio Admin
            </h1>
            <p className="text-xs text-gray-400">
              Welcome Hamsaraj
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-6 md:flex">
          <button className="relative text-gray-300 hover:text-purple-400">
            <FaBell size={22} />
            <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
              2
            </span>
          </button>

          <FaUserCircle size={34} className="text-purple-400" />

          <button className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600">
            <FaSignOutAlt />
            Logout
          </button>
        </div>

        <button
          className="text-2xl text-white md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-gray-700 bg-[#111827] md:hidden">
          <div className="flex flex-col gap-4 p-5">
            <button className="flex items-center gap-3 text-gray-300 hover:text-purple-400">
              <FaBell />
              Notifications
            </button>

            <button className="flex items-center gap-3 text-red-400 hover:text-red-500">
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;