const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  projectName:{type:String,required:true},
  projectDescription:{type:String,required:true},
  projectImg:{type:String,required:true},
  projectLive:{type:String,required:true},
  projectCode:{type:String,required:true}
});

module.exports = mongoose.model("projects",Schema);