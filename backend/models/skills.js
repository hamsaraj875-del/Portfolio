const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  tag:{type:String,required:true},
  name:{type:String,required:true},
  category:{type:String,required:true},
});

module.exports = mongoose.model("skills",Schema);