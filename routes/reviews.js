const express=require("express");
const router=express.Router({mergeParams:true});
const asyncWrap=require("../utils/asyncWrap");
const ExpressError=require("../utils/ExpressError");
const Review=require("../models/review.js");
const Listing=require("../models/listing.js");
const {validateReview,isLogged,isOwner}=require("../middleware.js");

const reviewController=require("../controllers/review.js");

// Post route
router.post("/",isLogged,validateReview,asyncWrap(reviewController.createReview));

// Delete review route
router.delete("/:reviewId",isLogged,isOwner,asyncWrap(reviewController.destroyReview));

module.exports=router;