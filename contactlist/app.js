//Importing modules 
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');

var app = express();

const route = require('./routes/route');

//connect to MongoDB
mongoose.connect('mongodb://localhost:27017/contactlist');

//On Connection 
mongoose.connection.on('connected',(err)=>{
    console.log('Connected to Mongo DB @ 27017');
});

mongoose.connection.on('error',()=>{
    if(err){
        console.log('Error DB connection'+err);
    }
});

//port no
const port = 3000;

//adding Middleware
app.use(cors());

//body parser
app.use(bodyparser.json());

//Static Files
app.use(express.static(path.join(__dirname,'public')));

app.use('/api',route); //Pointing to route.js

//testing server
app.get('/',(req,res)=>{
    res.send('foobar');
});

app.listen(port,()=>{
    console.log('Server started at port:'+port);
});