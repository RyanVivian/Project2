var mongodb = require('mongodb');
var uri = 'mongodb://ryanvivi:nem4eva@ds251845.mlab.com:51845/heroku_qd42qk6m';
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser'); //to process data sent in on request need body-parser module

router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencode

module.exports.getAllOrders = function (req, res) {
    mongodb.MongoClient.connect(uri, function(err, db) {
        if(err) throw err;

        // Get collection of orders.
        var orders = db.collection('ORDERS');
        // Get all orders.
        orders.find({ }).toArray(function (err, docs) {
            if(err) throw err;

            res.render('pages/mongodb', {results: docs});
        });
        // Close connection.
        db.close(function  (err) {
            if(err) throw err;

        });
    });
};

module.exports.storeData = function (req, res) {

    //now processing post
    //expecting data variable called name --retrieve value using body-parser
    var body = JSON.stringify(req.body);  //if wanted entire body as JSON
    var params = JSON.stringify(req.params);//if wanted parameters

    var first = 'first';  //retrieve the data associated with order data
    var last = 'last';
    var address = 'address';
    var city = 'city';
    var state = req.body.state;
    var zip = req.body.zip;
    var card = req.body.card;
    var card_num = req.body.card_num;
    var exp_date = req.body.exp_date;

    mongodb.MongoClient.connect(uri, function(err, db) {
        if(err) throw err;

        // Create IDs for all the collections.
        var customerID = Math.floor((Math.random() * 1000000000000) + 1);
        var billingID = Math.floor((Math.random() * 1000000000000) + 1);
        var shippingID = Math.floor((Math.random() * 1000000000000) + 1);

        // Get collection of customers, billing, shipping, orders.
        var customers = db.collection('CUSTOMERS');
        var billing = db.collection('BILLING');
        var shipping = db.collection('SHIPPING');
        var orders = db.collection('ORDERS');

        // Insert data into CUSTOMERS.
        var customerData = {_id : customerID, FIRSTNAME : first, LASTNAME : last,
            STREET : address, CITY : city, STATE : state, ZIP : zip};

        customers.insertOne(customerData, function (err, result) {
            if (err) throw err;
        });

        // Insert data into BILLING.
        // var billingData =

        // Close connection.
        db.close(function  (err) {
            if(err) throw err;
        });
    });
};