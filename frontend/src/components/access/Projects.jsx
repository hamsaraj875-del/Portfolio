import Loader from "./Loader";

import { FaCalculator, FaCode } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { FcDocument } from "react-icons/fc";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Projects = () => {
  const [list, setList] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetcher = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_LINK}/project`, {
          signal,
        });
        const data = await response.json();
        if (data.success) {
          setList(data.message);
        } else {
          setError(data.message);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.log(err);
        }
      }
    };

    fetcher();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      {list.length == 0 && <Loader />}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
        >
          <div className="w-full mt-20">
            <div className="w-full flex justify-center items-center h-20 mb-12">
              <p className="flex items-center font-mono text-3xl sm:text-4xl lg:text-5xl bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                <FcDocument className="mr-4 text-3xl sm:text-4xl" />
                Projects
              </p>
            </div>
            
          {list.length != 0 && (

            <div className="flex flex-wrap justify-center gap-8 px-4">
              {list.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: false }}
                >
                  <div
                    className="group w-full max-w-[560px] min-h-[560px] border border-gray-800 rounded-xl overflow-hidden hover:bg-gradient-to-br from-[#2e1d55] to-[#1f1339] hover:border-purple-500 hover:scale-105 transition-all duration-500 hover:[transform:perspective(1000px)_rotateX(8deg)_rotateY(-8deg)_scale(1.05)] hover:shadow-[0_20px_60px_rgba(168,85,247,0.5)] hover:-translate-y-3 hover:z-10
            "
                  >
                    <img
                      src={item.projectImg}
                      alt={item.projectName}
                      className="w-full h-56 sm:h-80 object-cover"
                    />

                    <p className="text-lg sm:text-xl text-center font-mono mt-4 group-hover:text-purple-500 transition-transform group-hover:scale-110">
                      {item.projectName}
                    </p>

                    <p className="px-3 sm:px-5 mt-4 text-center text-gray-400">
                      {item.projectDescription}
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 py-6">
                      <div className="border border-gray-700 rounded-xl flex items-center px-4 py-2 group-hover:border-purple-500">
                        <GoDotFill
                          className="text-green-700 mr-2 animate-ping"
                          size={15}
                        />
                        <a
                          href={item.projectLive}
                          target="_blank"
                          className="text-gray-400"
                        >
                          Live Demo
                        </a>
                      </div>

                      <div className="border border-gray-700 rounded-xl flex items-center px-4 py-2 group-hover:border-purple-500">
                        <FaCode className="text-green-400 mr-2" size={20} />
                        <a
                          href={item.projectCode}
                          target="_blank"
                          className="text-gray-400"
                        >
                          Source Code
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          </div>
        </motion.div>
    </>
  );
};

export default Projects;
