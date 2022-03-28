const mongoose = require ('mongoose')
const Nschema =  new mongoose.Schema({
    email: {
        type:String,
        required:true,
        
    }
});

const Letter = new mongoose.model('Letter',Nschema);
module.exports = Letter;
