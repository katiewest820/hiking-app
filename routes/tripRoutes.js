const express = require('express');
const config = require('../config').JWT_SECRET;

const router = express.Router();

router.use((req, res) => {
	console.log('hello')
	res.status(200).send('hello')
})


module.exports = router;