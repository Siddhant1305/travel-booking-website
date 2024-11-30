const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");

// Render SignUp From
router.get("/signup", userController.renderSignupForm);

// User Signup
router.post("/signup", wrapAsync(userController.signup));

// Render User Login
router.get("/login", userController.renderLoginForm);

// User Login
router.post("/login", saveRedirectUrl, passport.authenticate("local", { failureRedirect: '/login', failureFlash: true}), userController.login);

// User Logout
router.get("/logout", userController.logout);

module.exports = router;