const express = require('express');
const User = require('../models/User');
const Passport = require('passport');
const router = express.Router() //mini instance
const {login, loginForm, signUp, signUpPage, logout} = require('../controllers/auth');

//route to get the signup page
router.get('/register' , signUpPage);


//to actually want to register a user in my db(signup)
router.post('/register' , signUp);

// to get login form
router.get('/login' , loginForm);

// to actually login through db
router.post('/login' ,
     Passport.authenticate('local' , {
        failureRedirect:'/login' ,
         failureMessage:true
        }),
    login); 


//to logout
router.get('/logout' , logout);



module.exports = router;
