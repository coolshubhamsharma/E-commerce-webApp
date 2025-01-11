
const Product = require('../models/Product')
const User = require('../models/User');

const productsPage = async(req,res)=>{
    try{
    let products = await Product.find({});
    res.render('products/index' , {products});
    }
    catch(e){
        res.status(500).render('error', {err:e.message});
    }
}

const newProductForm = (req , res)=>{
    try{
    res.render('products/new');
    }
    catch(e){
        res.status(500).render('error', {err:e.message});
    }
    
}

const addTheProduct = async(req , res)=>{
    try{
    let {name , img , price , desc} = req.body;
    await Product.create({name , img , price , desc ,author:req.user._id});
    req.flash('success' , 'product added successfully')
    res.redirect('/products');
    }
    catch(e){
        res.status(500).render('error', {err:e.message});
    }
}

const showSingleProduct = async(req , res)=>{
    try{
    let {id} = req.params;
    let FoundProduct = await Product.findById(id).populate('reviews');
    res.render('products/show' , {FoundProduct});
    }
    catch(e){
        res.status(500).render('error', {err:e.message});
    }
}

const editProductForm = async(req , res)=>{
    try{
    // console.log(req.params);
    let {id} = req.params;
    let FoundProduct = await Product.findById(id);
    res.render('products/edit' , {FoundProduct});
    }
    catch(e){
        res.status(500).render('error', {err:e.message});
    }
}

const editTheProduct = async(req , res)=>{
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
}

const deleteProduct = async(req , res)=>{
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
}

module.exports = {productsPage, newProductForm, addTheProduct, showSingleProduct, editProductForm, editTheProduct, deleteProduct}