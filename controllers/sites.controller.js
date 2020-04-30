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

const findSite = (filter, result) => {
    db.get('sites').find(filter).toArray((err, docs) => {
        if (err) {
            console.log(err);
            return;
        }
        // console.log(docs);
        result(docs);
    });
}

const updateLimit = (filter, modifiedSite, result) => {
    db.get('sites').update(filter, modifiedSite, { "upsert": false })
        .then(result => {
            const { matchedCount, modifiedCount } = result;
            console.log(`Successfully matched ${matchedCount} and modified ${modifiedCount} items.`)
            return result
        })
        .catch(err => console.error(`Failed to update items: ${err}`))
}

exports.insertSite = insertSite;
exports.findSite = findSite;
exports.updateLimit = updateLimit;