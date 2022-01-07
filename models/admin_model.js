const mongoose=require('mongoose');

const Admin=mongoose.model('Admin',{
    admin_name:{
        type:String,
        required : true
    },
    admin_email:{
        type:String,
        required : true
    },
    admin_password:{
        type:String,
        required : true
    }

});
module.exports=Admin;