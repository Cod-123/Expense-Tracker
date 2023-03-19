const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({

    name:{
        type : String,
        required : true
    },

    expense:{
        type : String,
        required : true
    },

    date:{
        type : Date,
        default : Date.now
    },
    
    amount:{
        type : Number,
        required : true
    }

    
},{ timestamps : true });

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;

