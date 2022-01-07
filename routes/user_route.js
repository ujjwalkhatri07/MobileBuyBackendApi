const express=require('express');
const router=express.Router();
const User=require('../models/user_model');
const{check, validationResult} = require('express-validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth')


router.post('/user/insert',[
    check('user_username','Username is required').not().isEmpty(),
    check('user_contactno','Contact no is required').not().isEmpty(),
    check('user_email','Email is required').not().isEmpty(),
    check('user_email','Email invalid').isEmail(),
    check('user_password','Password is required').not().isEmpty(),
],function(req,res){

    const errors = validationResult(req)
    
    if(errors.isEmpty()){
        const user_username=req.body.user_username;
        const user_contactno= req.body.user_contactno;
        const user_email=req.body.user_email;
        const user_password=req.body.user_password;
        const user_role = req.body.user_role;
        bcryptjs.hash(user_password, 10, function(err, hash){
            const data=new User(
                {
                    user_username:user_username,
                    user_contactno:user_contactno,
                    user_email:user_email,
                    user_password:hash,
                    user_role:user_role,
                    
            }
            );
            
            console.log(data)
            data.save()
            .then(function(result){
                res.status(201).json({success:true,message : "User Registered Success!!"})
                
            })
            .catch(function(err){
                res.status(500).json({error : err})
            })
            })
            }
        else{
            console.log(errors.array())
            res.status(400).json(errors.array());
        }   
        })


//login system  .........
router.post('/user/login', function(req, res){
    console.log(req.body)
    const Username = req.body.user_email;
    const Password = req.body.user_password;
    User.findOne({user_email : Username})
    .then(function(userData){
        if(userData===null){
            // username false
        
          return res.status(201).json({success:false, message : "Invalid credentials!!"})
        }
        // if username exists
        bcryptjs.compare(Password , userData.user_password, function(err, result){
           
            if(result===false){
                //passsword Wrong\
                return res.status(201).json({success:false, message : "Invalid credentials!!"})
                
            }
            //all good
            // then generate token - ticket
           const token = jwt.sign({userID : userData._id}, 'anysecretkey');
           return res.status(200).json({
               success : true,
               message:"Login Success",
               token : token,
               data  : userData,
               user_role:userData.user_role,user_username:userData.user_username,id:userData.id
           })
        })

    })
    .catch(function(e){
        res.status(500).json({message : e})
    })

})


router.get('/user/show',function(req,res){
    User.find().then(function(data){
        res.send(data);
    })
})

router.delete('/user/delete/:id', 
//not working
auth.verifyUser,
function(req,res){
    const id22=req.params.id;
    User.deleteOne({_id:id22}).then(function(){
        res.status(200).json({
            message:"Delete Success"
        })
    })

})

router.put('/user/update/:id',
function(req,res){
    const id=req.params.id;
    const user_username = req.body.user_username;
    User.updateOne({_id:id},{user_username:user_username},req.body).then(function(){
        res.status(200).json({
            message:"Update Success"
        })
    
    }).catch((error)=>{
        res.status(404).json({
            error:"error"
        })
    })

})

router.get('/user/singleshow/:id',
auth.verifyUser,
function(req,res){
    const user_id = req.params.id;
    User.findOne({_id:user_id})
    .then(function(data){
        res.status(200).json(data)
    }).catch(function(e){
        res.status(500).json({error : e})
    })
})
router.get('/user/single/:id',function(req,res){
    const id=req.params.id;
    User.findOne({_id:id}).then(function(data){
        res.status(200).json(data)
        console.log("shown")
    }).catch(function(e){
        res.status(500).json({error:e})
        console.log("not")
    })
})

module.exports=router;
