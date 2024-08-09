const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user.js")
const Listing = require("./listing.js");

const cardSchema = new Schema({
    cardNumber: {
        type: String,
        required: true,
    },
    expiryDate: {
        type: String,
        required: true,
    },
    cvv: {
        type: String,
        required: true,
    },
    amount:{
        type:Number,
    },
    listing:{
        type:Schema.Types.ObjectId,
        ref:"Listing",
    },
    username:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    booking:{
        type:Schema.Types.ObjectId,
        ref:"booking",
    }
});


const Card = mongoose.model("Card",cardSchema);


module.exports = Card;