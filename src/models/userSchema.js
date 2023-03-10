const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 50
    },
    password: {
        type: String,
        required: true,
        min: 5
    },
    avatar: {
        type: String,
        default: "",
       
    },
    friends: {
        type: Array,
        default: []
    }, 
    location: String,
    occupation: String,


}, {timestamps: true});

module.exports = mongoose.model('User', UserSchema);