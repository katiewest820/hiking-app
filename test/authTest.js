const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose')


const should = chai.should()

const {app, runServer, closeServer} = require('../server');
const userSchema = require('../models/authModel');
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);

function seedUserData(){
	console.log('seeding user data');
	const seedData = [];
	for (let i = 0; i < 3; i++){
		seedData.push(generatedUserData())
	}
	return seedUserData.insertMany(seedData);
}

function genearatedUserData(){
	return {
		firstName: faker.Name.firstName(),
		lastName: faker.Name.lastName(),
		email: faker.Internet.email(),
		password: faker.Lorem.word()
	}
}
