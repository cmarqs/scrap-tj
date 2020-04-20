const dotenv = require('dotenv');
const result = dotenv.config();

if (restult.error){
  throw result.error;
}

module.exports = {
  dbConfig: {
    dbUrl: `mongodb+srv:${process.env.DB_USR}:${process.env.DB_PWD}@${process.env.DB_URL}`
  } 
}
