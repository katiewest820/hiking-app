const {HikingTrip, gearList, foodList} = require('../models/hikingModel');
const shareTrip = require('../models/sharingModel');
const express = require('express');
const config = require('../config').JWT_SECRET;
const jwt = require('jsonwebtoken');
const router = express.Router();

//checking for token in local storage
router.use((req, res, next) => {
	const token = req.headers.authorization || req.body.token;
	if (!token) {
		res.status(401).json({
			message: "unauthorized"
		});
		return;
	}
	jwt.verify(token, config, (error, decode) => {
		if (error) {
			res.status(500).json({
				message: "Token is not valid"
			});
			return;
		}
		req.user = decode;
		next();
	});
});

//get all trips route
router.get('/getByUser/:id', (req, res) => {
	HikingTrip.find({userId: req.params.id}).select('trail archived')
	.then((trips) => {
		res.status(200).send(trips);
	})
	.catch((err) => {
		res.status(500).send(err);
	});
});

//get all colab trips route
router.get('/getByColab/:id', (req, res) => {
	shareTrip.find({collaborator: req.params.id}).populate('trip')
	.exec((err, trips) => {
		if (err) {
			console.log(err);
		}
		res.send(trips).status(200);
	});
});

//get one by id route
router.get('/id/:id', (req, res) => {
	HikingTrip.findById(req.params.id)
	.then((trip) => {
		let orderGearList = {};
		let orderFoodList = {};
		trip.gearList.forEach((element) => {
			if (!orderGearList[element.owner]) {
				orderGearList[element.owner] = [element];
			} else {
				orderGearList[element.owner].push(element);
			}
		});
		trip.foodList.forEach((element) => {
			if (!orderFoodList[element.owner]) {
				orderFoodList[element.owner] = [element];
			} else {
				orderFoodList[element.owner].push(element);
			}
		});
		trip.orderGearList = orderGearList;
		trip.orderFoodList = orderFoodList;
		res.status(200).json({
			trip: trip,
			orderGearList: orderGearList,
			orderFoodList: orderFoodList
		});
	})
	.catch((err) => {
		console.log(err);
		res.status(500).send(err);
	});
});

//post route
router.post('/', (req, res) => {
	let newTrip = new HikingTrip({
		userId: req.body.userId,
		trail: req.body.trail,
		startDate: req.body.startDate,
		endDate: req.body.endDate,
		trailheadName: req.body.trailheadName,
		archived: false,
		mapPoints: req.body.mapPoints
	});
	newTrip.save((err, trip) => {
		if (err) {
			console.log(err);
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
	HikingTrip.findById(req.params.id)
	.then((trip) => {
		let newGearList = new gearList();
		newGearList.owner = req.body.owner;
		newGearList.item = req.body.item;
		newGearList.weight = req.body.weight;
		newGearList.quantity = req.body.quantity;
		trip.gearList.push(newGearList);
		trip.save();
		let newItem = trip.gearList.slice(-1);
		res.status(200).send(newItem);
	})
	.catch((err) => {
		console.log('something bad happened');
		res.status(500).send(err);
	});
});

//post route to add food item
router.post('/foodList/id/:id', (req, res) => {
	HikingTrip.findById(req.params.id)
	.then((trip) => {
		let newFoodList = new foodList();
		newFoodList.owner = req.body.owner;
		newFoodList.item = req.body.item;
		newFoodList.weight = req.body.weight;
		newFoodList.quantity = req.body.quantity;
		trip.foodList.push(newFoodList);
		trip.save();
		let newItem = trip.foodList.slice(-1);
		res.status(200).send(newItem);
	})
	.catch((err) => {
		res.status(500).send(err);
	});
});

//delete trip route
router.delete('/id/:id', (req, res) => {
	HikingTrip.findByIdAndRemove(req.params.id)
	.then((trip) => {
		res.status(200).json({
			message: 'your trip has been deleted',
			data: trip
		});
	})
	.catch((err) => {
		res.status(500).send(err);
	});
});

//delete gear item route
router.delete('/gearList/id/:tripId/:gearId', (req, res) => {
	HikingTrip.findById(req.params.tripId)
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
		res.status(500).send(err);
	});
});

//delete food item route
router.delete('/foodList/id/:tripId/:foodId', (req, res) => {
	HikingTrip.findById(req.params.tripId)
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
		res.status(500).send(err);
	});
});
//put route for trip
router.put('/id/:id', (req, res) => {
	HikingTrip.findById(req.params.id)
	.then((trip) => {
		let editFields = ['trail', 'startDate', 'endDate', 'trailheadName', 'archived', 'mapPoints'];
		editFields.forEach((field) => {
			if (field in req.body) {
				trip[field] = req.body[field]
			}
		});
		trip.save();
		res.status(200).send(trip);
	})
	.catch((err) => {
		console.log(err);
		res.status(500).send(err);
	});
});

//put route for gear list item
//NOT CURRENTLY IN USE
router.put('/gearList/id/:tripId/:gearId', (req, res) => {
	HikingTrip.findById(req.params.tripId)
	.then((trip) => {
		for (let i = 0; i < trip.gearList.length; i++) {
			if (trip.gearList[i]._id == req.params.gearId) {
				let editFields = ['item', 'weight', 'quantity', 'owner'];
				editFields.forEach((field) => {
					if (field in req.body) {
						trip.gearList[i][field] = req.body[field];
					}
				});
			}
		}
		trip.save();
		console.log('successful gear item update');
		res.status(200).json({
			message: 'your food list item has been updated',
			data: trip
		});
	})
	.catch((err) => {
		res.status(500).send(err);
	});
});

//put route for food list item
//NOT CURRENTLY IN USE
router.put('/foodList/id/:tripId/:foodId', (req, res) => {
	HikingTrip.findById(req.params.tripId)
	.then((trip) => {
		for (let i = 0; i < trip.foodList.length; i++) {
			if (trip.foodList[i] == req.params.foodId) {
				let editFields = ['item', 'weight', 'quantity', 'owner'];
				editFields.forEach((field) => {
					if (field in req.body) {
						trip.foodList[i][field] == req.body[field];
					}
				});
			}
		}
		trip.save();
		res.status(200).json({
			message: 'your food list item has been updated',
			data: trip
		});
	})
	.catch((err) => {
		res.status(500).send(err);
	});
});

module.exports = router;