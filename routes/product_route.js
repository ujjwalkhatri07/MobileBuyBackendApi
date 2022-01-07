const express=require('express');
const router=express.Router();
const Product=require('../models/product_model');
const{check, validationResult} = require('express-validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth')
const upload = require('../middleware/fileupload')

router.post('/product/insert', 
auth.verifyUser, 
auth.verifyAdmin,
upload.single('product_img'),[
    check('product_name','Username is required').not().isEmpty(),
    check('product_price','Price is required').not().isEmpty(),
    // check('product_img','Image is required').not().isEmpty(),
],function(req,res){
    if(req.file==undefined){
        return res.status(400).json({
            message: "Invalid file format" 
        })
    }
    console.log(req.file)
    const errors = validationResult(req)
    
    if(errors.isEmpty()){
        const product_name=req.body.product_name;
        const product_price= req.body.product_price;
        const product_desc=req.body.product_desc;
        const path = req.file.path;
        console.log(path)
        const product=new Product(
        {
            product_name:product_name,
            product_price:product_price,
            product_desc:product_desc,
            product_img:path

        });
    product.save()
    .then(function(result){
        res.status(201).json({message : "Product Registered Successfully!!"})
    
    })
    .catch(function(err){
        res.status(500).json({error : err})
    })
    }
else{
   // res.send(errors.array())
    res.status(400).json(errors.array());
}   
})


router.delete('/product/delete/:id', auth.verifyUser, auth.verifyAdmin,function(req,res){
    const id=req.params.id;
    Product.deleteOne({_id : id}).then(function(){
        res.status(200).json({success:true,message:"Products deleted"})
        console.log("deleted!!")
    });

})

// router.put('/product/update/:id',function(req,res){
//     const id=req.params.id;
//     Product.updateOne({_id:id},req.body).then(function(){
//         res.status(200).json({
//             message:"Success"
//         })
    
//     }).catch((error)=>{
//         res.status(404).json({
//             error:"error"
//         })
//     })

// })

// router.get('/product/show',function(req,res){
//     Product.find().then(function(data){
//         res.send(data);
//     })
// })


//update sir ko pachadi ko wala
router.put('/product/update/:id',
function(req,res){
    const product_name = req.body.product_name
    const product_price = req.body.product_price
    const product_desc = req.body.product_desc
    const product_id = req.params.id


    Product.updateOne({_id : product_id},
        {product_desc:product_desc}
        )
        .then(function(){
            res.status(200).json({message:"Updated"})
        })
        .catch(function(e){
            res.status(500).json({error:e})
        })
})

router.delete('/product/delete/:id',
auth.verifyUser, auth.verifyAdmin,
   function(req,res){
    const id = req.params.id;
    Product.deleteOne({_id:id})
    .then(function(){
        res.send("deleted!!");
    })
    .catch(function(e){
        res.status(500).json({error:e})
    })
})


router.get('/product/show',function(req,res){
    Product.find()
    .then(function(data){
        res.json({
            success : true,
            data  : data
        })
    })
})
router.get('/product/all',function(req,res){
    Product.find().then(function(data){
        res.status(200).json({data,success:true})
        console.log("showed")
    }).catch(function(e){
        res.status(500).json({error:e})
        console.log("not")
    })
})

router.get('/product/singleshow/:id',
//auth.verifyUser,
function(req,res){
    const product_id = req.params.id;
    Product.findOne({_id:product_id})
    .then(function(data){
        res.status(200).json(
            //data
            {
            success:true,data:[data]
        }
        )
    })
    .catch(function(e){
        res.status(500).json({error : e})
    })
})
router.get('/product/single/:id',function(req,res){
    const id=req.params.id;
  Product.findOne({_id:id}).then(function(data){
        res.status(200).json(data)
        console.log('Single')
    }).catch(function(e){
        res.status(500).json({error:e})
        console.log("erroe")
    })
})

module.exports=router;