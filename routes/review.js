const express=require('express');
const router=express.Router({mergeParams:true});
let wrapAsync=require('../utils/wrapAsync.js');
const {validateReview,isLoggedIn,isReviewAuthor}=require("../middleware.js");
const Listing=require('../models/listing.js');
const Review=require('../models/review.js');
const reviewController=require('../controllers/review.js');
//post route
router.post('/',validateReview,isLoggedIn,wrapAsync(reviewController.createReview));
//delete route
router.delete('/:reviewId',isLoggedIn,isReviewAuthor,wrapAsync(reviewController.destroyReview));
module.exports=router;