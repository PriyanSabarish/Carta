const mongoose = require('mongoose');

const patentSchema = new mongoose.Schema({

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
    applicationID:{
        type: String,
        required: true,
    },

});


module.exports = mongoose.model('Patents', patentSchema);
