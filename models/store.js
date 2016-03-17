var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// no 0
// store schema
var StoreSchema = new Schema({
		storeId: { type: String, unique: true, lowercase: true},
		name: { type: String, lowercase: true},
		address:{
			addr: {type: String},
			phone: {type: String},
			city: {type: String},
			state: {type: String},
			zip: {type: String},
			country: {type: String}
		},
		location: {
    	    type: [Number],  // [<longitude>, <latitude>]
    	    index: '2d'      // create the geospatial index
		}
});



module.exports = mongoose.model('Store', StoreSchema);