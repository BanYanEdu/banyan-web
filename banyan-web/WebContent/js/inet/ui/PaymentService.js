// #PACKAGE: cloudoffice-payment
// #MODULE: PaymentService
/**
 * Copyright (c) 2014 iNet Solutions Corp.,
 * Created by Nguyen Ba Chi Cong<nbccong@inetcloud.vn>
 *         on 12/03/2014.
 * -------------------------------------------
 * Project app-store
 */

$(function(){
  //$('#tip-security-code').tooltip({
  //  placement: 'right',
  //  html: true,
  //  title: '<p style="text-align:  left;">On most credit cards, it’s a 3 digit code found on the back of the card. On American Express cards, it’s a 4-digit code found on the front of the card.</p>'
  //});
  //var expMonth = 0, expYear = 0, $expDateEl = $('#txt-expired-date');
  //var $form = $('[item-type="payment-form"]'), fid = $form.prop('id');
  //$('#txt-payment-expired-month').focusout(function(){
  //  expMonth = $(this).val();
  //  $expDateEl.val(new Date(expMonth-1).getTime());
  //});
  //$('#txt-payment-expired-year').focusout(function(){
  //  expYear += $(this).val();
  //  $expDateEl.val(new Date(expYear, expMonth-1).getTime());
  //});
  //$('#btn-pay-now').click(function(){
  //  var payUrl = iNet.getUrl('cloud/payment/submit');
  //  $('#'+fid).ajaxSubmit({
  //    url: payUrl,
  //    success: function (result) {
  //      var __result = result || {};
  //      if(!iNet.isEmpty(__result.transactionId)&&
  //         !iNet.isEmpty(__result.orderID)&&
  //          __result.responseID!='FAIL'){
  //        location.href = surl;
  //      }
  //    }
  //  });
  //});
  iNet.WebClientService.paymentSuccess = iNet.getUrl('cloudoffice/page/payment/success');
  iNet.WebClientService.paymentFail = iNet.getUrl('cloudoffice/page/payment/fail');
});