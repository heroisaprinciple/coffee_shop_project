const mongoose = require('mongoose');

const { Schema } = mongoose;

// a client schema
const cartSchema = new Schema({
    userId: {type: String, required: true},
    products: [
        {
            productId: {type: String},
            quantity: {type: Number, default: 1},
        }
    ]
    //the timestamp function will show the user date creation and the update date
}, {timestamps: true} )

let cartModel = mongoose.model('cartSchema', cartSchema);
module.exports = cartModel;