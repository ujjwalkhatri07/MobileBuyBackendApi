const express=require('express');
const router=express.Router();
const Admin=require('../models/admin_model');
const{check, validationResult} = require('express-validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken');


router.post('/admin/insert',[
    check('admin_name','Username is required').not().isEmpty(),
    check('admin_email','Email is required').not().isEmpty(),
    check('admin_email','Email invalid').isEmail(),
    check('admin_password','Password is required').not().isEmpty(),
],function(req,res){
    const errors = validationResult(req)
    
    if(errors.isEmpty()){
        const admin_name=req.body.admin_name;
        const admin_email= req.body.admin_email;
        const admin_password=req.body.admin_password;
        bcryptjs.hash(admin_password, 10, function(err, hash){
            const admin=new Admin(
            {
                admin_name:admin_name,
                admin_email:admin_email,
                admin_password:hash
            });
    admin.save()
    .then(function(result){
        res.status(201).json({message : "Admin Registered Success!!"})
    
    })
    .catch(function(err){
        res.status(500).json({error : err})
    })
    })
        }
else{
    res.send(errors.array())
    res.status(400).json(errors.array());
}   
})

//for delete
router.delete('/admin/delete/:id', function(req,res){
    const id22=req.params.id;
    Admin.deleteOne({_id:id22}).then(function(){
        res.send("deleted!!");
    })

})

//for update

router.put('/admin/update/:id',function(req,res){
    const id=req.params.id;
    Admin.updateOne({_id:id},req.body).then(function(){
        res.status(200).json({
            message:"Success"
        })
    
    }).catch((error)=>{
        res.status(404).json({
            error:"error"
        })
    })

})

router.get('/admin/show',function(req,res){
    Admin.find().then(function(data){
        res.send(data);
    })
})


//login system  .........
router.get('/admin/login', function(req, res){
    const Username = req.body.Username;
    const Password = req.body.Password;
    admin.findOne({Username : Username})
    .then(function(adminData){
        if(adminData===null){
            // username false
          return res.status(401).json({message : "Invalid credentials!!"})
        }
        // if username exists
        bcryptjs.compare(Password , adminData.Password, function(err, result){
            if(result===false){
                //passsword Wrong
                return res.status(401).json({message : "Invalid credentials!!"})
            }
            //all good
            // then generate token - ticket
           const token = jwt.sign({adminID : adminData._id}, 'anysecretkey');
           return res.status(200).json({
               message : "All success!",
               token : token
           })
        })

    })
    .catch(function(e){
        res.status(500).json({message : e})

    })

})
module.exports=router;