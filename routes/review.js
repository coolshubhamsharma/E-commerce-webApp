const express = require('express');
const Review = require('../models/Review');
const router = express.Router() //mini instance
const Product = require('../models/Product');
const {validateReview} = require('../middleware'); 
const {postReview, deleteReview} = require('../controllers/review');



//posting/saving reviews on DB
router.post('/products/:id/review' ,validateReview , postReview);


//deleting reviews
router.post('/products/:id/deleteReview', deleteReview);








module.exports = router;
 
