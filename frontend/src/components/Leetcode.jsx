import { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { FaRankingStar } from "react-icons/fa6";
import { motion } from "framer-motion";
import Loader from "./Loader";

const Leetcode = () => {
  const [leetcodeData, setLeetcodeData] = useState("");
  const [loader, setLoader] = useState(true);
  const [githubData, setGithubData] = useState("");
  const [easy, setEasy] = useState("");
  const [medium, setMedium] = useState("");
  const [hard, setHard] = useState("");
  const [all, setAll] = useState("");
  const [codeTab, setCodetab] = useState("github");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchLeetcodeData = async () => {
      try {
        setLoader(true);
        const res = await fetch("http://localhost:3000/leetcode", { signal });
        const res1 = await fetch("http://localhost:3000/github", { signal });
        const data = await res.json();
        const data1 = await res1.json();
        setGithubData(data1);
        setLeetcodeData(data.message);
        setLoader(false);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
        }
      }
    };

    fetchLeetcodeData();

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
        <div className="w-full h-fit mt-40 mb-40 justify-center items-center">
          <p className="w-full h-fit text-4xl font-bold font-mono text-center bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            Conding Profiles
          </p>
          <hr className="bg-gradient-to-r from-purple-500 to-blue-500 mt-10 ml-30 mr-30 h-1"></hr>
          <div className="flex flex-col h-fit  py-12 justify-center items-center  bg-[#09152d] mt-12 ml-30 mr-30 rounded-xl">
            <p className="border border-blue-500 rounded-xl px-2 py-2">
              <FaCode size={50} />
            </p>
            <div className="flex  w-fit mt-10 gap-18">
              <button
                onClick={(e) => setCodetab("leetcode")}
                className={`border border-gray-600 rounded-xl px-4 py-2 hover:cursor-pointer  shadow ${codeTab === "leetcode" ? "shadow-amber-100" : ""} hover:shadow-amber-100`}
              >
                Leetcode
              </button>
              <button
                onClick={(e) => setCodetab("github")}
                className={`border border-gray-600 rounded-xl hover:cursor-pointer px-4 py-2 shadow ${codeTab === "github" ? "shadow-amber-100" : ""} hover:shadow-amber-100`}
              >
                Github
              </button>
            </div>
            {loader && <Loader />}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false }}
              className="w-full"
            >
              {leetcodeData && codeTab === "leetcode" && (
                <div className="w-full">
                  <div className="mt-10">
                    <div className="text-2xl w-full flex justify-center items-center mt-6 gap-4">
                      <SiLeetcode size={30} />
                      <p className="mr-6">Hamsaraj V C</p>
                      <FaRankingStar className="text-red-400" size={30} />
                      <p className="text-red-400">{leetcodeData.rank}</p>
                    </div>
                  </div>
                  <div className="w-full h-fit flex flex-col justify-center items-center gap-6 mt-8">
                    <div className="w-full flex gap-4 justify-center items-center">
                      <div className="w-fit h-10 py-2 px-4 border border-blue-400 rounded-xl">
                        <p>Solved : {leetcodeData.solved}</p>
                      </div>
                      <div className="w-[60%] h-3 bg-green-50 rounded-xl">
                        <div
                          style={{
                            width: `${(leetcodeData.solved / 3973) * 100}%`,
                          }}
                          className="h-full bg-purple-400 rounded-xl"
                        ></div>
                      </div>
                      3973
                    </div>
                    <div className="w-full flex gap-4 justify-center items-center">
                      <div className="w-fit h-fit py-2 px-4 border border-green-400 rounded-xl">
                        <p>Easy : {leetcodeData.easy}</p>
                      </div>
                      <div className="w-[60%] h-3 bg-green-50 rounded-xl">
                        <div
                          style={{
                            width: `${(leetcodeData.easy / 951) * 100}%`,
                          }}
                          className="h-full bg-green-400 rounded-xl"
                        ></div>
                      </div>
                      951
                    </div>
                    <div className="w-full flex gap-4 justify-center items-center">
                      <div className="w-fit h-fit py-2 px-4 border border-yellow-400 rounded-xl">
                        <p>Medium : {leetcodeData.medium}</p>
                      </div>
                      <div className="w-[60%] h-3 bg-green-50 rounded-xl">
                        <div
                          style={{
                            width: `${(leetcodeData.medium / 2074) * 100}%`,
                          }}
                          className="h-full bg-yellow-400 rounded-xl"
                        ></div>
                      </div>
                      2074
                    </div>
                    <div className="w-full flex gap-4 justify-center items-center">
                      <div className="w-fit h-fit py-2 px-4 border border-red-400 rounded-xl">
                        <p>Hard : {leetcodeData.hard}</p>
                      </div>
                      <div className="w-[60%] h-3 bg-green-50 rounded-xl">
                        <div
                          style={{
                            width: `${(leetcodeData.hard / 948) * 100}%`,
                          }}
                          className="h-full bg-red-400 rounded-xl"
                        ></div>
                      </div>
                      948
                    </div>
                    <div className="w-full h-fit">
                      <a
                        target="_blank"
                        href="https://leetcode.com/u/HamsarajVC/"
                        className="w-fit h-fit px-4 py-2 border border-gray-700 rounded-xl ml-40 cursor-pointer"
                      >
                        View Leetcode Profile
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false }}
              className="w-full"
            >
              {githubData && codeTab === "github" && (
                <div className="w-full h-150 flex flex-col gap-8">
                  <div className="flex justify-center items-center h-fit mt-10 gap-10 ">
                    <img
                      className="w-24 h-24 rounded-full mr-6"
                      src="https://avatars.githubusercontent.com/u/231910369?v=4"
                    ></img>
                    <div>
                      <p className="text-3xl text-center">Hamsaraj V C</p>
                      <p className="text-sm text-gray-400 text-center ">
                        @ hamsaraj875-del
                      </p>
                    </div>
                    <div className="w-fit h-fit py-2 px-4 border border-blue-400 rounded-xl">
                      <p>Repositories : {githubData.message.repos}</p>
                    </div>
                    <div className="w-fit h-fit py-2 px-4 border border-blue-400 rounded-xl">
                      <p>Followers : {githubData.message.followers}</p>
                    </div>
                  </div>
                  <div className="w-full h-fit gap-8 flex justify-center items-center text-gray-400 px-24">
                    Bio : {githubData.message.bio}
                  </div>
                  <div className="w-full h-fit">
                    <a
                      target="_blank"
                      href="https://github.com/hamsaraj875-del"
                      className="w-fit h-fit px-4 py-2 border border-gray-700 rounded-xl ml-40 cursor-pointer"
                    >
                      View Github Profile
                    </a>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Leetcode;
