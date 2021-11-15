const express = require("express");
require("dotenv").config();

const userRouter = require("./routes/user.Router");
const calenderRouter = require("./routes/calender.Router");

//Database
const db = require("./util/db");
const User = require("./Models/user.Model");

const app = express();

//Middlewares
app.use(express.json());

//Routes
app.use("/", userRouter);
app.use("/calenders", calenderRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}...`);
});
