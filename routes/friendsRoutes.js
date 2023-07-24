const express = require("express");
const { ourFriends } = require("../controllers/friends");

const friendsRouter = express.Router();

friendsRouter.get("/", ourFriends);

module.exports = friendsRouter;
