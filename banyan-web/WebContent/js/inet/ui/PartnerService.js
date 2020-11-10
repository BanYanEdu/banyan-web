// #PACKAGE: cloudoffice-partnerservice
// #MODULE: PartnerService
/**
 * Copyright (c) 2014 iNet Solutions Corp.,
 * Created by Nguyen Ba Chi Cong<nbccong@inetcloud.vn>
 *         on 10/10/2014.
 * -------------------------------------------
 * @project cloud-office
 * @file PartnerService
 * @author chicongnb
 */

$(function () {
  iNet.ns('iNet.ui.web.PartnerService');
  iNet.ui.web.PartnerService = function (config) {
    var me = this, __cog = config || {};
    iNet.apply(this, __cog);
    this.id = this.id || 'partner-content';
    this.$element = $.getCmp(this.id);
    var $windows = $(window);
    var $btnFull = $('#message-view-full');
    this.numload = 0;
    var submitByQuota = function () {
      var __form = document.getElementById('form-client-payment');
      __form.action = iNet.getUrl('cloud/client/payment/quotation');
      __form.submit();
      $('#form-client-payment').ajaxSubmit({
        url: iNet.getUrl('cloud/client/payment/quotation'),
        beforeSubmit: function (arr, $form, options) {},
        success: function (responseText, statusText, xhr) {
          if(responseText.uuid=='SUCCESS'){
            location = iNet.getUrl(iNet.WebClientService.paymentSuccessPage)+location.search;
          }else{
            location = iNet.getUrl(iNet.WebClientService.paymentFailPage)+location.search;
          }
        }
      });
    };
    this.__init = function (callback) {
      var __fn = callback || me.settingEvent;
      $windows.load(function () {
        me.setList(new iNet.ui.partner.plugin.PluginList());
        __fn();
      });
    };
    this.__loadPartner = function () {
      $.getJSON(iNet.getUrl('cloud/partner/client/load'), {}, function (data) {
        me.setQuotation(data.quotaAllowed);
      });
    };
    $btnFull.click(function () {
      if(me.getFormEl().hasClass('full-view')){
        me.normalView();
        me.getFormEl().removeClass('full-view');
        $btnFull.find('i').removeAttr('class').addClass('icon-resize-full');
      }else{
        me.fullView();
        me.getFormEl().addClass('full-view');
        $btnFull.find('i').removeAttr('class').addClass('icon-resize-small');
      }
    });
    $windows.resize(function () {
      me.onResize();
    });
    me.on('loadcompleted', function () {
      me.getClientService().on('clientcompleted', function () {
        if(me.numload<=1){
          me.getClientService().setRegister(new iNet.ui.web.CloudRegister());
        }
        me.onResize();
      });
      me.getClientService().on('loadpayment', function () {
        if(me.getQuotation()>0){
          if(me.getQuotation()>=me.getClientService().getAmount()){
            $('[data-paytype="quota"]').removeClass('disabled');
          }else{
            $('[data-paytype="quota"]').addClass('disabled');
          }
        }else{
          $('[data-paytype="quota"]').addClass('disabled');
        }
        $('[data-paytype]').click(function () {
          var $this = $(this);
          var $parent = $this.parent();
          if(!$this.hasClass('disabled')){
            $parent.find('[data-paytype]').removeClass('selected');
            $this.addClass('selected');
            me.setPayTypeSubmit($this.data('paytype'));
          }
        });
      });
      me.getClientService().on('payment', function (client, clientData) {
        if(me.getPayTypeSubmit()=='quota'){
          submitByQuota();
        }else if(me.getPayTypeSubmit()=='card'){
          var __form = document.getElementById('form-client-payment');
          __form.submit();
        }
      });
      me.numload++;
    });
    me.__loadPartner();
  };
  iNet.extend(iNet.ui.web.PartnerService, iNet.ui.Widget, {
    loadFn: function (initFn, callback) {
      var fn = iNet.isFunction(initFn)?initFn:this.__init;
      fn(callback);
    },
    setQuotation: function (quotation) {
      this.quotation = quotation;
    },
    getQuotation: function () {
      return this.quotation;
    },
    setPayTypeSubmit: function (type) {
      this.paytype = type;
    },
    getPayTypeSubmit: function () {
      return this.paytype;
    },
    setListEl: function (list) {
      this.$list = $(list);
    },
    getListEl: function () {
      return this.$list;
    },
    setFormEl: function (form) {
      this.$form = $(form);
    },
    getFormEl: function () {
      return this.$form;
    },
    setList: function (list) {
      this.clientList = list;
    },
    getList: function () {
      return this.clientList;
    },
    setClientService: function (service) {
      this.clientService = service || new iNet.ui.web.ClientService;
    },
    getClientService: function () {
      return this.clientService;
    },
    getCreatedDate: function (data) {
      return 'Ngày tạo: ' + iNet.WebClientService.getDateByField(data, 'created');
    },
    getExpiredDate: function (data) {
      return 'Hết hạn: ' + iNet.WebClientService.getDateByField(data, 'nextExpired');
    },
    renderName: function (data) {
      return data.name || '';
    },
    renderDate: function (data) {
      return this.getCreatedDate(data) + ' - ' + this.getExpiredDate(data);
    },
    onResize: function() {
      var winHeight = this.getFormEl().height();
      if(this.getList()!=null){
        this.getList().setHeight(winHeight);
      }else{
        this.setList(new iNet.ui.partner.plugin.PluginList());
        this.getList().setHeight(winHeight);
      }
    },
    fullView: function () {
      this.getListEl().parent().hide();
      this.getFormEl().removeClass('col-md-8 col-sm-8')
          .removeAttr('style').addClass('col-md-12 col-sm-12 full-view');
      this.onResize();
    },
    normalView: function () {
      this.getListEl().parent().show();
      this.getFormEl().removeClass('col-md-12 col-sm-12 full-view')
          .css({'padding-left':0}).addClass('col-md-8 col-sm-8');
      this.onResize();
    },
    settingEvent: function () {
      var me = this;
      this.getList().on('view', function (self, data) {
        data = $.extend(data, {client: data.clientID});
        var webGp = me.getClientService().getGraphic();
        webGp.action('[data-section="'+me.getClientService().stepArr[0]+'"]');
        me.getClientService().setClientId(data.clientID);
        me.getClientService().setAmount(data.amount);
        me.getClientService().setParams(data);
        me.numload = 0;
        for(var k in data){
          if(k=='cfgPkgID'&&!iNet.isEmpty(data[k])){
            webGp.$wizard.find('[data-wizard="'+me.getClientService().stepArr[1]+'"]').removeClass('disabled');
          }
          if(k=='appPkgID'&&!iNet.isEmpty(data[k])){
            webGp.$wizard.find('[data-wizard="'+me.getClientService().stepArr[2]+'"]').removeClass('disabled');
          }
          if(k=='amount'&&data[k]>0){
            webGp.$wizard.find('[data-wizard="'+me.getClientService().stepArr[3]+'"]').removeClass('disabled');
          }
        }
        $.postJSON(iNet.getUrl('cloud/partner/client/load'), {client: data.clientID}, function (data) {
          if(!iNet.isEmpty(data.uuid)){
            me.getClientService().register.setData({
              name: data.name,
              firmContext: data.firmContext,
              email: data.email,
              website: data.website,
              phone: data.phone,
              fax: data.fax,
              address1: data.address1,
              city: data.city,
              country: data.country,
              languageUsed: data.languageUsed,
              _username: data.contactor.username,
              _fname: data.contactor.fname,
              _mname: data.contactor.mname,
              _lname: data.contactor.lname,
              _dayofbith: data.contactor.dayofbirth,
              _birthday: data.contactor.dayofbirth.split('/')[0],
              _birthmonth: data.contactor.dayofbirth.split('/')[1],
              _birthyear: data.contactor.dayofbirth.split('/')[2],
              _sex: data.contactor.sex,
              _email: data.contactor.email,
              _phone: data.contactor.phone,
              _address1: data.contactor.address1,
              _city: data.contactor.city,
              _country: data.contactor.country
            });
          }
        });
      });
      this.getList().on('checkboxchange', function (ids) {
        if(!iNet.isEmpty(ids)){
          FormUtils.showButton(me.getList().toolbar.del, true);
        }
        me.getClientService().setClientIds(ids);
      });
      this.getList().on('deteleclient', function () {
        me.getClientService().confirmDlg(function(){
          me.getList().getPaging().reload();
        });
      });
      this.fireEvent('loadcompleted');
    }
  });
});