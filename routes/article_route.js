const express=require('express');
const router=express.Router();
const Article=require('../models/article_model');
const{check, validationResult} = require('express-validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth')



router.post('/article/insert',
[
    check('article_title','Title is required').not().isEmpty(),
    check('article_body','Content is required').not().isEmpty(),
],function(req,res){

    const errors = validationResult(req)
    
    if(errors.isEmpty()){
        
        const article_title=req.body.article_title;
        const article_body= req.body.article_body;
            const data=new Article(
                {
                    article_title:article_title,
                    article_body:article_body
                }
            );
            data.save()
            .then(function(result){
                res.status(201).json({message : "Article Added Success!!"})
            
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


router.get('/article/show',function(req,res){
    Article.find().then(function(data){
        res.json({
            success : true,
            data  : data
        })
    })
})

router.delete('/article/delete/:id',
auth.verifyUser, auth.verifyAdmin, 
 function(req,res){
    const id22=req.params.id;
    Article.deleteOne({_id:id22})
    .then(function(){
        res.send("deleted!!");
    })
    .catch(function(e){
        res.status(500).json({error:e})
    })
})

// router.put('/article/update/:id',function(req,res){
//     const id=req.params.id;
//     Article.updateOne({_id:id},req.body).then(function(){
//         res.status(200).json({
//             message:"Success"
//         })
    
//     }).catch((error)=>{
//         res.status(404).json({
//             error:"error"
//         })
//     })

// })
router.put('/article/update/:id', 
 auth.verifyUser, auth.verifyAdmin,
function(req,res){
    const article_title = req.body.article_title
    const article_body = req.body.article_body
    const article_id = req.params.id

    Article.updateOne({_id : article_id},
        {article_title : article_title, article_body:article_body}
        )
        .then(function(){
            // console.log(article_id);
            res.status(200).json({message:"Updated"})
        })
        .catch(function(e){
            res.status(500).json({error:e})
        })
})

router.get('/article/show',function(req,res){
    Article.find().then(function(data){
        res.send(data);
    })
})

router.get('/article/singleshow/:id',
//auth.verifyUser,  
function(req,res){
    const article_id = req.params.id;
    Article.findOne({_id:article_id}).then(function(data){
        res.status(200).json(
            {
                success:true,data:[data]
            }
        )
    }).catch(function(e){
        res.status(500).json({error : e})
    })
})


module.exports=router;
