const express = require("express");
const Controllers = require("../Controllers/calender.Controller");
const Auth = require("../Controllers/auth");

const Router = express.Router();

Router.get("/", Controllers.getCalenders);
Router.post("/", Auth.protect, Controllers.createCalender);
Router.post("/g", Auth.protect, Controllers.createCalender);
module.exports = Router;
