// #PACKAGE: icloud-office-checkout
// #MODULE: CheckOutService
/**
 * Copyright (c) 2014 iNet Solutions Corp.,
 * Created by Nguyen Ba Chi Cong<nbccong@inetcloud.vn>
 *         on 10/03/2014.
 * -------------------------------------------
 * Project app-store
 */

$(function(){
  var $vatPrecent = $('#cart-vat-percent'),
      $shipping = $('#cart-shipping'),
      $totalPrice = $('#cart-total'),
      $listItem = $('#list-item-cart');
  var totalPrice = function(){
    var __numItem = $listItem.find('tr[item-id]').length,
        $list = $listItem.find('tr[item-id]'),
        __totalPrice = 0;
    for(var i=0; i<__numItem; i++){
      var $item = $list.eq(i);
      __totalPrice += parseInt($item.find('[item-name="item-total"]').attr('item-value'));
    }
    __totalPrice += parseInt($shipping.attr('item-value'));
    __totalPrice += __totalPrice*parseInt($vatPrecent.attr('item-value'))/100;
    $totalPrice.attr('item-value', __totalPrice).text(__totalPrice);
  };
  $('input[item-id="txt-cart-quality"]').keyup(function(){
    var $this = $(this),
        $parent = $this.parents('tr[item-id]'),
        $itemtotal = $parent.find('[item-name="item-total"]'),
        __itemprice = parseInt($parent.find('[item-name="item-price"]').attr('item-value')),
        __val = $this.val();
    if(!iNet.isNumber(parseInt(__val)) && !iNet.isEmpty(__val)){
      __val = 0;
      $this.val(0);
    }
    $itemtotal.attr('item-value', __val*__itemprice).text(__val*__itemprice);
    totalPrice();
  });
  $('[item-action="remove"]').on('click', function(){
    // TODO: Remove Item
    console.log('remove item ------------------------------------------>');
  });
  totalPrice();
});