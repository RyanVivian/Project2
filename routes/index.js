var express = require('express');
var router = express.Router();
//to process data sent in on request need body-parser module
var bodyParser = require('body-parser');

router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencode

// Get controller code.
var controllerDBOrders = require('../controllers/database');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/mongodb', controllerDBOrders.getAllOrders);
router.post('/testData', controllerDBOrders.testPhp);


module.exports = router;
