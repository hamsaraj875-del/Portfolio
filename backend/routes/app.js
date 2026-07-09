//external modules

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

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



//session handler
const store = new MongoDBStore({
  uri:process.env.DB,
  collection:'session',
  expires:1000*60*60,
});

app.use(session({
  secret:process.env.SECRET_KEY,
  saveUninitialized:false,
  store:store,
  resave:false,
  cookie:{
    httpOnly:true,
    maxAge:1000*60*60
  }
}));


//Admin Logged in Verification
const loginVerify = (req, res, next) => {
  if (req.session.isLoggedIn) {
    next();
  } else {
    return res.status(401).json({
      success: false,
      message: "Unauthorized. Please login first.",
    });
  }
};

 

//Using Routes
dotenv.config();
app.use(express.json());
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}));

//Using Routers
app.use("/github", githubRoot);
app.use("/leetcode", leetcodeRoot);

//routers handling
//Ouput values
app.post("/connecter", controller.userInput);
app.get("/skills",controller.skills);
app.get("/project",controller.project);
app.post("/verification",controller.verify);
app.post("/adminVerify",loginVerify,controller.adminVerify);
app.post("/data",loginVerify,controller.data);
app.post("/logout",loginVerify,controller.logout);


//input values
app.post("/add",loginVerify,controller.add);

//web health detector

app.post("/health",loginVerify,controller.health);

mongoose.connect(process.env.DB).then(() => {
  console.log("database is connected successfully");

  app.listen(3000, () => {
    console.log(`Server is running http://localhost:${3000}`);
  });
});
