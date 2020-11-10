// #PACKAGE: cloudoffice-clientservice
// #MODULE: ClientService
/**
 * Copyright (c) 2014 iNet Solutions Corp.,
 * Created by Nguyen Ba Chi Cong<nbccong@inetcloud.vn>
 *         on 22/11/2014.
 * -------------------------------------------
 * @project cloud-office
 * @file ClientService
 * @author nbchicong
 */

$(function () {
  iNet.ns('iNet.ui.web.ClientService');
  iNet.ui.web.ClientService = function (config) {
    var me = this, __cog = config || {};
    iNet.apply(this, __cog);
    this.id = this.id || 'client-form';
    this.$element = $.getCmp(this.id);
    this.notify = new iNet.ui.web.Notification();
    this.stepArr = ['signup', 'templateos', 'packapp', 'payment'];
    this.step = -1;
    this.register = null;
    var wgURL = {
      signup: iNet.WebClientService.getWg('/widget/user/register-body'),
      templateos: iNet.WebClientService.getWg('/widget/resources/template-os'),
      packapp: iNet.WebClientService.getWg('/widget/resources/package-app'),
      payment: iNet.WebClientService.getWg('/widget/payment/client-checkout-body')
    };
    iNet.ui.web.ClientService.superclass.constructor.call(this);
    var webGp = this.getGraphic(), firstLoad = true;
    webGp.on('next', function (section) {
      if(section!='payment'){
        if(firstLoad){
            if(!iNet.isEmpty(me.getClientId())){
              me.updateClient();
            }else{
              me.addClient();
            }
          firstLoad = false;
        }else{
          if(me._isEdit()){
            me.updateClient();
          }
        }
      }else{
        me.fireEvent('payment', me.getClientId(), me.getParams());
      }
    });
    webGp.on('action', function (section) {
      $.loadWidget(wgURL[section], me.getParams(), function (html) {
        webGp.changeContent(html);
        if(section=='signup'){
          webGp.setCurrentText(String.format(me.getText(section)));
          webGp.showNextButton();
        }else if(section!='payment'){
          webGp.setCurrentText(String.format(iNet.resources.message.not_select, me.getText(section)));
          webGp.setBtnNextText(String.format(me.getText('next_step')+' <i class="fa fa-arrow-right"></i>'));
        }else {
          webGp.setCurrentText(me.getText('payment'));
          webGp.setBtnNextText(me.getText('pay'));
          me.fireEvent('loadpayment');
        }
        me.step = parseInt(me.stepArr.indexOf(section))-1;
        me.settingEvent();
      }, {
        mask: me.getMask(),
        msg: iNet.resources.ajaxLoading.loading
      });
    });
    if(firstLoad){
      webGp.action('[data-section="'+this.stepArr[0]+'"]');
    }
  };
  iNet.extend(iNet.ui.web.ClientService, iNet.ui.web.SetupService, {
    _isEdit: function () {
      return this.isEdit;
    },
    setRegister: function (register) {
      this.register = register;
    },
    getRegister: function () {
      return this.register;
    },
    showNotify: function (content, type) {
      this.notify.setContent(content);
      this.notify.setType(type);
      this.notify.show();
    },
    addClient: function () {
      var me = this;
      if(me.getRegister().validatedata()){
        me.setUserInfo(me.getRegister().getData());
        me.add(iNet.getUrl('cloud/partner/client/create'), function (result) {
          var client = result.clientID;
          me.setClientId(client);
          me.getGraphic().action('[data-section="'+me.stepArr[1]+'"]');
        });
      }
    },
    updateClient: function () {
      var me = this;
      me.setParams($.extend(me.getParams(), {client: me.getClientId()}));
      this.update('', function (result) {
        if(!iNet.isEmpty(result)){
          if(iNet.isDefined(result.uuid)){
            me.setAmount(result.amount);
            ++me.step;
            me.showNotify(
                String.format(iNet.resources.message.update_success, me.getText(me.stepArr[me.step])),
                'success'
            );
          }else{
            me.showNotify(
                String.format(iNet.resources.message.update_unsuccess, me.getText(me.stepArr[me.step])),
                'error'
            );
          }
        }else{
          me.showNotify(
              String.format(iNet.resources.message.update_unsuccess, me.getText(me.stepArr[me.step])),
              'error'
          );
        }
      });
    },
    settingEvent: function () {
      var me = this,
          webGp = this.getGraphic();
      var $itemSelected = this.getEl().find('[data-action="selection"]').find('.box-row-items.selected');
      if($itemSelected.length>0){
        var $item = $itemSelected.parent();
        webGp.setCurrentText($item.attr('title'));
        webGp.setCurrentValue($item.data('ids'));
        webGp.showNextButton();
        me.isEdit = false;
      }
      this.getEl().on('click', '[data-action="selection"]', function () {
        var $this = $(this),
            currentNode = webGp.getCurrentElName();
        if($this.data('type')=='templateos'){
          $this.parent().find('.box-row-items').removeClass('selected');
        }
        $this.find('.box-row-items').addClass('selected');
        webGp.setCurrentText($this.attr('title'));
        webGp.setCurrentValue($this.data('ids'));
        webGp.showNextButton();
        switch (currentNode) {
          case 'templateos':
              me.isEdit = true;
              me.setTplOS(webGp.getCurrentValue());
              me.setParams($.extend(me.getParams(), {cfgPkgID: me.getTplOS()}));
            break;
          case 'packapp':
              me.isEdit = true;
              me.setPackage(webGp.getCurrentValue());
              me.setParams($.extend(me.getParams(), {appPkgID: me.getPackage()}));
            break;
          default :
            iNet.emptyFn();
        }
      });
      $('[item-type="action"]').hide();
      this.fireEvent('clientcompleted');
    },
    confirmDlg: function (callback) {
      var me = this,
          $btnOk = $('#btn-confirm-dlg-ok'),
          fn = iNet.isFunction(callback)?callback:iNet.emptyFn;
      this.$confirmDlg.modal('toggle');
      $btnOk.click(function () {
        var __deleteIds = me.getClientIds();
        if (!iNet.isEmpty(__deleteIds)) {
          var __params = {
            client: __deleteIds.join(',')
          };
          me.delClient(__params, fn);
          me.$confirmDlg.modal('hide');
        }
      });
    }
  });
});