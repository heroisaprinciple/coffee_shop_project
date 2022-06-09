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

//if env file vars are undefined
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
console.log("ENV: ")
console.log(process.env.STRIPE_SECRET_KEY)
console.log(process.env.STRIPE_PUBLIC_KEY)
const paymentObj = require('./payment.js');
//console.log(paymentObj.public, paymentObj.secret);

//schemas and model files
const coffeeModel = require('./schemas/coffee_mod.js');
const clientModel = require('./schemas/client_mod.js');
const employeeModel = require('./schemas/employees_mod.js');
const dessertModel = require('./schemas/dessert_mod.js');
const shopModel = require('./schemas/black_white_mod.js');
const cartModel = require('./schemas/cart_model.js');
const orderModel = require('./schemas/order_model.js');
const userModel = require("./schemas/client_mod");

// other files
const userAuth = require('./auth.js');

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
//To generate and validate hashes, we'll use the pbkdf2 algorithm from the crypto library that comes with Node.
const crypto = require('crypto');
const bodyParser = require('body-parser');
const cors = require("cors");
const { engine } = require('express-handlebars');
const path = require("path");
const validator = require('validator');
const flash = require('express-flash');
const session = require('express-session');
const {body, validationResult} = require("express-validator");
const assert = require("assert");
const { db } = require('./schemas/coffee_mod.js');


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


app.get('/register', (req, res) => {
    try {
        res.render('register', {
            style: 'register.css',
            script: 'register.js'
        })
    }
    catch (err) {
        console.log(err);
    }
})

app.post('/account', bodyParser.urlencoded({ extended: false }), (req, res) => {
    // do email validation, if email exists in db...
    const newUser = new userModel({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        //validation is important
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password
    })
    
        //assert makes a field validated
        body('firstname', 'Name is required').isEmpty();
        body('lastname', 'Last Name is required').isEmpty();
        body('email', 'Not valid email').isEmail();

        console.log('damn lapki');
        console.log(req.body);

        //if phone number doesn't match the reg, alert('Not valid phone num')
        const regNum = new RegExp(/^((\d{3}[- ]*)|(\(\d{3}[- ]*\) *))\d{3}[- ]?\d{4}$/gm);
        //if password doesn't match the reg, alert('Not valid password: minimum 8 characters, at least
        // one uppercase, one undercase, one number, one symbol, no spaces');
        const regPassword = new RegExp(/(?=.+[a-z]{1})(?=.+[A-Z]{1})(?=.+\d{1})(?=.+[!@#$%&?]{1}).{8,}$/gm);
        if (!req.body.phone.match(regNum)) {
            //render other hbs file with error
            // no alert exists
            alert('Not valid phone number');
        }

        if (!req.body.password.match(regPassword)) {
            alert(`Not valid password: minimum 8 characters, at least  one uppercase, one undercase, one number, 
            one symbol, no spaces`);
        }

        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        newUser.save();

        res.redirect('/account');
        res.json({newUser});
   
        console.log('олег у меня еще больше лапок');
})

app.get('/account', (req, res) => {
    res.render('account');
})

//params are last
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
