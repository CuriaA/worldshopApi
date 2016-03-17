var express = require('express');
var router = express.Router();
var Article = require('../models/article');

//get
router.route('/articles').get(function(req, res, next) {
	
  Article.find(function(err, articles) {
    if (err) {
      return res.send(err);
    }

    res.json(articles);
  });
});

//post
router.route('/articles').post(function(req, res, next) {
  var article = new Article(req.body);

  article.save(function(err) {
	  
	//if (err) return next(err);  
    if (err) {
      return res.send(err);
    }

    res.send({ message: 'Article Added!' });
  });
});

//update one
router.route('/articles/:id').put(function(req,res){
  Article.findOne({ _id: req.params.id }, function(err, article) {
    if (err) {
      return res.send(err);
    }

    for (prop in req.body) {
      article[prop] = req.body[prop];
    }

    // save the article
    article.save(function(err) {
      if (err) {
        return res.send(err);
      }

      res.json({ message: 'Article updated!' });
    });
  });
});

//get one
router.route('/articles/:id').get(function(req, res) {
  Article.findOne({ _id: req.params.id}, function(err, article) {
    if (err) {
      return res.send(err);
    }

    res.json(article);
  });
});

//delete one
router.route('/articles/:id').delete(function(req, res) {
  Article.remove({
    _id: req.params.id
  }, function(err, article) {
    if (err) {
      return res.send(err);
    }

    res.json({ message: 'Article deleted!' });
  });
});


module.exports = router;
