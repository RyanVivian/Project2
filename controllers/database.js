var mongodb = require('mongodb');
var uri = 'mongodb://ryanvivi:nem4eva@ds251845.mlab.com:51845/heroku_qd42qk6m';

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