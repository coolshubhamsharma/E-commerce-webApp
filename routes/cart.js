
const express = require('express');
const router = express.Router();//mini instance
const {isLoggedIn} = require('../middleware');
const Product = require('../models/Product');
const User = require('../models/User');
const {removeCartProduct, addProductToCart, cartPage} = require('../controllers/cart');

//rendering cart page
router.get('/user/cart' , isLoggedIn , cartPage);

// actually adding the product into the cart
router.post('/user/:productId/cart' ,isLoggedIn , addProductToCart);

//removing the product from cart
router.post('/user/:productId/rmcart', isLoggedIn , removeCartProduct);






module.exports = router;