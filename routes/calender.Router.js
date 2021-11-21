const express = require("express");
const Controllers = require("../Controllers/calender.Controller");
const Auth = require("../Controllers/auth");

const Router = express.Router();

Router.get("/", Auth.protect, Controllers.getCalenders);
Router.get("/:id", Auth.protect, Controllers.getCalender);
Router.post("/:id/", Auth.protect, Controllers.createDay);
Router.post("/", Auth.protect, Controllers.createCalender);
module.exports = Router;
