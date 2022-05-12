const mongoose = require('mongoose');

const { Schema } = mongoose;

// a dessert schema
const dessertSchema = new Schema({
    title: String,
    size: Number,
    description: String,
    ingredients: [String],
    price: Number,
    url: String,
    img: String
})

let dessertModel = mongoose.model('dessertModel', dessertSchema);
module.exports = dessertModel;