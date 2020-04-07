const puppeteer = require('puppeteer')

void (async () => {
	const sites = 
	[
		/*
		{
			url: '',
			rowselector: '',
			cellselector: {
				title: { tagselector: 'h1' }, 
				href: { tagselector: 'a' },
				dthrpub: { tagselector: 'time' },
				image: { tagselector: 'img' },
				snippet: { tagselector: 'p' }
			},
			nextbuttonpagination: 'a[title="Próximo"]'
		},
		{
		url: 'http://www.tjsp.jus.br/Noticias',
		rowselector: 'article.noticia-item.row',
		cellselector: {
			title: { tagselector: 'h1' }, 
			href: { tagselector: 'a' },
			dthrpub: { tagselector: 'time' },
			image: { tagselector: 'img' },
			snippet: { tagselector: 'p' }
		},
		nextbuttonpagination: '.btn_Numpag > i.fa.fa-chevron-right'
	},
	{
		url: 'http://www.tjrj.jus.br/web/guest/noticias',
		rowselector: '.lista-noticias > li',
		cellselector: {
			title: { tagselector: '.data > a', attr: 'title'}, 
			href: { tagselector: 'a' },
			dthrpub: { tagselector: '.data > strong' },
			image: { tagselector: 'x' },
			snippet: { tagselector: 'p' }
		},
		nextbuttonpagination: 'ul.lfr-pagination-buttons.pager > li:not(.disabled) a'
	},


	{
		url: 'https://www.tjac.jus.br/category/noticias/',
		rowselector: 'article.noticia-item.row',
		cellselector: {
			title: { tagselector: 'h1'}, 
			href: { tagselector: 'a' },
			dthrpub: { tagselector: 'time' },
			image: { tagselector: 'img' },
			snippet: { tagselector: 'em' }
		},
		nextbuttonpagination: 'div.navigation li:last-child:not(.active) a'
	},
	{
		url: 'http://www.tjal.jus.br/comunicacao2.php?pag=listaNoticias',
		rowselector: 'div.col-sm-12[style="margin-bottom:40px;"]',
		cellselector: {
			title: { tagselector: 'font.manchete03' }, 
			href: { tagselector: 'a' },
			dthrpub: { tagselector: 'font' },
			image: { tagselector: '.thumbnail > img' },
			snippet: { tagselector: 'font:last-child' }
		},
		nextbuttonpagination: 'a i.glyphicon-chevron-right'
	},
	{
		url: 'https://www.tjam.jus.br/index.php/menu/sala-de-imprensa',
		rowselector: 'tbody > tr',
		cellselector: {
			title: { tagselector: '.list-title' }, 
			href: { tagselector: '.list-title a' },
			dthrpub: { tagselector: '.list-date.small' },
			image: { tagselector: 'x' },
			snippet: { tagselector: 'x' }
		},
		nextbuttonpagination: 'ul.pagination li a[title=Próximo]'
	},
	{
		url: 'https://www.tjap.jus.br/portal/publicacoes/noticias.html',
		rowselector: 'div.blog > div',
		cellselector: {
			title: { tagselector: '.page-header' }, 
			href: { tagselector: 'a' },
			dthrpub: { tagselector: 'time' },
			image: { tagselector: 'img' },
			snippet: { tagselector: 'p' }
		},
		nextbuttonpagination: 'a[title="Próximo"]'
	},
	{
		url: 'http://www5.tjba.jus.br/portal/categoria/noticia/',
		rowselector: 'article.noticia',
		cellselector: {
			title: { tagselector: 'h1' }, 
			href: { tagselector: 'a' },
			dthrpub: { tagselector: 'time' },
			image: { tagselector: 'img' },
			snippet: { tagselector: 'p:nth-last-child(3) > a'}
		},
		nextbuttonpagination: 'a.nextpostslink'
	},
	{
		url: 'https://www.tjce.jus.br/noticias/',
		rowselector: 'article',
		cellselector: {
			title: { tagselector: 'h3' }, 
			href: { tagselector: 'a' },
			dthrpub: { tagselector: 'li:last-child' },
			image: { tagselector: 'img' },
			snippet: { tagselector: 'div.grid-itens' }
		},
		nextbuttonpagination: 'a.next.page-numbers'
	},
	{
		url: 'https://www.tjdft.jus.br/institucional/imprensa/noticias',
		rowselector: 'article.entry',
		cellselector: {
			title: { tagselector: 'span' }, 
			href: { tagselector: 'a' },
			dthrpub: { tagselector: 'time' },
			image: { tagselector: 'img' },
			snippet: { tagselector: 'p' }
		},
		nextbuttonpagination: 'span.label + span.arrow'
	},
	{
		url: 'http://www.tjes.jus.br/category/ultimasnoticias/',
		rowselector: 'div.container article',
		cellselector: {
			title: { tagselector: 'h2'}, 
			href: { tagselector: 'a.article-titulo' },
			dthrpub: { tagselector: 'div.post-date.text-uppercase' },
			image: { tagselector: 'img' },
			snippet: { tagselector: 'div.intro-text' }
		},
		nextbuttonpagination: 'a.next.page-numbers'
	},
	*/

];

	const newsList = await doScrap(sites);
	console.log(newsList)
	console.log(`Total páginas extraídas: ${newsList.length}`);
})();

async function doScrap(sites) {
	const browser = await puppeteer.launch({headless: false, slowMo: 250 });
	const newsList = [];

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

	try {

		for (const site of sites) {
			
			const page = await browser.newPage();
			await page.goto(site.url)

			let i = 1;
			let paginate = false;
			do {
				console.log(`Pagina: ${i}`);

				//get news
				//await page.waitForSelector(page.rowselector , { timeout: 1000  });
				newsList.push(await getNewsFromEvaluatePage(page, site));

				// it continues to get news paginating (if exists)
				try{
					await page.waitForSelector(site.nextbuttonpagination , { timeout: 1000  });
					await page.click(site.nextbuttonpagination);

					//manually set number of pages		
					i += 1;
					paginate = (i <= 3) ? true : false;
				}
				catch(error){
					console.log(`Erro ao paginar (${i}) ${site.url}: ${error}`);
					paginate = false;
				}
			}while (paginate);
		}
		return newsList;

	} catch(error){
		console.error(error);
	} finally{
		await browser.close();
	}
}

