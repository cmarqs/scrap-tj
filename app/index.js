const scrap = require('./scrap');
const sitecontroller = require('../controllers/sites.controller');


const runScraper = async () => {
    sitecontroller.findSite({ url: 'http://www.tjsp.jus.br/Noticias' }, async function (sites) {
        const lstSites = await sites;
        if (!lstSites)
            throw new Error('Não foi recuperada lista de sites para raspar');

        const newsList = await scrap.doScrap(lstSites);

        console.log(newsList)
        console.log(`Total páginas extraídas: ${newsList.length}`);
    });
}

exports.runScraper = runScraper;