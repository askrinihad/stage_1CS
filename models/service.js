const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ServiceSchema = new Schema ({
    name:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
   
  
   
});

module.exports = Service = mongoose.model('service',ServiceSchema);