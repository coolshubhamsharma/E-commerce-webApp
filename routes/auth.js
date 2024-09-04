const express = require('express');
const User = require('../models/User');
const Passport = require('passport');
const router = express.Router() //mini instance

router.get('/register' , (req , res)=>{
    res.render('auth/signup'); 
})


//to actually want to register a user in my db(signup)
router.post('/register' , async(req , res)=>{
    try{
    // console.log(req.body);
    let {email , password , username , role} = req.body;
    const user = new User({email , username , role});
    const newUser = await User.register(user , password);
    // res.redirect('/login');
    req.logIn(newUser, function(err) {
        if (err) { return next(err); }
        req.flash('success' , 'welcome my dear');
        return res.redirect('/products');
      });
    }
    catch(e){
        req.flash('error' ,e.message);
        return res.redirect('/register');
    }
})

// to get login form
router.get('/login' , (req , res)=>{
    res.render('auth/login'); 
})

// to actually login through db
router.post('/login' ,
     Passport.authenticate('local' , {
        failureRedirect:'/login' ,
         failureMessage:true
        }),
    (req , res)=>{
        // console.log(req.user);
        req.flash('success' , 'welcome back')
        res.redirect('/products');
}) 


//to logout
router.get('/logout' , (req , res)=>{
    ()=>{
        req.logout();
    }
    req.flash('success' , 'goodbye friend see you again');
    res.redirect('/login');
})



module.exports = router;
