// //register
// const express = require('express');
// const app = express();
// const userModel = require('./schemas/client_mod');
// const bodyParser = require("body-parser");
//
// app.post('/register', bodyParser.urlencoded({ extended: false }), (req, res) => {
//     const newUser = new userModel({
//         firstname: req.body.firstname,
//         lastname: req.body.lastname,
//         //validation is important
//         email: req.body.email,
//         phone: req.body.phone,
//         password: req.body.password
//     })
//     try {
//         const savedUser = newUser.save();
//         res.sendStatus(201).json({savedUser});
//     }
//     catch(err) {
//         res.sendStatus(500).json(err)
//     }
// })
//
