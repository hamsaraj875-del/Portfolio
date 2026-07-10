import React from "react"
import {FaLock,FaShieldAlt} from "react-icons/fa";
import AdminNavbar from "../components/nonAccess/AdminNavbar";
import AdminSidebar from "../components/nonAccess/AdminSidebar";
import AdminDashBoard from "../components/nonAccess/AdminDashBoard";
import AdminProject from "../components/nonAccess/AdminProject";
import AdminNotification from "../components/nonAccess/AdminNotification";
import Loader from "../components/access/Loader";
import {useState,useEffect} from "react"

const Admin = ()=>{
  const [tab,setTab] = useState("Dashboard");
  
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
  return(
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
    {login && !loader &&<div className="flex flex-col" >
      <AdminNavbar />
      <div className="className=flex-1 ml-20 md:ml-24 lg:ml-72 mt-16" >
        <AdminSidebar setTab={setTab} tab={tab} />
        {tab==="Dashboard" && <AdminDashBoard />}
        {tab==="Projects" && <AdminProject />}
        {tab==="Notification" && <AdminNotification />}
      </div>
    </div>}
    </>
  )
}

export default Admin;