const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  cacheType:{type:String,required:true,default:"leetcode"},
  date:{type:Date,required:true},
  rank:{type:Number,required:true},
  solved:{type:Number,required:true},
  hard:{type:Number,required:true},
  medium:{type:Number,required:true},
  easy:{type:Number,required:true}
});

module.exports = mongoose.model("leetcodes",Schema);