/*
TODO:
1) store connection string into env file
2) hash the password of the user
3) Build A Node.js API Authentication With JWT Tutorial
4) nodemail email sender
5) how about using sass, not just css?
6) react bitch
 */

// The Golden Rule of Node: import YOUR OWN modules before importing NPM one
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const paymentObj = require('./payment.js');
console.log(paymentObj.public, paymentObj.secret);

const coffeeModel = require('./schemas/coffee_mod.js');
const clientModel = require('./schemas/client_mod');
const employeeModel = require('./schemas/employees_mod');
const dessertModel = require('./schemas/dessert_mod');
const shopModel = require('./schemas/black_white_mod');
const bodyParser = require('body-parser');

const express = require('express');
const app = express();
const mongoose = require('mongoose');

const cors = require("cors");
const { engine } = require('express-handlebars');
const path = require("path");
app.set('view engine', 'hbs');

// to serve static assets (css files)
app.use(cors());
app.use(express.static('public'));
app.engine('.hbs', engine({
    extname: ".hbs",
    defaultLayout: "main",
    // a path to all other layouts
    layoutsDir: path.join(__dirname, 'views/layouts')
}))

//TODO: do it with env file
mongoose.connect('mongodb+srv://helgaclare:1234@stupidshit.wuybd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, data) => {
        if (err) { console.log('no connection') }
        else { console.log('connection successful') }
    })


app.get('/', (req, res) => {
    //if no params, we'll show products
    if (req.query.search) {
        try {
            // ".*" ij mongo is LIKE in sql db
            coffeeModel.find({title: {$regex: ".*" + req.query.search + ".*"}})
                //The lean() function tells mongoose to not hydrate query results.
                // In other words, the results of your queries will be the same plain JavaScript objects that you would
                // get from using the Node. js MongoDB driver directly, with none of the mongoose magic
                .select({_id: 0}).lean()
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
        res.render('index', {
            title: 'The Black&White Production',
            style: 'main.css'
        })
    }
});

//middleware runs for every request, if not specify next()
// app.use(function (req, res, next) {
//     console.log("Middleware called");
//     next();
// });

app.get('/:url', (req, res) => {
    coffeeModel.find({ url: req.params.url })
        .select({_id: 0}).lean()
        .exec((err, entityObject) => {
        if (err) { console.log(err); }
        else {
            res.render('entity', {
                style: 'entity.css',
                data: entityObject
            })
        }
    })
})



module.exports = app;

// if already in use, but no signs of server running:
// lsof -i:3000
// kill -9 [PID]
const port = process.env.PORT || 3000;
const server = app.listen(port, () => { console.log(`Listening on ${port}.....`)});

module.exports = server;
