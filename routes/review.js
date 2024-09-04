const express = require('express');
const Review = require('../models/Review');
const router = express.Router() //mini instance
const Product = require('../models/Product');
const {validateReview} = require('../middleware'); 




router.post('/products/:id/review' ,validateReview , async(req , res)=>{
    try{
    // console.log(req.body);
    let {id} = req.params;
    let {rating , comment} = req.body;
    const product = await Product.findById(id);
    const review = new Review({rating , comment ,product:id });

    //Average Rating Logic
    const newAverageRating = ((product.avgRating * product.reviews.length) + parseInt(rating)) / (product.reviews.length + 1);
    product.avgRating = parseFloat(newAverageRating.toFixed(1));

    product.reviews.push(review);
    await review.save();
    await product.save();
    req.flash('success', 'review added successfully');//to flash a message
    res.redirect(`/products/${id}`);
    }
    catch(e){
        res.status(500).render('error', {err:e.message});
    }
})


router.post('/products/:id/deleteReview', async (req, res) => {
    let { id } = req.params;

    try {
        // Find the review to be deleted
        let review = await Review.findById(id);

        if (!review) {
            req.flash('error', 'Review not found');
            return res.redirect('/products');
        }

        // Find the product associated with the review
        let product = await Product.findById(review.product); // Assuming the review has a `product` field

        if (product) {
            // Remove the review from the product's reviews array
            product.reviews.pull(id);
            await product.save();
        }

        // Delete the review
        await Review.findByIdAndDelete(id);

        req.flash('success', 'Review deleted successfully');
        res.redirect(`/products/${product._id}`);
    } catch (e) {
        res.status(500).render('error', { err: e.message });
    }
});








module.exports = router;
 
