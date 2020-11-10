// #PACKAGE: icloud-office-appandservice
// #MODULE: AppAndService
/**
 * Copyright (c) 2014 iNet Solutions Corp.,
 * Created by Nguyen Ba Chi Cong<nbccong@inetcloud.vn>
 *         on 13/03/2014.
 * -------------------------------------------
 * Project app-store
 */

$(function(){
  var $btn = {
    addDbLicense: $('#btn-addnew-db-license'),
    addService: $('#btn-addnew-service'),
    addTemplate: $('#btn-addnew-template'),
    save: $('#btn-save')
  };
  var $tr = {
    lblDb: $('[item-id="tr-database"]'),
    lblSvc: $('[item-id="tr-service"]'),
    licenseSql: $('#policy-license-sql'),
    licenseNoSql: $('#policy-license-nosql'),
    service: $('#service-license'),
    template: $('#service-template')
  };
  var $cbb = {
    licenseSql: $('#cbb-license-sql'),
    licenseNoSql: $('#cbb-license-nosql'),
    service: $('#cbb-service-license'),
    template: $('#cbb-template')
  };
  var $elm = {
    table: $('#app-and-service'),
    cofg: $('#cogs-menu'),
    nofitier: $('#cloudoffice-notifier')
  };
  var url = {
    template: iNet.getUrl('cloud/firm/template/list'),
    service: iNet.getUrl('cloud/servicefee/policy'),
    licensePolicy: iNet.getUrl('cloud/license/policy'),
    saveLicense: iNet.getUrl('cloud/service/rental/database'),
    saveSerivce: iNet.getUrl('cloud/service/rental/facility'),
    saveTemplate: iNet.getUrl('cloud/service/template/applied')
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
  var licensePolicy = [], services = [], templates = [],
      owner = {data: {license: {}, facility: {}, template: {}}},
      times, sql = false, nosql = false, svc = false, value = [],
      notify = function(t, ms){
        var ntf = new Notifier({
          $e: $elm.nofitier,
          t: t,
          ms: ms
        });
        ntf.show();
      };
  var loadTemplate = function(){
    $.getJSON(url.template, {}, function(json){
      if(iNet.isDefined(json.items)){
        templates = json.items;
      }
      loadService();
    })
  };
  var loadLicensePolicy = function(){
    $.getJSON(url.licensePolicy, {}, function(json){
      if(iNet.isDefined(json.items)){
        licensePolicy = json.items;
      }
      addEvent();
    });
  };
  var loadService = function(){
    $.getJSON(url.service, {}, function(json){
      if(iNet.isDefined(json.items)){
        services = json.items;
      }
      loadLicensePolicy();
    });
  };
  var getTemplateItem = function(val){
    for(var i=0; i<templates.length; i++){
      if(templates[i].uuid==val){
        return templates[i];
      }
    }
  };
  var getLicenseItem = function(val){
    for(var i=0; i<licensePolicy.length; i++){
      if(licensePolicy[i].uuid==val){
        return licensePolicy[i];
      }
    }
  };
  var getServiceItem = function(val){
    for(var i=0; i<services.length; i++){
      if(services[i].uuid==val){
        return services[i];
      }
    }
  };
  var onSaveTemplate = function(){
    owner.data.template.firm = $elm.cofg.find('[data-chk="true"]').prop('id');
    owner.data.template.ajax = 'callback';
    $.postJSON(url.saveTemplate, owner.data.template, function(json){
      if(!!json&&json.uuid){
        notify('success', 'Save template successfully!');
      }else{
        notify('error', 'Error when saving template!');
      }
    });
  };
  var onSaveLicense = function(){
    owner.data.license.firm = $elm.cofg.find('[data-chk="true"]').prop('id');
    owner.data.license.ajax = 'callback';
    $.postJSON(url.saveLicense, owner.data.license, function(json){
      if(!!json&&json.uuid){
        notify('success', 'Save License successfully!');
      }else{
        notify('error', 'Error when saving License!');
      }
    });
  };
  var onSaveService = function(){
    owner.data.facility.firm = $elm.cofg.find('[data-chk="true"]').prop('id');
    owner.data.facility.ajax = 'callback';
    $.postJSON(url.saveSerivce, owner.data.facility, function(json){
      if(!!json&&json.uuid){
        notify('success', 'Save Service successfully!');
      }else{
        notify('error', 'Error when saving Service!');
      }
    });
  };
  var escape = function(name){
    return name.toLowerCase().replace(' ','-');
  };
  var addEvent = function(){
    $btn.addDbLicense.on('click', function(){
      $tr.licenseSql.show();
      $tr.licenseNoSql.show();
    });
    $btn.addService.on('click', function(){
      $tr.service.show();
    });
    $btn.addTemplate.on('click', function(){
      $(this).parents('tr').hide();
      $tr.template.show();
    });
    $cbb.licenseSql.change(function(){
      var $this = $(this),
          $trParent = $btn.addDbLicense.parents('tr'),
          __html = '<tr item-id="{0}"><td colspan="3">{1}</td><td style="text-align: center;"><label class="label label-{2}">{3}</label></td></tr>',
          __item = getLicenseItem($this.val());
      sql = true;
      owner.data.license.sqldb = $this.val();
      __html = String.format(__html, __item.uuid, __item.name, 'success', 'PAID');
      if(sql&&nosql){
        $trParent.hide();
        $btn.save.show();
      }
      $tr.licenseSql.hide();
      $tr.lblDb.after(__html);
    });
    $cbb.licenseNoSql.change(function(){
      var $this = $(this),
          $trParent = $btn.addDbLicense.parents('tr'),
          __html = '<tr item-id="{0}"><td colspan="3">{1}</td><td style="text-align: center;"><label class="label label-{2}">{3}</label></td></tr>',
          __item = getLicenseItem($this.val());
      nosql = true;
      owner.data.license.nosql = $this.val();
      __html = String.format(__html, __item.uuid, __item.name, 'success', 'PAID');
      if(sql&&nosql){
        $trParent.hide();
        $btn.save.show();
      }
      $tr.licenseNoSql.hide();
      $tr.lblDb.after(__html);
    });
    $cbb.service.change(function(){
      var $this = $(this),
          $trParent = $btn.addService.parents('tr'),
          __item = getServiceItem($this.val()),
          __html = '<tr item-id="{0}"><td colspan="3">{1}</td><td style="text-align: center;"><label class="label label-{2}" item-type="servicefee" item-action="set-{3}" item-value="{0}">{4}</label></td></tr>';
      svc = true;
      if(__item.name!='CAPACITY'){
        value.push($this.val());
      }
      __html = String.format(__html, __item.uuid, __item.name, 'warning', escape(__item.name), 'PENDING');
      $('option[value='+$this.val()+']').remove();
      if($this.children().length==1){
        $trParent.hide();
      }
      $tr.service.hide();
      $tr.lblSvc.after(__html);
      if(svc){
        $btn.save.show();
      }
    });
    $cbb.template.change(function(){
      var $this = $(this),
          $trParent = $btn.addTemplate.parents('tr'),
          __html = '<tr item-id="{0}"><td colspan="2">{1} - {2}</td><td style="text-align: center;"><label data-action="add-template" class="label label-success">SAVE</label></td></tr>',
          __item = getTemplateItem($this.val());
      owner.data.template.template = $this.val();
      __html = String.format(__html, __item.uuid, __item.name, __item.description);
      $tr.template.hide();
      $tr.template.after(__html);
      $btn.saveTemplate = $('[data-action="add-template"]');
      $btn.saveTemplate.on('click', function(){
        onSaveTemplate();
      });
    });
    $elm.table.off('click','[item-action]').on('click','[item-action]', function(){
      var $this = $(this), action = $this.attr('item-action'),
          val = $this.attr('item-value'),
          lblCls1 = 'label-default', lblCls2 = 'label-success',
          trCls1 = 'default', trCls2 = 'success';
      switch (action){
        case 'set-cluster':
          if(val=='NO'){
            $this.removeClass(lblCls1).addClass(lblCls2);
            $this.parents('tr').removeClass(trCls1).addClass(trCls2);
            val = 'YES';
          }else{
            $this.removeClass(lblCls2).addClass(lblCls1);
            $this.parents('tr').removeClass(trCls2).addClass(trCls1);
            val = 'NO';
          }
          $this.attr('item-value', val);
          $this.text(val);
          break;
        case 'set-load-balance':
          $this.before('<input id="set-load-balance" class="label-input label-primary noborder col-md-12" />');
          $this.hide();
          $('#set-load-balance').val(val).focus().focusout(function(){
            var $input = $(this);
            $this.attr('item-value', $input.val()).text($input.val()).show();
            $input.hide();
          });
          break;
        case 'set-capacity':
          $this.before('<input id="set-capacity" class="label-input label-primary noborder col-md-12" />');
          $this.hide();
          $('#set-capacity').val(val).focus().focusout(function(){
            var $input = $(this);
            $this.attr('item-value', $input.val()).text($input.val()).show();
            $input.hide();
          });
          break;
        default :
          throw new Error('Not found action!');
      }
    });
    $btn.save.on('click', function(){
      if(!$.isEmptyObject(owner.data.license)){
        onSaveLicense();
      }
      if(!$.isEmptyObject(owner.data.facility)||!iNet.isEmpty(value)){
        var capacity = $('[item-action="set-capacity"]').attr('item-value'),
            cluster = $('[item-action="set-cluster"]').attr('item-value'),
            loadbalance = $('[item-action="set-load-balance"]').attr('item-value');
        owner.data.facility.cls = (cluster=='YES')?true:false;
        owner.data.facility.lbs = loadbalance;
        owner.data.facility.capacity = capacity;
        owner.data.facility.paym = 2;
        owner.data.facility.service = '';
        for(var i=0; i<value.length; i++){
          owner.data.facility.service += (i<value.length-1)?value[i]+',':value[i];
        }
        onSaveService();
      }
    });
  };
  loadTemplate();
  $('#app-tab a[href="#app-install"]').tab('show'); // Select tab by name
  $('#app-tabs a').click(function (e) {
    e.preventDefault();
    window.open($(this).attr('href'),'_self');
  });
});