//external modules

const { check, validationResult } = require("express-validator");
const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");



//internal modules

const database = require("../models/database");


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
        try{
          await generateEmail(email);
          return res.status(200).json({
            success: true,
            message: "Your message has been received by Hamsaraj and he will contact you soon. Please check your email for confirmation, and if you don’t see it, kindly look in your Spam or Junk folder as well. Thanks for connecting!",
          });
        }
        catch(err){
          console.log(err);
          return res.status(200).json({
            success:true,
            message:"Your message has been sent to Hamsaraj. He will contact you soon. Thanks for connecting!"
          })
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
      `
    });
  } catch (err) {
    throw err;
  }
};