//external modules

const { check, validationResult } = require("express-validator");

//internal modules

const database = require("../models/database");

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
        console.log("saved successfully");
        return res.status(200).json({
          success: true,
          message: "hamsaraj will contact you soon",
        });
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
