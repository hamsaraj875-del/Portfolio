//external modules

import DepthCarousel from "../../utilities/DepthCarousel";
import { motion } from "framer-motion";

//react icons

import { FaScrewdriverWrench } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";

const CurrentProject = () => {
  return (
    <motion.div>
      <div className="flex flex-col mt-20 px-10 py-5">
        <div className="w-full flex justify-center items-center h-20 mb-10">
          <div className="flex items-center font-mono text-3xl sm:text-4xl lg:text-5xl bg-gradient-to-r">
            <FaScrewdriverWrench className="mr-4 text-3xl text-yellow-400 sm:text-4xl" />
            <p className="text-3xl md:text-5xl font-bold text-orange-500">
              Current Project
            </p>
          </div>
        </div>
        <div className="relative w-3/4 md:w-[80%] mx-auto mb-14">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
        </div>
        <div
          className="w-full max-w-7xl mx-auto p-6 md:p-8
  flex flex-col lg:flex-row gap-10
  border border-gray-800 rounded-2xl bg-black/40"
        >
          <div className="lg:w-[40%]">
            <div className="mb-6">
              <h2 className="text-4xl font-bold">
                Nex<span className="text-orange-500">Talk</span>
              </h2>

              <p className="text-gray-400 leading-7 mt-4 max-w-3xl">
                NexTalk is a real-time communication platform built with React,
                Node.js, Express, MongoDB, and Socket.io, featuring secure
                authentication, real-time messaging, and friend management.
              </p>
            </div>

            <img
              src="https://res.cloudinary.com/dbaqcimmp/image/upload/v1787571147/currentProject_nbyvaf.png"
              alt="NexTalk"
              className="w-full rounded-xl border border-gray-800
        shadow-[0_20px_60px_rgba(99,102,241,0.15)]"
            />

            <div className="mt-7">
              <div className="flex flex-wrap gap-2 mt-5">
                {["React", "Node.js", "Express", "MongoDB", "Socket.io"].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full
                bg-purple-500/10
                border border-purple-500/30
                text-purple-300 text-sm"
                    >
                      {tech}
                    </span>
                  ),
                )}
              </div>

              <a
                href="https://github.com/hamsaraj875-del/NexTalk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6
          px-5 py-2.5 rounded-lg
          bg-orange-500
          font-semibold"
              >
                <FaGithub size={20} />
                View NexTalk
              </a>
            </div>
          </div>
          <div className="w-full lg:w-[60%] h-fit flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-0">
            <p className="mb-6 md:mb-8 lg:mb-10 text-xl md:text-2xl">
              A Look Inside
            </p>

            <div className="w-full flex justify-center">
              <DepthCarousel />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CurrentProject;
