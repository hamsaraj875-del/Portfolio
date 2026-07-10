//external modules

const { check, validationResult } = require("express-validator");
const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
const cloudinary = require("../utilities/cloudinary");

//internal modules

const database = require("../models/database");
const projectDatabase = require("../models/project");
const skillDatabase = require("../models/skills");
const leetcodeDatabase = require("../models/leetcode");
const githubDatabase = require("../models/github");

//setting some functions

dotenv.config();
sgMail.setApiKey(process.env.EMAIL_API);

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
    .withMessage("description cannot be empty")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("descirption cannot have the special character or numbers"),

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
          await generateEmail(email);
          return res.status(200).json({
            success: true,
            message:
              "Your message has been received by Hamsaraj and he will contact you soon. Please check your email for confirmation, and if you don’t see it, kindly look in your Spam or Junk folder as well. Thanks for connecting!",
          });
        } catch (err) {
          console.log(err);
          return res.status(200).json({
            success: true,
            message:
              "Your message has been sent to Hamsaraj. He will contact you soon. Thanks for connecting!",
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

const generateEmail = async (email) => {
  try {
    await sgMail.send({
      to: email,
      from: "hamsarajPortfolio@gmail.com",
      subject: "We Received Your Message ✔️",
      html: `
        <div style="background-color:#f4f4f4; padding:20px; font-family:Arial, sans-serif;">
          <div style="max-width:600px; margin:auto; background:#ffffff; padding:25px; border-radius:10px;">

            <h2 style="text-align:center; color:#2c3e50;">
              📩 Thank You for Reaching Out
            </h2>

            <p style="font-size:16px; color:#333;">
              Hello,
            </p>

            <p style="font-size:16px; color:#555;">
              This is a confirmation that your message has been successfully sent to <b>Hamsaraj</b>.
            </p>

            <p style="font-size:16px; color:#555;">
              He will review your message and contact you soon regarding your inquiry from the portfolio.
            </p>

            <div style="text-align:center; margin:20px 0;">
              <span style="display:inline-block; padding:12px 20px; background:#2c3e50; color:#fff; border-radius:6px; font-size:14px;">
                ✔ Message Successfully Delivered
              </span>
            </div>

            <p style="font-size:14px; color:#777;">
              If you did not send this request, you can safely ignore this email.
            </p>

            <hr style="margin:20px 0;">

            <p style="font-size:12px; color:#999; text-align:center;">
              © Hamsaraj Portfolio — All rights reserved
            </p>

          </div>
        </div>
      `,
    });
  } catch (err) {
    throw err;
  }
};




//Display skills 

exports.skills = async(req,res,next)=>{
  try{
    const language = await skillDatabase.find({category:"language"});
    const technology = await skillDatabase.find({category:"technology"});
    const tool = await skillDatabase.find({category:"tool"});
    const data = {language,technology,tool};

    return res.status(200).json({
      success:true,
      message:data,
    })
  }catch(err){
    console.log(err);
    return res.status(500).json({
      success:false,
      message:"Server error please try again later"
    })
  }
}




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

exports.data =async(req,res,next)=>{
  try{
    const project = await projectDatabase.countDocuments();
    const languages = await skillDatabase.countDocuments({category:"language"});
    const technologies = await skillDatabase.countDocuments({category:"technology"});
    const tools = await skillDatabase.countDocuments({category:"tool"});
    const leetcode = await leetcodeDatabase.findOne({cacheType:"leetcode"});
    const solved = leetcode.solved;
    const github = await githubDatabase.findOne({cacheType:"github"});
    const repositories = github.repos;
    
    data = {project,languages,technologies,tools,leetcode,solved,github,repositories}

    return res.status(200).json({
      success:true,
      message:data
    })

  }catch(err){
    console.log(err);
    return res.status(500).json({
      success:false,
      message:"Server is not responding Please try again later"
    })
  }
}
exports.add = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "No image received."
        });
      }

      const projectImg = await cloudinary.uploader.upload(req.file.path);
      const {projectName,projectDescription,projectLink,projectCode} = req.body;
      const details = new projectDatabase({projectName, projectDescription, projectImg: projectImg.secure_url, projectLive: projectLink,projectCode });
      await details.save();
      return res.status(200).json({
        success: true,
        message: "Project uploaded successfully."
      });

    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Server error."
      });
    }
};



//notification shower
exports.notification=async(req,res,next)=>{
  try{
    const notification = await database.find();
    return res.status(200).json({
      success:true,
      message:notification,
    })
  }
  catch(err){
    console.log(err);
    return res.status(500).json({
      success:false,
      message:"server error try again"
    })
  }
}


//logout from the admin 

exports.logout=(req,res,next)=>{
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
}



//web health detector

exports.health=(req,res,next)=>{
  return res.status(200).json({
    status:ok,
  })
}