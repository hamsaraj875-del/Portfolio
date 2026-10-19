//external modules 
const express = require("express");
const githubRoot = express.Router();


//internal modules 
const githubControl = require("../controller/githubControl");


githubRoot.get("/",githubControl.githubData);
githubRoot.get("/contributions",githubControl.contributionsData);

module.exports = githubRoot;



