const express = require('express');
const mongoose = require('mongoose');
const { HikingTrip, gearList, foodList } = require('../models/hikingModel');
const sharingSchema = require('../models/sharingModel');

const router = express.Router();

//share trip with collaborator 
router.post('/shareTrip', (req, res) => {

	 let newSharing = new sharingSchema();
	 newSharing.trip = mongoose.Types.ObjectId(req.body.tripId);
	 newSharing.owner = mongoose.Types.ObjectId(req.body.ownerId);
	 newSharing.collaborator = mongoose.Types.ObjectId(req.body.colabId);
	 newSharing.save()
	 .then((trip) => {
		res.status(200).send(trip);
	})
	.catch((err) => {
		console.log(err)
		res.status(500).send('something bad happened');
	});
});

//delete colaborated trip
router.delete('/deleteTrip/id/:id', (req, res) => {
	sharingSchema.remove({trip: req.params.id})
	.then((trip) => {
		res.status(200).json({
			message: 'your colab trip was deleted',
			data: trip
		});	
	})
	.catch((err) => {
		res.status(500).send(err)
	});
});

module.exports = router;