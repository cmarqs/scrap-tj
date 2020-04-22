const scrap = require('./scrap');

const runScraper = async () => {
    const lstSites = getSiteList();
    const newsList = await scrap.doScrap(lstSites);
    console.log(newsList)
    console.log(`Total páginas extraídas: ${newsList.length}`);
}

const getSiteList = () => {

}

exports.runScraper = runScraper;