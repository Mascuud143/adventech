const express = require("express");
const Controllers = require("../Controllers/user.Controller");
const Auth = require("../Controllers/auth");

const Router = express.Router();

Router.post("/register", Controllers.register);
Router.get("/users/", Auth.protect, Controllers.getAllUsers);
Router.post("/login", Auth.login);
module.exports = Router;
