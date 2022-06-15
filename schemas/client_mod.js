const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
//To generate and validate hashes, we'll use the pbkdf2 algorithm from the crypto library that comes with Node.
const crypto = require('crypto');

const {Schema} = mongoose;

// a client registration schema
const clientSchema = new Schema({
    firstname: String,
    lastname: String,
    //validation is important
    email: {
        type: String, lowercase: true, unique: true, required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid'], index: true
    },
    phone: String,
    password: String,
    isAdmin: {
        type: Boolean,
        default: false
    },
    //the timestamp function will show the user date creation and the update date
}, {timestamps: true})

let clientModel = mongoose.model('clientSchema', clientSchema);
module.exports = clientModel;