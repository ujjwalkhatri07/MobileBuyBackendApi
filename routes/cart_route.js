const express=require('express');
const router=express.Router();
const Cart=require('../models/cart_model');
const auth=require('../middleware/auth');
 


router.get('/cart/', 
auth.verifyUser, 
function(req, res){
    Cart.find({user : req.user._id }).populate("product").exec(function(err, carts){
        if(err){
            return res.status(500).json({
                success : false,
                message : err.message
            })
        }


        return res.status(200).json({
            success : true,
            message : "Cart Items",
            data : carts
        })
    })
})


router.delete('/cart/:id', auth.verifyUser, function(req, res){
    Cart.deleteOne({_id : req.params.id})
    .then(data=>{
        return res.status(200).json({
            success : true,
            message : "Cart Items",
            data : data
        })
    })
    .catch(err=>{
            return res.status(500).json({
                success : false,
                message : err.message
            })
        })
})

router.post('/cart/insert',auth.verifyUser, function(req, res){
    var data = {
        product : req.body.productId,
        user:  req.user._id,
    }

    Cart.findOne({user : req.user._id , product : req.body.productId}, function(err, cart){
        if(cart){
            var currentquantity = cart.quantity+1;
            Cart.findOneAndUpdate({_id : cart._id}, {$set : {quantity : currentquantity}}).then(function(cart){
                return res.status(200).json({
                    success : true,
                    message : "Cart Successfully Added",
                    cart : cart
                })
            }).catch(err => {
                return res.status(500).json({
                    succeess : false,
                    messsage : err.message
                })
            })
        }else{
            Cart.create(data).then(function(cart){
                return res.status(200).json({
                    success : true,
                    message : "Cart Successfully Added",
                    cart : cart
                })
            }).catch(err => {
                return res.status(500).json({
                    succeess : false,
                    messsage : err.message
                })
            })
        }
    })
})


module.exports=router;