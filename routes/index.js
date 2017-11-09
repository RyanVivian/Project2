var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var uri = 'mongodb://ryanvivi:nem4eva@ds251845.mlab.com:51845/heroku_qd42qk6m';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/mongodb', function (req, res) {
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
});

module.exports = router;
