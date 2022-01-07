const mongoose=require('mongoose');

const Cart= mongoose.model('Cart',{
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref  : 'Product'
    },
   
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Register"
    },

    quantity : {
        type : Number,
        default : 1
    }

})
module.exports=Cart;