const mongoose=require('mongoose');

const Product=mongoose.model('Product',{
    product_name:{
        type : String,
        required : true
    },
    product_price:{
        type:Number,
        required : true
    },
    product_desc:{
        type:String,
    },
    product_img:{
        type:String,
        required : true
    },
})
module.exports=Product;