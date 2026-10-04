//external modules

const { check, validationResult } = require("express-validator");
const dotenv = require("dotenv");
const cloudinary = require("../utilities/cloudinary");
const emailjs = require("@emailjs/nodejs");

//internal modules

const database = require("../models/database");
const projectDatabase = require("../models/project");
const skillDatabase = require("../models/skills");
const leetcodeDatabase = require("../models/leetcode");
const githubDatabase = require("../models/github");

//setting some functions
dotenv.config();

//user input validation

exports.userInput = [
  check("name")
    .notEmpty()
    .withMessage("Name should contain atleast 2 characters")
    .isLength({ min: 2 })
    .withMessage("Name should contain atleast 2 characters")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Name cannot contain special characters or numbers"),

  check("email")
    .isEmail()
    .withMessage("Enter valid email")
    .notEmpty()
    .withMessage("email cannot be empty"),

  check("subject")
    .notEmpty()
    .withMessage("Subject cannot be empty")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Subject cannot have the special character or numbers"),

  check("description")
    .notEmpty()
    .withMessage("description cannot be empty"),

  async (req, res, next) => {
    const { name, email, subject, description } = req.body;
    const errors = validationResult(req).array();

    let formatedError = {
      name: null,
      email: null,
      subject: null,
      description: null,
    };
    if (errors.length != 0) {
      errors.forEach((error) => {
        if (!formatedError[error.path]) {
          formatedError[error.path] = error.msg;
        }
      });
      return res.status(400).json({
        success: false,
        message: formatedError,
      });
    } else {
      try {
        const data = new database({ name, email, subject, description });
        await data.save();
        try {
          await generateEmail({name,email,subject});
          return res.status(200).json({
            success: true,
            message:
              "💜 Thanks for connecting! Your message has been delivered. 📧 A confirmation email is on its way—don't forget to check your Spam/Junk folder too."
          });
        } catch (err) {
          console.log(err);
          return res.status(200).json({
            success: true,
            message:
              "✅ Your message has been sent to Hamsaraj. 💜 He'll get back to you soon. Thanks for connecting!"
          });
        }
      } catch (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          serverError: true,
          message:
            "Server is not responding please try to connect with email or phone ,otherwise try again later",
        });
      }
    }
  },
];


//email generator

const generateEmail = async ({ name, email, subject }) => {
  try {
    const templateParams = {
      name: name,
      email: email,
      title: subject,
    };

    const response = await emailjs.send(
      process.env.EMAIL_SERVICE_ID,
      process.env.EMAIL_TEMPLATE_ID,
      templateParams,
      {
        publicKey: process.env.EMAIL_PUBLIC_KEY,
        privateKey: process.env.EMAIL_PRIVATE_KEY,
      }
    );

    console.log("Confirmation email sent through EmailJS.");
    return response;
  } catch (err) {
    console.error("EmailJS error:", err);
    throw err;
  }
};
//Display skills

exports.skills = async (req, res, next) => {
  try {
    const language = await skillDatabase.find({ category: "language" });
    const technology = await skillDatabase.find({ category: "technology" });
    const tool = await skillDatabase.find({ category: "tool" });
    const data = { language, technology, tool };

    return res.status(200).json({
      success: true,
      message: data,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Server error please try again later",
    });
  }
};

//handling project roots

exports.project = async (req, res, next) => {
  try {
    const data = await projectDatabase.find();
    return res.status(200).json({
      success: true,
      message: data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error please try again",
    });
  }
};

//password verification
exports.verify = async (req, res, next) => {
  const { password, passkey } = req.body;
  if (password === process.env.PASSWORD && passkey === process.env.PASS_KEY) {
    req.session.isLoggedIn = true;
    await req.session.save();
    return res.status(200).json({
      success: true,
      message: "You successfully logged in",
    });
  } else {
    console.log("wrong password or passkee");
    req.session.isLoggedIn = false;
    await req.session.save();
    return res.status(401).json({
      success: false,
      message: "Invalid Password or passkey ",
    });
  }
};

//admin verification

exports.adminVerify = (req, res, next) => {
  if (req.session.isLoggedIn) {
    return res.status(200).json({
      success: true,
      message: "User logged in",
    });
  } else {
    return res.status(404).json({
      success: false,
      message: "Unauthorized. ",
    });
  }
};

//sharing data for the dashboard

exports.data = async (req, res, next) => {
  try {
    const project = await projectDatabase.countDocuments();
    const languages = await skillDatabase.countDocuments({
      category: "language",
    });
    const technologies = await skillDatabase.countDocuments({
      category: "technology",
    });
    const tools = await skillDatabase.countDocuments({ category: "tool" });
    const leetcode = await leetcodeDatabase.findOne({ cacheType: "leetcode" });
    const solved = leetcode.solved;
    const github = await githubDatabase.findOne({ cacheType: "github" });
    const repositories = github.repos;

    data = {
      project,
      languages,
      technologies,
      tools,
      leetcode,
      solved,
      github,
      repositories,
    };

    return res.status(200).json({
      success: true,
      message: data,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Server is not responding Please try again later",
    });
  }
};
exports.add = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image received.",
      });
    }

    const projectImg = await cloudinary.uploader.upload(req.file.path);
    const { projectName, projectDescription, projectLink, projectCode } =
      req.body;
    const details = new projectDatabase({
      projectName,
      projectDescription,
      projectImg: projectImg.secure_url,
      projectLive: projectLink,
      projectCode,
    });
    await details.save();
    return res.status(200).json({
      success: true,
      message: "Project uploaded successfully.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

//notification shower
exports.notification = async (req, res, next) => {
  try {
    const notification = await database.find();
    return res.status(200).json({
      success: true,
      message: notification,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "server error try again",
    });
  }
};

//deleting notification

exports.deleteNotification = async(req, res, next) => {
 const {id} = req.body;
  try{
    await database.findByIdAndDelete(id);
    console.log("deleted");
    return res.status(200).json({
      success:true,
      message:"Deleted successfully"
    })
}
  catch(err){
    console.log(err);
    return res.status(500).json({
      success:false,
      message:"Server error "
    })
  }
};

//logout from the admin

exports.logout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Logout failed",
      });
    }

    res.clearCookie("connect.sid");

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  });
};

//web health detector

exports.health = (req, res, next) => {
  return res.status(200).json({
    status: ok,
  });
};
