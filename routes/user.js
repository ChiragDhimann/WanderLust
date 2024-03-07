const express=require("express");
const router=express.Router();
const User=require("../models/user");
const asyncWrap=require("../utils/asyncWrap");
const passport=require("passport");

const userController=require("../controllers/user");

// User SignUp
router.
route("/signup")
.get(userController.signupRenderForm)
.post(asyncWrap(userController.signup));

// Login
router
.route("/login")
.get(userController.renderLoginForm)
.post(passport.authenticate("local",{ failureRedirect: '/login' ,failureFlash:true}),userController.login);

// LogOut
router.get("/logout",userController.logout);

module.exports=router;