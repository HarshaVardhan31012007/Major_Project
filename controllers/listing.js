const Listing=require('../models/listing.js');
const axios=require('axios');
module.exports.index=async (req,res)=>{
    let allListings=await Listing.find();
    res.render('listings/index.ejs',{allListings});
};
module.exports.renderNewForm=(req,res)=>{
   res.render('listings/new.ejs');
};
module.exports.showListing=async (req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id)
    .populate({
        path:"reviews",
        populate:{
            path:"author"
        }
    })
    .populate('owner');
    if(!listing){
        req.flash("error","Listing you requested for does not exist");
        res.redirect('/listings');
    }
    res.render('listings/show.ejs',{listing});
};
module.exports.createListing=async (req,res)=>{
    const query = req.body.listing.location;
    const geoRes = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=geojson&q=${encodeURIComponent(query)}`
    );

   if (!geoRes.data.features || geoRes.data.features.length === 0) {
        req.flash("error", "Invalid location! Please try again.");
        return res.redirect('/listings/new');
   }  
   let url=req.file.path;
   let filename=req.file.filename;
   let listing1=new Listing(req.body.listing);
   listing1.owner=req.user._id;
   listing1.image={url,filename};
   listing1.geometry=geoRes.data.features[0].geometry;
   await listing1.save();
   req.flash("success","New listing created!");
   res.redirect('/listings');
};
module.exports.renderEditForm=async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
      if(!listing){
        req.flash("error","Listing you requested for does not exist");
        res.redirect('/listings');
    }
    let original=listing.image.url;
    original=original.replace("/upload","/upload/h_300,w_250");
    res.render('listings/edit.ejs',{listing,original});
};
module.exports.updateListing=async (req,res)=>{
    if(!req.body.listing)
    throw new ExpressError(400,'send valid data');
    let {id}=req.params;
    let listing=req.body.listing;
    let listing1=await Listing.findByIdAndUpdate(id,{...listing});
    if(typeof req.file !== "undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
        listing1.image={url,filename};
        await listing1.save();
    }
    res.redirect(`/listings/${id}`);
};
module.exports.destroyListing=async (req,res)=>{
   let {id}=req.params;
   await Listing.findByIdAndDelete(id);
   req.flash("success","Listing deleted!");
   res.redirect('/listings');
};