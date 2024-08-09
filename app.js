if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
// console.log(process.env.SECRECT);
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo")
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const Booking = require("./models/booking.js");
const Listing = require("./models/listing.js");
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();

const dbUrl = process.env.ATLASDB_URL;
async function main(){
    await mongoose.connect(dbUrl);
}

main()
.then(()=>{
    console.log("Connection sucessful");
})
.catch((err)=>{
    console.log(err);
})

app.use(express.json());
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true})); 
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const store = MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter:24*3600,
})

store.on("error",()=>{
    console.log("Error");
})

app.use(session({store,secret:process.env.SECRET,resave:false,saveUninitialized:true,cookie:{
    expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge : 7 * 24 * 60 * 60 * 1000,
    httpOnly : true,
}}));


app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// Middleware to parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to parse application/json
app.use(bodyParser.json());

// Middleware to parse multipart/form-data
app.use(upload.none());

app.use((req,res,next)=>{
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    res.locals.currUser = req.user;
    next();
})

//Routers
const listings = require("./routes/listings.js");
const reviews = require("./routes/review.js");
const user = require("./routes/user.js");
app.get("/privacy",(req,res)=>{
    res.render("privacy_terms/privacy.ejs");
})

app.get("/terms", (req, res) => {
    console.log("Terms route hit");
    res.render("privacy_terms/terms.ejs");
});

app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews);
app.use("/",user);


app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page not found"));
})

app.use((err,req,res,next)=>{
    let {statusCode=500,message="something went wrong"} = err;
    res.render("error.ejs",{message});
}) 

app.listen(8080,()=>{
    console.log("App listening to port 8080");
})