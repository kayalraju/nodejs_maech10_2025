const express = require('express');
const ejs= require('ejs');
const cors=require('cors');
const path=require('path');

const dotenv=require('dotenv').config();
const dbcon=require('./app/config/dbcon')

const app = express();

dbcon()


app.use(cors())
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

const port=3006
app.listen(port, () => {
    console.log('Server started on port 3006');
});