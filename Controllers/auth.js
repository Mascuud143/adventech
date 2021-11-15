const User = require("../Models/user.Model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

module.exports.protect = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      status: "fail",
      error: {
        message: "Please sign in!",
      },
    });
  }

  //verify token
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    console.log(decoded);

    if (!decoded) {
      return res.status(200).json({
        status: "fail",
        error: {
          message: "Token invalid",
        },
      });
    }
  } catch (err) {
    console.log(err);
  }

  next();
};

module.exports.login = async (req, res) => {
  const { username, password } = req.body;

  //check for user input
  if ((!username, !password)) {
    return res.status(401).json({
      status: "fail",
      error: {
        message: "Please provide email and password!",
      },
    });
  }

  try {
    //check user exists and password is correct
    const user = await User.findByUsername(username);

    if (
      !user[0][0] ||
      !(await User.checkPassword(password, user[0][0].password))
    ) {
      return res.status(401).json({
        status: "fail",
        error: {
          message: "username or password incorrect!",
        },
      });
    }

    //Create Token
    const token = jwt.sign(
      { user_id: user[0][0].user_id },
      process.env.JWT_SECRET,
      {
        expiresIn: "90d",
      }
    );

    return res.status(200).json({
      status: "success",
      token,
    });
  } catch (err) {
    console.log(err);
  }
};
