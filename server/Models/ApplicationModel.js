const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({

    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    applicationStatus:{
        type: String,
        required: true,
    },
    

});


module.exports = mongoose.model('Applications', applicationSchema);
