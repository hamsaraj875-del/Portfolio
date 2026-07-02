//external modules

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

//internal modules

const controller = require("../controller/control");
const app = express();
const githubRoot = require("./githubRoot");
const leetcodeRoot = require("./leetcodeRoot");


//Creating rate limiter
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10,
  message: {
    error: "Too many requests, please try again later."
  }
});

//Using Routes
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(limiter);

//Using Routers
app.use("/github", githubRoot);
app.use("/leetcode", leetcodeRoot);

//routers handling

app.post("/connecter", controller.userInput);

mongoose.connect(process.env.DB).then(() => {
  console.log("database is connected successfully");

  app.listen(3000, () => {
    console.log(`Server is running http://localhost:${3000}`);
  });
});
