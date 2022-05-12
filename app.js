/*
TODO:
1) store connection string into env file
2) hash the password of the user
3) Build A Node.js API Authentication With JWT Tutorial
4) nodemail email sender
5) how about using sass, not just css?
6) react bitch
 */

const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config')
const coffeeModel = require('./schemas/coffee_mod.js');
const clientModel = require('./schemas/client_mod');
const employeeModel = require('./schemas/employees_mod');
const dessertModel = require('./schemas/dessert_mod');
const shopModel = require('./schemas/black_white_mod');
const bodyParser = require('body-parser');
const cors = require("cors");
//const { engine } = require('express-handlebars');

app.set('view engine', 'hbs');

// to serve static assets (html/css files)
app.use(cors());
app.use(express.static('public'));
app.get('/', (req, res) => {
    //if no params, we'll show products
    if (req.query.search) {
        try {
            // ".*" ij mongo is LIKE in sql db
            coffeeModel.find({title: {$regex: ".*" + req.query.search + ".*"}})
                .select({_id: 0})
                .exec((err, data) => {
                    if (data) {
                        res.render("search", {data: data});
                    }
                })
        }
        catch (err) {
            console.log(err);
        }
    }
    else {
        res.sendFile(__dirname + '/views/index.html')
    }
});

//TODO: do it with env file
mongoose.connect('mongodb+srv://helgaclare:1234@stupidshit.wuybd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, data) => {
    if (err) { console.log('no connection') }
    else { console.log('connection successful') }
})

//middleware runs for every request, if not specify next()
// app.use(function (req, res, next) {
//     console.log("Middleware called");
//     next();
// });

// Strictly speaking, HTTP 301 and 302 are not required to keep the same method and body content when redirecting.
// If you're redirecting a POST request, you should use HTTP 307 as a replacement for HTTP 302, and HTTP 308 as a
// replacement for HTTP 301.
app.get('/:title', bodyParser.urlencoded({ extended: false }), (req, res) => {
    console.log(req.params);
    try {
        coffeeModel.findOne({url: req.params.title})
            .limit(1)
            .select({_id: 0})
            .exec((err, data) => {
                if (data) {
                    res.json(data);
                }
            })
    }
    catch (err) {
        console.log(err);
    }
})

app.get('/menu', async (req, res) => {
    await coffeeModel.find({}, (err, obj) => {
        if (err) {
            res.json(err);
        }
        else {
            res.json(obj);
        }
    })
})

//specific get
app.get('/:coffee_id', async (req, res) => {
    try {
        //it will find and show the obj created in the model by using id
        let findCoffById = await coffeeModel.findById(req.params.id);
        res.json(findCoffById);
    }
    catch(err) {
        res.json({message: err})
    }
})

// update a coffee entry
// patch is an http method that allows partial modifications
// $set outputs documents that contain all existing fields from the input documents and newly added fields.
app.patch('/:coffee_id', async (req, res) => {
    try {
        const updatedCoffeeEntry = await coffeeModel.updateOne({_id: req.params.id}, //the second arg is what we update
            {$set: {title: req.body.title}})
        res.json(updatedCoffeeEntry);
    }
    catch(err) {
        res.json({message: err});
    }
})


module.exports = app;

// if already in use, but no signs of server running:
// lsof -i:3000
// kill -9 [PID]
const port = process.env.PORT || 3000;
const server = app.listen(port, () => { console.log(`Listening on ${port}.....`)});

module.exports = server;
