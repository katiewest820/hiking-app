exports.DATABASE_URL = process.env.DATABASE_URL ||
						global.DATABASE_URL ||
						'mongodb://admin:password@ds111882.mlab.com:11882/hiking-app';

exports.PORT = process.env.PORT || 8082;

exports.JWT_SECRET = process.env.JWT_SECRET || 'izzy west';

exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 
							'mongodb://admin:password@ds163156.mlab.com:63156/testing_hiking_app' ;