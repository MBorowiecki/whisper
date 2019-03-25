const mongoose = require('mongoose');

var schema = mongoose.Schema({
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
    }
})

var User = mongoose.model('Users', schema);

module.exports = User;