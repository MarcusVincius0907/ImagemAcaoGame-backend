const express = require("express");
const routes = express.Router();

const controller = require("./controller");

//words
routes.get("/words", controller.getWords);




module.exports = routes;
