(function($){
	
	$(document).ready(function(){

		// GNB 영역 콘트롤 /////////////////////////////////////////////////////////
		$('.gnb a.title').mouseover(function(){
			$('.submenu').animate({opacity: "0"},0).hide();
			$(this).next().show().animate({opacity: "1"},300);
			return false;
		});

		$('.gnb').mouseleave(function(){
			$('.submenu').animate({opacity: "0"},300).hide();
			return false;
		});

		
		// GNB-개인메뉴
		$(".header_pos").mouseleave(function () {
			$(".user_info_pop").hide();
		});

		// 로그인 후 정보
		$(".btn_login_after").click(function(){
			$(".user_info_pop").slideToggle(); //로그인 후
		});


		//사이드 메뉴 컨트롤 ////////////////////////////////////////////////////////////////////
		function noScroll() {
		  window.scrollTo(0, 0); //사이드메뉴 노출시 스크롤 방지
		//   window.scrollBy(0, 0)
		}
		$('.btn_sidemenu').click(function(){
			$('.gnbarea_mobile').show().animate({right: "0"},300);
			$('body').append('<div class="modal_screen_sidemenu"></div>');
			// window.addEventListener('scroll', noScroll);
			$('body').css("overflow", "hidden");
			return false;
		});
		$('.btn_sidemenu_close').click(function(){
			$('.gnbarea_mobile').animate({right: "-300"},300).hide();
			$('div').remove('.modal_screen_sidemenu');
			// window.removeEventListener('scroll', noScroll);
			$('body').css("overflow", "initial");
			return false;
		});


		// 모바일 GNB 영역 콘트롤
		$('.gnb_mobile a.title').click(function(){
			// $(this).toggleClass('active');
			$(this).next('.submenu').slideToggle();
			return false;
		});		


		// 아이디/비번찾기 탭메뉴 콘트롤 ////////////////////////////////////////////////////////////////////
		$('.idpw_tabmenu a.btn_cont01').click(function(){
			$(this).addClass('active');
			$('.idpw_tabmenu a.btn_cont02').removeClass('active');
			$('#cont01').show();
			$('#cont02').hide();
			return false;
		});
		$('.idpw_tabmenu a.btn_cont02').click(function(){
			$(this).addClass('active');
			$('.idpw_tabmenu a.btn_cont01').removeClass('active');
			$('#cont01').hide();
			$('#cont02').show();
			return false;
		});
		 
		

		//  카테고리 분류 선택 ////////////////////////////////////////////////////////////////////
		$('.ui_select button.title_select').click(function(){
			$(this).toggleClass('active');
			$(this).next('.sub_select').slideToggle();
			return false;
		});

		$('.direct_search_check').click(function(){
			$('.direct_search_cont').slideDown();
			$('.catagory_search_cont').hide();
			return false;
		});

		$('.btn_catagory_search_view').click(function(){
			$('.direct_search_cont').hide();
			$('.catagory_search_cont').slideDown();
			return false;
		});

		// 챠트 기간선택 /////////////////////////////////////////
		$('.chart_term_select button').click(function(){
			$(this).toggleClass('active');
			$(this).next('.term_list').slideToggle();
			return false;
		});

		// 별점으로 모아보기: 하위권 리뷰 분석 팝업 /////////////////////////////////////
		$('.rate_sort a.title').click(function(){
			$('.rate_sort a.title').removeClass('active');
			$(this).toggleClass('active');
			// $(this).next('.term_list').slideToggle();
			return false;
		});

		// go_top 버튼 콘트롤
		$(function() {
			$(window).scroll(function() {
				if ($(this).scrollTop() > 200) {
					$('.go_page_top').fadeIn();
				} else {
					$('.go_page_top').fadeOut();
				}
			});
			
			$('.go_page_top').click(function() {
				$('html, body').animate({
					scrollTop : 0 
					// scrollTop: $($.attr(this, 'href')).offset().top
				}, 400);
				return false;
			});
		});
		

	});


})(jQuery);
