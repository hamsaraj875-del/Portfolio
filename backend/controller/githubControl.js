//external modules
const dotenv = require("dotenv");

//internal modules
const githubDatabase = require("../models/database");
dotenv.config();



//reposdata handling 

const github = async()=>{
  let list = [];
  let languagePerc = {};
  try{
    const res = await fetch("https://api.github.com/users/hamsaraj875-del/repos",{
      headers: {Authorization:`Bearer ${process.env.GIT_API}`}
    });
    const res1 = await fetch("https://api.github.com/users/hamsaraj875-del/",{
      headers: {Authorization:`Bearer ${process.env.GIT_API}`}
    });
    const repositories = await res.json();
    const information = await res1.json();
    console.log(information);
    const name = repositories.name;
    const userName = information.login;
    const bio = information.bio;
    const repos = information.repos;
    const followers = information.followers;
    const following = information.following;

    for(const rep of repositories){
    const language = await fetch(rep.languages_url);
    const languageData = await language.json();

      for(const [language,byte] of Object.entries(languageData)){
          languagePerc[language] = (languagePerc[language] || 0) + byte;
        }
      const name = rep.name;
      const url = rep.html_url;
      list.push({"name":rep.name,"url":url});
    }
    
    await githubDatabase.findOneAndUpdate({ cacheType: "github" },{
      cacheType: "github",
      date: new Date(),
      name:name,
      userName:userName,
      bio:bio,
      repos:repos,
      language: languagePerc,
      repoList: list,
      followers:followers,
      following:following,
    },
    {
      upsert: true,
      new: true,
    });

    return {list,languagePerc,name,userName,repos,followers,following,list,language};
  }
  catch(err){
    console.log(err);
    throw err;
  }
}




//exporting github data

exports.githubData =async (req,res,next)=>{
  try{
    let data = await githubDatabase.findOne({cacheType:"github"});
    let day = 24*60*60*1000;

    console.log(data);

    if(!data){
      data = await github();
    }

    if(data.date.getTime() + day<Date.now()){
      try{
        data = await github();
        return res.status(200).json({
          success:true,
          message:data
        })
      }
      catch(err){
        return res.status(200).json({
          success:true,
          message:data,
        })
      }
    }else{
      return res.status(200).json({
        success:true,
        message:data
      })
    }
  }
  catch(err){
    return res.status(500).json({
      sucess:false,
      message:"Server error try again later"
    })
  }
  
}