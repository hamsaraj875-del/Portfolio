//external modules 

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");


//internal modules

const controller = require("../controller/control")
const app = express();
const githubRoot = require("./githubRoot");


//Using Routes
dotenv.config();
app.use(express.json());
app.use(cors());



//Using Routers
app.use("/github",githubRoot);



//routers handling

app.post("/connecter",controller.userInput);
app.get("/leetcode",controller.leetcodeData);

mongoose.connect(process.env.DB).then(()=>{
  console.log("database is connected successfully");

  app.listen(3000,()=>{
    console.log(`Server is running http://localhost:${3000}`);
  });

})