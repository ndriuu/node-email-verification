require("dotenv").config();
const session = require('express-session')
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const userRouter = require('./api/user/user.router');
app.use(express.json());
app.set('view engine','ejs')
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized:true
    })
)
app.use(bodyParser.urlencoded({ extended:true }))
app.use(bodyParser.json())
app.use('/api/user', userRouter);

app.listen(3000,function(){
	console.log("Express Started on Port 3000");
});