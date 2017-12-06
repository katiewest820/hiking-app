const mongoose = require('mongoose');


var userSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	email: String,
	password: String,
	createdAt: {type: Date, default: Date.now}
})


module.exports = mongoose.model('user', userSchema);