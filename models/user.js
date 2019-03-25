const mongoose = require('mongoose');

let schema = mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    avatar_url: {
        type: String
    },
    friends: {
        type: Array
    },
    favourites: {
        type: Array
    }
})

let User = mongoose.model('Users', schema);

module.exports = User;