const { required } = require('joi');
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

let userSchema = new mongoose.Schema({
   email:{
    type: String,
    trim:true,
    required:true
   },
   role:{
      type:String ,
      required:true
   },
   wishList:[
      {
         type:mongoose.Schema.Types.ObjectId,
         ref:'Product'
      }
   ],
   cart:[
      {
         type:mongoose.Schema.Types.ObjectId ,
         ref:'Product'
      }
   ]
   
});

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model('User' , userSchema);
module.exports = User; 