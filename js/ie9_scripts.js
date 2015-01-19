$(document).ready(function() {

	$(window).load(function() {
		hoverMenu();
		menusClicker();
		contentFix();
	})

	$(window).resize(function() {
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