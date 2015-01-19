$(document).ready(function() {

	$(window).load(function() {
		contentWidth();
		headerMenusAligner();
		hoverMenu();
		menusClicker();
		contentFix();
	})

	$(window).resize(function() {
		contentWidth();
		headerMenusAligner();
		hoverMenu();
		contentFix();
	})

	// Header menus placeholders

	$('#search-menu input')[0].value = 'I\'m looking for...'
	$('#auth-menu input')[0].value = 'Login'
	$('#auth-menu input')[1].value = 'Password'
	$('#header-btns input').focus(function() {
		this.value = '';
	})

	// Content block fix

	function contentWidth() {
		var contWidth = parseInt($('body').css('width')) - 70;
		$('#content').css('width', contWidth);
	}

	// Header menus alignment
	
	function headerMenusAligner() {
		if($('#header-btns').css('width') == $('body').css('width') && $('#share').css('visibility') != 'hidden') {
			var menuBtnWidth = parseInt(parseInt($('body').css('width')) / 4);
			$('#share-menu')[0].style.left = (menuBtnWidth * 2 - 185 + 3) + 'px';
			$('#search-menu')[0].style.left = (menuBtnWidth * 3 - 300 + 3) + 'px';
			$('#auth-menu')[0].style.left = (menuBtnWidth * 4 - 200 + 3) + 'px';
		}
		else {
			$('#share-menu')[0].style.left = '';
			$('#search-menu')[0].style.left = '';
			$('#auth-menu')[0].style.left = '';
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