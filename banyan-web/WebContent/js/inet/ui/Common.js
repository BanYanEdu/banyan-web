// #PACKAGE: cloudoffice-common
// #MODULE: Common
$(function() {
  // ========================================================================
  var $nav = $('#header-navbar');
  var $menus = $nav.find('li');
  var __path = window.location.pathname;
  $('#menu-logout').click(function () {
    iNet.WebClientService.logout();
  });
  for (var i = 0; i < $menus.length; i++) {
    var $menu = $($menus.get(i));
    var $target = $menu.find('a:first');
    var __url = $target.attr('href');
    var __isActive = (__url.match(__path) || []).length > 0;
    if (__isActive) {
      $menus.removeClass('active');
      $menu.addClass('active');
      //break;
    }
  }
  
  $('#header-navbar a').click(function (e) {
	  e.preventDefault();
	  window.open($(this).attr('href'),'_self');
  });
  
/*

  $('#signin-menu').on('click', function() {
    $(this).toggleClass('display-none');
    $("#signup-menu").addClass("display-none");
    $("#cogs-menu").addClass("display-block");
    $("#profile-menu").toggleClass("display-block");
  });
*/

  $('#menu-logout').on('click', function() {
    $("#signup-menu").removeClass("display-none");
    $("#signin-menu").removeClass("display-none");
    $("#cogs-menu").removeClass("display-block");
    $("#profile-menu").removeClass("display-block");
  });

  // Search box toggle
  // =================
  $('#search-btn').on('click', function() {
    $("#search-icon").toggleClass('fa-times margin-2');
    $("#search-box").toggleClass('display-block animated fadeInUp');
  });

  // Smooth scrolling for UI elements page
  // =====================================
  $(document).ready(function() {
    $('a[href*=#buttons],a[href*=#panels], a[href*=#info-boards], a[href*=#navs], a[href*=#alerts], a[href*=#thumbnails], a[href*=#social], a[href*=#section-header],a[href*=#page-tip], a[href*=#block-header]').bind("click", function(e) {
      var anchor = $(this);
      $('html, body').stop().animate({
        scrollTop : $(anchor.attr('href')).offset().top
      }, 1000);
      e.preventDefault();
    });
    return false;
  });

  // 404 error page smile
  // ====================
  $('#search-404').on('click', function() {
    $("#smile").removeClass("fa-meh-o");
    $("#smile").addClass("fa-smile-o");
  });
  /*
  // Sign up popovers
  // ================
  $(function() {
    $('#exampleInputName1').popover();
  });

  $(function() {
    $('#exampleInputUsername1').popover();
  });

  $(function() {
    $('#exampleInputEmail1').popover();
  });

  $(function() {
    $('#exampleInputPassword1').popover();
  });

  $(function() {
    $('#exampleInputPassword2').popover();
  });
*/

}); 