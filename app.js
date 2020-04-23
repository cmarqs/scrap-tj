const scrap = require('./app/index')
const db = require('./database/index')
const sitecontroller = require('./controllers/sites.controller')

void (async () => {
	await db.connect('tjnews');
	// sitecontroller.findSite({ url: 'http://www.tjsp.jus.br/Noticias' }, function (sites) {
	// 	console.log(`Resposta: ${JSON.stringify(sites)} \n`);
	// });
	//scrap.runScraper();

	db.close();
})();


