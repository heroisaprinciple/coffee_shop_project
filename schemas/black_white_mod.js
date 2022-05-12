const mongoose = require('mongoose');

const { Schema } = mongoose;

const coffeeShopSchema = new Schema({
    title: String,
    address: String,
    phone: Number,
    email: String
})

const coffeeShopModel = mongoose.model('coffeeShopModel', coffeeShopSchema);
module.exports = coffeeShopModel;