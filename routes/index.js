const authRouter = require("./authRoutes");
const friendsRouter = require("./friendsRoutes");
const noticesRouter = require("./noticesRoutes");
const petsRouter = require("./petsRoutes");
const swaggerRouter = require("./swagerRoutes");
const usersRouter = require("./usersRoutes");

module.exports = {
    authRouter,
    noticesRouter,
    petsRouter,
    usersRouter,
    swaggerRouter,
    friendsRouter,
}