const { HikingTrip, gearList, foodList } = require('../models/hikingModel');
const shareTrip = require('../models/sharingModel');
const express = require('express');
const config = require('../config').JWT_SECRET;
const jwt = require('jsonwebtoken');

const router = express.Router();

router.use((req, res, next) => {
    const token = req.headers.authorization || req.body.token;
    if (!token) {
        res.status(401).json({ message: "unauthorized" });
        return;
    }
    jwt.verify(token, config, (error, decode) => {
        if (error) {
            res.status(500).json({ message: "Token is not valid" });
            return;
        }
        req.user = decode;
        next();
    });
});

//get all trips route
router.get('/getByUser/:id', (req, res) => {
    HikingTrip.find({userId: req.params.id})
        .then((trips) => {
            console.log('successful get of all trips');
            res.status(200).send(trips);
        })
        .catch((err) => {
            console.log('something bad happened');
            res.status(500).send(err);
        })
});

//get all colab trips route
router.get('/getByColab/:id', (req,res) => {
	shareTrip.find({collaborator: req.params.id})
	.populate('trip').exec((err, trips) => {
    if (err) {
    	console.log(err)
	}
	console.log(trips)
		console.log('successful get of colab trips')
		res.send(trips).status(200)
	})
	

})

//get one by id route
router.get('/id/:id', (req, res) => {
    HikingTrip.findById(req.params.id)
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
    let newTrip = new HikingTrip({
    	userId: req.body.userId,
        trail: req.body.trail,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        startLocation: req.body.startLocation,
        endLocation: req.body.endLocation,
        //TODO add in all other keys
    })
    newTrip.save((err, trip) => {
        if (err) {
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
    HikingTrip.findById(req.params.id)
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
    HikingTrip.findById(req.params.id)
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
    HikingTrip.findByIdAndRemove(req.params.id)
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
            console.log('something bad happened');
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
            console.log('something bad happened');
            res.status(500).send(err);
        });
});

//put route for trip
router.put('/id/:id', (req, res) => {
    HikingTrip.findById(req.params.id)
        .then((trip) => {
            let editFields = ['trail', 'startDate', 'endDate', 'startLocaton', 'endLocation'];

            editFields.forEach((field) => {
                if (field in req.body) {
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
router.put('/gearList/id/:tripId/:gearId', (req, res) => {
    HikingTrip.findById(req.params.tripId)
        .then((trip) => {
            for (let i = 0; i < trip.gearList.length; i++) {
                if (trip.gearList[i]._id == req.params.gearId) {
                    let editFields = ['item', 'weight', 'quantity'];
                    editFields.forEach((field) => {
                        if (field in req.body) {
                            trip.gearList[i][field] = req.body[field]
                        }
                    })
                }
            }
            trip.save()
            console.log('successful gear item update');
            res.status(200).json({
                message: 'your food list item has been updated',
                data: trip
            });
        })    
        .catch((err) => {
            console.log('something bad happened')
            res.status(500).send(err)
        });
});

//put route for food list item
router.put('/foodList/id/:tripId/:foodId', (req, res) => {
    HikingTrip.findById(req.params.tripId)
        .then((trip) => {
            for (let i = 0; i < trip.foodList.length; i++) {
                if (trip.foodList[i] == req.params.foodId) {
                    let editFields = ['item', 'weight', 'quantity'];
                    editFields.forEach((field) => {
                        if (field in req.body) {
                            trip.foodList[i][field] == req.body[field]
                        }
                    })
                }
            }
            trip.save()
            console.log('successful food item update');
            res.status(200).json({
                message: 'your food list item has been updated',
                data: trip
            });
        })    
        .catch((err) => {
            console.log('something bad happened');
            res.status(500).send(err);
        });
});







            module.exports = router;