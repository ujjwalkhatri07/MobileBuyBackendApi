const multer = require('multer')

const storage = multer.diskStorage({    
    destination : "./public/pictures",
    filename : function(req,file,cb){
        console.log("file",file)
        cb(null, Date.now()+file.originalname)

    }
})

const fileFilter = function(req,file,cb){
    if(file.mimetype=="image/jpeg" || file.mimetype=="image/png" || file.mimetype=="image/jpg"//'application/pdf'
    ){
        cb(null,true)
    }
    else{
        cb(null,false)
    }
}


//New filter 
// const imageFileFilter = (req, file, cb) => {
//     if(!file.originalname.match(/\.(jpeg|jpg|png|gif|JPG|JPEG|PNG|GIF)$/)){
//         return cb(new Error("You can only upload image files"), false);
//     }
//     cb(null, true);
// }

const upload = multer({
    storage : storage,
    fileFilter : fileFilter
    
})

module.exports = upload;