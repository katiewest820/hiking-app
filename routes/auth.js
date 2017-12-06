const express = require('express');
const mongoose = require('mongoose');
const config = require('../config');


const router = express.Router();
mongoose.Promise = global.Promise;


router.get('/', (req, res) => {
	console.log('hello')
	res.status(200).send('hello')
})


module.exports = router;