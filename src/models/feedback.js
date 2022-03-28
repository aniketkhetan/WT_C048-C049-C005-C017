const mongoose = require("mongoose");
const Fschema = new mongoose.Schema ({


    experience : {
        type:String,
        required:true
    },

    comments: {
        type:String,
        required:true
    },

    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    }


});

const Feedback = new mongoose.model("Feedback", Fschema);

module.exports = Feedback;


 