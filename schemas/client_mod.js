const mongoose = require('mongoose');

const { Schema } = mongoose;

// a client schema
const clientSchema = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    phone: Number,
    password: String,
    review: String
})

let clientModel = mongoose.model('clientSchema', clientSchema);
module.exports = clientModel;