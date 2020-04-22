const scrap = require('./scrap');

const runScraper = async () => {
    const lstSites = getSiteList();

    if (!lstSites)
        throw new Error('Não foi recuperada lista de sites para raspar')
    const newsList = await scrap.doScrap(lstSites);
    console.log(newsList)
    console.log(`Total páginas extraídas: ${newsList.length}`);
}

const getSiteList = () => {
    const sites = //require('../database/sites');
        arr = [];
    arr.push(sites.sites[0]);
    console.log(arr);
    return arr;
}

exports.runScraper = runScraper;