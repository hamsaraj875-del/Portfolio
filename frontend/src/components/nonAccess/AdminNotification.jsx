import { useEffect, useState } from "react";
import Loader from "../access/Loader";
import { FaUser, FaEnvelope, FaCommentDots } from "react-icons/fa";

const AdminNotification = () => {
  const [loader, setLoader] = useState(true);
  const [notifications, setNotification] = useState([]);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetcher = async () => {
      try {
        setLoader(true);
        const response = await fetch(
          "https://portfolio-server-57h1.onrender.com/notification",
          {
            signal,
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          },
        );

        const data = await response.json();
        if (data.success) {
          setNotification(data.message);
        }
      } catch (err) {
        if (err.name != "AbortError") {
          console.log(err);
        }
      } finally {
        setLoader(false);
      }
    };
    fetcher();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      {loader && <Loader />}
      {!loader && (
        <div className="min-h-screen bg-slate-950 px-4 py-8 sm:px-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-8 text-center">
              Notifications
            </h1>

            {!loader && notifications.length === 0 ? (
              <div className="bg-slate-900 rounded-xl p-8 text-center text-gray-400">
                No notifications found.
              </div>
            ) : (
              <div className="grid gap-6">
                {notifications.map((item) => (
                  <div
                    key={item._id}
                    className="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-lg hover:border-blue-500 hover:shadow-blue-500/20 transition-all duration-300"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                      <div>
                        <h2 className="text-2xl font-semibold text-blue-400 flex items-center gap-2">
                          <FaCommentDots />
                          {item.subject}
                        </h2>

                        <p className="mt-4 text-gray-300 leading-7 break-words">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 border-t border-slate-700 pt-4 flex flex-col gap-3 sm:flex-row sm:justify-between">
                      <div className="flex items-center gap-2 text-gray-300">
                        <FaUser className="text-green-400" />
                        <span>{item.name}</span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-300 break-all">
                        <FaEnvelope className="text-yellow-400" />
                        <span>{item.email}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AdminNotification;
