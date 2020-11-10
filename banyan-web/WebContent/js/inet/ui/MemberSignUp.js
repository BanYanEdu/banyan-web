// #PACKAGE: cloudoffice-membersignup
// #MODULE: MemberSignUp
/**
 * Copyright (c) 2014 iNet Solutions Corp.,
 * Created by Nguyen Ba Chi Cong<nbccong@inetcloud.vn>
 *         on 24/11/2014.
 * -------------------------------------------
 * @project cloud-office
 * @file MemberSignUp
 * @author nbchicong
 */

$(function () {
  iNet.ns('iNet.ui.web.MemberSignUp');
  iNet.ui.web.MemberSignUp = function (config) {
    var me = this, __cog = config || {};
    iNet.apply(this, __cog);
    //this.stepArr = ['signin', 'templateos', 'packapp', 'payment'];
    //var wgURL = {
    //  sign: iNet.WebClientService.getWg('/widget/user/register-body'),
    //  templateos: iNet.WebClientService.getWg('/widget/resources/template-os'),
    //  packapp: iNet.WebClientService.getWg('/widget/resources/package-app'),
    //  payment: iNet.WebClientService.getWg('/widget/payment/member-checkout-body')
    //};
    $('[item-type="action"]').on('click', '[item-action]', function () {
      var action = $(this).attr('item-action');
      if(!me.validatedata()){
        return;
      }
      switch(action){
        case 'submitform':
          me.register();
          break;
        case 'clearform':
          me.clearForm();
          break;
        default :
          console.log('no found action with name: ', action);
      }
    });
    iNet.ui.web.MemberSignUp.superclass.constructor.call(this);
    //var webGp = this.getGraphic();
    //webGp.on('action', function (section) {
    //  $.loadWidget(wgURL[section], me.getParams(), function (html) {
    //    webGp.changeContent(html);
    //  }, {
    //    mask: me.getMask(),
    //    msg: iNet.resources.ajaxLoading.loading
    //  });
    //});
  };
  iNet.extend(iNet.ui.web.MemberSignUp, iNet.ui.web.CloudRegister, {});
  new iNet.ui.web.MemberSignUp();
});