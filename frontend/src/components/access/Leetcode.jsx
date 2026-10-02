//external modules

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

//react icons

import { FaTrophy } from "react-icons/fa";
import { FaCode } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { FaRankingStar } from "react-icons/fa6";

//internal modules
import Loader from "./Loader";

const Leetcode = () => {
  const [leetcodeData, setLeetcodeData] = useState("");
const [hoveredLanguage, setHoveredLanguage] = useState(null);
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
        const res = await fetch(`${import.meta.env.VITE_LINK}/leetcode`, {
          signal,
        });
        const res1 = await fetch(`${import.meta.env.VITE_LINK}/github`, {
          signal,
        });
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
  const languageEntries = Object.entries(githubData?.language || {});

    const languageTotal = languageEntries.reduce(
      (sum, [, byte]) => sum + byte,
      0
    );

    const donutRadius = 72;
    const donutCircumference = 2 * Math.PI * donutRadius;

    let donutOffset = 0;

    const donutSegments = languageEntries.map(
      ([language, byte], index) => {
        const percentage = (byte / languageTotal) * 100;

        const segmentLength =
          (percentage / 100) * donutCircumference;

        const gap = Math.min(4, segmentLength * 0.1);

        const visibleLength = Math.max(
          segmentLength - gap,
          0
        );

        const hue = (index * 137.5) % 360;

        const segment = {
          language,
          percentage,
          hue,
          visibleLength,
          offset: donutOffset,
        };

        donutOffset += segmentLength;

        return segment;
      }
    );


  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
      >
        <div className="w-full min-h-screen flex flex-col justify-center items-center mt-20 md:mt-40 px-4 z-10">
          <div className="w-full h-fit flex items-center justify-center mb-10">
            <FaTrophy className="text-yellow-400 mr-4 sm:text-4xl " size={40} />
            <p className="text-3xl md:text-5xl font-bold text-orange-500">
              Coding Profiles
            </p>
          </div>
          <div className="relative w-3/4 md:w-[80%] mx-auto mb-14">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
          </div>
          <div className="w-[96%] flex flex-col h-fit py-12 justify-center items-center bg-[#09152d]/70 mt-12 mx-auto rounded-xl">
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
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false }}
              className="w-full"
            >
              {loader && <Loader />}
              {leetcodeData && codeTab === "leetcode" && (
              <div className="w-full mt-8 px-4 md:px-8">
                <div className="w-full max-w-5xl mx-auto">
                  <div className="relative overflow-hidden rounded-3xl border border-gray-200/10 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 p-6 md:p-8 shadow-xl">

                    <div className="absolute -top-20 -right-20 w-48 h-48 bg-yellow-400/10 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl"></div>

                    <div className="relative">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-2xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
                            <SiLeetcode
                              size={32}
                              className="text-yellow-400"
                            />
                          </div>

                          <div>
                            <p className="text-sm text-gray-400">
                              LeetCode Profile
                            </p>

                            <h2 className="text-xl md:text-2xl font-semibold text-white">
                              Hamsaraj V C
                            </h2>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-red-400/10 border border-red-400/20">
                          <FaRankingStar
                            size={25}
                            className="text-red-400"
                          />
                          <div>
                            <p className="text-xs text-gray-400">
                              Ranking
                            </p>

                            <p className="text-lg font-semibold text-red-400">
                              {leetcodeData.rank}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-8 p-5 rounded-2xl bg-white/5 border border-white/10">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                          <div>
                            <p className="text-sm text-gray-400">
                              Problems Solved
                            </p>

                            <p className="text-3xl font-bold text-white mt-1">
                              {leetcodeData.solved}
                              <span className="text-base font-normal text-gray-500 ml-2">
                                / 3973
                              </span>
                            </p>
                          </div>

                          <div className="text-sm text-gray-400">
                            {((leetcodeData.solved / 3973) * 100).toFixed(1)}%
                          </div>
                        </div>

                        <div className="w-full h-3 mt-4 bg-gray-700/70 rounded-full overflow-hidden">
                          <div
                            style={{
                              width: `${Math.min(
                                (leetcodeData.solved / 3973) * 100,
                                100
                              )}%`,
                            }}
                            className="h-full bg-gradient-to-r from-purple-500 to-purple-300 rounded-full transition-all duration-700"
                          ></div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">

                        {/* Easy */}
                        <div className="group p-5 rounded-2xl bg-green-400/5 border border-green-400/10 hover:border-green-400/30 transition-all duration-300">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm text-gray-400">
                                Easy
                              </p>

                              <p className="text-2xl font-bold text-green-400 mt-1">
                                {leetcodeData.easy}
                              </p>
                            </div>

                            <div className="w-10 h-10 rounded-xl bg-green-400/10 flex items-center justify-center">
                              <span className="text-green-400 font-bold">
                                E
                              </span>
                            </div>
                          </div>

                          <div className="w-full h-2 mt-4 bg-gray-700/70 rounded-full overflow-hidden">
                            <div
                              style={{
                                width: `${Math.min(
                                  (leetcodeData.easy / 951) * 100,
                                  100
                                )}%`,
                              }}
                              className="h-full bg-green-400 rounded-full transition-all duration-700"
                            ></div>
                          </div>

                          <p className="text-xs text-gray-500 mt-2">
                            {((leetcodeData.easy / 951) * 100).toFixed(1)}% of Easy
                          </p>
                        </div>
                        <div className="group p-5 rounded-2xl bg-yellow-400/5 border border-yellow-400/10 hover:border-yellow-400/30 transition-all duration-300">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm text-gray-400">
                                Medium
                              </p>

                              <p className="text-2xl font-bold text-yellow-400 mt-1">
                                {leetcodeData.medium}
                              </p>
                            </div>

                            <div className="w-10 h-10 rounded-xl bg-yellow-400/10 flex items-center justify-center">
                              <span className="text-yellow-400 font-bold">
                                M
                              </span>
                            </div>
                          </div>

                          <div className="w-full h-2 mt-4 bg-gray-700/70 rounded-full overflow-hidden">
                            <div
                              style={{
                                width: `${Math.min(
                                  (leetcodeData.medium / 2074) * 100,
                                  100
                                )}%`,
                              }}
                              className="h-full bg-yellow-400 rounded-full transition-all duration-700"
                            ></div>
                          </div>

                          <p className="text-xs text-gray-500 mt-2">
                            {((leetcodeData.medium / 2074) * 100).toFixed(1)}% of Medium
                          </p>
                        </div>
                        <div className="group p-5 rounded-2xl bg-red-400/5 border border-red-400/10 hover:border-red-400/30 transition-all duration-300">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm text-gray-400">
                                Hard
                              </p>

                              <p className="text-2xl font-bold text-red-400 mt-1">
                                {leetcodeData.hard}
                              </p>
                            </div>

                            <div className="w-10 h-10 rounded-xl bg-red-400/10 flex items-center justify-center">
                              <span className="text-red-400 font-bold">
                                H
                              </span>
                            </div>
                          </div>

                          <div className="w-full h-2 mt-4 bg-gray-700/70 rounded-full overflow-hidden">
                            <div
                              style={{
                                width: `${Math.min(
                                  (leetcodeData.hard / 948) * 100,
                                  100
                                )}%`,
                              }}
                              className="h-full bg-red-400 rounded-full transition-all duration-700"
                            ></div>
                          </div>

                          <p className="text-xs text-gray-500 mt-2">
                            {((leetcodeData.hard / 948) * 100).toFixed(1)}% of Hard
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-center mt-7">
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://leetcode.com/u/HamsarajVC/"
                          className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition-all duration-300 shadow-lg shadow-yellow-400/10"
                        >
                          <SiLeetcode size={20} />

                          <span>
                            View LeetCode Profile
                          </span>

                          <span className="group-hover:translate-x-1 transition-transform">
                            →
                          </span>
                        </a>
                      </div>
                    </div>
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
                  <div className="flex flex-col lg:flex-row justify-evenly gap-8">
                    <div className="w-full lg:w-1/2 flex flex-col items-center">
                      <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-8">
                        <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex-shrink-0">
                          <svg
                            viewBox="0 0 200 200"
                            className="w-full h-full -rotate-90"
                          >
                            <circle
                              cx="100"
                              cy="100"
                              r={donutRadius}
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="20"
                              className="text-gray-800"
                            />
                            {donutSegments.map(
                              ({
                                language,
                                percentage,
                                hue,
                                visibleLength,
                                offset,
                              }) => (
                                <circle
                                  key={language}
                                  cx="100"
                                  cy="100"
                                  r={donutRadius}
                                  fill="none"
                                  stroke={`hsl(${hue}, 75%, 60%)`}
                                  strokeWidth="20"
                                  strokeLinecap="butt"
                                  strokeDasharray={`${visibleLength} ${
                                    donutCircumference - visibleLength
                                  }`}
                                  strokeDashoffset={-offset}
                                  className="cursor-pointer transition-all duration-300"
                                  style={{
                                    opacity:
                                      hoveredLanguage &&
                                      hoveredLanguage !== language
                                        ? 0.25
                                        : 1,
                                    filter:
                                      hoveredLanguage === language
                                        ? `drop-shadow(0 0 8px hsl(${hue}, 75%, 60%))`
                                        : "none",
                                    transform:
                                      hoveredLanguage === language
                                        ? "scale(1.04)"
                                        : "scale(1)",
                                    transformOrigin: "100px 100px",
                                  }}
                                  onMouseEnter={() =>
                                    setHoveredLanguage(language)
                                  }
                                  onMouseLeave={() =>
                                    setHoveredLanguage(null)
                                  }
                                />
                              )
                            )}
                          </svg>
                          <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none">

                            {hoveredLanguage ? (
                              <>
                                <p className="text-lg sm:text-xl font-bold text-white text-center px-2">
                                  {hoveredLanguage}
                                </p>

                                <p className="text-sm text-gray-400">
                                  {
                                    donutSegments.find(
                                      (item) =>
                                        item.language === hoveredLanguage
                                    )?.percentage.toFixed(1)
                                  }%
                                </p>
                              </>
                            ) : (
                              <>
                                <p className="text-3xl sm:text-4xl font-bold text-white">
                                  {languageEntries.length}
                                </p>

                                <p className="text-xs sm:text-sm text-gray-400">
                                  Languages
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="w-full sm:max-w-xs flex flex-col gap-2">

                          {donutSegments.map(
                            ({
                              language,
                              percentage,
                              hue,
                            }) => (

                              <div
                                key={language}
                                onMouseEnter={() =>
                                  setHoveredLanguage(language)
                                }
                                onMouseLeave={() =>
                                  setHoveredLanguage(null)
                                }
                                className="
                                  flex
                                  items-center
                                  justify-between
                                  px-3
                                  py-2
                                  rounded-xl
                                  border
                                  border-gray-700/70
                                  bg-white/[0.03]
                                  hover:bg-white/[0.07]
                                  hover:border-gray-500
                                  transition-all
                                  duration-300
                                  cursor-pointer
                                "
                              >

                                <div className="flex items-center gap-3 min-w-0">

                                  <span
                                    className="w-3 h-3 rounded-full flex-shrink-0"
                                    style={{
                                      backgroundColor:
                                        `hsl(${hue}, 75%, 60%)`,
                                    }}
                                  />

                                  <p className="text-sm text-gray-300 truncate">
                                    {language}
                                  </p>

                                </div>

                                <p className="text-xs sm:text-sm text-gray-400 ml-3">
                                  {percentage.toFixed(1)}%
                                </p>

                              </div>
                            )
                          )}

                        </div>

                      </div>
                    </div>
                    <div className="w-full lg:w-[50%] h-60 overflow-y-auto space-y-3 px-4 md:pr-2 scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-800">
                      {githubData.repoList.map((repo) => (
                        <div
                          key={repo.url}
                          className="flex justify-between items-center p-1 md:p-4  rounded-xl border border-gray-700 hover:border-purple-500 hover:bg-[#132242] transition-all duration-300"
                        >
                          <div>
                            <p className="text-sm  md:text-lg lg:text-lg font-semibold">{repo.name}</p>
                          </div>

                          <a
                            href={repo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="md:px-3 px-2 text-sm py-1 border border-purple-500 rounded-lg "
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
                      className="w-fit h-fit px-4 py-2 border flex justify-center items-center border-gray-700 bg-yellow-400 text-black font-bold rounded-xl mx-auto block cursor-pointer"
                    >
                      View Github Profile
                      <span className="group-hover:translate-x-1 transition-transform">
                            →
                      </span>
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
