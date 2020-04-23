const config = require('../config');
const mongodb = require('mongodb');

let connection = null;

module.exports.connect = (dbName) => new Promise((resolve, reject) => {
	mongodb.MongoClient.connect(config.dbConfig.dbUrl, config.dbConfig.dbOptions, function (err, db) {
		if (err) { reject(err); return; };
		resolve(db);
		connection = db.db(dbName);
		console.log('DataBase connected')
	});
});

module.exports.close = () => {
	if (connection)
		connection.close();
}

module.exports.get = (collectionName) => {
	if (!connection) {
		throw new Error('You should connect to the database first calling "connect" first.');
	}

	return connection.collection(collectionName);
}