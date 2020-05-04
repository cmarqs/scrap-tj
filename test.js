const db = require('./database/index')
const sites = require('./database/sites').sites;
const ct = require('./controllers/sites.controller');

void (async () => {
    await db.connect('tjnews');
    sites.forEach(s => {
        ct.insertSite(s);
        console.log(`Site ${s.url} inserido! \n`)
    });
})();