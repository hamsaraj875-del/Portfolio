import { SiMongodb,SiExpress,SiThunderstore,SiAndroidstudio,SiRender } from "react-icons/si";
import { FaNodeJs,FaJava,FaReact,FaPython } from "react-icons/fa";
import { TbBrandJavascript,TbFileTypeHtml } from "react-icons/tb";
import { FaGitAlt,FaGithub } from "react-icons/fa6";
import { RiTailwindCssFill,RiBootstrapFill  } from "react-icons/ri";
import { SiCloudinary } from "react-icons/si";
import { BsFiletypeCss } from "react-icons/bs";
import { TbBrandVscode } from "react-icons/tb";
import { motion } from "framer-motion";


import "../../App.css"


const Skills = ()=>{
  const language = [{tag:FaJava,name:"Java"},{tag:TbBrandJavascript,name:"Java Script"},{tag:TbFileTypeHtml,name:"HTML"},{tag:BsFiletypeCss,name:"CSS "},{tag:FaPython,name:"Python"}];
  const technology = [{tag:SiMongodb,name:"Mongo Db"},{tag:SiExpress,name:"Express"},{tag:FaReact,name:"React"},{tag:FaNodeJs,name:"Node JS"},{tag:RiTailwindCssFill,name:"Tailwind css"},{tag:RiBootstrapFill,name:"Bootstrap"}]
  const tool = [{tag:FaGitAlt,name:"Git"},{tag:FaGithub,name:"Github"},{tag:SiCloudinary,name:"Cloudinary"},{tag:TbBrandVscode,name:"VS Code"},{tag:SiAndroidstudio,name:"Android Studio"},{tag:SiRender,name:"Render"}]
  return(
    <>
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false }}>
      <div className="w-full h-fit">
        <div className="justify-center items-center flex mb-15"><SiThunderstore className="text-yellow-300 mr-4" size={40} /><p className="w-fit h-fit text-center text-3xl md:text-5xl bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">Tech Stack</p></div>
        <div className="flex flex-wrap text-xl gap-12 justify-center items-center  py-8">
          {language.map((item,index)=>{
            const Icon = item.tag
            return(
              <div key={index} className="flex flex-col justify-center items-center hover:text-emerald-400 group transition-transform duration-500 hover:-translate-y-3 hover:scale-120"><Icon size={40} className="transition-transform duration-1000 group-hover:rotate-360" /><p>{item.name}</p></div>
            )
          })}
        </div>
        <div className=" flex flex-wrap text-xl gap-12 justify-center items-center py-8">
          {technology.map((item,index)=>{
            const Icon = item.tag
            return(
              <div key={index} className="flex flex-col justify-center items-center hover:text-sky-400 group transition-transform duration-500 hover:-translate-y-3 hover:scale-120"><Icon size={40} className="transition-transform duration-1000 group-hover:rotate-360" /><p>{item.name}</p></div>
            )
          })}
        </div>
        <div className=" flex flex-wrap text-xl gap-12 justify-center items-center py-8">
          {tool.map((item,index)=>{
            const Icon = item.tag
            return(
              <div key={index} className="flex flex-col justify-center items-center hover:text-red-400 group transition-transform duration-500 hover:-translate-y-3 hover:scale-120"><Icon size={40} className="transition-transform duration-1000 group-hover:rotate-360" /><p>{item.name}</p></div>
            )
          })}
        </div>
      </div>
    </motion.div>
    </>
  )
}

export default Skills;