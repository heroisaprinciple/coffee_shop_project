const mongoose = require('mongoose');

const { Schema } = mongoose;

const employeeSchema = new Schema({
    firstname: String,
    lastname: String,
    occupation: String
})

const employeeModel = mongoose.model('employeeModel', employeeSchema);
module.exports = employeeModel;