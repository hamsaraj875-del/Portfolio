//external modules

import DepthCarousel from "../../utilities/DepthCarousel";
import { motion } from "framer-motion";

//react icons

import { FaScrewdriverWrench } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";

const CurrentProject = () => {
  const val = false;
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
        {val && (
          <div
            className="w-full max-w-7xl mx-auto p-6 md:p-8
  flex flex-col lg:flex-row gap-10
  border border-gray-800 rounded-2xl bg-black/40"
          >
            <div className="lg:w-[40%]">
              <div className="mb-6">
                <h2 className="text-4xl font-bold">
                  Sra<span className="text-orange-500">tch</span>
                </h2>

                <p className="text-gray-400 leading-7 mt-4 max-w-3xl">
          Scratch is a native Android notes application built with
          Kotlin and Room Database, designed to help users create,
          manage, and organize personal notes. It features user
          authentication, persistent local storage, note creation,
          and deletion, with a clean and intuitive Android interface.

                </p>
              </div>

              <img
                src="https://res.cloudinary.com/dbaqcimmp/image/upload/v1790400064/4d0d7d1d-ed2e-4a36-8cfd-ec4de7d18bab_hthgob.png"
                alt="NexTalk"
                className="h-[700px] w-full rounded-xl border border-gray-800
        shadow-[0_20px_60px_rgba(99,102,241,0.15)]"
              />

              <div className="mt-7">
                <div className="flex flex-wrap gap-2 mt-5">
                  {[
                    "Kotlin",
                    "Android Studio",
                    "Room Database",
                    "SQLite",
                    "Material Design",
                    "Android SDK",
                  ].map(
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
                  href="https://github.com/hamsaraj875-del/Scratch_App"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-6
          px-5 py-2.5 rounded-lg
          bg-orange-500
          font-semibold"
                >
                  <FaGithub size={20} />
                  View Scratch on GitHub
                </a>
              </div>
            </div>
            <div className="w-full lg:w-[60%] h-fit flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-0">
              <p className="mb-6 md:mb-8 lg:mb-10 text-xl md:text-2xl">
                A Look Inside
              </p>

              <div className="w-full flex justify-center">
                <DepthCarousel
  cardWidth={320}
  cardHeight={690}
  visibleCards={1}
  spread={0}
  tilt={0}
  depth={0}
  blur={0}
  autoplay={true}
  showControls={true}
  showIndicators={true}
/>
              </div>
            </div>
          </div>
        )}
        {!val && (
          <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0d1b3a]/80 to-[#070f22]/90 backdrop-blur-xl shadow-2xl shadow-black/40">
            <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 bg-orange-500/15 rounded-full blur-3xl animate-pulse" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 bg-violet-500/15 rounded-full blur-3xl animate-pulse" />
            <div className="relative flex flex-col items-center justify-center text-center py-24 px-6">
              <div className="w-24 h-24 mb-8 flex items-center justify-center rounded-3xl border border-orange-400/30 bg-orange-500/10 shadow-lg shadow-orange-500/10">
                <span className="text-5xl animate-bounce">🛠️</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
                Coming{" "}
                <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
                  Soon
                </span>
              </h2>
              <p className="text-slate-400 max-w-md mb-10 leading-relaxed">
                Something new is cooking. Check back shortly to see what I'm building.
              </p>
              <div className="flex gap-2.5 px-4 py-2.5 rounded-full border border-white/10 bg-white/[0.04]">
                <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-orange-400 to-amber-300 animate-[bounce_1s_infinite_0ms]" />
                <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-orange-400 to-amber-300 animate-[bounce_1s_infinite_150ms]" />
                <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-orange-400 to-amber-300 animate-[bounce_1s_infinite_300ms]" />
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CurrentProject;
