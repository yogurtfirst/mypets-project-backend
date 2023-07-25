const express = require("express");
const { news } = require("../controllers/news");

const newsRouter = express.Router();

newsRouter.get("/", news);

module.exports = newsRouter;