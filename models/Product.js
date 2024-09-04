

const mongoose = require('mongoose');
const Review = require('./Review')

let productSchema = new mongoose.Schema({
    name: {
        type:String ,
        trim:true , 
        required:true 
    },
    img:{
        type:String,
        trim:true
    },
    price:{
        type:Number,
        min:0,
        required:true
    },
    desc:{
        type:String ,
        trim:true
    },
    avgRating:{
        type: Number ,
        default: 0
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId ,
            ref:'Review'
        }
    ] ,
    author:{
        type:mongoose.Schema.Types.ObjectId ,
            ref:'User'
    }

});


//middleware jo behind the scenes operations karwane par use hota hai and iske andar pre and post middleware hote hai which are basically used over the schema and before the model(is js class).

//here we can use both pre and post method beacause even after the product is deleted the middleware remembers that it has to go to the other place and delete the reviews
 
productSchema.post('findOneAndDelete' , async function(product){
    if(product.reviews.length>0){
        await Review.deleteMany({_id:{$in:product.reviews}})
    }
})



const Product = new mongoose.model('Product' , productSchema);
module.exports = Product; 