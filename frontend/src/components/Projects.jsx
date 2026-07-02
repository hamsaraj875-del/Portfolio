import { FaCalculator,FaCode } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { FcDocument } from "react-icons/fc";
import { motion } from "framer-motion";

const Projects = ()=>{
   
  const list = [
    {projectImg:"img5.png",projectName:"E-Cart",projectDescription:"A feature-rich e-commerce web application built using the MERN stack, delivering a secure and seamless shopping experience.",projectLink:"https://todo-1-nyp5.onrender.com",codeLink:"https://github.com/hamsaraj875-del/E-commerce"},
    {projectImg:"img3.png",projectName:"Quiz Web App",projectDescription:"Built a web-based quiz platform that presents multiple-choice questions and evaluates user performance in real time.",projectLink:"https://hamsaraj875-del.github.io/OnlineQuiz/",codeLink:"https://github.com/hamsaraj875-del/OnlineQuiz"},
    {projectImg:"img4.png",projectName:" Backend Todo Web App ",projectDescription:"A responsive task management application that helps users organize, prioritize, and track daily tasks efficiently.",projectLink:"https://todo-1-nyp5.onrender.com",codeLink:"https://github.com/hamsaraj875-del/Backend-Todo"},
    {projectImg:"img2.png",projectName:"Weather Web App",projectDescription:"Integrated weather APIs to deliver accurate city-based weather updates through a clean user interface.",projectLink:"https://hamsaraj875-del.github.io/weather-app/",codeLink:"https://github.com/hamsaraj875-del/weather-app"},
    {projectImg:"img1.png",projectName:"Calculator",projectDescription:"A responsive calculator built with HTML, CSS, and JavaScript that performs basic arithmetic operations with a clean and intuitive user interface.",projectLink:" https://hamsaraj875-del.github.io/Simple-calculator/",codeLink:"https://github.com/hamsaraj875-del/Simple-calculator"},
    
    
    
    ];

  return (
    <>
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false }}>
      <div className="w-full">
        <div className="w-full flex justify-center items-center h-20 mb-18" ><p className="w-fit h-full flex font-mono justify-center items-center text-5xl bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent" ><FcDocument size={40} className="mr-4  text-yellow-300" /> Projects </p></div>
        <div className="flex w-full h-fit flex-wrap justify-center items-center flex justify-center items-center gap-8 ">
            {list.map((item,index)=><motion.div
              className="w-fit flex h-fit flex-wrap  justify-center items-center f gap-8 "
                initial={{opacity:0,y:50}}
                whileInView={{opacity:1,y:0}}
                transition={{duration:0.8}}
                viewport={{once:false}}>
                <div key={index} className="group w-140 h-120 pb-2 border border-gray-800 hover:bg-gradient-to-br transform from-[#2e1d55] to-[#1f1339] hover:border-purple-500 rounded-xl hover:scale-105 transition-all duration-500 hover:[transform:perspective(1000px)_rotateX(8deg)_rotateY(-8deg)_scale(1.05)] hover:shadow-[0_20px_60px_rgba(168,85,247,0.5)] hover:-translate-y-3 " >
                  <img className="rounded-t-xl h-[65%] w-full" src= {item.projectImg} alt={item.projectImg} ></img>
                  <p className="font-mono h-[5%] text-center text-xl m-4 group-hover:text-purple-500 transition-transform group-hover:scale-120" >{item.projectName}</p>
                  <p className="px-4 text-center h-[15%] text-gray-400" >{item.projectDescription}</p>
                  <div className="w-full h-[10%] flex justify-evenly items-center" >
                    <div className="border border-gray-700 rounded-xl flex py-1 px-2 justify-evenly items-center group-hover:border-purple-500" >
                      <p><GoDotFill className="text-green-700 mr-2 animate-ping " size={15} /></p>
                      <a href={item.projectLink} target="_black" className="w-fit h-fit text-center text-gray-400 " > Live Demo </a>
                    </div>
                    <div className="border border-gray-700 rounded-xl flex py-1 px-2 justify-evenly items-center group-hover:border-purple-500" >
                      <FaCode className="text-green-400 mr-2" size={20} /><a href={item.codeLink} target="_blank" className="w-fit h-fit text-center text-gray-400">  Source Code </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
        </div>
      </div>
    </motion.div>
    </>
  )
}

export default Projects