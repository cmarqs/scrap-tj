const db = require('../database/index');

const insertSite = (site) => {
    db.get('sites').insertOne(site, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }

        console.log(result.result);
    });
}

const findSite = (objKeyValue, result) => {
    db.get('sites').find(objKeyValue).toArray((err, docs) => {
        if (err) {
            console.log(err);
            return;
        }
        // console.log(docs);
        result(docs);
    });
}

exports.insertSite = insertSite;
exports.findSite = findSite;