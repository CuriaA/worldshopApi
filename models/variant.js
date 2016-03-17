var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// no 2
// variants on global level
var VariantSchema = new Schema({
	  articleId: {type: Schema.Types.ObjectId, ref: 'Article'},
	  width: {type: Number},
	  height: {type: Number},
	  size: {type: Number},
	  color: {type: String}
});

module.exports = mongoose.model('Variant', VariantSchema);