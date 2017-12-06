exports.DATABASE_URL = process.env.DATABASE_URL ||
						global.DATABASE_URL ||
						'mongodb://admin:password@ds111882.mlab.com:11882/hiking-app';

exports.PORT = process.env.PORT || 8082;

exports.JWT_SECRET = process.env.JWT_SECRET || 'izzy west'						