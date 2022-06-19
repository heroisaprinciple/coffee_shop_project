//TODO: authentication

//if env file vars are undefined
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const paymentObj = require('./payment.js');
//console.log(paymentObj.public, paymentObj.secret);

//schemas and model files
const coffeeModel = require('./schemas/coffee_mod.js');
const clientModel = require('./schemas/client_mod.js');
const dessertModel = require('./schemas/dessert_mod.js');
const cartModel = require('./schemas/cart_model.js');
const orderModel = require('./schemas/order_model.js');
const userModel = require("./schemas/client_mod");


const express = require('express');
const app = express();
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bodyParser = require('body-parser');
const cors = require("cors");
const {engine} = require('express-handlebars');
const path = require("path");
const flash = require('express-flash');
const session = require('express-session');
const {body, validationResult} = require("express-validator");
const assert = require("assert");
//To generate and validate hashes, we'll use the pbkdf2 algorithm from the crypto library that comes with Node.
const CryptoJS = require('crypto-js');
const SHA256 = require("crypto-js/sha256");
const {db} = require('./schemas/coffee_mod.js');


app.set('view engine', 'hbs');

// to serve static assets (css files)
app.use(cors());
app.use(express.static('public'));
app.use(express.json());

//TODO: do it with env file
mongoose.connect('mongodb+srv://helgaclare:1234@stupidshit.wuybd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {useNewUrlParser: true, useUnifiedTopology: true},
    (err, data) => {
        if (err) {
            console.log('no connection')
        } else {
            console.log('connection successful')
        }
    })

// SEARCHING FOR AN ENTITY
app.get('/', (req, res) => {
    //if no params, we'll show products
    if (req.query.search) {
        try {
            // ".*" ij mongo is LIKE in sql db
            coffeeModel.find({title: {$regex: ".*" + req.query.search + ".*"}})
                .select({_id: 0}).lean()
                .exec((err, data) => {
                    if (data) {
                        return res.json(data);
                    }
                })
        } catch (err) {
            console.log(err);
        }
    } else {
        coffeeModel.find({}, (err, data) => {
            return res.json(data);
        });
    }
});

//POSTING TO DB
app.post('/account/register', bodyParser.urlencoded({extended: false}),
    /* if we have .custom, then there is no necessity in
    having the second parameter in the body
     */
    body('firstname', 'Name Is Required').notEmpty(),
    body('lastname', 'Last Name Is Required').notEmpty(),
    body('email', 'Not Valid Email').notEmpty().isEmail().normalizeEmail().custom(userEmail => {
        return userModel.find({
            email: userEmail
        }).then(email => {
            if (email.length > 0) {
                return Promise.reject('Account is already in use. Please, login then.');
            }
        })
    }),
    body('phone').notEmpty().isNumeric().custom((num) => {
        const regNum = new RegExp(/^(\d{3})\d{3}\d{4}$/gm);
        if (!num.match(regNum)) {
            throw new Error(`Invalid Phone Number`);
        } else {
            return true;
        }
    }),
    body('password').custom((pass) => {
        const regPassword = new RegExp(/(?=.+[a-z]{1})(?=.+[A-Z]{1})(?=.+\d{1})(?=.+[!@#$%&?]{1}).{8,}$/gm);
        if (!pass.match(regPassword)) {
            throw new Error(`Invalid Pasword. Please, use minimum 8 characters, at least
            one uppercase, one undercase, one number, one symbol.`);
        } else {
            return true;
        }
    }),
    (req, res) => {
        const newUser = new userModel({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            phone: req.body.phone,
            // to provide us a hash code
            password: SHA256(req.body.password).toString()
        })

        //until you call the func validationRes(), there is no validation happen
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        newUser.save();
        return res.json(newUser);
    })

app.post('/coffee/add', bodyParser.urlencoded({extended: false}), async (req, res) => {
    if (!await isUserAdmin(req)) {
        return res.status(401).end();
    }

    const newCoffee = new coffeeModel({
        title: req.body.title,
        size: req.body.size,
        description: req.body.description,
        ingredients: req.body.ingredients,
        price: req.body.price,
        url: req.body.url
    })
    newCoffee.save((err, data) => {
        if (err) {
            return res.status(400).json(err);
        } else {
            return res.status(201).json(data);
        }
    })
})

app.post('/account/login', async (req, res) => {
    //use async/await in case the promise of doc is returned
    const user = await userModel.findOne({email: req.body.email});

    if (!user) {
        //always use return res.status()
        return res.status(401).json('Such user does not exist. Please, try one more time or register.');
    }

    if (user.password !== SHA256(req.body.password).toString()) {
        return res.status(401).json('Wrong password. Try again.')
    }

    return res.status(201).json(user);
})

const isUserAdmin = async (req) => {
    /*
    Base64 because of Basic Authentication
    We don't need 'Basic' in the authorization header, just the base64 login and password (NOT HASHED)

    All authorization transfers in header
    */
    if (!req.headers.authorization) {
        return false;
    }
    let credentials = CryptoJS.enc.Base64.parse(req.headers.authorization.split(' ')[1]);
    credentials = credentials.toString(CryptoJS.enc.Utf8);

    let email = credentials.split(':')[0];
    let password = credentials.split(':')[1];

    //  If we don't use async/await, then the promise is returned. Use async/await
    //  to make user returned (or use a callback func)
    let user = await clientModel.findOne({email: email, password: SHA256(password).toString(), isAdmin: true})
    return user !== null;

    //console.log(req.headers);
}

app.delete('/account/delete', async (req, res) => {
    if (!await isUserAdmin(req)) {
        return res.status(401).end();
    }
    userModel.deleteOne({email: req.body.email}, (err) => {
        if (err) {
            return res.status(500).json(err);
        } else {
            return res.status(200).end();
        }
    })
})

// deleting the coffee
app.delete('/:url', async (req, res) => {
    if (!await isUserAdmin(req)) {
        return res.status(401).end();
    }
    coffeeModel.deleteOne({url: req.params.url}, (err) => {
        if (err) {
            return res.status(500).json(err);
        } else {
            return res.status(200).end();
        }
    });
})

//params are last
app.get('/:url', (req, res) => {
    coffeeModel.find({url: req.params.url})
        .select({_id: 0}).lean()
        .exec((err, entityObject) => {
            if (err) {
                console.log(err);
            } else {
                return res.json(entityObject);
            }
        })
})
module.exports = app;

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`Listening on ${port}.....`)
});

module.exports = server;
