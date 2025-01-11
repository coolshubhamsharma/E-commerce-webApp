
const User = require('../models/User');


//to show signUp page
const signUpPage = (req , res)=>{
    res.render('auth/signup'); 
}

//to actually signUp through DB
const signUp = async(req , res)=>{
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
}

//to show loginForm
const loginForm = (req , res)=>{
    res.render('auth/login'); 
}

//to actually login through database
const login = (req , res)=>{
    // console.log(req.user);
    req.flash('success' , 'welcome back')
    res.redirect('/products');
}

//logout 
const logout = (req , res)=>{
    ()=>{
        req.logout();
    }
    req.flash('success' , 'goodbye friend see you again');
    res.redirect('/login');
}

module.exports = {logout, login, loginForm, signUp, signUpPage};