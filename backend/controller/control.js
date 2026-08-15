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
sgMail.setApiKey(process.env.EMAIL_API);
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
          await generateEmail(email);
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

const generateEmail = async (email) => {
  try {
    const msg = {
      to: email,
      from: process.env.EMAIL, // must be a verified sender in SendGrid
      subject: "🎉 Message Received Successfully",
      html: `
      <!DOCTYPE html>
      <html>
      <head><meta charset="UTF-8"></head>
      <body style="margin:0;padding:0;background:#eef2ff;font-family:Arial,Helvetica,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0"
                style="background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.12);">
                <tr>
                  <td style="background:linear-gradient(135deg,#4f46e5,#7c3aed);padding:35px;text-align:center;color:white;">
                    <h1 style="margin:0;font-size:32px;">🚀 Hamsaraj Portfolio</h1>
                    <p style="margin-top:12px;font-size:16px;opacity:.9;">Your message has been received successfully</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:40px;">
                    <h2 style="margin-top:0;color:#1f2937;">Hello 👋</h2>
                    <p style="font-size:16px;color:#4b5563;line-height:1.8;">Thank you for contacting me through my portfolio website.</p>
                    <p style="font-size:16px;color:#4b5563;line-height:1.8;">I have successfully received your message and I'll review it as soon as possible.</p>
                  </td>
                </tr>
                <tr>
                  <td style="background:#111827;color:#d1d5db;padding:25px;text-align:center;">
                    <p style="margin:0;font-size:15px;">Thank you for visiting my portfolio ❤️</p>
                    <p style="margin-top:8px;font-size:13px;color:#9ca3af;">© ${new Date().getFullYear()} Hamsaraj Portfolio</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
      `,
    };

    const response = await sgMail.send(msg);
    console.log("Confirmation email sent.");
    return response;
  } catch (err) {
    console.error(err.response ? err.response.body : err);
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
