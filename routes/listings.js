
const express=require("express");
const router=express.Router();
const asyncWrap=require("../utils/asyncWrap");
const Listing=require("../models/listing");
const {isLogged , isOwner , validateListing}=require("../middleware.js");
const multer  = require('multer')
const storage=require("../cloudConfig.js");
const upload = multer(storage)

const listingController=require("../controllers/listing.js");


// Index Route

router
.route("/")
.get(asyncWrap(listingController.index))
.post(isLogged,
    upload.single('listings[image]'),
    validateListing,
    asyncWrap(listingController.CreateListing)
    );


// New Route
router.get("/new",isLogged,listingController.renderNewForm);


// edit Listing
router.get("/:id/edit",isLogged,isOwner,asyncWrap(listingController.editListing));

// update route
router
.route("/:id")
.put(isLogged,isOwner,upload.single('listings[image]'),validateListing,asyncWrap(listingController.updateListing))
.get(asyncWrap(listingController.showListing))
.delete(isLogged,isOwner,asyncWrap(listingController.destroyListing));

module.exports=router;