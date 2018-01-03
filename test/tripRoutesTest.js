const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose')

const should = chai.should()
const expect = require('chai').expect;

const { app, runServer, closeServer } = require('../server');
const { HikingTrip, gearList, foodList } = require('../models/hikingModel');
const userSchema = require('../models/authModel');
const sharedTrip = require('../models/sharingModel');
const { TEST_DATABASE_URL } = require('../config');

chai.use(chaiHttp);

mongoose.Promise = global.Promise;

let token;
let userId;
let seedData;
let tripId;
let gearListId;
let foodListId;

//auth test setup
function createTestUser() {
    console.log('creating user')
    let newTestUser = {
        firstName: 'Katie',
        lastName: 'West',
        email: 'katiewest@email.com',
        password: 'password123'
    }
    return new Promise((resolve, reject) => {
        chai.request(app)
            .post('/auth/register')
            .send(newTestUser)
            .then((res) => {
                console.log('inside of create test user')
                	loginTestUser().then(() => {
                		 resolve()
                	});
                    
                   
                    
                })
            .catch((err) => {
                console.log(err)
                reject(err)
            });
    });
}

function loginTestUser() {
    console.log('logging in user')
    let loginTestUser = {
        firstName: 'Katie',
        lastName: 'West',
        email: 'katiewest@email.com',
        password: 'password123'
    }
    return new Promise((resolve, reject) => {
        chai.request(app)
            .post('/auth/login')
            .send(loginTestUser)
            .then((res) => {
                token = res.body.token;
                userId = res.body.userId;
                seedTripData();
                resolve();
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            });
    });
}

function seedTripData() {
    console.log('seeding hiking app data');
    seedData = [];
    for (let i = 0; i < 5; i++) {
        seedData.push(generatedTripSeedData());
    }
    return HikingTrip.insertMany(seedData);
}

function seedGearData() {
    console.log('seeding gear data');
    const seedGearData = [];
    for (let i = 0; i < 3; i++) {
        seedGearData.push(genearatedGearListData());
    }
    return seedGearData;
}

function seedFoodData() {
    console.log('seeding food data');
    const seedFoodData = [];
    for (let i = 0; i < 3; i++) {
        seedFoodData.push(genearatedFoodListData());
    }
    return seedFoodData
}

function generatedTripSeedData() {
    return {
        userId: userId,
        trail: faker.lorem.words(),
        trailheadName: faker.lorem.words(),
        startDate: faker.date.future(),
        endDate: faker.date.future(),
        archived: false,
        gearList: seedGearData(),
        foodList: seedFoodData()
    }
}

function genearatedGearListData() {
    return {
        owner: faker.name.firstName(),
        item: faker.lorem.word(),
        weight: faker.random.number(),
        quantity: faker.random.number()
    }
}

function genearatedFoodListData() {
    return {
        owner: faker.name.firstName(),
        item: faker.lorem.word(),
        weight: faker.random.number(),
        quantity: faker.random.number()
    }
}

function tearDownDb() {
    console.log('deleting database data');
    return mongoose.connection.db.dropDatabase();
}

describe('Trip test API resources', function() {
    before(function(done) {
        Promise.resolve(runServer(TEST_DATABASE_URL)).then(() => {
            Promise.resolve(createTestUser()).then(() => {
                done()
            });
        });
    });
    after(function() {
        tearDownDb();
        closeServer();

    });

    describe('GET endpoint', function() {
        it('should return all trips assiged to one user', function() {
            return chai.request(app)
                .get(`/trip/getByUser/${userId}`)
                .set('authorization', token)
                .then((res) => {
                    res.should.have.status(200);
                    res.body.length.should.be.above(1);
                    for (let i = 0; i < seedData.length; i++) {
                        res.body[i].trail.should.equal(seedData[i].trail)
                    }
                    tripId = res.body[0]._id;
                })
                .catch((err) => {
                    console.log(err)
                });
        });

        it('should return one trip', function(){
        	return chai.request(app)
        	.get(`/trip/id/${tripId}`)
        	.set('authorization', token)
        	.then((res) => {
        		let myObj = res.body;
        		res.should.have.status(200);
        		res.body.should.have.property('trip');
        		expect(Object.keys(myObj).length).to.equal(3);
        		res.body.trip._id.should.equal(tripId);
        	})
        	.catch((err) => {
        		console.log(err);
        	});
        });
    });

    describe('POST and GET colab endpoint', function(){
    	it('should share a trip with a user and get all shared trips', function(){
    		let shareTrip = {
    			tripId: tripId,
    			ownerId: userId,
    			colabId: userId
    		}
    		return chai.request(app)
    		.post('/share/shareTrip/')
    		.set('authorization', token)
    		.set('content-type', 'application/json')
    		.send(JSON.stringify(shareTrip))
    		.then((res) => {
    			let colabId = res.body.collaborator;
    			res.status.should.equal(200);
    			res.body.trip.should.equal(shareTrip.tripId);
    			res.body.owner.should.equal(shareTrip.ownerId);
    			res.body.collaborator.should.equal(shareTrip.colabId);
    			return chai.request(app)
    			.get(`/trip/getByColab/${colabId}`)
    			.set('authorization', token)
    			.then((res) => {
    				res.status.should.equal(200);
    				res.body[0].collaborator.should.equal(colabId);
    				res.body[0].owner.should.equal(userId);
    				res.body[0].trip._id.should.equal(tripId);
    			});
    		})
    		.catch((err) => {
    			console.log(err);
    		});
		});	
    });

    describe('DELETE colab trip endpoint', function(){
    	it('should delete one colab trip', function(){
    		return chai.request(app)
    		.delete(`/share/deleteTrip/id/${tripId}`)
    		.set('authorization', token)
    		.then((res) => {
    			res.status.should.equal(200);
    		})
    		.catch((err) => {
    			console.log(err);
    		});
		});	
    });

    describe('POST endpoint', function(){
	 	it('should post new trip to DB', function(){
	 		let newTrip = {
	 			userId: userId,
				trail: 'new trail name',
				startDate: '12/30/2017',
				endDate: '01/01/2018',
				trailheadName: 'new trailhead',
				archived: false,
	 		}
	 		return chai.request(app)
	 		.post('/trip/')
	 		.set('authorization', token)
	 		.send(newTrip)
	 		.then((res) => {
	 			res.status.should.equal(200);
	 			res.body.data.trail.should.equal(newTrip.trail);
	 			res.body.data.trailheadName.should.equal(newTrip.trailheadName);
	 			res.body.data.userId.should.equal(newTrip.userId);
	 			res.body.data._id.should.be.a('string');
	 		})
	 		.catch((err) => {
	 			console.log(err);
	 		});
		});

		it('should post new food item to DB', function(){
			let newFoodItem = {
				owner: 'Izzy',
				item: 'dog treats',
				weight: '16 oz',
				quantity: 100 
			}
			return chai.request(app)
			.post(`/trip/foodList/id/${tripId}`)
			.set('authorization', token)
			.send(newFoodItem)
			.then((res) => {
				foodListId = res.body[0]._id;
				res.status.should.equal(200);
				res.body[0].owner.should.equal(newFoodItem.owner);
				res.body[0].item.should.equal(newFoodItem.item);
				res.body[0].weight.should.equal(newFoodItem.weight);
				res.body[0].quantity.should.equal(newFoodItem.quantity);
				res.body[0]._id.should.be.a('string');
			})
			.catch((err) => {
				console.log(err);
			});
		});

		it('should post new gear item to DB', function(){
			let newGearItem = {
				owner: 'Izzy',
				item: 'boots',
				weight: '3 lbs',
				quantity: 1
			}
			return chai.request(app)
			.post(`/trip/gearList/id/${tripId}`)
			.set('authorization', token)
			.send(newGearItem)
			.then((res) => {
				gearListId = res.body[0]._id; 
				res.status.should.equal(200);
				res.body[0].owner.should.equal(newGearItem.owner);
				res.body[0].item.should.equal(newGearItem.item);
				res.body[0].weight.should.equal(newGearItem.weight);
				res.body[0].quantity.should.equal(newGearItem.quantity);
				res.body[0]._id.should.be.a('string');
			})
			.catch((err) => {
				console.log(err);
			});
		});

	}); 

	describe('PUT endpoint', function(){
 		it('should update trip values sent over in request', function(){
 			let updatedTripInfo = {
 				trail: 'updated fancy trail', 
 				trailheadName: 'updated fancy trailhead name', 
 				archived: true
 			}
 			return chai.request(app)
 			.get(`/trip/id/${tripId}`)
        	.set('authorization', token)
        	.then((res) => {
        		let tripPreUpdate = res.body.trip
        	})
 			return chai.request(app)
 			.put(`/trip/id/${tripId}`)
 			.set('authorization', token)
 			.send(updatedTripInfo)
 			.then((res) => {
 				res.status.should.equal(200);
 				res.body.trail.should.equal(updatedTripInfo.trail);
 				res.body.trailheadName.should.equal(updatedTripInfo.trailheadName);
 				res.body.archived.should.equal(updatedTripInfo.archived);
 				res.body.startDate.should.equal(tripPreUpdate.startDate);
 				res.body.endDate.should.equal(tripPreUpdate.endDate);
 				res.body.userId.should.equal(tripPreUpdate.userId);
 			})
 			.catch((err) => {
 				console.log(err);
 			});
 		});
	});

 	describe('DELETE endpoint', function(){
 		it('should delete one gear item from trip', function(){
 			return chai.request(app)
 			.delete(`/trip/gearList/id/${tripId}/${gearListId}`)
 			.set('authorization', token)
 			.then((res) => {
 				let deletedId = res.body.data.gearList.gearListId;
 				res.status.should.equal(200);
 				should.not.exist(deletedId);
 			})
 			.catch((err) => {
 				console.log(err);
 			}); 
 		});

 		it('should delete one food item from trip', function(){
 			return chai.request(app)
 			.delete(`/trip/foodList/id/${tripId}/${foodListId}`)
 			.set('authorization', token)
 			.then((res) => {
 				let deletedId = res.body.data.foodList.foodListId;
 				res.status.should.equal(200);
 				should.not.exist(deletedId);
 			})
 			.catch((err) => {
 				console.log(err);
 			}); 
		});

 		it('should delete one trip from database', function(){
 			return chai.request(app)
 			.get(`/trip/id/${tripId}`)
        	.set('authorization', token)
        	.then((res) => {
        		let tripToDelete = res.body
        	})
 			return chai.request(app)
 			.delete(`/trip/id/${tripId}`)
 			.set('authorization', token)
 			.then((res) => {
 				res.status.should.equal(200);
 				should.not.exist(res.tripToDelete);
 			})
 			.catch((err) => {
 				console.log(err);
 			});
 		});
 	});
}); 	

