const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Posts = new Schema({
    unique_id : {
        type    : String,
        default : mongoose.Types.ObjectId,
        index   : { unique: true }
    },

    Heading_main: {
        type : String,
        required: 'Please provide the content heading'
    },

    content: {
        type : String,
        required: 'Please provide the content'
    },

    mention_name: {
        type : String,
    },

    wall_color: {
        type: String,
        required: "please provide the color for your wall"
    },

    wall_style: {
        type: String,
        default: ""
    },

    tags: {
        type : String,
        default: ""
    },

    created_by: {
        type : String,
        required: 'Please provide the createar of the content'
    },

    created_at: {
        type : Number,
        default: Date.now()
    },

    deleted: {
        type : Boolean,
        default: false
    },

    reported: {
        type : Boolean,
        default: false
    },

    updated_by: {
        type : String,
        default: ""
    },

    updated_at: {
        type : Number,
        default: ""
    },

});

module.exports = mongoose.model('Posts', Posts);
