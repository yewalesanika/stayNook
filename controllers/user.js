const User = require("../models/user.js");
const nodemailer = require('nodemailer');
require('dotenv').config(); 

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user:  process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASS,
    }
});


module.exports.renderSignupForm = (req, res) => {
    res.render("user/signup.ejs");
}

module.exports.signup = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newuser = new User({ email, username });
        let user = await User.register(newuser, password);
        req.login(user,(err)=>{
            if(err)
            {
                return next(err);
            }
            let mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Welcome to StayNook!',
                text: `Hi ${username},\n\nThank you for registering with StayNook. We're excited to have you on board!\n\nBest regards,\nStayNook Team`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('Error sending email:', error);
                } else {
                    console.log('Welcome email sent:', info.response);
                }
            });
            req.flash(
                "success",
                "You have successfully registered.Welcome to StayNook"
            );
            res.redirect("/listings");
        })
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
}

module.exports.renderLoginForm = (req,res)=>{
    res.render("user/login.ejs")
}

module.exports.login = async(req,res)=>{
    req.flash("success","welcome Back to stayNook");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
        return next(err);
        }
    req.flash("success","You are logged out!");
    res.redirect("/listings");
})
}