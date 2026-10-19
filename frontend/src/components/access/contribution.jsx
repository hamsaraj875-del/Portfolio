import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  FaGithub,
  FaExternalLinkAlt,
  FaRegCalendarAlt,
  FaCode,
} from "react-icons/fa";
import { FaCodePullRequest } from "react-icons/fa6";

import Loader from "./Loader";

const getHue = (text) => {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % 360;
};

const formatDate = (value) => {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const Contributions = () => {
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchContributions = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${import.meta.env.VITE_LINK}/github/contributions`,
          {
            signal: controller.signal,
          }
        );
        const data = await res.json();
        setContributions(Array.isArray(data.message) ? data.message : []);
        setError(false);
        setLoading(false);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
          setError(true);
          setLoading(false);
        }
      }
    };

    fetchContributions();

    return () => {
      controller.abort();
    };
  }, []);

  const projectCount = new Set(contributions.map((item) => item.name)).size;
  const languageCount = new Set(
    contributions.flatMap((item) => item.languages || [])
  ).size;

  if (error) {
    return (
      <div className="w-full mt-20 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-5xl mx-auto rounded-3xl border border-red-400/20 bg-red-400/5 py-12 px-6 text-center">
          <p className="text-lg font-semibold text-red-400">
            Could not load contributions
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Refresh the page to try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mt-30 px-4 sm:px-6 lg:px-8">
      <div className="w-full h-fit flex items-center justify-center mb-10">
        <FaCodePullRequest
          className="text-yellow-400 mr-4 sm:text-4xl"
          size={40}
        />
        <p className="text-3xl md:text-5xl font-bold text-orange-500">
          Contributions
        </p>
      </div>
      <div className="relative w-3/4 md:w-[80%] mx-auto mb-14">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
      </div>

      {loading && <Loader />}
      {!loading && <div className="w-full max-w-6xl mx-auto">
        <div className="relative isolate overflow-hidden rounded-3xl border border-white/[0.09] bg-slate-950/90 p-5 sm:p-7 md:p-9 shadow-[0_24px_80px_-30px_rgba(0,0,0,0.8)] backdrop-blur-xl">
          <div className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full bg-violet-500/15 blur-3xl"></div>
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl"></div>
          
          <div className="relative">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-400/10 shadow-inner shadow-violet-300/5">
                  <FaCodePullRequest size={28} className="text-purple-400" />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Open Source</p>

                  <h2 className="mt-1 text-xl font-bold tracking-tight text-white sm:text-2xl">
                    Contributions
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 transition-colors hover:border-violet-400/30 hover:bg-violet-400/[0.06]">
                <FaGithub size={25} className="text-purple-400" />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Profile</p>

                  <p className="text-sm font-bold text-violet-300 sm:text-base">
                    hamsaraj875-del
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
              <div className="group rounded-2xl border border-violet-400/15 bg-gradient-to-br from-violet-400/[0.09] to-white/[0.02] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-300/35 hover:shadow-lg hover:shadow-violet-950/20">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Pull Requests</p>

                    <p className="mt-2 text-3xl font-extrabold tracking-tight text-violet-300">
                      {contributions.length}
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-300/10 bg-violet-300/10 transition-transform duration-300 group-hover:scale-110">
                    <FaCodePullRequest className="text-purple-400" />
                  </div>
                </div>
              </div>

              <div className="group rounded-2xl border border-emerald-400/15 bg-gradient-to-br from-emerald-400/[0.08] to-white/[0.02] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-300/35 hover:shadow-lg hover:shadow-emerald-950/20">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Projects</p>

                    <p className="mt-2 text-3xl font-extrabold tracking-tight text-emerald-300">
                      {projectCount}
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-300/10 bg-emerald-300/10 transition-transform duration-300 group-hover:scale-110">
                    <FaGithub className="text-green-400" />
                  </div>
                </div>
              </div>

              <div className="group rounded-2xl border border-amber-400/15 bg-gradient-to-br from-amber-400/[0.08] to-white/[0.02] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-300/35 hover:shadow-lg hover:shadow-amber-950/20">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Languages</p>

                    <p className="mt-2 text-3xl font-extrabold tracking-tight text-amber-300">
                      {languageCount}
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-amber-300/10 bg-amber-300/10 transition-transform duration-300 group-hover:scale-110">
                    <FaCode className="text-yellow-400" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 max-h-[32rem] space-y-3 overflow-y-auto pr-1 sm:pr-2 scrollbar-thin scrollbar-thumb-violet-500/70 scrollbar-track-slate-900">
              {contributions.length === 0 && (
                <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.025] px-5 py-12 text-center sm:px-10">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-purple-400/10 border border-purple-400/20 flex items-center justify-center">
                    <FaCodePullRequest size={24} className="text-purple-400" />
                  </div>
                  <p className="text-lg font-semibold text-white">
                    No contributions yet
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    Pull requests to other projects will appear here.
                  </p>
                </div>
              )}

              {contributions.map((item, index) => {
                const [owner, repo] = (item.name || "").split("/");
                const isOpen = expanded === index;
                const isLong = (item.details || "").length > 140;

                return (
                  <motion.div
                    key={`${item.name}-${index}`}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="group rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4 transition-all duration-300 hover:border-violet-400/35 hover:bg-slate-900/90 hover:shadow-xl hover:shadow-black/20 sm:p-5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="min-w-0 truncate text-sm text-slate-400">
                        {owner}
                        <span className="px-1 text-slate-600"> / </span>
                        <span className="font-semibold text-slate-200 transition-colors group-hover:text-white">
                          {repo}
                        </span>
                      </p>

                      <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-black/20 px-3 py-1.5 text-xs text-slate-400">
                        <FaRegCalendarAlt size={12} />
                        <span>{formatDate(item.date)}</span>
                      </div>
                    </div>

                    <h3 className="mt-4 text-base font-semibold leading-snug text-white transition-colors group-hover:text-violet-100 sm:text-lg">
                      {item.title}
                    </h3>

                    <p
                      className={`text-sm leading-relaxed mt-2 ${
                        item.details
                          ? "text-gray-400"
                          : "text-gray-600 italic"
                      } ${isOpen ? "" : "line-clamp-2"}`}
                    >
                      {item.details || "No description provided."}
                    </p>

                    {isLong && (
                      <button
                        onClick={() => setExpanded(isOpen ? null : index)}
                        className="mt-2 inline-flex cursor-pointer items-center gap-1 text-xs font-semibold text-violet-300 transition-colors hover:text-violet-200"
                      >
                        {isOpen ? "Show less" : "Read more"}
                      </button>
                    )}

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-4">
                      <div className="flex flex-wrap gap-2">
                        {(item.languages || []).slice(0, 5).map((language) => {
                          const hue = getHue(language);
                          return (
                            <span
                              key={language}
                              className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-1.5 text-xs font-medium text-slate-300"
                            >
                              <span
                                className="w-2 h-2 rounded-full"
                                style={{
                                  backgroundColor: `hsl(${hue}, 75%, 60%)`,
                                }}
                              />
                              {language}
                            </span>
                          );
                        })}
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        {typeof item.merged === "boolean" && (
                          <span
                            className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold sm:text-sm ${
                              item.merged
                                ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-300"
                                : "border-amber-400/25 bg-amber-400/10 text-amber-300"
                            }`}
                            title={
                              item.merged
                                ? "GitHub confirms this pull request was merged"
                                : "GitHub confirms this pull request was not merged"
                            }
                          >
                            <span
                              className={`h-2 w-2 rounded-full ${
                                item.merged ? "bg-emerald-400" : "bg-amber-400"
                              }`}
                            />
                            {item.merged ? "Merged" : "Not Merged"}
                          </span>
                        )}

                        {(item.url || item.html_url) && (
                          <a
                            href={item.url || item.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-xl border border-violet-400/25 bg-violet-400/[0.06] px-3 py-2 text-xs font-semibold text-violet-200 transition-all duration-300 hover:border-violet-300/50 hover:bg-violet-400/15 sm:text-sm"
                          >
                            Verify Pull Request
                            <FaExternalLinkAlt size={11} />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-8 flex justify-center border-t border-white/[0.07] pt-7">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/hamsaraj875-del"
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-300 to-yellow-400 px-6 py-3.5 font-bold text-slate-950 shadow-lg shadow-amber-400/10 transition-all duration-300 hover:-translate-y-0.5 hover:from-amber-200 hover:to-yellow-300 hover:shadow-amber-400/20"
              >
                <FaGithub size={20} />

                <span>View Github Profile</span>

                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    } 
    </div>
  );
};

export default Contributions;