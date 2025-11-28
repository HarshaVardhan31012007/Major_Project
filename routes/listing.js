const express=require('express');
const router=express.Router();
let wrapAsync=require('../utils/wrapAsync.js');
const Listing=require('../models/listing.js');
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");
const listingController=require('../controllers/listing.js');
const multer  = require('multer')
const {storage}=require('../cloudConfig.js');//multer parses multipart/form encoding type form
const upload = multer({ storage });//multer uploads in cloudinary storage
router
  .route('/')
  .get(wrapAsync(listingController.index))
  .post(isLoggedIn,upload.single('listing[image]'),validateListing,wrapAsync(listingController.createListing));
  
  
  //new route//this should be above /:id route because new is taken as id otherwise in/:id as it is encountered first
router.get('/new',isLoggedIn,listingController.renderNewForm);
router
   .route('/:id')
   .get(wrapAsync(listingController.showListing))
   .patch(isLoggedIn,isOwner,upload.single('listing[image]'),validateListing,wrapAsync(listingController.updateListing))
   .delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));

//edit route
router.get('/:id/edit',isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));
module.exports=router;