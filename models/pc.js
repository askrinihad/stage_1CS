const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PcSchema = new Schema ({
    id:{
        tete:{
            type:String,
            required:true,
        },
        groupe:{
            type:String,
            required:true,
        },
        amorce:{
            type:String,
            required:true,
        },
        
        unique:true
    },
    coordonee:{
        x:{
            type:Double,
            required:true,
        },
        y:{
            type:Double,
            required:true,
        },
        unique:true
    },
    nbrPairMax:{
        type:Double,
        required:true,
    },
    nbrPairOccupe:{
        type:Double,
        required:true,
    },
    pair:[
        {
        type:integer,
        required:true, 
        }
    ],
   
   
   
});

module.exports = Pc = mongoose.model('pc',PcSchema);