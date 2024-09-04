
const express = require('express');//returns a function
const Product = require('../models/Product')
const router = express.Router();
const Review = require('../models/Review')
const {validateProduct , isLoggedIn , isSeller, isProductAuthor} = require('../middleware');
const User = require('../models/User');


//to show all the  products
router.get('/products' , isLoggedIn , async(req,res)=>{
    try{
    let products = await Product.find({});
    res.render('products/index' , {products});
    }
    catch(e){
        res.status(500).render('error', {err:e.message});
    }
})

//to show the form for new product
router.get('/product/new' ,isLoggedIn , (req , res)=>{
    try{
    res.render('products/new');
    }
    catch(e){
        res.status(500).render('error', {err:e.message});
    }
    
})

//to actually add the product
router.post('/products' , validateProduct ,isLoggedIn , isSeller ,  async(req , res)=>{
    try{
    let {name , img , price , desc} = req.body;
    await Product.create({name , img , price , desc ,author:req.user._id});
    req.flash('success' , 'product added successfully')
    res.redirect('/products');
    }
    catch(e){
        res.status(500).render('error', {err:e.message});
    }
})

//to show a particular product
router.get('/products/:id' ,isLoggedIn , async(req , res)=>{
    try{
    let {id} = req.params;
    let FoundProduct = await Product.findById(id).populate('reviews');
    res.render('products/show' , {FoundProduct});
    }
    catch(e){
        res.status(500).render('error', {err:e.message});
    }
})

//to show the form to edit a product
router.get('/products/:id/edit' ,isLoggedIn , async(req , res)=>{
    try{
    // console.log(req.params);
    let {id} = req.params;
    let FoundProduct = await Product.findById(id);
    res.render('products/edit' , {FoundProduct});
    }
    catch(e){
        res.status(500).render('error', {err:e.message});
    }
})

//to actually update the edited product in db
router.patch('/products/:id' , validateProduct ,isLoggedIn , async(req , res)=>{
    try{
    let {id} = req.params;
    let {name , img , price , desc} = req.body;
    await Product.findByIdAndUpdate( id , {name , img , price , desc} );
    req.flash('success' , 'product edited successfully');
    res.redirect(`/products/${id}`);
    }
    catch(e){
        res.status(500).render('error', {err:e.message});
    }
})

//to delete a product 
router.delete('/products/:id' , isLoggedIn , isProductAuthor , async(req , res)=>{
    try{
    let {id} = req.params;
    let product = await Product.findById(id);

    // for(let  id of product.reviews){
    //     await Review.findByIdAndDelete(id);
    // }
    //deleting the product from the cart array of user when a product is deleted
    let user = await User.findById(req.user._id);
    user.cart = user.cart.filter(item => item.toString() !== id);
    await user.save();

    await Product.findByIdAndDelete(id);
    req.flash('success' , 'product deleted successfully');
    res.redirect('/products');
    }
    catch(e){
        res.status(500).render('error', {err:e.message});
    }
})


module.exports = router;