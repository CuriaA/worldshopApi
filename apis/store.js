var express = require('express');
var router = express.Router();
var Store = require('../models/store');

//get
router.route('/stores').get(function(req, res, next) {
	
  Store.find(function(err, stores) {
    if (err) {
      return res.send(err);
    }

    res.json(stores);
  });
});

//post
router.route('/stores').post(function(req, res, next) {
  var store = new Store(req.body);

  store.save(function(err) {
	  
	//if (err) return next(err);  
    if (err) {
      return res.send(err);
    }

    res.send({ message: 'Store Added!' });
  });
});

//update one
router.route('/stores/:id').put(function(req,res){
  Store.findOne({ _id: req.params.id }, function(err, store) {
    if (err) {
      return res.send(err);
    }

    for (prop in req.body) {
      store[prop] = req.body[prop];
    }

    // save the store
    store.save(function(err) {
      if (err) {
        return res.send(err);
      }

      res.json({ message: 'Store updated!' });
    });
  });
});

//get one
router.route('/stores/:id').get(function(req, res) {
  Store.findOne({ _id: req.params.id}, function(err, store) {
    if (err) {
      return res.send(err);
    }

    res.json(store);
  });
});

//delete one
router.route('/stores/:id').delete(function(req, res) {
  Store.remove({
    _id: req.params.id
  }, function(err, store) {
    if (err) {
      return res.send(err);
    }

    res.json({ message: 'Store deleted!' });
  });
});


module.exports = router;
