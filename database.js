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

const createStorage = (dbname, dbstorage) => {
  dbo.createCollection(dbstorage, function(err, res) {
    if (err) throw err;
    console.log(`Storage (table or collection) created: ${res}`);
  });
}

const insert = (dbname, dbstorage, obj) => {
  let dbo = db.db(dbname);

  dbo.collection(dbstorage).insertOne(obj, function(err, res) {
    if (err) throw err;
    console.log(`Data stored: ${res}`);
  });
}

module.exports = database;