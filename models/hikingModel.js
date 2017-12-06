const mongoose = require('mongoose');

var hikingTripSchema = new mongoose.Schema({
	trail: String,
	startLocation: Object,
	endLocation: Object,
	startDate: Date,
	endDate: Date,
	gearList: [],
	foodList: [],
	createdAt: {type: Date, default: Date.now}
});

// var gearListSchema = new mongoose.Schema({
// 	item: String,
// 	wieght: Number,
// 	quantity: Number,
// 	checked: Boolean
//})

 module.exports = mongoose.model('HikingTrip', hikingTripSchema);



