const mongoose = require('mongoose');

const { Schema } = mongoose;

// a coffee schema
const coffeeSchema = new Schema({
    title: String,
    size: Number,
    description: String,
    ingredients: [String],
    price: Number,
    url: String,
    img: String
})

let coffeeModel = mongoose.model('coffeeSchema', coffeeSchema);
module.exports = coffeeModel;