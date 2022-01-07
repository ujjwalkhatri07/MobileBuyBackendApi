const mongoose=require('mongoose');

const User=mongoose.model('User',{
    user_username:{
        type : String,
        required : true
    },
    user_contactno:{
        type:String,
        required : true
    },
    user_email:{
        type:String,
        required : true
    },
    user_password:{
        type:String,
        required : true
    },
    user_role:{
        type:String,
        enum : ["Admin","User"],
        default : "User"
    },
})
module.exports=User;