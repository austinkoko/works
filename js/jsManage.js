// JavaScript Document
	$(function(){
		$(".venobox").on("click", function () { $("html").css( "overflow", "hidden" ); });
		$(".venobox").parents("body").on("click", ".vbox-close, .vbox-overlay ", function () {  $("html").css( "overflow", "" ); });
		

		//submenu
		$(function(){
			$('.dropDown').hover(function(){
				if($(this).parent().hasClass('nav')) return false;
				$(this).find('.submenu').stop(false,true).slideDown(200);
			},function(){
				if($(this).parent().hasClass('nav')) return false;
				$(this).find('.submenu').stop(false,true).slideUp(200);
			});
		});
		
		//mobile menu
		var $m_menu = $('ul.menu').clone();
		var $top_m_menu = $('.topLink').find('.rightBox').children('a').not('.dropDown, .exclude').clone();
				
		$m_menu.appendTo('.m_menu').removeClass().addClass('nav').find('b').remove().end().append($top_m_menu).children('a').wrap('<li/>').end().find('li.dropDown').each(function(){
			$(this).children('a').removeClass().append('<i class="fa-angle-down" />').attr('href','');
		});
				
		$('.m_menu').find('a.main').click(function(){
			if(!$(this).parent().hasClass('active')){
				$(this).parent().addClass('active');
				$(this).parent().css('height','auto');
			}else{
				$(this).parent().removeClass('active');
				$(this).parent().css('height',48);
			}//end if hasClass
			return false;
		});
		
		$('.m_menu').find('li.dropDown').children('a').click(function(){
			$(this).siblings().slideToggle();
			return false;
		});
		
		//mobile classLink
		var $clone = $('.side_classLink ul').clone(),
		      //$current_txt = $('.side_classLink ul').find('.current02').text();
                      $current_txt = $('.submenu-title').eq(0).text();
		$('.side_classLink').after('<div class="m_classLink"><a class="main"><b></b><i class="fa-angle-down"></i></a></div>');
		$('.m_classLink').append($clone).end().find('a.main b').text($current_txt);
		/*$('.m_classLink').hover(function(){
			$(this).find('ul').stop().slideDown(200);
		},function(){
			$(this).find('ul').stop().slideUp(200);*/
		var isT = true;
		$('.m_classLink').click(function(){
			if(isT){
				isT = false;
				$(this).find('i.fa-angle-down').removeClass().addClass('fa-angle-up').attr('href','');
				$(this).find('ul').stop().slideDown(200);
			}
			else{
				isT = true;
				$(this).find('i.fa-angle-up').removeClass().addClass('fa-angle-down').attr('href','');
				$(this).find('ul').stop().slideUp(200);
			}
			
		})
		
		//textEditor img
                /*
		if(isMobile){			
			$('.textEditor').find('img').each(function(){
				var href = $(this).attr('src').replace('_m','_b');
				$(this).wrap('<a class="titan-lb" href="' +href+ '"</a>');
			});			
		}
                */

		//mailLink
		$('.contactLink').click(function(){
			if(isMobile){
				var href = $(this).data('mail');
				window.location.href= 'mailto:'+href;
				return false;
			}
		});

		//gotop
		$('.goTop').click(function(){
			$('body,html').stop().animate({scrollTop:0});
			return false;
		});
				
		//fix contactInfo height
		$('.side_contactInfo').find('b').each(function(){
			if($(this).height() <= 20) $(this).siblings('i').css('float','none').css('display','inline-block');
		});


		$(window).scroll(function (e) {
			var n = $(window).scrollTop() - $("#content, .editor").offset().top;//scrollTop捲軸滾動
			if (n > 0) {
				$("header").addClass("down");
			} else {
				$("header").removeClass("down");
			}
		});

		//讓body多一組padding
		$('body').css('padding-top', $('header').height());

		$('.hor_1').find('table').wrap('<div class="datatable"></div>');

		$('.resp-tab-content table').wrap('<div class="table_scroll"></div>')


		/*phone touch move*/
		$(document).on('touchmove touchstart touchend', function (e){});
		
	});

	var shrinkHeader =1;
	$(window).scroll(function() {
		var scroll = getCurrentScroll();
		if (scroll >= shrinkHeader) {
			$('.dropdowns').addClass('navFixed');
		} else {
			$('.dropdowns').removeClass('navFixed');
		}
	});
	
	function getCurrentScroll() {
		return window.pageYOffset;
	}
	
	
	
	
	jQuery(function($){
	
		// Lightbox Triggers
		$(".open-video-link").videoBox();
	});
	/* ========================================================================= */
	/* FUNCTION TO CREATE LIGHTBOX */
	/* ========================================================================= */
	
	jQuery.fn.extend({
		videoBox : function() {
				var self, link, target, video, videoSrc, toggle;
				this.each(function() {
						$(this).on("click", function(event) {
								self = this;
								target = $(self).attr("href");
								video = $(target).find(".popup-video iframe");
								videoSrc = $(video).attr("src");
								event.preventDefault ? event.preventDefault() : event.returnValue = false;
								$(target).wrap( "<div class='lightbox'></div>" );
								$(".lightbox").fadeIn(300, function() {
										$(target).fadeIn(0);
										$("body").addClass("modal-open");
										$(video).attr("src",videoSrc+'?autoplay=1');
										resizeIfame(video);
								});
	
								$("body").on("click", function(event) {
										if(($(event.target).hasClass("lightbox") || $(event.target).hasClass("close")) && $(target).parent().hasClass("lightbox") ) {
												$(".lightbox").fadeOut(300, function() {
														$(target).hide(0);
														$(target).unwrap();
												});
												$("body").removeClass("modal-open");
												$(video).attr("src",videoSrc);
										}
								});
						});
				});
		}
	});
	
	
	/* ========================================================================= */
	/* RESIZE IFRAME VIDEO FUNCTION */
	/* ========================================================================= */
	function resizeIfame(frame) {
	
		var oldWidth = $(frame).width();
		var oldHeight = $(frame).height();
		var propotion = oldHeight / oldWidth;
		var newHeight;
	
		$(frame).width('100%');
		newHeight = $(frame).width() * propotion;
		$(frame).height(newHeight);
	
		$(window).resize(function() {
				$(frame).width('100%');
				newHeight = $(frame).width() * propotion;
				$(frame).height(newHeight);
		});
	}
	
	
	
	let el = $('.switch');
	let cur = el.find('.current');
	let options = el.find('.options li');
	let content = $('#content');
	let options_list = $('.options-list')
	
	// Open language dropdown panel
	
	el.on('click', function(e) {
		el.addClass('show-options');
		
		setTimeout(function() {
			el.addClass('anim-options');
		}, 50);
		
		setTimeout(function() {
			el.addClass('show-shadow');
		}, 200);
	});
	
	
	// Close language dropdown panel
	
	options.on('click', function(e) {
		e.stopPropagation();
		el.removeClass('anim-options');
		el.removeClass('show-shadow');
		
		let newLang = $(this).data('lang');
		
		cur.find('span').text(newLang);
		content.attr('class', newLang);
		
		setLang(newLang);
		
		options.removeClass('selected');
		$(this).addClass('selected');
		
		setTimeout(function() {
			el.removeClass('show-options');
		}, 600);
	});
	
	options_list.on('mouseleave', function(e){
		e.stopPropagation();
		el.removeClass('anim-options');
		el.removeClass('show-shadow');
		setTimeout(function(){
			el.removeClass('show-options');
		},0);
		
	});
	
	
	// Save selected options into Local Storage
	
	function getLang() {
		let lang;
		if (localStorage.getItem('currentLang') === null) {
			lang = cur.find('span').text();
		} else {
			lang = JSON.parse(localStorage.getItem('currentLang')).toLowerCase();
		}
		
		// console.log(lang);
	
		cur.find('span').text(lang);
		options.parent().find(`li[data-lang="${lang}"]`).addClass('selected');
		
		content.attr('class', lang);
	}
	
	getLang();
	
	function setLang(newLang) {
			localStorage.setItem('currentLang', JSON.stringify(newLang).toLowerCase());
		
		content.attr('class', newLang);
		
		// console.log('New language is: ' + newLang);
	}
	
	$(function(){
		/*$(".JQellipsis").each(function(){
			$(this).attr("data", $(this).text());
		});
	
		checkout()*/
	
		function checkout () {
			var len
			if (900 > document.body.scrollWidth) len = 43
			else len = 500
			$(".JQellipsis").each(function(){
				if($(this).attr('data').length > len) $(this).text($(this).attr('data').substring(0, len-1 ) + "...")
			});
	
			if (900 < document.body.scrollWidth) len = 43
			else len = 500
			$(".JQellipsis").each(function(){
				if($(this).attr('data').length > len) $(this).text($(this).attr('data').substring(0, len-1 ) + "代的超級利器—B52，終於誕生了。 從此，黃臉婆不再是媽媽的代名詞， 而BABY BOMB也不再是「BOMB　BOMB」，而是「棒棒」！BOMBER的神器，一掃爸爸們照顧嬰兒的恐懼，他們從此和媽媽爭先恐後，爭取享受親情的樂趣！")
			});
		 
		}
	
		/*$(window).resize(function () {
			checkout()
		});*/
	});