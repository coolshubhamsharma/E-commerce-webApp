const mongoose = require('mongoose');
const Product = require('./Product');

let reviewSchema = new mongoose.Schema({
    rating:{
        type:Number ,
        min:0 , 
        max:5 
    },
    comment:{
        type:String  ,
        trim:true
    },
    product:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Product' 
    }

} , { timestamps:true}
);

const Review = new mongoose.model('Review' , reviewSchema);
module.exports = Review; 