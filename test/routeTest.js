const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should()
const {app, runServer, closeServer} = require('../server')

chai.use(chaiHttp);

describe('users', function(){

	before(function(){
		console.log('starting server')
		return runServer();
	});

	after(function(){
		console.log('closing server')
		return closeServer();
	});


	it('should test to see if status code 200 and html is returned', function(){
		return chai.request(app)
			.get('/')
			.then((res) => {
				res.should.have.status(200);
				res.should.be.html;
			});	
	});
})