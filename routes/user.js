const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
});

// User Signup
router.post("/signup", wrapAsync(async(req, res) => {
    try {
        let {username, email, password} = req.body;
        const newUser = new User ({email, username});
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if(err) {
                return next(err);
            }
            req.flash("success", "User was Registered, Welcome to Wanderlust!!");
            res.redirect("/listings");
        });
    } catch(e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    };
}));

// User Login
router.get("/login", (req, res) => {
    res.render("users/login.ejs");
});

router.post("/login", saveRedirectUrl, passport.authenticate("local", { failureRedirect: '/login', failureFlash: true}), async(req, res) => {
req.flash("success", "Welcome to Wanderlust!, You are Logged In!!");
let redirectUrl = res.locals.redirectUrl || "/listings";
res.redirect(redirectUrl);
});

// User Logout
router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        }
        req.flash("success", "You are logged Out!");
        res.redirect("/listings");
    });
});


module.exports = router;