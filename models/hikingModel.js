const mongoose = require('mongoose');

 let gearListSchema = new mongoose.Schema({
	item: String,
	weight: Number,
	quantity: Number,
	checked: Boolean
})

let foodListSchema = new mongoose.Schema({
	item: String,
	weight: Number,
	quantity: Number,
	checked: Boolean
}) 

let hikingTripSchema = new mongoose.Schema({
	trail: String,
	startLocation: String,
	endLocation: String,
	startDate: Date,
	endDate: Date,
	gearList: [gearListSchema],
	foodList: [],
	createdAt: {type: Date, default: Date.now}
});



 let hikingTrip = mongoose.model('HikingTrip', hikingTripSchema);
 let gearList = mongoose.model('GearList', gearListSchema);
 let foodList = mongoose.model('FoodList', foodListSchema);

 module.exports = {
 	hikingTrip: hikingTrip,
 	gearList: gearList,
 	foodList: foodList
 }



