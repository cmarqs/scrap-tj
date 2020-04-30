const scrap = require('./scrap');
const sitecontroller = require('../controllers/sites.controller');
const newsconntroller = require('../controllers/news.controller');

const runScraper = async () => {
    sitecontroller.findSite({ $or: [{ url: 'http://www.tjsp.jus.br/Noticias' }, { url: 'http://www.tjrj.jus.br/web/guest/noticias' }] }, async function (sites) {
        const lstSites = await sites;
        if (!lstSites)
            throw new Error('Não foi recuperada lista de sites para raspar');

        const newsList = await scrap.doScrap(lstSites);
        //console.log(newsList)
        console.log(`Total notícias extraídas: ${newsList.length}`);

        newsconntroller.insertNews(newsList);
    });
}

exports.runScraper = runScraper;