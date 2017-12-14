const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const userSchema = require('../models/authModel')


const router = express.Router();
//mongoose.Promise = global.Promise;

let token;

router.get('/search/:value', (req, res) => {
	userSchema.find({firstName: req.params.value})
		.then((user) => {
			res.status(200).send(user)
		})
		.catch((err) => {
			res.status(500).send(err)
		})
})


//login route
router.post('/login', (req, res) => {
	userSchema.findOne({email: req.body.email})
		.then((user) => {
			if(!req.body.email || !req.body.password){
				res.send('you must enter a username and password').status(500);
				return
			}
			if(!user){
				res.send('this user does not exist').status(500);
				return
			}
			if(!bcrypt.compareSync(req.body.password, user.password)){
				res.send('password does not match email').status(500);
				return
			}
			let userToken = {
				email: userSchema.email,
				firstName: userSchema.firstName,
				lastName: userSchema.lastName,
			}
			token = jwt.sign(userToken, config.JWT_SECRET)
			console.log(`token: ${token}`)
			res.status(200).json({
				message: ` ${user.email} successfully logged in`,
                userId: user._id,
                token: token
            });
			

		})
		.catch((err) => {
            console.log(err);
            res.status(500).send(err);
        });
});

//register route
router.post('/register', (req, res) => {
	userSchema.findOne({email: req.body.email})
		.then((user) => {
			if(user){
				res.send('An account already exists for this email').status(500);
				return
			}
			if(!req.body.email){
				res.send('please enter an email address').status(500);
				return
			}
			if(!req.body.password){
				res.send('please enter a password').status(500);
				return
			}
			if(!req.body.firstName || !req.body.lastName){
				res.send('please enter a first and last name').status(500);
				return
			}
			const newUser = new userSchema()
			newUser.email = req.body.email;
			newUser.firstName = req.body.firstName;
			newUser.lastName = req.body.lastName;
			
			bcrypt.hash(req.body.password, 8, (err, hash) => {
				if(err){
					console.log(err)
				}else{
					console.log(hash)
				}
				newUser.password = hash;
				newUser.save((err, user) => {
					if(err){
						console.log(err)
						res.send(err).status(500);
					}
					res.send(`new user created: ${newUser}`).status(200);
				});
			});	
			
		})
		.catch((err) => {
			res.send(err).status(500);
		});
});

//refresh token route

// router.post('/refresh', (req, res) => {
// 	let userToken = {
// 		email: userSchema.email,
// 		firstName: userSchema.firstName,
// 		lastName: userSchema.lastName
// 	}
// 	token = jwt.sign(userToken, config.JWT_SECRET)
// 	console.log(`new token: ${token}`)
// 	res.status(200).send(token)
//})


module.exports = router;