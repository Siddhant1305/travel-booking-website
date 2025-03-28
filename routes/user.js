const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");

// Render Signup Form and User SignUp - router.route()
router.route("/signup")
.get(userController.renderSignupForm)
.post(wrapAsync(userController.signup));

// Render Login Form and User Login - router.route()
router.route("/login")
.get(userController.renderLoginForm)
.post(saveRedirectUrl, passport.authenticate("local", { failureRedirect: '/login', failureFlash: true}), userController.login);

// User Logout
router.get("/logout", userController.logout);

module.exports = router;