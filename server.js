const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const { DATABASE_URL, PORT } = require('./config');
const tripRoutes = require('./routes/tripRoutes');
const authRoutes = require('./routes/auth');

app.use(morgan('common'));

app.use(bodyParser.json());

app.use(express.static('./public'));

app.get('/', (req, res) => {
	res.sendFile(_dirname + './public/index.html').status(200);
});

app.all('/')
app.use('/trip', tripRoutes);
app.use('/auth', authRoutes);




let server;

function runServer(databaseUrl = DATABASE_URL, port = PORT) {
    return new Promise((resolve, reject) => {
        mongoose.connect(databaseUrl, { useMongoClient: true });
        let db = mongoose.connection;
        db.on('error', err => {
            mongoose.disconnect();
            reject(err);
            console.log(`server connection error: ${err}`);
        });
        db.once('open', () => {
            console.log(`connected to database: ${databaseUrl}`);
        });
        server = app.listen(port, () => {
            console.log(`your server is running on port: ${port}`);
            resolve();
        });
    });
}

function closeServer() {
    return mongoose.disconnect()
        .then(() => {
            return new Promise((resolve, reject) => {
                console.log('closing server');
                server.close(err => {
                    if (err) {
                        return reject();
                    }
                    resolve();
                });
            });
        });
}


if(require.main === module) {
	runServer().catch(err => console.log(`internal server error: ${err}`).status(500));
}

module.exports = {app, runServer, closeServer};