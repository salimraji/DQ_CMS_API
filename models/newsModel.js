const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const newsSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    link:{
        type: String,
        require: true
    },
    image:{
        type: String,

    }

})

module.exports = mongoose.model('News', newsSchema)