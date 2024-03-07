const Listing=require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken=process.env.MAP_TOKEN
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index=async (req,res)=>{
    let allListing=await Listing.find({});
    res.render("listings/allList.ejs",{allListing});
};

module.exports.renderNewForm=(req,res)=>{
    res.render("listings/new.ejs");
};

module.exports.CreateListing=async (req,res)=>{
   let response=await geocodingClient.forwardGeocode({
        query:req.body.listings.location,
        limit: 1
      })
    .send()
        
    const url=req.file.path;
    const filename=req.file.filename;
    const newListing=new Listing(req.body.listings);
    // console.log(newListing);
    // console.log(image);
    newListing.owner=req.user._id;
    newListing.image={url,filename};
    newListing.geometry=response.body.features[0].geometry;

    let saveListing=await newListing.save();
    console.log(saveListing);
    req.flash("success","New Listing Created");
    res.redirect("/listings");
};

module.exports.editListing=async (req,res)=>{
    let {id}=req.params;
    const data=await Listing.findById(id);
    if(!data){
        req.flash("error","Listing you requested does not exist");
        res.redirect("/listings");
    }
    let originalImageUrl=data.image.url;
    originalImageUrl=originalImageUrl.replace("/upload","/upload/w_300")
    req.flash("success","Listing Edited successfully");
    res.render("listings/edit.ejs",{data,originalImageUrl});
};

module.exports.updateListing=async (req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findByIdAndUpdate(id,{...req.body.listings},{runValidators:true});
    if(typeof req.file !=="undefined"){
    const url=req.file.path;
    const filename=req.file.filename;
    listing.image={url,filename};
    await listing.save();
    }
    req.flash("success","Listing Update Successfully");
    res.redirect(`/listings/${id}`);
};

module.exports.showListing=async(req,res)=>{
    let {id}=req.params;
    // console.log(id);
    const individualData=await Listing.findById(id).populate("reviews").populate("owner");
    if(!individualData){
        req.flash("error","Listing you requested does not exist");
        res.redirect("/listings");
    }
    // console.log(individualData);
    res.render("listings/show.ejs",{individualData});
};

module.exports.destroyListing=async (req,res)=>{
    let {id}=req.params;
    const deletedData=await Listing.findByIdAndDelete(id);
    console.log(deletedData);
    req.flash("success","Listing delete successfully");
    res.redirect("/listings");
};