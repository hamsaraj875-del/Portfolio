//internal modules
import Loader from "./Loader";
import Tilt from "react-parallax-tilt";

import { FaCode, FaLaptopCode } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Projects = () => {
  const [list, setList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoader(true);
    const controller = new AbortController();
    const signal = controller.signal;

    const fetcher = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_LINK}/project`, {
          signal,
        });
        const data = await response.json();
        if (data.success) {
          setLoader(false);
          setList(data.message);
        } else {
          setError(data.message);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.log(err);
          setLoader(false);
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
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
      >
        <div className="w-full mt-30">
          <div className="w-full flex justify-center items-center h-20 mb-10">
            <div className="flex items-center font-mono text-3xl sm:text-4xl lg:text-5xl bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              <FaLaptopCode
                className="mr-4 text-yellow-400 sm:text-4xl"
                size={40}
              />
              <p className="text-3xl md:text-5xl h-16 font-bold bg-gradient-to-r from-purple-500 via-fuchsia-500 to-blue-500 bg-clip-text text-transparent">
                Projects
              </p>
            </div>
          </div>
          <div className="relative w-3/4 md:w-[80%] mx-auto mb-14">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
            <div className="absolute left-1/2 -translate-x-1/2 -top-[3px] w-16 h-[6px] rounded-full bg-gradient-to-r from-purple-500 to-blue-500 blur-[2px]" />
          </div>

          {loader && <Loader />}

          {list.length != 0 && (
            <div className="flex flex-wrap justify-center m-2 gap-10 px-0">
              {list.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: false }}
                >
                  <Tilt
                    tiltMaxAngleX={6}
                    tiltMaxAngleY={6}
                    scale={1.02}
                    transitionSpeed={1500}
                    perspective={1000}
                    glareEnable={true}
                    glareMaxOpacity={0.12}
                    glareColor="#6366f1"
                    glarePosition="all"
                    className="w-full max-w-[550px]"
                  >
                    <div
                      className="group relative w-full max-w-[560px] min-h-[550px]
                    bg-black/80
border border-gray-800 rounded-xl overflow-hidden]
active:border-blue-500
hover:border-blue-500
transition-all duration-500
hover:shadow-[0_20px_60px_rgba(59,130,246,0.35)]
"
                    >
                      <img
                        src={item.projectImg}
                        alt={item.projectName}
                        className="w-full h-56 sm:h-80 object-cover"
                      />

                      <p
                        className="text-lg sm:text-xl text-center font-mono mt-4 font-bold
  text-white group-hover:text-purple-400 transition-colors duration-300"
                      >
                        {item.projectName}
                      </p>

                      <p className="px-3 sm:px-5 mt-4 text-center text-gray-400 group-hover:text-white">
                        {item.projectDescription}
                      </p>

                      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 py-6">
                        <div className="border border-gray-700 rounded-xl flex items-center px-4 py-2 group-hover:border-blue-500 z-50">
                          
                          <a
                            href={item.projectLive}
                            target="_blank"
                            className="text-gray-400 flex items-center justify-center"
                          ><GoDotFill
                            className="text-green-700 mr-2 animate-ping"
                            size={15}
                          />
                            Live Demo
                          </a>
                        </div>

                        <div className="border border-gray-700 rounded-xl flex items-center px-4 py-2 group-hover:border-blue-500 z-50">
                          
                          <a
                            href={item.projectCode}
                            target="_blank"
                            className="text-gray-400 flex justify-evenly items-center"
                          ><FaCode className="text-green-400 mr-2" size={20} />
                            Source Code
                          </a>
                        </div>
                      </div>
                    </div>
                  </Tilt>
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
