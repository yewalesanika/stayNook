const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner,isLoggedInToBook } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });
const { bookingSchema, cardSchema} = require("../schema.js");

const validatelisting = (req, res, next) => {
  console.log(">>>>validate listing middleware");
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

const validatebooking = (req, res, next) => {
  let { error } = bookingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

const validatepayment = (req, res, next) => {
  let { error } = cardSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
}

router
  .route("/")
  //index route
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validatelisting,
    wrapAsync(listingController.createListing)
  );

//serach route
router.post("/search", wrapAsync(listingController.searchListing));

//new route
router.get("/new", isLoggedIn, listingController.newListing);

router
  .route("/:id")
  //show route
  .get(wrapAsync(listingController.showListing))
  //update route
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validatelisting,
    wrapAsync(listingController.updateListing)
  )
  //delete route
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

//edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.editListing)
);

//book route
router
.route("/:id/book")
.get(isLoggedInToBook,wrapAsync(listingController.bookListingForm))
.post(validatebooking,wrapAsync(listingController.bookListing));

//payment route
router
.route("/:id/book/:bookingId/card")
.get(wrapAsync(listingController.cardPaymentFrom))
.post(validatepayment,wrapAsync(listingController.cardPayment))

//admin route
router
.route("/:id/admin")
.get(isLoggedIn,isOwner,wrapAsync(listingController.admin))
.delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteBooking));

module.exports = router;
