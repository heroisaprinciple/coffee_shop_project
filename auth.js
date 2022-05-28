//register
const express = require('express');
const app = express();
const userModel = require('./schemas/client_mod');

app.post('/register', (req, res) => {
    const newUser = new userModel({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        //validation is important
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password
    })
})

