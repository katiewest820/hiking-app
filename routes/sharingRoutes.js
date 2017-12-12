const express = require('express');
const mongoose = require('mongoose');
const { HikingTrip, gearList, foodList } = require('../models/hikingModel');
const sharingSchema = require('../models/sharingModel');


const router = express.Router();

//var id = mongoose.Types.ObjectId('4edd40c86762e0fb12000003');

router.post('/shareTrip', (req,res) => {
	//console.log(HikingTrip)
	//console.log(req.body)
	//HikingTrip.findById(req.body.tripId)//(mongoose.Types.ObjectId(req.body.tripId))

	//	console.log(trip)
	//})
	 let newSharing = new sharingSchema()
	 newSharing.trip = mongoose.Types.ObjectId(req.body.tripId);
	 newSharing.owner = mongoose.Types.ObjectId(req.body.ownerId);
	 newSharing.collaborator = mongoose.Types.ObjectId(req.body.colabId);
	 newSharing.admin = req.body.admin;

	 newSharing.save()
	 .then((trip) => {
		res.status(200).send(trip)
	})
	.catch((err) => {
		console.log(err)
		res.status(500).send('something bad happened')
	});
});

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
		})
})




module.exports = router;