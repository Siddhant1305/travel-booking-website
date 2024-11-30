const Listing = require("../models/listing");
const Review = require("../models/review");

// Reviews Route Controller

// 1. POST Route (Reviews) Controller
module.exports.createReview = async (req, res) => {
    // console.log(req.params.id);
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;

    listing.reviews.push(newReview);
   
    await newReview.save();
    await listing.save();
    req.flash("success", "New Review Created!");
    console.log(newReview);
    console.log(req.params.id);
    // res.send("Working");
    res.redirect(`/listings/${listing._id}`);
};

// 2. Delete Route (Reviews) Controller
module.exports.destoryReviews = async (req, res) => {
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, {pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted!");
    res.redirect(`/listings/${id}`);
};