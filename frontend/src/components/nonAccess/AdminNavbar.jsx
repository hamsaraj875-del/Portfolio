import { useState, useEffect } from "react";
import {FaBars, FaTimes,FaLock,FaShieldAlt, FaBell,FaSignOutAlt,FaUserCircle,} from "react-icons/fa";
import Loader from "../access/Loader";

const AdminNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetcher = async () => {
      setLoader(true);

      try {
        const response = await fetch("http://localhost:3000/adminVerify", {
          method: "POST",
          credentials: "include",
          signal,
        });

        const data = await response.json();
        setLogin(data.success);

      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
          setLogin(false);
        }
      } finally {
        if (!signal.aborted) {
          setLoader(false);
        }
      }
    };
    fetcher();

    return () => {
      controller.abort();
    };
    
  }, []);

  return (
    <>
      {loader && (
        <div className="fixed inset-0 flex items-center justify-center bg-black">
          <Loader />
        </div>
      )}
      {!login && !loader && (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-black px-6">
          <div className="max-w-md rounded-2xl border border-red-500/20 bg-white/10 p-10 text-center shadow-2xl backdrop-blur-lg">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/20">
              <FaLock className="text-5xl text-red-500" />
            </div>

            <h1 className="mb-3 text-3xl font-bold text-white">
              Access Denied
            </h1>

            <p className="mb-6 text-gray-300">
              You are not authorized to access this page.
              <br />
              Please sign in with a valid administrator account to continue.
            </p>

            <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/20 px-5 py-2 text-purple-300">
              <FaShieldAlt />
              Administrator Access Required
            </div>
          </div>
        </div>
      )}

      {login && !loader && (
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
                <p className="text-xs text-gray-400">Welcome Hamsaraj</p>
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
      )}
    </>
  );
};

export default AdminNavbar;
