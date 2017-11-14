var express = require('express');
var router = express.Router();
// var mongodb = require('mongodb');
// var uri = 'mongodb://ryanvivi:nem4eva@ds251845.mlab.com:51845/heroku_qd42qk6m';

// Get controller code.
var controllerDBOrders = require('../controllers/database');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/mongodb', controllerDBOrders.getAllOrders);

module.exports = router;
