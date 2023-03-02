const mongoose = require('mongoose');
const express = require('express')
const mongodb = express.mongodb;
const dotenv = require('dotenv');

dotenv.config();
//clearout the pagarapht after the start the server
mongoose.set('strictQuery', true);

//mongodb connection to database
mongoose.connect('mongodb+srv://admin:admin123@cluster1.agexxhm.mongodb.net/Splinter?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
})

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'error'));
db.once('open', ()=> {
    console.log('We are connected to the database');
})

module.exports = mongodb;