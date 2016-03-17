var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// prices on art/variant/store level
var InventorySchema = new Schema({
	storeId: {type: Schema.Types.ObjectId, ref: 'Store'},
	location: { // enable inventory by location
	    type: [Number],  // [<longitude>, <latitude>]
	    index: '2d'      // create the geospatial index
	},
	articleId: {type: Schema.Types.ObjectId, ref: 'Article'},
	variants: [{
		sku: {type: String},
		qty: {type: Number}
	}]
});


module.exports = mongoose.model('Inventory', InventorySchema);