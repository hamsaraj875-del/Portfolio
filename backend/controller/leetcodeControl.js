//external modules 



//internal modules 

const leetcodeDatabase = require("../models/leetcode");





//leetcode data fetcher function

const leetcode = async (req, res) => {
  try {
    const query = `
    query userProfile($username: String!) {
      matchedUser(username: $username) {
        username
        profile {
          ranking
          realName
        }
        submitStats {
          acSubmissionNum {
            difficulty
            count
          }
        }
      }
    }
    `;
    const response = await fetch("https://leetcode.com/graphql",{
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          query,
          variables: {
              username: "HamsarajVC"
          }
      })
    });
    const data = await response.json();
    const rank = data.data.matchedUser.profile.ranking;
    const solved = data.data.matchedUser.submitStats.acSubmissionNum[0].count;
    const easy = data.data.matchedUser.submitStats.acSubmissionNum[1].count;
    const medium = data.data.matchedUser.submitStats.acSubmissionNum[2].count;
    const hard = data.data.matchedUser.submitStats.acSubmissionNum[3].count;
    const date = new Date();

    await leetcodeDatabase.findOneAndUpdate({cacheType:"leetcode"},{
      cacheType:"leetcode",
      date:new Date(),
      rank:rank,
      solved:solved,
      hard:hard,
      medium:medium,
      easy:easy,
    },{
      upsert: true,
      returnDocument: "after",
    });
    return {date,rank,solved,hard,medium,easy}

  } catch (err) {
    console.error(err);
    throw err;
  }
};



//exporting leetcode data

exports.leetcodeData = async(req,res,next)=>{
  try{
    let day = 24*60*60*1000;
    let data = await leetcodeDatabase.findOne({cacheType:"leetcode"});
    if(!data){
      data = await leetcode();
    }
    if(data.date.getTime() + day<Date.now()){
      try{
        data = await leetcode();
        return res.status(200).json({
          success:true,
          message:data
        })
      }
      catch(err){
        return res.status(200).json({
          success:true,
          message:data
        })
      }
    }
    return res.status(200).json({
      success:true,
      message:data
    });
  }
  catch(err){
    return res.status(500).json({
      success:false,
      message:"Server error unabled to fetch"
    })
  }
}


