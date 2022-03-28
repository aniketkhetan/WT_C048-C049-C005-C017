const mongoose = require ("mongoose");
const Oschema = new mongoose.Schema({


    imagePath: {
        type:String,
        required:true,
    },

    title:{

        type:String,
        required:true,
    },

    price:{

        type:Number,
        required:true
    }

});

const Food = new mongoose.model('Food', Oschema);


module.exports = Food;

