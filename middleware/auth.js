const jwt = require('jsonwebtoken');
const User = require('../models/user_model');


module.exports.verifyUser = function(req, res, next){
    try{
        const token = req.headers.authorization.split(" ")[1]
        console.log(token)
        const data = jwt.verify(token, 'anysecretkey');
        console.log(data)
        //in this data id is available
        User.findOne({_id : data.userID})
        .then(function(userData){
            req.user = userData
            next()
        })
        .catch(function(e){
            console.log("inside try")
            res.status(401).json({error : e})
            
        })  
    }
    catch(e){
        console.log("no try")
        res.status(401).json({error : e})
        
    }    
}
//1. get token from client
//2. verify the token
//3. false- return with error msg
//4. true- get id from token
//5. fetch all the info from db using the id



module.exports.verifyAdmin = function(req,res,next){
    console.log(req.user)
    if(!req.user){
        return res.status(401).json({message : "Unauthorized(Not logged in)"})
    }
    else if(req.user.user_role != "Admin"){
        return res.status(401).json({message : "Unauthorized(Not Admin)"})
    }
    next()
}