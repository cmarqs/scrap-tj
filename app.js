const scrap = require('./app/index')
const db = require('./database/index')
const sitecontroller = require('./controllers/sites.controller')

void (async () => {
	await db.connect('tjnews');
	scrap.runScraper();
})();


