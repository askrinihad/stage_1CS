const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DeranAttenteSchema = new Schema ({
    titre:{
        type:String,
        required:true,
        unique:true
    },
    dateSignal:{
        type:Date,
        required:true,
        
    },
    dateLimite:{
        type:Date,
        required:true,
        
    },
    nomClient:{
        type:String,
        required:true,
        
    },
    numClient:{
        type:String,
        required:true,
        
    },
    addressClient:{
        type:String,
        required:true,
        
    },
    constitution:{
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

        },
        nomMsan:{
            type:String,
            required:true,
        },
        pair:{
            type:String,
            required:true,
            max:28,
        }
       
        
    },
    typeDerang:{
        type:String,
        required:true,
    },
    numFixClient:{
        type:String,
        required:true,
    },
    ne:{
        msan:{
            type:String,
            required:true,
        },
        lic:{
            type:Integer,
            required:true,
        },
        reference:{
            type:Integer,
        },
    },
    nomTech:{ //nom de l'équipe des techniciens
         type:String,
         required:true,
    },
    affecteEqui:{ // est ce que le dérangement est affecté au service équipement
       type:Boolean,
       required:true,
    },
    affecteTech:{ // est ce que le dérangement est affecté au technicien
        type:Boolean,
        required:true,
     },
    service:{ //service courant 
        type:String,
        required:true,
    },
    envoyeEqui:{ // est ce que le dérangement est déja envoyé au service équipement
        type:Boolean,
        required:true,
     },
     envoyeTech:{ // est ce que le dérangement est déja envoyé au technicien maintenance
        type:Boolean,
        required:true,
     },
    
     nbVisite:{
        type:Integer,
        required:true,
    },
   
   
});

module.exports = DeranAttente = mongoose.model('deranAttente',DeranAttenteSchema);