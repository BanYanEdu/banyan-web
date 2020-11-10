// #PACKAGE: icloud-office-myapp
// #MODULE: MyApp
$(function() {
  var url = {
    vote: iNet.getUrl('cloud/application/vote'),
    append: iNet.getUrl('cloud/service/rental/application'),
    remove: iNet.getUrl('cloud/firmbasket/remove')
  };
  $('#app-tab a[href="#app-install"]').tab('show'); // Select tab by name
  
  $('#app-tabs a').click(function (e) {
	  e.preventDefault();
	  window.open($(this).attr('href'),'_self');
  });

  var voteRating = function(data){
    var __data = data || {};
    $.getJSON(url.vote, __data, function(json){
      if(!!json && !!json.uuid){
        // TODO: Change rating star and number
      }
    });
  };
  var appendRunOnCloud = function(data){
    var __data = data || {};
    $.getJSON(url.append, __data, function(json){
      // TODO: Run application
    });
  };
  var removeItemFromBasket = function(data){
    var __data = data || {};
    $.getJSON(url.remove, __data, function(json){
      if(!!json){
        if(json.total>0){
          var uuid = '#' + __data.apps;
          $(uuid).animate({'opacity': 0}, 1000);
          setTimeout(function(){
            $(uuid).remove();
          }, 1000);
        }else{
          var __empty = '<h4 class="text-red" style="text-align: center;">' + iNet.resources.office.emptybasket + '</h4>';
          $('#app-install').children().html(__empty);
        }
      }
    });
  };
  $('div.item-action, div.item-rating').on('click', '[item-action]', function(){
    var $this = $(this);
    var $parent = $this.parent();
    var _action = $this.attr('item-action');
    var _firm = $('#cogs-menu').find('[data-chk="true"]').prop('id');
    var __data = {};
    switch (_action){
      case 'vote':
        __data = {
          vote: $this.attr('data-val'),
          appID: $parent.parent().attr('data-a'),
          firm: _firm
        };
        voteRating(__data);
        break;
      case 'remove':
        __data = {
          apps: $this.attr('data-a'),
          firm: _firm
        };
        removeItemFromBasket(__data);
        break;
      case 'append':
        __data = {
          append: 'yes',
          apps: $this.attr('data-a'),
          firm: _firm
        };
        appendRunOnCloud(__data);
        break;
      default :
        throw new Error('Not found action!');
    }
  });
  $('.star-mask').on('mouseenter', function(){
    var $prev = $(this).prev('.star-mask');
    $(this).addClass('star-vote');
    $prev.addClass('star-vote');
  });
  $('.star-mask').on('mouseout', function(){
    var $prev = $(this).prev('.star-mask');
    $(this).removeClass('star-vote');
    $prev.removeClass('star-vote');
  });
});