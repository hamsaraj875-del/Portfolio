import { motion } from "framer-motion";
import { FaRocket, FaCode, FaHeart } from "react-icons/fa";
import { FaBurst } from "react-icons/fa6";

const AdminDashboard = () => {
  return (
    <motion.div
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        repeat: Infinity,
        duration: 2,
      }}className="w-full h-full">
    
    <div className=" w-full h-full px-40 py-33 max-h-full min-h-[calc(100vh-4rem)] bg-[#0f172a] flex items-center justify-center px-6 overflow-hidden">
      <div className="absolute h-72 w-72 rounded-full bg-purple-600/20 blur-3xl animate-pulse" />
      <div className="absolute right-20 top-24 h-60 w-60 rounded-full bg-cyan-500/20 blur-3xl animate-pulse" />

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-3xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-lg p-10 text-center shadow-2xl"
      >
        <motion.div
          animate={{
            rotate: [0, 8, -8, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
          }}
          className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white"
        >
          <FaRocket size={42} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-5xl font-bold text-white"
        >
          Welcome Back,
          <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            {" "}
            Hamsaraj
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-lg leading-8 text-gray-300"
        >
          Your portfolio is ready.
          <br />
          Build, improve and keep creating amazing software.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <div className="rounded-xl bg-purple-600/20 px-6 py-3 text-purple-300">
            <FaCode className="inline mr-2" />
            Keep Building
          </div>

          <div className="rounded-xl bg-cyan-600/20 px-6 py-3 text-cyan-300">
            🚀 Stay Consistent
          </div>

          <div className="rounded-xl bg-pink-600/20 px-6 py-3 text-pink-300">
            <FaHeart className="inline mr-2" />
            Enjoy Coding
          </div>
        </motion.div>

        
      </motion.div>
    </div>
    </motion.div>
  );
};

export default AdminDashboard;