const express =  require("express");

const userRouter = express.Router()

const userController = require("../controlller/UserController")

userRouter.post("/signup",userController.userRegister)
userRouter.post("/login",userController.userLogin)
userRouter.get("/logout",userController.userLogout)

module.exports = userRouter