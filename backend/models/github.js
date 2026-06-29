const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  cacheType:{type:String,required:true,default:"github"},
  date:{type:Date,required:true},
  name:{type:String,required:true},
  userName:{type:String,required:true},
  bio:{type:String,required:true},
  repos:{type:Number,required:true},
  language:{type:Object,required:true},
  repoList:{type:Array,required:true},
  followers:{type:Number,required:true},
  following:{type:Number,required:true},
});

module.exports = mongoose.model("githubDatas",Schema);