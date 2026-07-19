import { SiLeetcode } from "react-icons/si";
import { BsLinkedin } from "react-icons/bs";
import { AiFillGithub } from "react-icons/ai";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { motion } from "framer-motion";

const Intro = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="w-full min-h-screen mt-24 flex items-center"
    >
      <div className="w-full font-sans flex flex-col lg:flex-row items-center justify-between px-8 mb-30 lg:px-24">
        <div className="flex flex-col gap-8 max-w-3xl">
          <p className="text-blue-400 font-semibold tracking-[4px] text-lg">
            BACKEND • FULL STACK • JAVA
          </p>

          <h1 className="text-6xl lg:text-8xl ffont-['Outfit'] font-bold  leading-tight bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            HAMSARAJ V.C
          </h1>

          <h2 className="text-2xl lg:text-4xl font-bold text-white">
            Backend-Focused Full Stack Developer
          </h2>

          <p className="text-gray-400  leading-9 max-w-2xl">
            Building scalable full-stack applications using
            <span className="text-blue-400 font-semibold"> React</span>,
            <span className="text-purple-400 font-semibold"> Express</span>,
            <span className="text-cyan-400 font-semibold"> MongoDB</span>,
            <span className="text-purple-400 font-semibold"> Python</span>, and
            <span className="text-yellow-400 font-semibold"> Java</span>.
            Passionate about backend architecture, REST APIs, authentication,
            caching and developing software that solves real-world problems.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            <div className="rounded-xl border border-blue-500/30 bg-white/5 backdrop-blur-md p-5">
              <h3 className="text-3xl font-bold text-blue-400">9.85</h3>
              <p className="text-gray-400 text-sm mt-1">CGPA</p>
            </div>

            <div className="rounded-xl border border-purple-500/30 bg-white/5 backdrop-blur-md p-5">
              <h3 className="text-3xl font-bold text-purple-400">150+</h3>
              <p className="text-gray-400 text-sm mt-1">Problems Solved</p>
            </div>

            <div className="rounded-xl border border-cyan-500/30 bg-white/5 backdrop-blur-md p-5">
              <h3 className="text-3xl font-bold text-cyan-400">6+</h3>
              <p className="text-gray-400 text-sm mt-1">Projects</p>
            </div>

            <div className="rounded-xl border border-green-500/30 bg-white/5 backdrop-blur-md p-5">
              <h3 className="text-3xl font-bold text-green-400">MERN</h3>
              <p className="text-gray-400 text-sm mt-1">Tech Stack</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-5">
            <a
              href="/Hamsaraj.pdf"
              target="_blank"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:scale-105 transition"
            >
              <HiOutlineDocumentDownload size={22} />
              Resume
            </a>

            <a
              href="https://github.com/hamsaraj875-del"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl border border-gray-600 hover:border-blue-500 hover:bg-blue-500/10 transition"
            >
              <AiFillGithub size={22} />
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/hamsaraj-v-c-32340b373/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl border border-gray-600 hover:border-blue-500 hover:bg-blue-500/10 transition"
            >
              <BsLinkedin size={20} />
              LinkedIn
            </a>

            <a
              href="https://leetcode.com/u/HamsarajVC/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl border border-gray-600 hover:border-blue-500 hover:bg-blue-500/10 transition"
            >
              <SiLeetcode size={20} />
              LeetCode
            </a>
          </div>
        </div>


        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative mt-20 lg:mt-0"
        >
          <div className="absolute inset-0 bg-blue-500/20 blur-[120px] rounded-full"></div>

          <img
            src="/img.png"
            alt="Hamsaraj"
            className="relative w-[380px] lg:w-[430px] h-[380px] lg:h-[430px] object-cover rounded-full border border-blue-500  shadow-2xl shadow-blue-900"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Intro;
