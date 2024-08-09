const Listing = require("../models/listing.js");
const Booking = require("../models/booking.js");
const Card = require("../models/card.js");
const nodemailer = require('nodemailer');
require('dotenv').config(); 

const calculateTotalPrice = (numberOfNights, pricePerNight, gstRate = 0.18) => {
    const priceBeforeGST = numberOfNights * pricePerNight;
    const gstAmount = priceBeforeGST * gstRate;
    const totalPrice = priceBeforeGST + gstAmount;
    return { priceBeforeGST, gstAmount, totalPrice };
};



module.exports.index = async (req, res) => {
    let allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

module.exports.newListing = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id)
        .populate({ path: "reviews", populate: { path: "author" } })
        .populate("owner");
    if (!listing) {
        req.flash("error", "Such Listing does not exist");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;
    let listing = req.body.listing;
    const newListing = new Listing(listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    await newListing.save();
    req.flash("success", "New Listing Created");
    res.redirect("/listings");
};

module.exports.editListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Such Listing does not exist");
        res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
    res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let newListing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        newListing.image = { url, filename };
        await newListing.save();
    }
    req.flash("success", "Listing Updated");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted");
    res.redirect("/listings");
};

//search controller
module.exports.searchListing = async (req, res) => {
    let { title } = req.body;
    //console.log(title);
    // let allListings = await Listing.find({ title });
    let allListings = await Listing.find({
        title: { $regex: new RegExp(title, "i") },
    });
    if (allListings.length === 0) {
        req.flash("error", "Such Listing does not exist");
        return res.redirect("/listings");
    }
    res.render("listings/search.ejs", { allListings });
};

module.exports.bookListingForm = async (req, res) => {
    let { id } = req.params;
    return res.render("listings/book.ejs", { id });
};

module.exports.bookListing = async (req, res) => {
    try {
        let { id } = req.params;
        let booking = req.body.booking;
        let userId = req.user._id;
        const newBooking = new Booking({ ...booking, listing: id, username: userId });
        await newBooking.save();
        
        let listing = await Listing.findById(id);
        const checkInDate = new Date(booking.bookFrom);
        const checkOutDate = new Date(booking.bookTo);
        const numberOfNights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
        
        // Use the utility function to calculate total price
        const { totalPrice } = calculateTotalPrice(numberOfNights, listing.price);

        res.render("listings/payment.ejs", { newBooking, listing, totalPrice });
    } catch (error) {
        console.error(error);
        req.flash("error", "An error occurred while processing your booking.");
        res.redirect(`/listings/${id}`);
    }
};

module.exports.cardPaymentFrom = async (req, res) => {
    try {
        let { bookingId } = req.params;
        let { id } = req.params;

        // Fetch the booking
        let booking = await Booking.findById(bookingId);
        if (!booking) {
            req.flash("error", "An error occurred while processing your booking.");
        }

        let listing = await Listing.findById(id);
        if (!listing) {
            req.flash("error", "An error occurred while processing your booking.");
        }

        const checkInDate = new Date(booking.bookFrom);
        const checkOutDate = new Date(booking.bookTo);
        const numberOfNights = Math.ceil(
            (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
        );

        const { totalPrice } = calculateTotalPrice(numberOfNights, listing.price);

        res.render("listings/card.ejs", { listing,booking,totalPrice });
    } catch (error) {
        req.flash("error", "An error occurred while processing your booking.");
    }
}

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


module.exports.cardPayment = async(req,res)=>{
    try {
        let card = req.body.card;
        let { id } = req.params;
        let userId = req.user._id;
        let { bookingId } = req.params;

        let booking = await Booking.findById(bookingId);
        let listing = await Listing.findById(id);

        if (!booking) {
            return res.status(404).send('Booking not found');
        }

        const checkInDate = new Date(booking.bookFrom);
        const checkOutDate = new Date(booking.bookTo);
        const numberOfNights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

        const { totalPrice } = calculateTotalPrice(numberOfNights, listing.price);

        const newCardPayment = new Card({
            ...card,
            listing: id,
            username: userId,
            amount: totalPrice,
            booking: bookingId
        });

        await newCardPayment.save();

        // Send email notification
        const mailOptions = {
            from: process.env.EMAIL_USER,
                to: booking.email,
            subject: 'Booking Confirmation', // Subject line 
            html: `
                <h1>Booking Confirmation</h1>
                <p>Dear Customer,</p>
                <p>Your booking at ${listing.title} has been successfully processed.</p>
                <p><strong>Check-In Date:</strong> ${checkInDate.toDateString()}</p>
                <p><strong>Check-Out Date:</strong> ${checkOutDate.toDateString()}</p>
                <p><strong>Total Price:</strong> ₹${totalPrice.toLocaleString('en-IN')}</p>
                <p>Thank you for choosing our service!</p>
                <p>Best regards,</p>
                <p>The StayNook Team</p>
            `
        };

        await transporter.sendMail(mailOptions);

        req.flash("success", "Your booking is done.Please check your mail.");
        res.redirect("/listings")
    } catch (error) {
        console.error(error);
        req.flash("error", "An error occurred while processing your booking.");
    }
};


module.exports.admin = async(req,res)=>{
let {id} = req.params
    let listing =  await Listing.findById(id)
    let bookings = await Booking.find({ listing: id })
    res.render("listings/admin.ejs",{listing,bookings});
}

module.exports.deleteBooking = async (req, res) => {
    let { id } = req.params;
    let { bookingId } = req.body; 

    try {
        if (!bookingId) {
            req.flash("error", "Booking ID not provided.");
            return res.redirect(`/listings/${id}/admin`);
        }

        let booking = await Booking.findByIdAndDelete(bookingId);

        if (!booking) {
            req.flash("error", "Booking not found.");
            return res.redirect(`/listings/${id}/admin`);
        }

        req.flash("success", "Booking deleted successfully.");
        res.redirect(`/listings/${id}/admin`);
    } catch (error) {
        console.error(error);
        req.flash("error", "An error occurred while deleting the booking.");
        res.redirect(`/listings/${id}/admin`);
    }
};

