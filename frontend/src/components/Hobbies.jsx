import { GiMuscleUp, GiBlackBook } from "react-icons/gi";
import { CgMusic } from "react-icons/cg";
import { FaComputer } from "react-icons/fa6";
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
        <div className="mt-40 mb-50">
          <div className="font-mono text-4xl bg-gradient-to-r  from-blue-600 to-purple-600 text-center flex justify-center items-center bg-clip-text text-transparent font-bold">
            <GiMuscleUp className="text-yellow-300 mr-4" size={40} />{" "}
            Hobbies{" "}
          </div>
          <hr className="bg-gradient-to-r from-purple-500 to-blue-500 m-10 ml-30 mr-30 h-1"></hr>
          <div className="w-full h-100 flex justify-evenly ">
            <div className=" group w-90 h-full rounded-xl transform  bg-[#042326] hover:shadow-[0_0_30px_rgba(20,184,166,0.25)] hover:border-[#022225] hover:bg-[#042816] flex flex-col items-center px-2 ">
              <GiBlackBook
                className=" h-[50%] border-green-200 text-center transition-transform duration-200 ease-in group-hover:scale-120 group-hover:text-green-400 group-hover:drop-shadow-[0_0_30px_rgb(187,247,208)]"
                size={50}
              />
              <div className=" text-xl h-[15%] text-center font-bold transition-transform duration-200 ease-in group-hover:scale-110 group-hover:text-green-400">
                {" "}
                Learning{" "}
              </div>
              <div className="tex-lg  text-center font-serif">
                Constantly exploring new ideas, technologies, and skills to
                learn something new every day.
              </div>
            </div>
            <div className="group w-90 h-full bg-[#1a102e] rounded-xl transform hover:shadow-[0_0_30px_rgba(168,85,247,0.25)] hover:border-[#1a102e] hover:bg-[#1f1339] flex flex-col items-center px-2">
              <CgMusic
                className=" border-green-200 text-center transition-transform duration-200 ease-in group-hover:scale-120 group-hover:text-purple-500 group-hover:drop-shadow-[0_0_20px_rgb(168,85,247)] h-[50%]"
                size={50}
              />
              <div className=" text-xl h-[15%] text-center transition-transform duration-200 ease-in group-hover:scale-110 font-bold group-hover:text-purple-500">
                {" "}
                Music{" "}
              </div>
              <div className="tex-lg  text-center font-serif">
                Listening to music to unwind, recharge, and return to work with
                greater focus and productivity.
              </div>
            </div>
            <div className="group w-90 h-full bg-[#09152d] hover:shadow-[0_0_30px_rgba(59,130,246,0.25)] rounded-xl transform hover:border-[#09152d] hover:bg-[#071633] flex flex-col items-center px-2">
              <FaComputer
                className=" border-blue-200 text-center transition-transform duration-200 ease-in group-hover:scale-120 group-hover:text-blue-500 group-hover:drop-shadow-[0_0_20px_rgb(168,85,247)] h-[50%]"
                size={50}
              />
              <div className=" text-xl h-[15%] text-center transition-transform duration-200 ease-in group-hover:scale-110 font-bold group-hover:text-blue-500">
                {" "}
                Coding{" "}
              </div>
              <div className="tex-lg  text-center font-serif">
                Building projects, solving coding challenges, and njoying
                algorithmic thinking and solving challenging programming
                problems.
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Hobbies;
