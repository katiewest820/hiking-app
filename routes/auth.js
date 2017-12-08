const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const userSchema = require('../models/authModel')


const router = express.Router();
//mongoose.Promise = global.Promise;

let token;

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
			}else{
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
			}

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
				res.status(500).send('An account already exists for this email')
				return
			}
			if(!req.body.email){
				res.status(500).send('please enter an email address');
				return
			}
			if(!req.body.password){
				res.status(500).send('please enter a password');
			}
			else{
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
							res.status(500).send(err)
						}
						res.status(200).send(`new user created: ${newUser}`)
					});
				});	
			}
		})
		.catch((err) => {
			res.status(500).send(err)
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