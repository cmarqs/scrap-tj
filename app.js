const puppeteer = require('puppeteer')

void (async () => {
	const sites = 
	[{
		url: 'http://www.tjsp.jus.br/Noticias',
		rowselector: 'article.noticia-item.row',
		cellselector: {
			title: { tagselector: 'h1' }, 
			href: { tagselector: 'a' },
			dthrpub: { tagselector: 'time' },
			image: { tagselector: 'img' },
			snippet: { tagselector: 'p' }
		}
	},
	{
		url: 'http://www.tjrj.jus.br/web/guest/noticias',
		rowselector: '.lista-noticias > li',
		cellselector: {
			title: { tagselector: '.data > a', attr: 'title'}, 
			href: { tagselector: 'a' },
			dthrpub: { tagselector: '.data > strong' },
			image: { tagselector: 'img' },
			snippet: { tagselector: 'p' }
		}
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
						title: getFromLine(row, site.cellselector.title.tagselector, site.cellselector.title.attr),
						href: getFromLine(row, site.cellselector.href.tagselector, site.cellselector.href.attr),
						dthrpub: getFromLine(row, site.cellselector.dthrpub.tagselector, site.cellselector.dthrpub.attr),
						image: getFromLine(row, site.cellselector.image.tagselector, site.cellselector.image.attr),
						snippet: getFromLine(row, site.cellselector.snippet.tagselector, site.cellselector.snippet.attr)
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