const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const direktorSchema = new Schema({
    name:String,
    surname:String,
    bio:String,
    date:{
        type:Date,
        default:Date.now
    }

});

module.exports = mongoose.model('direktor',direktorSchema);