const mongoose = require('mongoose');

 let gearListSchema = new mongoose.Schema({
 	owner: String,
	item: String,
	weight: String,
	quantity: Number
	
})

let foodListSchema = new mongoose.Schema({
	owner: String,
	item: String,
	weight: String,
	quantity: Number
	
}) 

let hikingTripSchema = new mongoose.Schema({
	userId: mongoose.Schema.Types.ObjectId,
	trail: String,
	trailheadName: String,
	startDate: Date,
	endDate: Date,
	gearList: [gearListSchema],
	foodList: [foodListSchema],
	archived: Boolean,
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



