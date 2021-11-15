const Calender = require("../Models/calender.Model");
const jwt = require("jsonwebtoken");

module.exports.getCalenders = async (req, res) => {
  try {
    const calender = await Calender.find();
    console.log("-----------------");
    console.log(calender[0]);
    return res.status(200).json({
      status: "success",
      length: calender[0].length,
      data: {
        calender: calender[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
};
module.exports.createCalender = async (req, res) => {
  console.log(req.body);
  const UserCalender = req.body;

  if (!UserCalender.title || !UserCalender.user_id) {
    return res.send("Title and user_id are required!");
  }

  try {
    const calender = await Calender.create(UserCalender);

    console.log("-----------------");
    console.log(calender[0]);
    return res.status(200).json({
      status: "success",
      length: calender[0].length,
      data: {
        calender: calender[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
};
