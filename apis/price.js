var express = require('express');
var router = express.Router();
var Price = require('../models/price');

//get
router.route('/prices').get(function(req, res, next) {
	
  Price.find(function(err, prices) {
    if (err) {
      return res.send(err);
    }

    res.json(prices);
  });
});

//post
router.route('/prices').post(function(req, res, next) {
  var price = new Price(req.body);

  price.save(function(err) {
	  
	//if (err) return next(err);  
    if (err) {
      return res.send(err);
    }

    res.send({ message: 'Price Added!' });
  });
});

//update one
router.route('/prices/:id').put(function(req,res){
  Price.findOne({ _id: req.params.id }, function(err, price) {
    if (err) {
      return res.send(err);
    }

    for (prop in req.body) {
      price[prop] = req.body[prop];
    }

    // save the price
    price.save(function(err) {
      if (err) {
        return res.send(err);
      }

      res.json({ message: 'Price updated!' });
    });
  });
});

//get one
router.route('/prices/:id').get(function(req, res) {
  Price.findOne({ _id: req.params.id}, function(err, price) {
    if (err) {
      return res.send(err);
    }

    res.json(price);
  });
});

//delete one
router.route('/prices/:id').delete(function(req, res) {
  Price.remove({
    _id: req.params.id
  }, function(err, price) {
    if (err) {
      return res.send(err);
    }

    res.json({ message: 'Price deleted!' });
  });
});


module.exports = router;
