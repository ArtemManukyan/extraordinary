$(document).ready(function() {

	$(window).load(function() {
		mainImgSize();
		figure();
	})

	$(window).resize(function() {
		mainImgSize();
		figure();
	})

	// Main image size

	function mainImgSize() {
		var realWidth = $('.main-image img')[0].naturalWidth;

		if (typeof $('.main-image img')[0].naturalWidth == "undefined") { //IE8
			var i = new Image();
			i.src = $('.main-image img')[0].src;
			realWidth = i.width;
		}

		var imgHeight = parseInt($(window).height() * 0.35);

		$('.main-image').css('height', (imgHeight + 'px'));
		
		if (realWidth > $(window).width()) {
			$('.main-image img').css('width', '100%');
		}
		else {
			$('.main-image img').css('width', (realWidth + 'px'));
		}

		var notRealHeight = $('.main-image img').height();
		var marginTop = (imgHeight - notRealHeight) / 2;

		if (marginTop < 0) {
			$('.main-image img').css('margin-top', marginTop + 'px');
		}
 		else {
			$('.main-image img').css('margin-top', '0px');
 			$('.main-image').css('height', (notRealHeight + 'px'));
 		}
	}

	// Figure blocks aligning

	var figCount = 0;
	function figure() {
		var isColumns = [
			$('.news-itself').css('-webkit-column-count'),
			$('.news-itself').css('-moz-column-count'),
			$('.news-itself').css('column-count'),
			$('.news-itself').css('-webkit-column-width'),
			$('.news-itself').css('-moz-column-width'),
			$('.news-itself').css('column-width'),
		];

		var colWidth;
		var colGap;

		if ($('.news-itself').css('-webkit-column-gap') != undefined)	colGap = parseInt($('.news-itself').css('-webkit-column-gap'));
		if ($('.news-itself').css('-moz-column-gap') != undefined)	colGap = parseInt($('.news-itself').css('-moz-column-gap'));
		if ($('.news-itself').css('column-gap') != undefined)	colGap = parseInt($('.news-itself').css('column-gap'));

		var contWidth = $('#news-content').width();

		for (var i = 0; i < isColumns.length; i++) {
			if (isColumns[i] != null && isColumns[i] != 'auto' && isColumns[i] != '') {
				if (parseInt(isColumns[i]) > 20)
					colWidth = parseInt(isColumns[i]) - 30;
				else
					colWidth = parseInt(contWidth / isColumns[i] - 30);
			}
					console.log(isColumns[i]);
		}
		if (colWidth == undefined || isNaN(colWidth) == true)	colWidth = contWidth;
		console.log(colWidth)

		$('figure').each(function() {
			if (colWidth > $('figure img')[figCount].offsetWidth) {
				var figAlign = $('figure')[figCount].style.textAlign;

				if (figAlign == 'center')
					$('figure')[figCount].style.left = parseInt((colWidth - $('figure img')[figCount].offsetWidth) / 2) + 'px';
				else if (figAlign == 'right')
					$('figure')[figCount].style.left = parseInt((colWidth - $('figure img')[figCount].offsetWidth)) + 'px';
				else	$('figure')[figCount].style.left = '0';
			}
			else {
				$('figure')[figCount].style.left = '0';
			}
			figCount++;
		})
		figCount = 0;
	}

});