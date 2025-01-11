
const Product = require('../models/Product');
const User = require('../models/User')

//rendering cart page
const cartPage = async(req , res)=>{
    const user = await User.findById(req.user._id).populate('cart');
    const totalAmount = user.cart.reduce((sum,curr)=> sum+curr.price ,0);
    const productInfo = user.cart.map((p)=>p.desc).join(',');
    res.render('cart/cart' , {user , totalAmount , productInfo});
};

const addProductToCart = async(req , res)=>{
    let {productId} = req.params;
    let userId = req.user._id;
    let user = await User.findById(userId);
    let product = await Product.findById(productId);
    user.cart.push(product);
    await user.save();
    res.redirect('/user/cart');
};

const removeCartProduct = async(req , res)=>{
    let {productId} = req.params;
    try{
    let userId = req.user._id;
    let user = await User.findById(userId);
    user.cart.pull(productId);
    await user.save();
    req.flash('success' , 'item removed successfully');
    res.redirect('/user/cart');
    }
    catch(e){
        res.status(500).render('error', {err:e.message});
    }

};

module.exports = {removeCartProduct, addProductToCart, cartPage}