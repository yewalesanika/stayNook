const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Listing = require("./listing.js");
const User = require("./user.js");
const { required } = require("joi");

const bookingSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required : true,
    },
    bookFrom:{
        type:Date,
        required:true,
        get: (val) => val.toISOString().split('T')[0], 
    },
    bookTo:{
        type:Date,
        required:true,
        get: (val) => val.toISOString().split('T')[0], 
    },
    people:{
        type:Number,
        required:true
    },
    contact:{
        type:Number,
        required:true,
    },
    listing:{
        type:Schema.Types.ObjectId,
        ref:"Listing",
    },
    username:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
})

const Booking = mongoose.model("Booking",bookingSchema);

module.exports = Booking;