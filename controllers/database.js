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

    // Retrieve the data associated with customer.
    var first = req.body.first;
    var last = req.body.last;
    var cust_address = req.body.cust_address;
    var cust_city = req.body.cust_city;
    var cust_state = req.body.cust_state;
    var cust_zip = req.body.cust_zip;
    var cust_email = req.body.cust_email;
    // Retrieve the data associated with billing.
    var card = req.body.card;
    var card_num = req.body.card_num;
    var exp_date = req.body.exp_date;
    // Retrieve the data associated with shipping.
    var ship_address = req.body.ship_address;
    var ship_city = req.body.ship_city;
    var ship_state = req.body.ship_state;
    var ship_zip = req.body.ship_zip;
    // Retrieve the data associated with orders.
    var prod_vect = req.body.prod_vect;
    var total = req.body.total;

    // Connect to the database.
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

        // Create a document to insert into CUSTOMERS.
        var customerData = {_id : customerID, FIRSTNAME : first, LASTNAME : last,
            STREET : cust_address, CITY : cust_city, STATE : cust_state, ZIP : cust_zip, EMAIL: cust_email};

        // Create a document to insert into BILLING.
        var billingData = {_id : billingID, CUSTOMER_ID : customerID, CREDITCARDTYPE : card,
            CREDITCARDNUM : card_num, CREDITCARDEXP : exp_date};

        // Create a document to insert into SHIPPING.
        var shippingData = {_id : billingID, CUSTOMER_ID : customerID, SHIPPING_STREET : ship_address,
            SHIPPING_CITY : ship_city, SHIPPING_STATE : ship_state, SHIPPING_ZIP : ship_zip};

        // Create a document to insert into ORDERS.
        var orderData = {CUSTOMER_ID : customerID, BILLING_ID : billingID, SHIPPING_ID : shippingID,
            DATE : new Date().toDateString(), PRODUCT_VECTOR : prod_vect, ORDER_TOTAL : total};

        // Insert document into CUSTOMERS.
        customers.insertOne(customerData, function (err, result) {
            if (err) throw err;
        });

        // Insert document into BILLING.
        billing.insertOne(billingData, function (err, result) {
            if (err) throw err;
        });

        // Insert document into SHIPPING.
        shipping.insertOne(shippingData, function (err, result) {
            if (err) throw err;
        });

        // Insert document into ORDERS.
        orders.insertOne(orderData, function (err, result) {
            if (err) throw err;
        });

         // Render storeData.ejs with all the transaction data.
        res.render('pages/storeData', {customer: customerData, order: orderData,
            billing: billingData, shipping: shippingData });

        // Close connection.
        db.close(function  (err) {
            if(err) throw err;
        });
    });
};