const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    unique_id : {
        type : String,
        default : mongoose.Types.ObjectId,
        unique: true,
    },
    username: {
        type : String,
        unique: true,
        required: "please provide the user name"
    },
    email: {
        type: String,
        unique: true,
        required: "please provide the email address",
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
    },
    created_at: {
        type : Number,
        default: Date.now()
    },
    displayname: {
        type : String,
        required: "please provide your display name"
    },
    password: {
        type: String,
        required: "please provide your password"
    },
    avatar: {
        type: String,
        required: "please provide your avatar"
    }

});

module.exports = mongoose.model('User', User);
