const mongoose = require('mongoose');

const hikingModel = require('./hikingModel');
const authModel = require('./authModel');

var sharedTripSchema = new mongoose.Schema({
	trip: {type: mongoose.Schema.ObjectId, ref: 'hikingModel'},
	owner: {type: mongoose.Schema.ObjectId, ref: 'authModel'},
	collaborator: {type: mongoose.Schema.ObjectId, ref: 'authModel'},
	admin: Boolean,
	createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('sharedTrip', sharedTripSchema);