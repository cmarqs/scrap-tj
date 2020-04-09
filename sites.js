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
		*/

const sites = [
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
		{
			url: 'https://www.tjgo.jus.br/index.php/institucional/centro-de-comunicacao-social',
			rowselector: 'div.item',
			cellselector: {
				title: { tagselector: 'h2' }, 
				href: { tagselector: 'a' },
				dthrpub: { tagselector: 'time', attr: 'datetime' },
				image: { tagselector: 'img' },
				snippet: { tagselector: 'p' }
			},
			nextbuttonpagination: 'i.fas.fa-angle-right'
		},
		{
			url: 'http://www.tjma.jus.br/tj/publicacoes/sessao/19',
			rowselector: '#list-news > li',
			cellselector: {
				title: { tagselector: 'h2' }, 
				href: { tagselector: 'a' },
				dthrpub: { tagselector: 'span' },
				image: { tagselector: 'img' },
				snippet: { tagselector: 'p:not(#local)' }
			},
			nextbuttonpagination: '.pagination li:last-child a:not(.selected)'
		},
]

exports.sites = sites;