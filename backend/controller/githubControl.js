//external modules
const dotenv = require("dotenv");

//internal modules
const githubDatabase = require("../models/github");
const projectDatabase = require("../models/project");
const contributionDatabase = require("../models/contributions");
dotenv.config();

//reposdata handling

const github = async () => {
  let list = [];
  let languagePerc = {};
  try {
    const res = await fetch(
      "https://api.github.com/users/hamsaraj875-del/repos?per_page=100",
      {
        headers: { Authorization: `Bearer ${process.env.GIT_API}` },
      },
    );
    const res1 = await fetch("https://api.github.com/users/hamsaraj875-del", {
      headers: { Authorization: `Bearer ${process.env.GIT_API}` },
    });
    const information = await res1.json();
    const repositories = await res.json();
    const name = information.name;
    const userName = information.login;
    const bio = information.bio;
    const followers = information.followers;
    const following = information.following;

    const ownRepositories = repositories.filter(
      (rep) => !rep.fork && rep.name != "chandra"
    );
    const repos = ownRepositories.length;

    for (const rep of ownRepositories) {
      const language = await fetch(rep.languages_url, {
        headers: { Authorization: `Bearer ${process.env.GIT_API}` },
      });
      const languageData = await language.json();

      for (const [language, byte] of Object.entries(languageData)) {
        languagePerc[language] = (languagePerc[language] || 0) + byte;
      }
      list.push({ name: rep.name, url: rep.html_url });
    }

    const data = await githubDatabase.findOneAndUpdate(
      { cacheType: "github" },
      {
        cacheType: "github",
        date: new Date(),
        name: name,
        userName: userName,
        bio: bio,
        repos: repos,
        language: languagePerc,
        repoList: list,
        followers: followers,
        following: following,
      },
      {
        upsert: true,
        new: true,
      },
    );
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};


//exporting github data

exports.githubData = async (req, res, next) => {
  try {
    let data = await githubDatabase.findOne({ cacheType: "github" });
    let day = 24 * 60 * 60 * 1000;

    if (!data) {
      data = await github();

      return res.status(200).json({
        success: true,
        message: data,
      });
    }

    if (data.date.getTime() + day < Date.now()) {
      try {
        data = await github();
      } catch (err) {
        console.log(err);
      }
    }
    return res.status(200).json({
      success: true,
      message: data,
    });
  } catch (err) {
    return res.status(500).json({
      sucess: false,
      message: "Server error try again later",
    });
  }
};


//text cleaner

const cleanList = (list) => {
  const clean = (text) => {
    if (!text) return "";

    const cut = text.search(
      /^#{1,6}\s*(verification|how i tested|testing|note)/im
    );
    const body = cut > 0 ? text.slice(0, cut) : text;

    const sentence = body
      .replace(/\r/g, "")
      .split("\n")
      .map((line) => line.trim())
      .filter(
        (line) =>
          line &&
          !/^#{1,6}\s/.test(line) &&
          !/^(closes|fixes|resolves)\s+#\d+/i.test(line) &&
          !/^agent-assisted/i.test(line)
      )
      .map((line) => line.replace(/^[-*]\s+/, "").replace(/[`*]/g, ""))
      .map((line) => line.replace(/\.$/, ""))
      .join(". ");

    if (!sentence) return "";
    return sentence.length > 220
      ? sentence.slice(0, 220).trim() + "..."
      : sentence + ".";
  };

  return list.map((item) => ({
    ...item,
    details: clean(item.details),
  }));
};



exports.contributionsData = async (req, res, next) => {
  try {
    const CACHE_DURATION = 24 * 60 * 60 * 1000;

    let cachedData = await contributionDatabase.findOne({acheType: "contributions",});

    if (cachedData && Date.now() - cachedData.date.getTime() < CACHE_DURATION) {
      return res.status(200).json({
        success: true,
        source: "database",
        message: cachedData.contributions,
        lastUpdated: cachedData.date,
      });
    }

    const owner = "hamsaraj875-del";
    const headers = {Authorization: `Bearer ${process.env.GIT_API}`,Accept: "application/vnd.github+json",};

    const query = encodeURIComponent(`author:${owner} type:pr -user:${owner}`)
    const response = await fetch( `https://api.github.com/search/issues?q=${query}&per_page=30`, { headers });
    if (!response.ok) {
      if (cachedData) {
        return res.status(200).json({
          success: true,
          source: "stale-database",
          message: cachedData.contributions,
          lastUpdated: cachedData.date,
        });
      }
      return res.status(response.status).json({
        success: false,
        message: "GitHub request failed",
      });
    }
    const data = await response.json();
    const list = [];
    for (const pr of data.items) {
      const name = pr.repository_url.replace(
        "https://api.github.com/repos/",
        ""
      );
      const [langRes, prRes] = await Promise.all([
        fetch(
          `https://api.github.com/repos/${name}/languages`,
          { headers }
        ),
        fetch(
          `https://api.github.com/repos/${name}/pulls/${pr.number}`,
          { headers }
        ),
      ]);
      const langData = langRes.ok? await langRes.json() : {};

      const prData = prRes.ok ? await prRes.json() : null;

      list.push({
        name,
        title: pr.title,
        details: pr.body || "",
        date: prData?.merged_at || pr.created_at,
        languages: Object.keys(langData),
        number: pr.number,
        url: pr.html_url,
        merged: prData
          ? Boolean(prData.merged_at)
          : null,
      });
    }
    const contributions = cleanList(list);
    const savedData =
      await contributionDatabase.findOneAndUpdate(
        { cacheType: "contributions" },
        {
          $set: {
            cacheType: "contributions",
            date: new Date(),
            contributions,
          },
        },
        {
          upsert: true,
          new: true,
          runValidators: true,
        }
      );
    return res.status(200).json({
      success: true,
      source: "github",
      message: savedData.contributions,
      lastUpdated: savedData.date,
    });
  } catch (err) {
    console.error(err);
    try {
      const cachedData = await contributionDatabase.findOne({
        cacheType: "contributions",
      });
      if (cachedData) {
        return res.status(200).json({
          success: true,
          source: "stale-database",
          message: cachedData.contributions,
          lastUpdated: cachedData.date,
        });
      }
    } catch (dbError) {
      console.error(dbError);
    }
    return res.status(500).json({
      success: false,
      message: "Server error. Try again later.",
    });
  }
};
