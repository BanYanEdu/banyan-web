// #PACKAGE: icloud-office-database
// #MODULE: Database
/**
 * Copyright (c) 2014 iNet Solutions Corp.,
 * Created by Nguyen Ba Chi Cong<nbccong@inetcloud.vn>
 *         on 17/03/2014.
 * -------------------------------------------
 * Project app-store
 */

$(function(){
  var $btn = {
    addComputeApp: $('#btn-addnew-compute-app'),
    addComputeDb: $('#btn-addnew-compute-db'),
    save: $('#btn-save'),
    restart: $('[data-action="compute-restart"]'),
    shutdown: $('[data-action="compute-shutdown"]'),
    viewLog: $('[data-action="compute-view-log"]')
  };
  var $tr = {
    computeApp: $('#policy-compute-app'),
    computeDb: $('#policy-compute-databse')
  };
  var $cbb = {
    cbbComputeApp: $('#cbb-compute-app'),
    cbbComputeDb: $('#cbb-compute-databse')
  };
  var $elm = {
    cofg: $('#cogs-menu'),
    nofitier: $('#cloudoffice-notifier')
  };
  var url = {
    pricepolicy: iNet.getUrl('cloud/price/policy'),
    save: iNet.getUrl('cloud/service/rental/resource'),
    restart: iNet.getUrl('cloud/service/restart'),
    shutdown: iNet.getUrl('cloud/service/shutdown'),
    viewlog: ''//iNet.getUrl()

  };
  var Notifier = function(config){
    var ntf = this;
    iNet.apply(this, config || {});
    ntf.e = ntf.e || '.notify';
    ntf.$e = ntf.$e || $.getCmp(ntf.e);
    ntf.t = ntf.t || 'success';
    ntf.ms  = ntf.ms  || '';
    ntf.clsc = ntf.clsc || 'alert-success';
    ntf.cler = ntf.cler || 'alert-danger';
    ntf.i = iNet.alphaGenerateId() || 'cloudoffice-notifier';
    var render = function(cls, msg){
      var __html = '<div id="{0}" class="alert {1} alert-dismissable" style="display: none;">' +
          '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
          '<span item-name="content">{2}</span></div>';
      return String.format(__html, ntf.i, cls, msg);
    }, times, setting = function(){
      var __content = '';
      if(ntf.t=='success'){
        __content = render(ntf.clsc, ntf.ms);
      }else if(ntf.t=='error'){
        __content = render(ntf.cler, ntf.ms);
      }
      ntf.$e.html(__content);
    };
    ntf.show = function(showIn, showOut, delay){
      setting();
      var $ntf = $.getCmp(ntf.i);
      $ntf.fadeIn(showIn || 300);
      clearTimeout(times);
      times = setTimeout(function(){
        $ntf.fadeOut(showOut || 500);
      }, delay || 5000);
    };
  };
  var pricePolicy = [], owner = {data:{ajax: 'callback'}},
      times, notify = function(t, ms){
        var ntf = new Notifier({
          $e: $elm.nofitier,
          t: t,
          ms: ms
        });
        ntf.show();
      };
  var loadPricePolicy = function(){
    $.getJSON(url.pricepolicy, {}, function(json){
      if(iNet.isDefined(json.items)){
        pricePolicy = json.items;
      }
      addEvent();
    });
  };
  var getItem = function(value){
    for(var i=0; i<pricePolicy.length; i++){
      if(pricePolicy[i].uuid==value){
        return pricePolicy[i];
      }
    }
  };
  var restartMachine = function(){
    owner.data.firm = $elm.cofg.find('[data-chk="true"]').prop('id');
    $.postJSON(url.restart, owner.data, function(json){
      console.log('restart ------------------>', json);
    });
  };
  var shutdownMachine = function(){
    owner.data.firm = $elm.cofg.find('[data-chk="true"]').prop('id');
    $.postJSON(url.shutdown, owner.data, function(json){
      console.log('shutdown ----------------->', json);
    });
  };
  var viewLog = function($this){
    owner.data.firm = $elm.cofg.find('[data-chk="true"]').prop('id');
    var uuid = $this.parent().parent().attr('item-id');
  };
  var addEvent = function(){
    $btn.addComputeApp.on('click', function(){
      $tr.computeApp.show();
    });
    $btn.addComputeDb.on('click', function(){
      $tr.computeDb.show();
    });
    $cbb.cbbComputeApp.change(function(){
      var $this = $(this),
          $tdParent = $btn.addComputeApp.parents('td'),
          __val = $this.val(),
          __html = '<td>{0}</td><td colspan="2" style="text-align: center;"><label class="label label-warning">PENDING</label></td>',
          __item = getItem(__val);
      owner.data.app = __val;
      __html = String.format(__html, __item.name, '', '');
      $tdParent.hide();
      $tr.computeApp.hide();
      $tdParent.parent().append(__html);
    });
    $cbb.cbbComputeDb.change(function(){
      var $this = $(this),
          $tdParent = $btn.addComputeDb.parents('td'),
          val = $this.val(),
          __html = '<td>{0}</td><td colspan="2" style="text-align: center;"><label class="label label-warning">PENDING</label></td>',
          __item = getItem(val);
      owner.data.dbs = val;
      __html = String.format(__html, __item.name, '', '');
      $tdParent.hide();
      $tr.computeDb.hide();
      $tdParent.parent().append(__html);
      $btn.save.show();
    });
    $btn.save.on('click', function(){
      owner.data.firm = $elm.cofg.find('[data-chk="true"]').prop('id');
      $.postJSON(url.save, owner.data, function(json){
        console.log('---------------------', json);
        if(!!json && json.elements.length>0){
          notify('success', 'Save successfully!');
        }else{
          notify('error', 'Error when saving!');
        }
      });
    });
    $btn.restart.on('click', function(){
      restartMachine();
    });
    $btn.shutdown.on('click', function(){
      shutdownMachine();
    });
    $btn.viewLog.on('click', function(){
      viewLog($(this));
    });
  };
  loadPricePolicy();
  $('#app-tab a[href="#app-install"]').tab('show'); // Select tab by name
  $('#app-tabs a').click(function (e) {
    e.preventDefault();
    window.open($(this).attr('href'),'_self');
  });
});