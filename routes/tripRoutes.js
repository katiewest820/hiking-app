const express = require('express');
const config = require('../config').JWT_SECRET;
const hikingTrip = require('../models/hikingModel');

const router = express.Router();

router.get('/', (req, res) => {
	hikingTrip.find({})
	.then((trips) => {
		console.log('successful get of all trips')
		res.status(200).send(trips)
	})
	.catch((err) => {
		console.log('something bad happened')
		res.status(500).send(err)
	})
	
});

router.post('/', (req, res) => {
	
	let newTrip = new hikingTrip({
		trail: req.body.trail,
		startDate: req.body.startDate,
		endDate: req.body.endDate,
		startLocation: req.body.startLocation,
		endLocation: req.body.endLocation,
		
		
		//TODO add in all other keys
	})
	newTrip.gearList.push({item: req.body.gearList.item, weight: req.body.gearList.weight, quantity: req.body.gearList.quantity});
	newTrip.foodList.push({item: req.body.foodList.item, weight: req.body.foodList.weight, quantity: req.body.foodList.quantity});

		newTrip.save((err, trip) => {
			if(err) {
				console.log(err)
				return
			}

			res.status(200).json({
				message: 'trip saved successfully',
				data: trip 
			})
		})
		
})




module.exports = router;