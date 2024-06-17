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
    userId:{
        type:String,
        required:true
    },
    Cid:{
        type:String,
        required:true
    },
    transactionHash:{
        type:String,
        required:true
    },
    abstract:{
        type:String,
        required:true
    },
    Inventors:{
        type:String,
        required:true
    }
    

});


module.exports = mongoose.model('Applications', applicationSchema);
