const puppeteer = require('puppeteer');

async function doScrap(sites) {

    async function getNewsFromEvaluatePage(page, site) {
        return await page.evaluate((site) => {

            const getFromLine = function (row, cell, attr) {
                el = row.querySelector(cell);
                if (el) {
                    if (!attr) {
                        switch (el.nodeName) {
                            case "IMG":
                                return el.src;
                            case "A":
                                return el.href;
                            default:
                                return el.innerText;
                        }
                    }
                    else
                        return el.getAttribute(attr);
                }
            }

            const data = [];
            const newsRows = document.querySelectorAll(site.rowselector);
            for (const row of newsRows) {
                data.push({
                    title: getFromLine(row, site.cellselector.title.tagselector, site.cellselector.title.attr),
                    href: getFromLine(row, site.cellselector.href.tagselector, site.cellselector.href.attr),
                    dthrpub: getFromLine(row, site.cellselector.dthrpub.tagselector, site.cellselector.dthrpub.attr),
                    image: getFromLine(row, site.cellselector.image.tagselector, site.cellselector.image.attr),
                    snippet: getFromLine(row, site.cellselector.snippet.tagselector, site.cellselector.snippet.attr)
                });
            }

            return data;

        }, site);
    }

    async function scrapParallelFromSiteList() {

        async function stopPagination(datacollected, site, page) {
            let doStop = false;
            Array(datacollected).some((data) => {
                //console.log(`Key do site ${site.url} é (${site.limit.key}) ${site.limit.value}`);
                data.some((d, i) => {
                    doStop = (d[site.limit.key] == site.limit.value);
                    //console.log(`i[${i}] = ${d[site.limit.key]} (stoped: ${doStop})`);
                    return doStop;
                });
                return doStop;
            });

            if (!doStop) {
                try {
                    await page.waitForSelector(site.nextbuttonpagination, { timeout: 10000 });
                    await page.click(site.nextbuttonpagination);
                    doStop = false;
                }
                catch (error) {
                    console.log(`Erro ao paginar site ${site.url}: ${error}`);
                    doStop = true;
                }
            }
            // console.log(`Saiu como? ${doStop}`)
            return doStop;
        }

        const newsList = [];
        await Promise.all(
            sites.map(
                async (site) => {
                    const page = await browser.newPage();

                    try {
                        await page.goto(site.url)

                        let news = [];
                        let stopPaginate = false;
                        do {
                            news = await getNewsFromEvaluatePage(page, site);
                            newsList.push(news);
                            stopPaginate = await stopPagination(news, site, page);
                        } while (!stopPaginate)
                    }
                    catch (error) {
                        console.log(`Erro ao raspar ${site.url}: ${error} \n`);
                    }
                    finally {
                        await page.close();
                    }

                }
            )
        );
        return newsList;
    }

    const browser = await puppeteer.launch({ headless: false, slowMo: 250 });

    try {
        return await scrapParallelFromSiteList();
    } catch (error) {
        console.error(error);
    } finally {
        await browser.close();
    }
}
module.exports.doScrap = doScrap;