$(document).ready(function() {

	$(window).load(function() {
		settingsBtnAligner();
		hoverMenu();
		menusClicker();
		contentFix();
	})

	$(window).resize(function() {
		settingsBtnAligner();
		hoverMenu();
		contentFix();
	})
	
	$(window).scroll(function() {
		settingsBtnAligner();
	})

	// Attaching last menu button to bottom

	function settingsBtnAligner() {
		if(window.matchMedia('(max-height: 730px)').matches) {
			if($(window).height() + $(window).scrollTop() > 710) {
				$('aside li:nth-of-type(8)').addClass('last-child')
				$('aside li:last-child').addClass('last-child')
			}
			else {
				$('aside li:nth-of-type(8)').removeClass('last-child')
				$('aside li:last-child').removeClass('last-child')
			}
		}
	}

	// Buttons highlighting on hover

	function hoverMenu() {
		if (('ontouchstart' in document.documentElement) == false) {
			$("#header-btns > button").hover(function() {
				$(this).addClass('header-btns-hover');
			}, function() {
				$(this).removeClass('header-btns-hover');
			});
		}
	}

	// Menus avaible and hiding on click

	function menusClicker() {

		// Menus avaible on click

		$('#header-btns > button').click(function() {
			var btnId = '#' + $(this).attr('id');
			var btnItself = $(this);
			headerBtnClicker(btnId, btnItself);
		})

		function headerBtnClicker(btnId, btnItself) {
			if(btnItself.hasClass('header-btns-clkd') == false) {
				headerBtnsClearer();
				$(btnId).addClass('header-btns-clkd');
				if(btnId == '#menu-btn') $('aside').addClass('menu-btn-content')
				else $(btnId + '-menu').addClass('header-btns-content');
			}
			else {
				headerBtnsClearer();
			}
		}

		// Menus hiding on click

		var cldElemCount = 0;
		var cldElems = [];
		$('*').click(function(){
			cldElems[cldElemCount] = this;
			cldElemCount++;
			if(this.nodeName == 'HTML') {
				if(cldElems.length < 5) headerBtnsClearer();
				cldElemCount = 0;
				cldElems = [];
			}
		})

		function headerBtnsClearer() {
			$('#header-btns *').removeClass('header-btns-clkd');
			$('#header-btns *').removeClass('header-btns-content');
			$('aside').removeClass('menu-btn-content');
		}
	}

	// One more fix

	function contentFix() {
		var winHeight = $(window).height();
		if (winHeight > $('#content').height())
			$('#content').css('height', winHeight)
		else
			$('#content').css('height', '')
	}

});