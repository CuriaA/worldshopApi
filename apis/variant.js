var express = require('express');
var router = express.Router();
var Variant = require('../models/variant');

//get
router.route('/variants').get(function(req, res, next) {
	
  Variant.find(function(err, variants) {
    if (err) {
      return res.send(err);
    }

    res.json(variants);
  });
});

//post
router.route('/variants').post(function(req, res, next) {
  var variant = new Variant(req.body);

  variant.save(function(err) {
	  
	//if (err) return next(err);  
    if (err) {
      return res.send(err);
    }

    res.send({ message: 'Variant Added!' });
  });
});

//update one
router.route('/variants/:id').put(function(req,res){
  Variant.findOne({ _id: req.params.id }, function(err, variant) {
    if (err) {
      return res.send(err);
    }

    for (prop in req.body) {
      variant[prop] = req.body[prop];
    }

    // save the variant
    variant.save(function(err) {
      if (err) {
        return res.send(err);
      }

      res.json({ message: 'Variant updated!' });
    });
  });
});

//get one
router.route('/variants/:id').get(function(req, res) {
  Variant.findOne({ _id: req.params.id}, function(err, variant) {
    if (err) {
      return res.send(err);
    }

    res.json(variant);
  });
});

//delete one
router.route('/variants/:id').delete(function(req, res) {
  Variant.remove({
    _id: req.params.id
  }, function(err, variant) {
    if (err) {
      return res.send(err);
    }

    res.json({ message: 'Variant deleted!' });
  });
});


module.exports = router;
