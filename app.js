const puppeteer = require('puppeteer');
const sites = require('./sites');

void (async () => {
	const lstSites = sites.sites;

	const newsList = await doScrap(lstSites);
	console.log(newsList)
	console.log(`Total páginas extraídas: ${newsList.length}`);
})();

async function doScrap(sites) {

	async function getNewsFromEvaluatePage(page, site) {
		return await page.evaluate((site) => {
	
			const getFromLine = function(row, cell, attr) {
				el = row.querySelector(cell);
				if (el){
					if (!attr){
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
			for (const row of newsRows){
				data.push({
					title: getFromLine(row, site.cellselector.title.tagselector, site.cellselector.title.attr),
					href: getFromLine(row, site.cellselector.href.tagselector, site.cellselector.href.attr),
					dthrpub: getFromLine(row, site.cellselector.dthrpub.tagselector, site.cellselector.dthrpub.attr),
					image: getFromLine(row, site.cellselector.image.tagselector, site.cellselector.image.attr),
					snippet: getFromLine(row, site.cellselector.snippet.tagselector, site.cellselector.snippet.attr)
				});
			}

			if (document.querySelector(site.nextbuttonpagination))
				document.querySelector(site.nextbuttonpagination).click

			return data;
			
		}, site);
	}

	async function paginateNewsFromPage(page, site) {
		try{
			await page.waitForSelector(site.nextbuttonpagination , { timeout: 1000  });
			await page.click(site.nextbuttonpagination);
		}
		catch(error){
			console.log(`Erro de paginação: ${error} \n`);
		}
	}

	async function scrapParallelFromSiteList() {
		const newsList = [];
		await Promise.all(
			sites.map(
				async (site) => {
					const page = await browser.newPage();
					try{
						await page.goto(site.url)
						newsList.push(await getNewsFromEvaluatePage(page, site));
					}
					catch(error){
						console.log(`Erro ao raspar ${site.url}: ${error} \n`);
					}
				}
			)
		);
		return newsList;
	}

	const browser = await puppeteer.launch({headless: false, slowMo: 250 });

	try {
		return await scrapParallelFromSiteList();
	} catch(error){
		console.error(error);
	} finally{
		await browser.close();
	}
}

