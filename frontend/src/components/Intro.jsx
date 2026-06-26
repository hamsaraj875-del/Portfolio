import { SiLeetcode } from "react-icons/si";
import { BsLinkedin } from "react-icons/bs";
import { AiFillGithub } from "react-icons/ai";
import { ReactTyped } from "react-typed";
import { motion } from "framer-motion";

const Intro = ()=>{
  return(
    <>
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false }}>
      <div className="w-full min-h-screen flex flex-col">
        <div className="h-150 flex justify-around items-center">
          <div className="h-50 flex flex-col justify-between">
            <div>
              <p className="text-xl">
                Hello! I am 
              </p>
              <p className="font-mono text-6xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                HAMSARAJ V.C
              </p>
              <p className="text-xl mt-4">
                <ReactTyped
                  strings={[
                    "Full Stack MERN Developer",
                    "Java Android Developer",
                    "AI/ML Enthusiast"
                  ]}
                  typeSpeed={50}
                  backSpeed={30}
                  loop
                />
              </p>
            </div>
            <div className="w-full flex gap-6">
              <a href="https://github.com/hamsaraj875-del" className="inline-flex hover:scale-105 transition px-4 py-2 justify-center  items-center bg-gradient-to-r from-black to-purple-600 text-white font-bold rounded-xl " target="_blank" rel="noopener noreferrer"><AiFillGithub />  GitHub</a>
              <a href="https://www.linkedin.com/in/hamsaraj-v-c-32340b373/" className="inline-flex px-4 py-2 justify-center hover:scale-105 transition  items-center bg-gradient-to-r from-black to-purple-600  text-white font-bold rounded-xl" target="_blank" rel="noopener noreferrer"><BsLinkedin />  Linked In</a>
              <a href="https://leetcode.com/u/HamsarajVC/" className="inline-flex px-4 py-2 justify-center hover:scale-105 transition items-center bg-gradient-to-r from-black to-purple-600 text-white font-bold rounded-xl" target="_blank" rel="noopener noreferrer"><SiLeetcode />  Leet Code</a>
            </div>
          </div>
          <div>
            <img src="/img.png">
            </img>
          </div>  
        </div>
      </div>
    </motion.div>
    </>
  )
}

export default Intro;