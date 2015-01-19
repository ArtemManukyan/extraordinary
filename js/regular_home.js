$(document).ready(function() {

	$(window).load(function() {
		columns();
		imageAligner();
		newsImgHover();
		newsImgTriangle();
		hoverEffects();
	})

	$(window).resize(function() {
		columns();
		imageAligner();
		newsImgHover();
		newsImgTriangle();
		hoverEffects();
	})

	// Columns

	var content = $('#content');
	var publications = $('#content section');
	var pubNum = publications.length;
	pubInner = [];
	var i = 0;
	$('#content section').each(function(){
		pubInner[i] = this.innerHTML;
		i++;
	})

	function columns() {

		// Clearing content block

		content[0].innerHTML = '';

		// Determining the number of columns

		var colNum = 1;
		
		if(window.matchMedia('(min-width: 768px)').matches) {
			colNum = 2;
		}
		if(window.matchMedia('(min-width: 1280px)').matches) {
			colNum = 3;
		}
		if(window.matchMedia('(min-width: 1600px)').matches) {
			colNum = 4;
		}
		if(window.matchMedia('(min-width: 1920px)').matches) {
			colNum = 5;
		}

		// Creating columns

		for(var i = 0; i < colNum; i++) {
			$('#content')[0].innerHTML += '<div class="column"></div>';
		}

		// Determining the number of publications in 1 column

		var pubsInCol = parseInt(pubNum / colNum);
		var addPubsInCol = pubNum % colNum;

		// Laying out publications

		var currPub = 0;

		$('.column').each(function() {
			this.innerHTML = '';
		})

		for(var i = 0; i < colNum; i++) {
			if(addPubsInCol > 0) {
				for(var j = 0; j < pubsInCol + 1; j++) {
					$('.column')[i].appendChild(publications[currPub]);
					$('.column section')[currPub].innerHTML = pubInner[currPub]; // for IE
					currPub++;
				}
				addPubsInCol--;
			}
			else {
				for(var j = 0; j < pubsInCol; j++) {
					$('.column')[i].appendChild(publications[currPub]);
					$('.column section')[currPub].innerHTML = pubInner[currPub]; // for IE
					currPub++;
				}
			}
		}

		// Making publications in columns visible

		$('.column section').each(function() {
			this.style.display = 'inline-block';
		})
		$('.column .ad img').each(function() {
			this.style.width = '100%';
		})
	}

	// Images aligning

	function imageAligner() {
		var image = $('.news img');
		var link = $('.news img').parent('a');

		for(var i = 0; i < link.length; i++) {
			if(link[i].offsetWidth > image[i].offsetWidth){
				image[i].style.width = '100%';				
			}
			else {
				var marginLeft = ((link[i].offsetWidth - image[i].offsetWidth) / 2) + 'px';
				image[i].style.marginLeft = marginLeft;
			}
		}
	}

	// News image hover

	function newsImgHover() {
		if(window.matchMedia('(min-width: 320px)').matches) {
			var link = $('.news img').parent('a');

			for(var i = 0; i < link.length; i++) {
				link[i].innerHTML += '<div class="news-img-hoverer"><div class="read-more">Read More</div></div>';
			}

			var image = $('.news img');
			var link = $('.news img').parent('a');
			var imgHover = $('.news-img-hoverer');

			for(var i = 0; i < link.length; i++) {
				imgHover[i].style.height = image[i].offsetHeight + 'px';
				imgHover[i].style.marginTop = '-' + (image[i].offsetHeight + 5) + 'px';
				$('.read-more')[i].style.marginTop = ((image[i].offsetHeight / 2) - 32) + 'px';
			}
		}
	}

	function hoverEffects() {
		if (('ontouchstart' in document.documentElement) == false) {
			$('.news a img').hover(function(){
				$(this).addClass('news-img-hover');
			}, function(){
				$(this).removeClass('news-img-hover');
			});
		}
	}

	// Triangle on images (I could make it using ::after, but thank's to IE i had to use JS =(( )

	function newsImgTriangle() {
		var link = $('.news img').parent('a');

		for(var i = 0; i < link.length; i++) {
			link[i].innerHTML += '<div class="triangle"></div>';
		}
	}

});