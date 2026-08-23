//external modules

import { motion } from "framer-motion";


//react icons
import { FaScrewdriverWrench } from "react-icons/fa6";

const CurrentProject = () => {
  return (
    <motion.div>
      <div className="flex flex-col mt-20">
        <div className="w-full flex justify-center items-center h-20 mb-10">
          <div className="flex items-center font-mono text-3xl sm:text-4xl lg:text-5xl bg-gradient-to-r">
            <FaScrewdriverWrench className="mr-4 text-3xl text-yellow-400 sm:text-4xl" />
            <p className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-purple-500 via-fuchsia-500 to-blue-500 bg-clip-text text-transparent">
              Current Project
            </p>
          </div>
        </div>
        <div className="relative w-3/4 md:w-[80%] mx-auto mb-14">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
          <div className="absolute left-1/2 -translate-x-1/2 -top-[3px] w-16 h-[6px] rounded-full bg-gradient-to-r from-purple-500 to-blue-500 blur-[2px]" />
        </div>
      </div>
    </motion.div>
  );
};

export default CurrentProject;