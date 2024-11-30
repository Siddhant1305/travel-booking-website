const User = require("../models/user");

// Render SignUp From Controller
module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
};

// User SignUp Controller
module.exports.signup = async(req, res) => {
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
};

// Render User Login Controller
module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};

// User Login Controller
module.exports.login = async (req, res) => {
    req.flash("success", "Welcome to Wanderlust!, You are Logged In!!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

// User Logout Controller
module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        }
        req.flash("success", "You are logged Out!");
        res.redirect("/listings");
    });
};