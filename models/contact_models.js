const mongoose=require('mongoose')


const contact=mongoose.model('Contact',{
    email:{
        type:String,
        require:true
    },
    help:{
        type:String,
        require:true
    }

})

module.exports=contact;
