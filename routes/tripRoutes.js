const express = require('express');
const config = require('../config').JWT_SECRET;
const {hikingTrip, gearList, foodList} = require('../models/hikingModel');

const router = express.Router();

//get all route
router.get('/', (req, res) => {
	hikingTrip.find({})
	.then((trips) => {
		console.log('successful get of all trips');
		res.status(200).send(trips);
	})
	.catch((err) => {
		console.log('something bad happened');
		res.status(500).send(err);
	})	
});

//get one by id route
router.get('/id/:id', (req, res) => {
	hikingTrip.findById(req.params.id)
	.then((trip) => {
		console.log('successful get of one trip');
		res.status(200).json(trip);
	})
	.catch((err) => {
		console.log('something bad happened');
		res.status(500).send(err);
	});
});

//post route
router.post('/', (req, res) => {
	let newTrip = new hikingTrip({
		trail: req.body.trail,
		startDate: req.body.startDate,
		endDate: req.body.endDate,
		startLocation: req.body.startLocation,
		endLocation: req.body.endLocation,
//TODO add in all other keys
	})
		newTrip.save((err, trip) => {
			if(err) {
				console.log(err)
				return
			}
			res.status(200).json({
				message: 'trip saved successfully',
				data: trip 
			});
		});	
});

//post route to add gear item
router.post('/gearList/id/:id', (req, res) => {
	hikingTrip.findById(req.params.id)
		.then((trip) => {
			let newGearList = new gearList();
			newGearList.item = req.body.item;
			newGearList.weight = req.body.weight;
			newGearList.quantity = req.body.quantity;
			newGearList.checked = false;

			trip.gearList.push(newGearList);
			trip.save();
			console.log('successful post to gear list')
			res.status(200).send(`gear list item saved ${trip}`);
		})
		.catch((err) => {
			console.log('something bad happened')
			res.status(500).send(err)
		})
});

//post route to add food item
router.post('/foodList/id/:id', (req, res) => {
	hikingTrip.findById(req.params.id)
		.then((trip) => {
			let newFoodList = new foodList();
			newFoodList.item = req.body.item;
			newFoodList.weight = req.body.weight;
			newFoodList.quantity = req.body.quantity;
			newFoodList.checked = false;

			trip.foodList.push(newFoodList);
			trip.save();
			console.log('successful post to food list');
			res.status(200).send(`food list item saved ${trip}`)
		})
		.catch((err) => {
			console.log('something bad happened');
			res.status(500).send(err);
		});
});

//delete trip route
router.delete('/id/:id', (req, res) => {
	hikingTrip.findByIdAndRemove(req.params.id)
		.then((trip) => {
			console.log('successful delete of trip')
			res.status(200).json({
					message: 'your trip has been deleted',
					data: trip
					})
		})
		.catch((err) => {
			console.log('something bad happened');
			res.status(500).send(err);
		})
});	

//delete gear item route
router.delete('/gearList/id/:tripId/:gearId', (req, res) => {
	hikingTrip.findById(req.params.tripId)
		.then((trip) => {
			let myId = req.params.gearId;
			trip.gearList = trip.gearList.filter(myItem => myItem._id != myId);
			trip.save();
			res.status(200).json({
					message: 'your gear list item has been deleted',
					data: trip
					});
		})
		.catch((err) => {
			console.log('something bad happened');
			res.status(500).send(err);
		});
});	

//delete food item route
router.delete('/foodList/id/:tripId/:foodId', (req, res) => {
	hikingTrip.findById(req.params.tripId)
		.then((trip) => {
			let myId = req.params.foodId;
			trip.foodList = trip.foodList.filter(myItem => myItem._id != myId);
			trip.save();
			res.status(200).json({
				message: 'your food list item has been deleted',
					data: trip
					});
		})
		.catch((err) => {
			console.log('something bad happened');
			res.status(500).send(err);
		});
});

//put route for trip
router.put('/id/:id', (req, res) => {
	hikingTrip.findById(req.params.id)
		.then((trip) => {
			let editFields = ['trail', 'startDate', 'endDate', 'startLocaton', 'endLocation'];

			editFields.forEach((field) => {
				if(field in req.body) {
					trip[field] = req.body[field]
				}
			})
			trip.save()
			console.log('successful put request')
			res.status(200).send(trip)
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send(err)
		})
});

//put route for gear list item

//put route for food list item








module.exports = router;