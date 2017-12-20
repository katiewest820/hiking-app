const mongoose = require('mongoose');

const { HikingTrip, gearList, foodList } = require('../models/hikingModel');
const user = require('./authModel');

var sharedTripSchema = new mongoose.Schema({
	trip: {type: mongoose.Schema.ObjectId, ref: 'HikingTrip'},
	owner: {type: mongoose.Schema.ObjectId, ref: 'user'},
	collaborator: {type: mongoose.Schema.ObjectId, ref: 'user'},
	createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('sharedTrip', sharedTripSchema);