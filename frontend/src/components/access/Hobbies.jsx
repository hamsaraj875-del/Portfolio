import { GiMuscleUp, GiBlackBook } from "react-icons/gi";
import { CgMusic } from "react-icons/cg";
import { FaComputer } from "react-icons/fa6";
import { BiCricketBall } from "react-icons/bi";
import { motion } from "framer-motion";
const Hobbies = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
      >
        <section className="mt-24 md:mt-40 mb-24 md:mb-50 px-4">
          {/* Heading */}
          <div className="flex justify-center items-center mb-10">
            <GiMuscleUp
              className="text-yellow-300 mr-3 drop-shadow-[0_0_15px_rgba(253,224,71,0.5)]"
              size={38}
            />

            <p className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-purple-500 via-fuchsia-500 to-blue-500 bg-clip-text text-transparent">
              Hobbies
            </p>
          </div>

          <div className="relative w-3/4 md:w-[80%] mx-auto mb-14">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
            <div className="absolute left-1/2 -translate-x-1/2 -top-[3px] w-16 h-[6px] rounded-full bg-gradient-to-r from-purple-500 to-blue-500 blur-[2px]" />
          </div>

          <div className="w-full flex flex-wrap gap-7 justify-center">
            <div
              className="group relative w-full max-w-[360px] min-h-[350px] rounded-2xl overflow-hidden
        border border-green-500/10
        bg-gradient-to-br from-[#071f20] via-[#042326] to-[#061718]
        p-7 flex flex-col items-center
        transition-all duration-500
        hover:-translate-y-3
        hover:border-green-400/30
        hover:shadow-[0_15px_50px_rgba(34,197,94,0.15)]"
            >
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-green-500/10 rounded-full blur-3xl group-hover:bg-green-500/20 transition-all duration-500" />

              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center
          bg-green-400/10 border border-green-400/20
          transition-all duration-500
          group-hover:scale-110 group-hover:bg-green-400/15
          group-hover:shadow-[0_0_30px_rgba(74,222,128,0.2)]"
              >
                <GiBlackBook
                  size={42}
                  className="text-green-300 transition-all duration-500
              group-hover:text-green-400
              group-hover:drop-shadow-[0_0_15px_rgba(74,222,128,0.8)]"
                />
              </div>

              <h3 className="mt-7 text-xl font-bold text-white transition-colors duration-300 group-hover:text-green-400">
                Learning
              </h3>

              <div className="w-10 h-[2px] bg-green-400/60 rounded-full my-4" />

              <p className="text-gray-400 text-center leading-relaxed font-serif">
                Constantly exploring new ideas, technologies, and skills to
                learn something new every day.
              </p>
            </div>

            <div
              className="group relative w-full max-w-[360px] min-h-[350px] rounded-2xl overflow-hidden
        border border-purple-500/10
        bg-gradient-to-br from-[#171027] via-[#1a102e] to-[#0d0919]
        p-7 flex flex-col items-center
        transition-all duration-500
        hover:-translate-y-3
        hover:border-purple-400/30
        hover:shadow-[0_15px_50px_rgba(168,85,247,0.18)]"
            >
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all duration-500" />

              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center
          bg-purple-400/10 border border-purple-400/20
          transition-all duration-500
          group-hover:scale-110
          group-hover:shadow-[0_0_30px_rgba(168,85,247,0.25)]"
              >
                <CgMusic
                  size={42}
                  className="text-purple-300 transition-all duration-500
              group-hover:text-purple-400
              group-hover:drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]"
                />
              </div>

              <h3 className="mt-7 text-xl font-bold text-white transition-colors duration-300 group-hover:text-purple-400">
                Music
              </h3>

              <div className="w-10 h-[2px] bg-purple-400/60 rounded-full my-4" />

              <p className="text-gray-400 text-center leading-relaxed font-serif">
                Listening to music to unwind, recharge, and return to work with
                greater focus and productivity.
              </p>
            </div>

            <div
              className="group relative w-full max-w-[360px] min-h-[350px] rounded-2xl overflow-hidden
        border border-blue-500/10
        bg-gradient-to-br from-[#071329] via-[#09152d] to-[#050b18]
        p-7 flex flex-col items-center
        transition-all duration-500
        hover:-translate-y-3
        hover:border-blue-400/30
        hover:shadow-[0_15px_50px_rgba(59,130,246,0.18)]"
            >
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-500" />

              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center
          bg-blue-400/10 border border-blue-400/20
          transition-all duration-500
          group-hover:scale-110
          group-hover:shadow-[0_0_30px_rgba(59,130,246,0.25)]"
              >
                <FaComputer
                  size={42}
                  className="text-blue-300 transition-all duration-500
              group-hover:text-blue-400
              group-hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]"
                />
              </div>

              <h3 className="mt-7 text-xl font-bold text-white transition-colors duration-300 group-hover:text-blue-400">
                Coding
              </h3>

              <div className="w-10 h-[2px] bg-blue-400/60 rounded-full my-4" />

              <p className="text-gray-400 text-center leading-relaxed font-serif">
                Building projects, solving coding challenges, and enjoying
                algorithmic thinking and challenging programming problems.
              </p>
            </div>

            <div
              className="group relative w-full max-w-[360px] min-h-[350px] rounded-2xl overflow-hidden
        border border-orange-500/10
        bg-gradient-to-br from-[#261407] via-[#2b1606] to-[#160b03]
        p-7 flex flex-col items-center
        transition-all duration-500
        hover:-translate-y-3
        hover:border-orange-400/30
        hover:shadow-[0_15px_50px_rgba(249,115,22,0.18)]"
            >
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl group-hover:bg-orange-500/20 transition-all duration-500" />

              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center
          bg-orange-400/10 border border-orange-400/20
          transition-all duration-500
          group-hover:scale-110
          group-hover:shadow-[0_0_30px_rgba(249,115,22,0.25)]"
              >
                <BiCricketBall
                  size={42}
                  className="text-orange-300 transition-all duration-500
              group-hover:text-orange-400
              group-hover:drop-shadow-[0_0_15px_rgba(251,146,60,0.8)]"
                />
              </div>

              <h3 className="mt-7 text-xl font-bold text-white transition-colors duration-300 group-hover:text-orange-400">
                Cricket
              </h3>

              <div className="w-10 h-[2px] bg-orange-400/60 rounded-full my-4" />

              <p className="text-gray-400 text-center leading-relaxed font-serif">
                Sports have taught me discipline, consistency, teamwork, and the
                ability to perform under pressure. Playing cricket keeps me
                focused, competitive, and mentally sharp.
              </p>
            </div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default Hobbies;
