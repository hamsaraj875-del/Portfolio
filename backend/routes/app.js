//external modules

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const multer = require("multer");
const cloudinary = require("cloudinary");

//internal modules

const controller = require("../controller/control");
const app = express();
const githubRoot = require("./githubRoot");
const leetcodeRoot = require("./leetcodeRoot");


dotenv.config();


//Creating rate limiter
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
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
app.set("trust proxy", 1);

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
      sameSite: "none",
      secure: true,
    },
  })
);


//file adder multer

const fileFilter=(req,file,cb)=>{
  if(['image/jpg','image/png'].includes(file.mimetype)){
    cb(null,true);
  }else{
    cb(null,false);
  }
}

const storage = multer.diskStorage({});



//Admin Logged in Verification
const loginVerify = (req, res, next) => {
  if (req.session.isLoggedIn) {
    next();
  } else {
    console.log("unauthorized !")
    return res.status(401).json({
      success: false,
      message: "Unauthorized. Please login first.",
    });
  }
};

 

//Using Routes
app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "https://portfolio-frontend-vjld.onrender.com",
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


app.use(multer({storage,fileFilter}).single("projectImg"));

//Using Routers
app.use("/github", githubRoot);
app.use("/leetcode", leetcodeRoot);

//routers handling
//Ouput values
app.post("/connecter",limiter, controller.userInput);
app.get("/skills",limiter,controller.skills);
app.get("/project",limiter,controller.project);
app.post("/verification",limiter,controller.verify);
app.post("/adminVerify",limiter,loginVerify,controller.adminVerify);
app.post("/data",limiter,loginVerify,controller.data);
app.post("/notification",limiter,loginVerify,controller.notification);
app.post("/delete",limiter,loginVerify,controller.deleteNotification);
app.post("/logout",limiter,loginVerify,controller.logout);


//input values
app.post("/add",loginVerify,limiter,controller.add);

//web health detector

app.post("/health",loginVerify,controller.health);

mongoose.connect(process.env.DB).then(() => {
  console.log("database is connected successfully");

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
