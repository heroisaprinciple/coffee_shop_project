const mongoose = require('mongoose');

const { Schema } = mongoose;

// a schema, which client will get after clicking "buy" in the cart
const orderSchema = new Schema({
    userId: {type: String, required: true},
    products: [
        {
            productId: {type: String},
            quantity: {type: Number, default: 1},
        }
    ],
    amount: {type: Number, required: true},
    address: {type: Object, required: true},
    status: {type: String, required: true, default: 'pending' }
    //the timestamp function will show the user date creation and the update date
}, {timestamps: true} )

let orderModel = mongoose.model('orderSchema', orderSchema);
module.exports = orderModel;