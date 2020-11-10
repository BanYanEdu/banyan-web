// #PACKAGE: inet-webclient
// #MODULE: WebClientService
/**
 * Copyright (c) 2014 iNet Solutions Corp.,
 * Created by Nguyen Ba Chi Cong<nbccong@inetcloud.vn>
 *         on 09/10/2014.
 * -------------------------------------------
 * @project cloud-office
 * @file WebClientService
 * @author chicongnb
 */

iNet.ns('iNet.WebClientService');
iNet.WebClientService = {
  version: '1.0',
  buildDate: '09/10/2014'
};
(function () {
  iNet.apply(iNet.WebClientService, {
    paymentSuccessPage: 'cloudoffice/page/payment/success',
    paymentFailPage: 'cloudoffice/page/payment/fail',
    formatDate: function (date, format) {
      var __format = format || 'd/m/Y';
      if(date>0){
        return (iNet.isDefined(date)?new Date(date):new Date()).format(__format);
      }else{
        return 'Unlimited';
      }
    },
    getDateByField: function (data, field, format) {
      var __field = field || 'created';
      return iNet.WebClientService.formatDate(data[__field], format);
    },
    getWg: function (path, module) {
      return '/' + (module || location.pathname.split('/')[3]) + path;
    },
    _logoutCas: function (url) {
      var iframe = $('<iframe/>');
      iframe.attr('style', 'display:none;');
      iframe.appendTo($('body'));
      iframe.load(function () {
        location = iNet.getUrl('cloudoffice/page/index');
      });
      iframe.attr('src', url);
    },
    logout: function () {
      $.ajax({
        type: "POST",
        url: iNet.getUrl('system/logout'),
        dataType: 'json',
        success: function (data) {
          iNet.WebClientService._logoutCas(data.uuid);
        }
      });
    }
  });
})();