const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CompteWebSchema = new Schema ({
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

module.exports = CompteWeb = mongoose.model('compteWeb',CompteWebSchema);