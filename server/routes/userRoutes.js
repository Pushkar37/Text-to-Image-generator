const express=require("express")
const {registerUser} =require("../controllers/userController.js")
const {loginUser} =require("../controllers/userController.js");
const UserAuth = require("../middleware/auth.js");
const {Credits} = require("../controllers/userController.js");

const userRouter=express.Router();
userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.get("/credits",UserAuth,Credits)

module.exports=userRouter