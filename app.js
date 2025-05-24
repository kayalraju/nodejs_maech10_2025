const express = require('express');
const ejs= require('ejs');
const cors=require('cors');
const path=require('path');
const flash=require('connect-flash');
const session=require('express-session');
const cookieParser=require('cookie-parser')

const dotenv=require('dotenv').config();
const dbcon=require('./app/config/dbcon')

const app = express();

dbcon()


app.use(cors())

app.use(session({
    cookie: { maxAge: 60000 },
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser())
app.use(flash());
//define the view engine
app.set('view engine', 'ejs');
app.set('views','views')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//crete a static folder
app.use(express.static('public'));
//app.use("/public", express.static(__dirname + '/public'));
app.use('/uploads',express.static(path.join(__dirname,'/uploads') ));  

const homeRoute = require('./app/router/homeRoute');
const studentRoute = require('./app/router/StudentApiRoute');
app.use('/api',studentRoute);
app.use(homeRoute);
const CsbRouter=require('./app/router/csvRouter');
app.use('/api',CsbRouter);
const JoiRouter=require('./app/router/JoiRoute');
app.use('/api',JoiRouter);

const routerejs=require('./app/router/crudejsrouter');
app.use(routerejs);

const authRoute=require('./app/router/authRoute');
app.use('/api',authRoute);

const ejsAuthRoute=require('./app/router/authEjsRoute')
app.use(ejsAuthRoute)

const port=3006
app.listen(port, () => {
    console.log('Server started on port 3006');
});