const config = require('./config');
const mongodb = require('mongodb');

const client = new mongodb.MongoClient(config.dbConfig.dbUrl, { useNewUrlParser: true, useUnifiedTopology: true, poolSize: 10 });

const db = client.connect(function (err, db) {
	if (err) { console.log(err); }
	else {
		console.log('Connected\n');
		return db.db('sample_airbnb');
	}
});