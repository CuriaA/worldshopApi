var express = require('express');
var router = express.Router();
var Inventory = require('../models/inventory');

//get
router.route('/inventories').get(function(req, res, next) {
	
  Inventory.find(function(err, inventories) {
    if (err) {
      return res.send(err);
    }

    res.json(inventories);
  });
});

//post
router.route('/inventories').post(function(req, res, next) {
  var inventory = new Inventory(req.body);

  inventory.save(function(err) {
	  
	//if (err) return next(err);  
    if (err) {
      return res.send(err);
    }

    res.send({ message: 'Inventory Added!' });
  });
});

//update one
router.route('/inventories/:id').put(function(req,res){
  Inventory.findOne({ _id: req.params.id }, function(err, inventory) {
    if (err) {
      return res.send(err);
    }

    for (prop in req.body) {
      inventory[prop] = req.body[prop];
    }

    // save the inventory
    inventory.save(function(err) {
      if (err) {
        return res.send(err);
      }

      res.json({ message: 'Inventory updated!' });
    });
  });
});

//get one
router.route('/inventories/:id').get(function(req, res) {
  Inventory.findOne({ _id: req.params.id}, function(err, inventory) {
    if (err) {
      return res.send(err);
    }

    res.json(inventory);
  });
});

//delete one
router.route('/inventories/:id').delete(function(req, res) {
  Inventory.remove({
    _id: req.params.id
  }, function(err, inventory) {
    if (err) {
      return res.send(err);
    }

    res.json({ message: 'Inventory deleted!' });
  });
});


module.exports = router;
