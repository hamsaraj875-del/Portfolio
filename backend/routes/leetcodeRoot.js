//external modules
const express = require("express");

//internal modules 
const leetcodeControl = require("../controller/leetcodeControl");


const leetcodeRoot = express.Router();

//routers handling

leetcodeRoot.get("/",leetcodeControl.leetcodeData);



//exporting leetcode router
module.exports = leetcodeRoot;