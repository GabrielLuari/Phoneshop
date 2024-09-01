const mongoose = require('mongoose');
const PersonSchema = new mongoose.Schema({
  seller:{
    type:String,
  },
    phoneName: {
        type: String,
        required: [true,"name is required"],
        minlength: [3, "name should be longer than 3 characters"]
    },
    price: {
        type:String,
   
    },
   gb: {
        type:String,
        
    },
    img: {
        type: String,
        //required: [true, "Image  is required"]
    },

    description:{
        type:String,
    },  
    category:{
        type:String,
    }

}, { timestamps: true });

module.exports = mongoose.model('Person', PersonSchema);
