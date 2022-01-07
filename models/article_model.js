const mongoose=require('mongoose');

const Article=mongoose.model('Article',{
    article_title:{
        type : String,
        required : true
    },
    article_body:{
        type:String,
        required : true
    },
})
module.exports=Article;