const mongoose = require('../db/connection');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    feet: {
        type: String,
        required: true
    },
    inches: {
        type: String,
        required: true
    },
    initialWeight: {
        type: String,
        required: true
    },
    goal: {
        type: String,
        required: true
    },
    currentWeight: String,

})

const User = mongoose.model('User', userSchema)
module.exports = User
