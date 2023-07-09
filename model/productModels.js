const mongoose = require("mongoose")

const productShema = mongoose.Schema({

    productName :{
        type:String,
        required:true
    },
    productId:{
        type:Number,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
    
})

const Product = mongoose.model('Product',productShema)

module.exports = Product