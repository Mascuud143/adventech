const Calender = require("../Models/calender.Model");
const jwt = require("jsonwebtoken");
const Day = require("../Models/day.Model");
const User = require("../Models/user.Model");

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
module.exports.createDay = async (req, res) => {
  const day = req.body;

  try {
    const createdDay = await Day.create(day);
    console.log(createdDay);

    return res.status(200).json({
      status: "success",
      data: {
        day: createdDay,
      },
    });
  } catch (err) {
    console.log(err);

    return res.status(400).json({
      status: "fail",
      error: {
        message: err,
      },
    });
  }
};

module.exports.getCalender = async (req, res) => {
  let id = req.params.id.split("-").join(" ");
  console.log(id);
  try {
    const calender = await Calender.findById(id);
    console.log(calender[0][0]);

    //find user
    const calenderAuthor = await User.findById(calender[0][0].user_id);

    //remove user_id and replace with author
    delete calender[0][0].user_id;

    calender[0][0].author = calenderAuthor[0][0].username;

    //find days
    const calenderDays = await Day.find();
    console.log(calender[0][0].calender_id);
    const filteredDays = calenderDays[0].filter((el) => {
      return el.calender_id === calender[0][0].calender_id;
    });

    console.log(calenderDays[0]);
    return res.status(200).json({
      status: "success",
      data: {
        calender: calender[0][0],
        days: [...filteredDays],
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      status: "fail",
      error: {
        message: error,
      },
    });
  }
};
