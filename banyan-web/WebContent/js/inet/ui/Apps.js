// #PACKAGE: icloud-office-apps
// #MODULE: Apps
$(function() {
  //$('#app-tab a[href="#app-popular"]').tab('show') // Select tab by name
  var $_notify = $('#notify-data-change');
	var url = {
    addBasket: iNet.getUrl('cloud/firmbasket/add')
  };
	$('#app-tabs a').click(function (e) {
	  e.preventDefault();
	  window.open($(this).attr('href'),'_self');
	});
  var changeColor = function($elm, arrayColor, delay){
    $elm.css('display', 'inline-block');
    var _i = 1;
    setInterval(function(){
      $elm.find('.badge').css('color', arrayColor[_i%arrayColor.length]);
      _i++;
    }, delay || 2000);
  };
  var changeLabel = function($elm, arrayLabel, delay){
    $elm.css('display', 'inline-block');
    var _i = 1;
    setInterval(function(){
      $elm.find('.badge').css('background-color', arrayLabel[_i%arrayLabel.length]);
      _i++;
    }, delay || 2000);
  };
  var buyApp = function(data){
    console.log('BUY APP >>>>>>>>>>>>>>>>>>>>', data);
  };
  var addWishlist = function(data){
    var __data = data || {};
    $.getJSON(url.addBasket, __data, function(json){
      if(!!json){
        $_notify.find('.badge').text(json.total);
        changeLabel($_notify, ['orange', 'white']);
        changeColor($_notify, ['#FFFFFF', '#333333']);
      }
    });
  };
  $('.add-firm-basket').click(function(){
    var __uuid = $(this).attr('data-value');
    var __firmUUID = $('[data-chk=true]').prop('id');
    var __data = {
      apps: __uuid,
      firm: __firmUUID
    };
    $.getJSON(url.addBasket, __data, function(json){
      if(!!json){
        $_notify.find('.badge').text(json.total);
        changeLabel($_notify, ['orange', 'white']);
        changeColor($_notify, ['#FFFFFF', '#333333']);
      }
    });
  });
  $('[item-action]').on('click', function(){
    var $this = $(this);
    var __data = {
      apps: $this.attr('data-a'),
      firm: $('[data-chk=true]').prop('id')
    };
    var _action = $this.attr('item-action');
    switch (_action){
      case 'buy': buyApp(__data);
        break;
      case 'addwishlist': addWishlist(__data);
        break;
      default :
        throw new Error('Not found action!');
    }
  });
});