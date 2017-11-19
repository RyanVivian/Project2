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
router.get('/testData', function (req, res) {

    //now processing post
    //expecting data variable called name --retrieve value using body-parser
    var body = JSON.stringify(req.body);  //if wanted entire body as JSON
    var params = JSON.stringify(req.params);//if wanted parameters

    var first = req.body.first;  //retrieve the data associated with order data
    var last = 'last';
    var address = 'address';
    var city = req.body.city;
    var state = req.body.state;
    var zip = req.body.zip;
    var card = req.body.card;
    var card_num = req.body.card_num;
    var exp_date = req.body.exp_date;
    res.render('pages/testDisplay', {first: first, last: last, address: address});
});


module.exports = router;
