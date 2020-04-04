const puppeteer = require('puppeteer')

void (async () => {
	const sites = 
	[{
		url: 'http://www.tjsp.jus.br/Noticias',
		rowselector: 'article.noticia-item.row',
		cellselector: {title: 'h1', href: 'a', dthrpub: 'time', image: 'img', snippet: 'p'}
	},
	{
		url: 'http://www.tjrj.jus.br/web/guest/noticias',
		rowselector: '.lista-noticias > li',
		cellselector: {title: '.data > a', href: 'a', dthrpub: '.data > strong', image: 'img', snippet: 'p'}
	}];

	await doScrap(sites);
})();

async function doScrap(sites) {
	try {
		const browser = await puppeteer.launch();

		for (const site of sites) {
			
			const page = await browser.newPage();
			await page.goto(site.url)

			//get news
			const news = await page.evaluate((site) => {

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
						title: getFromLine(row, site.cellselector.title, 'title'),
						href: getFromLine(row, site.cellselector.href),
						dthrpub: getFromLine(row, site.cellselector.dthrpub),
						image: getFromLine(row, site.cellselector.image),
						snippet: getFromLine(row, site.cellselector.snippet)
					});
				}
				return data;
			}, site);

			console.log(JSON.stringify(news, null, 2));
		}

		await browser.close();

		
	} catch(error){
		console.error(error);
	}
}