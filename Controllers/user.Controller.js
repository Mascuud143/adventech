const User = require("../Models/user.Model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

module.exports.register = async (req, res) => {
  const user = req.body;

  //check for confirm password
  if (user.password !== user.confirm_password) {
    return res.send("Passwords do not match");
  }

  //hash the password
  bcrypt.genSalt(10, async (err, salt) => {
    bcrypt.hash(user.password, salt, async (err, hash) => {
      //reassign user password with the hashed password
      user.password = hash;

      //create user
      try {
        const newUser = await User.create(user);
        console.log(newUser);
        return res.status(201).json({
          status: "success",
          data: {
            user: newUser,
          },
        });
      } catch (err) {
        return res.status(400).json({
          status: "fail",
          error: {
            message: err.sqlMessage,
          },
        });
      }
    });
  });
};

module.exports.getAllUsers = async (req, res) => {
  const users = await User.find();

  return res.status(200).json({
    status: "success",
    length: users[0].length,
    data: {
      users: users[0],
    },
  });
};
module.exports.protect = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  console.log(token);

  //verify token
  try {
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

// module.exports.login = async (req, res) => {
//   const { username, password } = req.body;

//   //check for user input
//   if ((!username, !password)) {
//     return res.status(401).json({
//       status: "fail",
//       error: {
//         message: "Please provide email and password!",
//       },
//     });
//   }

//   try {
//     //check user exists and password is correct
//     const user = await User.findByUsername(username);

//     if (
//       !user[0][0] ||
//       !(await User.checkPassword(password, user[0][0].password))
//     ) {
//       return res.status(401).json({
//         status: "fail",
//         error: {
//           message: "username or password incorrect!",
//         },
//       });
//     }

//     //Create Token
//     const token = jwt.sign(
//       { user_id: user[0][0].user_id },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: "90d",
//       }
//     );

//     return res.status(200).json({
//       status: "success",
//       token,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };
