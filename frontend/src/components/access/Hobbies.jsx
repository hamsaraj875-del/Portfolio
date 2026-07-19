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
        <div className="mt-24 md:mt-40 mb-24 md:mb-50 px-4">
          <div className="flex justify-center items-center mb-15">
            <GiMuscleUp className="text-yellow-300 mr-4" size={40} />{" "}
            <p className="w-fit h-fit text-center text-3xl md:text-5xl bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">Hobbies</p>
            
          </div>
          <hr className="bg-gradient-to-r from-purple-500 to-blue-500 my-10 w-3/4 md:w-[80%] mx-auto h-1"></hr>
          <div className="w-full h-fit flex flex-wrap gap-6 justify-center lg:justify-evenly">
            <div className="group w-full max-w-[360px] h-100 rounded-xl transform  bg-[#042326] group hover:shadow-[0_0_30px_rgba(20,184,166,0.25)] hover:border-[#022225] hover:bg-[#042816] flex flex-col items-center px-2 ">
              <GiBlackBook
                className="h-[50%] border-green-200 text-center transition-transform duration-200 ease-in group-hover:scale-120 group-hover:text-green-400 group-hover:drop-shadow-[0_0_30px_rgb(187,247,208)]"
                size={50}
              />
              <div className=" text-xl h-[15%] text-center font-bold transition-transform duration-200 ease-in group-hover:scale-110 group-hover:text-green-400">
                Learning
              </div>
              <div className=" text-gray-400 text-center font-serif">
                Constantly exploring new ideas, technologies, and skills to
                learn something new every day.
              </div>
            </div>
            <div className="group w-full max-w-[360px] h-100 bg-[#1a102e] rounded-xl transform hover:shadow-[0_0_30px_rgba(168,85,247,0.25)] hover:border-[#1a102e] hover:bg-[#1f1339] flex flex-col items-center px-2">
              <CgMusic
                className=" border-green-200 text-center transition-transform duration-200 ease-in group-hover:scale-120 group-hover:text-purple-500 group-hover:drop-shadow-[0_0_20px_rgb(168,85,247)] h-[50%]"
                size={50}
              />
              <div className=" text-xl h-[15%] text-center transition-transform duration-200 ease-in group-hover:scale-110 font-bold group-hover:text-purple-500">
                {" "}
                Music{" "}
              </div>
              <div className=" text-gray-400 text-center font-serif">
                Listening to music to unwind, recharge, and return to work with
                greater focus and productivity.
              </div>
            </div>
            <div className="group w-full max-w-[360px] h-100 bg-[#09152d] hover:shadow-[0_0_30px_rgba(59,130,246,0.25)] rounded-xl transform hover:border-[#09152d] hover:bg-[#071633] flex flex-col items-center px-2">
              <FaComputer
                className=" border-blue-200 text-center transition-transform duration-200 ease-in group-hover:scale-120 group-hover:text-blue-500 group-hover:drop-shadow-[0_0_20px_rgb(168,85,247)] h-[50%]"
                size={50}
              />
              <div className=" text-xl h-[15%] text-center transition-transform duration-200 ease-in group-hover:scale-110 font-bold group-hover:text-blue-500">
                {" "}
                Coding{" "}
              </div>
              <div className=" text-gray-400  text-center font-serif">
                Building projects, solving coding challenges, and njoying
                algorithmic thinking and solving challenging programming
                problems.
              </div>
            </div>
            <div className="group w-full max-w-[360px] h-100 bg-[#2b1606] hover:shadow-[0_0_30px_rgba(249,115,22,0.25)] rounded-xl transform hover:border-[#2b1606] hover:bg-[#3a1d08] flex flex-col items-center px-2">
              <BiCricketBall
                className="border-orange-200 text-center transition-transform duration-200 ease-in group-hover:scale-120 group-hover:text-orange-500 group-hover:drop-shadow-[0_0_20px_rgb(251,146,60)] h-[50%]"
                size={50}
              />
              <div className="text-xl h-[15%] text-center transition-transform duration-200 ease-in group-hover:scale-110 font-bold group-hover:text-orange-500">
                Cricket
              </div>
              <div className="text-gray-400 text-center font-serif">
                Sports have taught me discipline, consistency, teamwork, and the ability to perform under pressure. Playing cricket helps me stay focused, competitive, and mentally sharp.
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Hobbies;
