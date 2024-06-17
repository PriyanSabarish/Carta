const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    
    patentId:{
        type: String,
        required: true,
    },
    commentBy:{
        type: String,
        required: true,
    },
    userName:{
        type: String,
        required: true,
    },
    commentText:{
        type: String,
        required: true,
    },
    replies:[{
        type: String,
        required: false,
    }],

    

});


module.exports = mongoose.model('Comments', commentSchema);
