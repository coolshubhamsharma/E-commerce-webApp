if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express'); //returns a function
const app =  express(); // returns an obj.
const path = require('path');
const mongoose = require('mongoose');
const seedDB = require('./seed');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('./models/User');

 

const productRoutes = require('./routes/product');
const reviewRoutes = require('./routes/review');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/cart');
const productApi = require('./routes/api/productapi');
const payment = require('./routes/payment');



// const dbURL = process.env.dbURL || 'mongodb://127.0.0.1:27017/shopping-shubham-app';
const dbURL = process.env.dbURL; //connecting to online mongodb database

mongoose.connect(dbURL)
.then(()=>{
    console.log('db connected successfully')
})
.catch((err)=>{
   console.log('db error')
   console.log(err)
})


let configSession = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
    cookie:{
        httpOnly: true ,
        expires: Date.now() + 24*7*60*60*1000 ,
        maxAge: 24*7*60*60*1000

    }
  }


app.engine('ejs' , ejsMate);
app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname , 'views')); // views folder
app.use(express.static(path.join(__dirname , 'public')));// public folder
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.json());
app.use(methodOverride('_method'));
app.use(session(configSession));
app.use(flash());


//passport waali
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser()); //user ko session me serialize karane ke liye
passport.deserializeUser(User.deserializeUser());// user ko deserilize karane k liye

app.use((req,res,next)=>{
    res.locals.currentUser = req.user; // to check whether it is the current user loged in or not
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error'); 
    next();
})

//passport middleware //local strategy ka use karke user ko authenticate karane k liye
passport.use(new localStrategy(User.authenticate()));


//seeding Database
// seedDB();
app.use(productRoutes); //so that har incoming req ke liye path check kiya jaaye
app.use(reviewRoutes);//so that har incoming req ke liye path check kiya jaaye
app.use(authRoutes);//so that har incoming request ke liye path check kiya jaaye
app.use(userRoutes);// so that har incoming request par ye route check kare ki kaihne is route ke liye koi request to nhi aayi hai
app.use(productApi);
app.use(payment);

app.get('/' , (req,res)=>{ //landing page
    res.render('home');
})










app.listen(8080 , ()=>{
    console.log('server started at port 8080');
})