//react ions

import {
  SiMongodb,
  SiExpress,
  SiThunderstore,
  SiAndroidstudio,
  SiRender,
} from "react-icons/si";
import { FaNodeJs, FaJava, FaReact, FaPython } from "react-icons/fa";
import { TbBrandJavascript, TbFileTypeHtml } from "react-icons/tb";
import { FaGitAlt, FaGithub } from "react-icons/fa6";
import { RiTailwindCssFill, RiBootstrapFill } from "react-icons/ri";
import { SiCloudinary } from "react-icons/si";
import { BsFiletypeCss } from "react-icons/bs";
import { TbBrandVscode } from "react-icons/tb";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

//internal modules
import Loader from "../access/Loader";

import "../../App.css";

const Skills = () => {
  const [result, setResult] = useState({
    language: [],
    technology: [],
    tool: [],
  });
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setLoader(true);
    const fetcher = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_LINK}/skills`, {
          signal,
        });
        const data = await response.json();
        setResult(data.message);
      } catch (err) {
        if (err.name != "AbortError") {
          setError("Fetch failed Try again later!");
        }
      } finally {
        setLoader(false);
      }
    };
    fetcher();
    return () => {
      controller.abort();
    };
  }, []);

  const tagList = {
    FaJava,
    TbBrandJavascript,
    TbFileTypeHtml,
    BsFiletypeCss,
    FaPython,
    SiMongodb,
    SiExpress,
    FaReact,
    FaNodeJs,
    RiTailwindCssFill,
    RiBootstrapFill,
    FaGitAlt,
    FaGithub,
    SiCloudinary,
    TbBrandVscode,
    SiAndroidstudio,
    SiRender,
  };
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
      >
        <div className="w-full h-fit">
          <div className="justify-center items-center flex mb-10">
            <SiThunderstore className="text-yellow-300 mr-4" size={40} />
            <p className="text-3xl md:text-5xl font-bold text-orange-500">
              Skills
            </p>
          </div>
          <div className="relative w-3/4 md:w-[80%] mx-auto mb-14">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
          </div>
          {loader && <Loader />}
          <div className="flex flex-wrap text-xl gap-12 justify-center items-center  py-8">
            {result &&
              result.language.map((item, index) => {
                const Icon = tagList[item.tag];
                return (
                  <div
                    key={index}
                    className="flex flex-col justify-center items-center hover:text-emerald-400 group transition-transform duration-500 hover:-translate-y-3 hover:scale-120"
                  >
                    <Icon
                      size={40}
                      className="transition-transform duration-1000 group-hover:rotate-360"
                    />
                    <p>{item.name}</p>
                  </div>
                );
              })}
          </div>
          <div className=" flex flex-wrap text-xl gap-12 justify-center items-center py-8">
            {result &&
              result.technology.map((item, index) => {
                const Icon = tagList[item.tag];
                return (
                  <div
                    key={index}
                    className="flex flex-col justify-center items-center hover:text-sky-400 group transition-transform duration-500 hover:-translate-y-3 hover:scale-120"
                  >
                    <Icon
                      size={40}
                      className="transition-transform duration-1000 group-hover:rotate-360"
                    />
                    <p>{item.name}</p>
                  </div>
                );
              })}
          </div>
          <div className=" flex flex-wrap text-xl gap-12 justify-center items-center py-8">
            {result &&
              result.tool.map((item, index) => {
                const Icon = tagList[item.tag];
                return (
                  <div
                    key={index}
                    className="flex flex-col justify-center items-center hover:text-red-400 group transition-transform duration-500 hover:-translate-y-3 hover:scale-120"
                  >
                    <Icon
                      size={40}
                      className="transition-transform duration-1000 group-hover:rotate-360"
                    />
                    <p>{item.name}</p>
                  </div>
                );
              })}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Skills;
