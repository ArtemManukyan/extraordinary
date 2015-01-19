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

		// Determining the number of columns

		content[0].innerHTML += '<div class="column"></div>';
		var colCoef = ($(window).width() - 100) / parseInt($('.column').css('width'));

		var colNum;
		
		if(colCoef <= 2) {
			colNum = 1;
		}
		else if(colCoef <= 3) {
			colNum = 2;
		}
		else if(colCoef <= 4) {
			colNum = 3;
		}
		else if(colCoef <= 5) {
			colNum = 4;
		}
		else {
			colNum = 5;
		}

		// Clearing content block

		content[0].innerHTML = '';

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

		// Little fix for small displays

		if(colNum == 1) {
			$('#content').css('width', '100%'); // Content block width
			var asideTop = parseInt($(window).height() / 2 - 210); // Sidebar alignment
			if(asideTop > 0)	$('aside').css('margin-top', asideTop + 'px')
			else	$('aside').css('margin-top', '0');
		}
		else	$('aside').css('margin-top', '0');
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
		if ($(window).width() >= 310) {
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

	// Triangle on images (I could do this using ::after, but thank's to IE i had to use JS =(( )

	function newsImgTriangle() {
		var link = $('.news img').parent('a');

		for(var i = 0; i < link.length; i++) {
			link[i].innerHTML += '<div class="triangle" style="margin-top: -10px;"></div>';
		}
	}

});