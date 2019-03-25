const mongoose = require('mongoose');

let ObjectId = mongoose.Schema.Types.ObjectId

let schema = mongoose.Schema({
    from: {
        type: ObjectId,
        required: true
    },
    to: {
        type: ObjectId,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})