// #PACKAGE: cloudoffice-memberservice
// #MODULE: MemberService
/**
 * Copyright (c) 2014 iNet Solutions Corp.,
 * Created by Nguyen Ba Chi Cong<nbccong@inetcloud.vn>
 *         on 19/11/2014.
 * -------------------------------------------
 * @project cloud-office
 * @file MemberService
 * @author nbchicong
 */

$(function () {
  iNet.ns('iNet.ui.web.MemberService');
  iNet.ui.web.MemberService = function (config) {
    var me = this, __cog = config || {};
    iNet.apply(this, __cog);
    this.id = this.id || 'client-setting-content';
    this.$element = $.getCmp(this.id);
    this.notify = new iNet.ui.web.Notification();
    this.stepArr = ['signin', 'templateos', 'packapp', 'payment'];
    this.step = 0;
    var wgURL = {
      sign: iNet.WebClientService.getWg('/widget/user/register-body'),
      templateos: iNet.WebClientService.getWg('/widget/resources/template-os'),
      packapp: iNet.WebClientService.getWg('/widget/resources/package-app'),
      payment: iNet.WebClientService.getWg('/widget/payment/member-checkout-body')
    };
    iNet.ui.web.MemberService.superclass.constructor.call(this);
    var webGp = this.getGraphic(), firstLoad = true;
    webGp.on('next', function (section) {
      if(section!='payment'){
        if(!firstLoad){
          me.updateClient();
        }
        firstLoad = false;
      }else{
        var __form = document.getElementById('form-client-payment');
        __form.submit();
      }
    });
    webGp.on('action', function (section) {
      $.loadWidget(wgURL[section], me.getParams(), function (html) {
        webGp.changeContent(html);
        if(section!='payment'){
          webGp.setCurrentText(String.format(iNet.resources.message.not_select, me.getText(section)));
          webGp.setBtnNextText(String.format(me.getText('next_step')+' <i class="fa fa-arrow-right"></i>'));
        }else{
          webGp.setCurrentText(me.getText('payment'));
          webGp.setBtnNextText(me.getText('pay'));
        }
        me.step = parseInt(me.stepArr.indexOf(section))-1;
        me.settingEvent();
      }, {
        mask: me.getMask(),
        msg: iNet.resources.ajaxLoading.loading
      });
    });
    webGp.action('[data-section="'+this.stepArr[1]+'"]');
    this.load();
  };
  iNet.extend(iNet.ui.web.MemberService, iNet.ui.web.SetupService, {
    showNotify: function (content, type) {
      this.notify.setContent(content);
      this.notify.setType(type);
      this.notify.show();
    },
    load: function () {
      var me = this;
      $.getJSON(iNet.getUrl('cloud/member/firm/load'), {}, function (json) {
        me.setClientId(json.uuid);
        me.setParams($.extend(me.getParams(), {client: json.uuid}));
      }, {
        mask: me.getMask(),
        msg: iNet.resources.ajaxLoading.loading
      });
    },
    updateClient: function () {
      var me = this, url = iNet.getUrl('cloud/member/firm/update');
      this.setParams($.extend(this.getParams(), {
        clientID: this.getClientId()
      }));
      this.update(url, function (result) {
        if(!iNet.isEmpty(result)){
          if(iNet.isDefined(result.uuid)){
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
              me.setTplOS(webGp.getCurrentValue());
              me.setParams($.extend(me.getParams(), {cfgPkgID: me.getTplOS()}));
            break;
          case 'packapp':
              me.setPackage(webGp.getCurrentValue());
              me.setParams($.extend(me.getParams(), {appPkgID: me.getPackage()}));
            break;
          default :
            iNet.emptyFn();
        }
      });
    }
  });
  new iNet.ui.web.MemberService();
});