const registration=require('../models/user_model')

 
const mongoose=require('mongoose')

 
const Registration = require('../models/user_model')

 
const pro=require('../models/product_model')

 
const product=require('../models/product_model')

 
const sub=require('../models/contact_models')

 
const subscribe=require('../models/contact_models')

 
 

 
const url='mongodb://localhost"27017/userTest'

 
 

 
beforeAll(async()=>{

 
await mongoose.connect(url,{

 
useNewUrlParser:true,

 
useCreateIndex:true

 
})

 
})

 
 

 
afterAll(async()=>{

 
await mongoose.connection.close()

 
})

 
 

 
//insert user

 
describe('Testing for user insert',()=>{

 
it('addUserTest',()=>{

 
const register={

    "user_username":"hari",
    "user_email":"hari@gmail.com",
    "user_contactno":"9885465156",
    "user_password":"passw"

 
}

 
return registration.create(register)

 
.then((usersData)=>{

 
expect(usersData.user_username).toEqual('hari')

 
})

 
})

 
})

 
 

 
//insert product

 
 

 
 

 
describe('Testing for product insert',()=>{

 
it('addProductTest',()=>{

 
const addproduct={

 
    "product_img":"good",
    "product_name":"Poco",
    "product_price":"3456789",
    "product_desc":"Good"

 
}

 
return pro.create(addproduct)

 
.then((products)=>{

 
expect(products.product_name).toEqual('Poco')

 
})

 
})

 
})

 
 

 
//insert product

 
 

 
 

 
describe('Testing for contact',()=>{

 
it('addProductTest',()=>{

 
const subscription={

 
'email':'khatri@gmail.com',
'help':"msg"

 
}

 
return sub.create(subscription)

 
.then((subs)=>{

 
expect(subs.email).toEqual('khatri@gmail.com')

 
})

 
})

 
})

 
 

 
// the code below is for delete testing

 
// it('delete test', async () => {

 
// const status = await pro.deleteMany();

 
// expect(status.ok).toBe(1);

 
// });

 
 

 
// //

 
 

 
// it('to test the update', async () => {

 
// return pro.findOneAndUpdate({_id :Object('606c114131a01f35b4d38e25')},

 
// {$set : {productName:'ram'}})

 
// .then((products)=>{

 
// expect(products.productName).toEqual('ram')

 
// })

 
// })

