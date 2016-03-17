var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// prices on art/variant/store level
var PriceSchema = new Schema({
	variantId: {type: Schema.Types.ObjectId, ref: 'Variant'},
	storeId: {type: Schema.Types.ObjectId, ref: 'Store'},
	price:[{
		type: {type: String}, // price type like 1 piece price, 2 piece price ,10 piece price
		value: {type: Number} // how much it is
	}]
});

module.exports = mongoose.model('Price', PriceSchema);