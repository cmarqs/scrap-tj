const config = require('./config');
const MongoClient = require('mongodb').MongoClient;

let db_uri = config.dbConfig.dbUrl;
let database;
MongoClient.connect(db_uri, {  
  poolSize: 10
},function(err, db) {
    if (err) throw err;
    database=db;
    }
);

module.exports = database;