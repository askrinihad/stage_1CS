const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SecteurSchema = new Schema ({
    name:{
        type:String,
        required:true,
        unique:true
    },
    msan:[{
        nameMsan:{
            type:String,
            required:true,
        },
        address:{
            type:String,
            required:true
        }
    }],
    
   
});

module.exports = Secteur = mongoose.model('secteur',SecteurSchema);