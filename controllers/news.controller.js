const db = require('../database/index');

const insertNews = (arrNews) => {
    db.get('news').insertMany(arrNews, function callback(err, result) {
        if (err) {
            console.log(err);
            return;
        }

        console.log(result.result);
    });
}

const listNews = (filter, result) => {
    db.get('news').find(filter).toArray(function callback(err, docs) {
        if (err) {
            console.log(err);
            return;
        }
        result(docs);
    })
}