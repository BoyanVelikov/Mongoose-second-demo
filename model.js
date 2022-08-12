const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let cars = new Schema({
    manifacturer: {
        type: String,
        required: [true, 'This field is required.']
    },
    model: {
        type: String
    },
    carType: {
        type: String,
        minLength: [4, 'The cartype name is too short.']
    }
}, {
    collection: 'Cars'
});

module.exports = mongoose.model('cars', cars);