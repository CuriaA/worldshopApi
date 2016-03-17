var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// no 1
// articles on global level
var ArticleSchema = new Schema({
	  department: {type: String},
	  category: {type: String},
	  brand: {type: String},
	  thumbnail: {type: String},
	  title: {type: String},
	  description: {type: String}
});

module.exports = mongoose.model('Article', ArticleSchema);