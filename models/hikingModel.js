const mongoose = require('mongoose');

 let gearListSchema = new mongoose.Schema({
	item: String,
	weight: String,
	quantity: Number,
	checked: Boolean
})

let foodListSchema = new mongoose.Schema({
	item: String,
	weight: String,
	quantity: Number,
	checked: Boolean
}) 

let hikingTripSchema = new mongoose.Schema({
	userId: mongoose.Schema.Types.ObjectId,
	trail: String,
	startLocation: String,
	endLocation: String,
	startDate: Date,
	endDate: Date,
	gearList: [gearListSchema],
	foodList: [foodListSchema],
	createdAt: {type: Date, default: Date.now}
});



 let HikingTrip = mongoose.model('HikingTrip', hikingTripSchema);
 let gearList = mongoose.model('GearList', gearListSchema);
 let foodList = mongoose.model('FoodList', foodListSchema);

 module.exports = {
 	HikingTrip: HikingTrip,
 	gearList: gearList,
 	foodList: foodList
 }



