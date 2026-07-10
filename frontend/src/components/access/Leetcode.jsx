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
  const [total, setTotal] = useState(0);
  const [codeTab, setCodetab] = useState("github");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchLeetcodeData = async () => {
      try {
        setLoader(true);
        const res = await fetch(
          "https://portfolio-server-57h1.onrender.com/leetcode",
          { signal },
        );
        const res1 = await fetch(
          "https://portfolio-server-57h1.onrender.com/github",
          { signal },
        );
        const data = await res.json();
        const data1 = await res1.json();
        setGithubData(data1.message);
        setTotal(
          Object.values(data1.message.language).reduce((a, b) => a + b, 0),
        );
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
        <div className="w-full min-h-screen flex flex-col justify-center items-center mt-20 md:mt-40 px-4">
          <div className="w-full h-fit flex items-center justify-center">
            <p className="text-2xl sm:text-3xl md:text-5xl w-fit h-fit font-mono text-center bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              Coding Profiles
            </p>
          </div>
          <div className="w-[96%] flex flex-col h-fit py-12 justify-center items-center bg-[#09152d] mt-12 mx-auto rounded-xl">
            <p className="border border-blue-500 rounded-xl px-2 py-2">
              <FaCode size={50} />
            </p>
            <div className="flex flex-wrap justify-center w-fit mt-10 gap-6 md:gap-18">
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
            {loader && <Loader className="mt-8" />}
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
                    <div className="text-lg md:text-2xl w-full flex flex-wrap justify-center items-center mt-6 gap-3 md:gap-4 px-4">
                      <SiLeetcode size={30} />
                      <p className="mr-6">Hamsaraj V C</p>
                      <FaRankingStar className="text-red-400" size={30} />
                      <p className="text-red-400">{leetcodeData.rank}</p>
                    </div>
                  </div>
                  <div className="w-full h-fit flex flex-col justify-center items-center gap-6 mt-8">
                    <div className="w-full flex flex-wrap md:flex-nowrap gap-4 justify-center items-center px-4">
                      <div className="w-fit h-10 py-2 px-4 border border-blue-400 rounded-xl">
                        <p>Solved : {leetcodeData.solved}</p>
                      </div>
                      <div className="w-full md:w-[60%] h-3 bg-green-50 rounded-xl">
                        <div
                          style={{
                            width: `${(leetcodeData.solved / 3973) * 100}%`,
                          }}
                          className="h-full bg-purple-400 rounded-xl"
                        ></div>
                      </div>
                      3973
                    </div>
                    <div className="w-full flex flex-wrap md:flex-nowrap gap-4 justify-center items-center px-4">
                      <div className="w-fit h-fit py-2 px-4 border border-green-400 rounded-xl">
                        <p>Easy : {leetcodeData.easy}</p>
                      </div>
                      <div className="w-full md:w-[60%] h-3 bg-green-50 rounded-xl">
                        <div
                          style={{
                            width: `${(leetcodeData.easy / 951) * 100}%`,
                          }}
                          className="h-full bg-green-400 rounded-xl"
                        ></div>
                      </div>
                      951
                    </div>
                    <div className="w-full flex flex-wrap md:flex-nowrap gap-4 justify-center items-center px-4">
                      <div className="w-fit h-fit py-2 px-4 border border-yellow-400 rounded-xl">
                        <p>Medium : {leetcodeData.medium}</p>
                      </div>
                      <div className="w-full md:w-[60%] h-3 bg-green-50 rounded-xl">
                        <div
                          style={{
                            width: `${(leetcodeData.medium / 2074) * 100}%`,
                          }}
                          className="h-full bg-yellow-400 rounded-xl"
                        ></div>
                      </div>
                      2074
                    </div>
                    <div className="w-full flex flex-wrap md:flex-nowrap gap-4 justify-center items-center px-4">
                      <div className="w-fit h-fit py-2 px-4 border border-red-400 rounded-xl">
                        <p>Hard : {leetcodeData.hard}</p>
                      </div>
                      <div className="w-full md:w-[60%] h-3 bg-green-50 rounded-xl">
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
                        className="w-fit h-fit px-4 py-2 border border-gray-700 rounded-xl mx-auto block cursor-pointer"
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
              className="w-full h-fit"
            >
              {githubData && codeTab === "github" && (
                <div className="w-full h-fit flex flex-col gap-8">
                  <div className="flex flex-col md:flex-row justify-center items-center h-fit mt-10 gap-6 md:gap-10 px-4">
                    <img
                      className="w-20 h-20 md:w-24 md:h-24 rounded-full md:mr-6"
                      src="https://avatars.githubusercontent.com/u/231910369?v=4"
                    ></img>
                    <div>
                      <p className="text-3xl text-center">Hamsaraj V C</p>
                      <p className="text-sm text-gray-400 text-center ">
                        @ hamsaraj875-del
                      </p>
                    </div>
                    <div className="w-fit h-fit py-2 px-4 border border-blue-400 rounded-xl">
                      <p>Repositories : {githubData.repos}</p>
                    </div>
                    <div className="w-fit h-fit py-2 px-4 border border-blue-400 rounded-xl">
                      <p>Followers : {githubData.followers}</p>
                    </div>
                  </div>
                  <div className="w-full h-fit gap-4 flex justify-center items-center text-gray-400 px-4 md:px-24 text-center">
                    Bio : {githubData.bio}
                  </div>
                  <div className="flex flex-col lg:flex-row justify-evenly gap-10">
                    <div className="w-full lg:w-[50%] text-gray-400 px-4 md:px-16 lg:px-30 h-fit flex-col gap-4 items-center rounded-xl flex">
                      {Object.entries(githubData.language).map(
                        ([language, byte]) => (
                          <div
                            key={language}
                            className="w-full h-4 gap-4 flex justify-start items-center"
                          >
                            <p className="w-20">{language} :</p>
                            <div
                              className="h-4 bg-gradient-to-r from-blue-600 to-purple-600 border border-gray-700 rounded-xl"
                              style={{ width: `${(byte / total) * 100}%` }}
                            ></div>
                            <p>{((byte / total) * 100).toFixed(2)} %</p>
                          </div>
                        ),
                      )}
                    </div>
                    <div className="w-full lg:w-[50%] h-60 overflow-y-auto space-y-3 px-4 md:pr-2 scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-800">
                      {githubData.repoList.map((repo) => (
                        <div
                          key={repo.url}
                          className="flex justify-between items-center p-4 rounded-xl border border-gray-700 hover:border-purple-500 hover:bg-[#132242] transition-all duration-300"
                        >
                          <div>
                            <p className="font-semibold">{repo.name}</p>
                          </div>

                          <a
                            href={repo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1 border border-purple-500 rounded-lg "
                          >
                            View Code
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="w-full h-fit">
                    <a
                      target="_blank"
                      href="https://github.com/hamsaraj875-del"
                      className="w-fit h-fit px-4 py-2 border border-gray-700 rounded-xl mx-auto block cursor-pointer"
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
