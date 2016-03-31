var mongoose = require('mongoose');

var schema = new mongoose.Schema({ 
	name : { type : String, default : ''}, 
	price : Number,
	done : { type : Boolean, default : false },
	updated : { type : Date, default : Date.now },
	orderedBy : { type : String, default : ''}
});

module.exports = mongoose.model('Food', schema);