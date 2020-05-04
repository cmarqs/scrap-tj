const scrap = require('./scrap');
const sitecontroller = require('../controllers/sites.controller');
const newsconntroller = require('../controllers/news.controller');

const runScraper = async () => {
    sitecontroller.findSite({ $or: [{ url: 'http://www.tjsp.jus.br/Noticias' }] }, async function (sites) {
        const lstSites = await sites;
        if (!lstSites)
            throw new Error('Não foi recuperada lista de sites para raspar');

        //faz a raspagem das notícias dos sites passados no parametro
        const newsList = await scrap.doScrap(lstSites);
        // o retornon da raspagem traz um array com várias listas (1 para cada página de cada site).
        // Faz um achatamento as listas em um único array, para fazer o insert no banco
        const flattened = []
        newsList.forEach((n) => { flattened.push.apply(flattened, n); });
        newsconntroller.insertNews(flattened);

        // Agrupa a lista de notícias por site
        const grouped = groupBy(flattened, 'site_id');

        // Para cada site da lista (lstSites), encontra o id que corresponde ao id do grouped para atualizar o objeto site da lista com os dados do limit
        lstSites.forEach(s => {
            if (s.limit)
                s.limit.value = grouped[s._id][0][s.limit.key];
            else
                Object.assign(s, { limit: { key: 'title', value: grouped[s._id][0].title } })

            //update site with updated limit
            console.log(s.limit)
            sitecontroller.updateLimit({ _id: s._id }, s);
        });
    });

    const groupBy = (array, key) => {
        // Return the end result
        return array.reduce((result, currentValue) => {
            // If an array already present for key, push it to the array. Else create an array and push the object
            if (!result[currentValue[key]]) {
                result[currentValue[key]] = [];
            }
            result[currentValue[key]].push(currentValue);
            // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
            return result;
        }, {}); // empty object is the initial value for result object
    };
}

exports.runScraper = runScraper;