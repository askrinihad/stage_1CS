const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CompteMobSchema = new Schema ({
    username:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },

    nameSe:{
        type:String,
        required:true,
    }
});

module.exports = CompteMob = mongoose.model('compteMob',CompteMobSchema);