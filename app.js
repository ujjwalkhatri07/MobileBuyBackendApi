const mongoose=require('mongoose');
const express=require('express');
const bodyParser=require('body-parser')
const cors = require('cors');

const db=require('./database/db');
const user_route=require('./routes/user_route');
const product_route=require('./routes/product_route');
const article_route=require('./routes/article_route');
const cart_route=require('./routes/cart_route')
const admin_route=require('./routes/admin_route')
const contact_route=require('./routes/contact_route')
const app=express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}))

app.use('/public', express.static(__dirname + '/public'));


app.use(user_route);
app.use(product_route);
app.use(contact_route)
app.use(article_route);

app.use(cart_route);
app.listen(90);
