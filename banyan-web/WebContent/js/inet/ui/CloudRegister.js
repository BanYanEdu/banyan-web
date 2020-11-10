// #PACKAGE: cloudoffice-registerservice
// #MODULE: Cloud Office Register
/**
 * Copyright (c) 2014 iNet Solutions Corp.,
 * Created by nbchicong<nbccong@inetcloud.vn>
 *         on 2/11/14.
 */

$(function(){
  iNet.ns('iNet.ui.web.CloudRegister');
  iNet.ui.web.CloudRegister = function (config) {
    var me = this, __cog = config || {};
    iNet.apply(this, __cog);
    this.id = this.id || 'client-setting-content';
    this.urlRedirect = iNet.getUrl('cloudoffice/page/user/register-success')+location.search;
    this.mode = this.mode || 'member';
    this.$element = $.getCmp(this.id);
    this.$orgForm = {
      me: $('#company-form'),
      name: $('#form-field-name'),
      prefix: $('#form-field-prefix'),
      email: $('#form-field-email'),
      web: $('#form-field-website'),
      phone: $('#form-field-phone'),
      fax: $('#form-field-fax'),
      addr: $('#form-field-addr'),
      city: $('#form-field-city'),
      country: $('#form-field-country')
    };
    this.$contactForm = {
      me: $('#personal-form'),
      username: $('#form-field-username'),
      fname: $('#_fname'),
      mname: $('#_mname'),
      lname: $('#_lname'),
      birthofday: $('#form-field-birthday'),
      birthday: $('#_birthday'),
      birthmonth: $('#_birthmonth'),
      birthyear: $('#_birthyear'),
      gender: $('#form-field-gender'),
      email: $('#_form-field-email'),
      phone: $('#_form-field-phone'),
      addr: $('#_form-field-addr'),
      city: $('#_form-field-city'),
      country: $('#_form-field-country'),
      lang: $('#form-field-lang')
    };
    this.$btn = {
      submit: $('[item-action=submitform]')
    };
    this.url = {
      checkPrefix: iNet.getUrl('cloud/firm/verification'),
      register: iNet.getUrl('cloud/member/firm/register')
    };
    var isFocusOut = function(elm){
      var parentlv2 = elm.parent();
      if(iNet.isEmpty(elm.val())){
        parentlv2.addClass('has-error');
      }else{
        parentlv2.removeClass('has-error');
      }
    };
    var checkEmail = function (elm) {
      var __val = elm.val();
      var parentlv2 = elm.parent();
      if(!iNet.isEmail(__val)){
        parentlv2.addClass('has-error');
      }else if(iNet.isEmpty(__val)){
        isFocusOut(elm);
      }else{
        parentlv2.removeClass('has-error');
      }
    };
    if(this.mode=='client'){
      this.urlRedirect = iNet.getUrl('cloudoffice/page/develop/setting-up');
    }
    me.$contactForm.birthofday.focusin(function(){
      me.$contactForm.birthofday.mask('99/99/9999');
    });
    me.$contactForm.username.focusout(function(){
      isFocusOut($(this));
    });
    me.$contactForm.fname.focusout(function(){
      isFocusOut($(this));
    });
    me.$contactForm.lname.focusout(function(){
      isFocusOut($(this));
    });
    me.$contactForm.phone.focusout(function(){
      isFocusOut($(this));
    });
    me.$contactForm.email.focusout(function(){
      checkEmail($(this));
    });
    me.$contactForm.birthofday.focusout(function(){
      var __val = $(this).val();
      if(!iNet.isEmpty(__val)){
        __val = __val.split('/');
        me.$contactForm.birthday.val(__val[0]);
        me.$contactForm.birthmonth.val(__val[1]);
        me.$contactForm.birthyear.val(__val[2]);
      }
      isFocusOut($(this));
    });
    me.$contactForm.addr.focusout(function(){
      isFocusOut($(this));
    });
    me.$contactForm.city.focusout(function(){
      isFocusOut($(this));
    });
    me.$contactForm.country.focusout(function(){
      isFocusOut($(this));
    });
    me.$orgForm.name.focusout(function(){
      isFocusOut($(this));
    });
    me.$orgForm.prefix.focusout(function(){
      isFocusOut($(this));
    });
    me.$orgForm.email.focusout(function(){
      checkEmail($(this));
    });
    me.$orgForm.phone.focusout(function(){
      isFocusOut($(this));
    });
    me.$orgForm.prefix.keyup(function(){
      var $this = $(this);
      var parentlv3 = $this.parent();
      var __key = $this.val();
      if(iNet.isEmpty(__key)){
        parentlv3.addClass('has-error');
      }else{
        $.postJSON(me.url.checkPrefix, {domain: __key}, function(isExist){
          if(isExist.uuid=="AVAILABLE"){
            parentlv3.removeClass('has-error');
          }else if(isExist.uuid=="EXISTED"){
            parentlv3.addClass('has-error');
          }else{
            parentlv3.removeClass('has-error');
          }
        });
      }
    });
    me.$orgForm.addr.focusout(function(){
      if(iNet.isEmpty(me.$contactForm.addr.val())){
        me.$contactForm.addr.val(me.$orgForm.addr.val());
      }
      isFocusOut($(this));
    });
    me.$orgForm.city.focusout(function(){
      if(iNet.isEmpty(me.$contactForm.city.val())){
        me.$contactForm.city.val(me.$orgForm.city.val());
      }
      isFocusOut($(this));
    });
    me.$orgForm.country.focusout(function(){
      me.$contactForm.country.val(me.$orgForm.country.val());
      isFocusOut($(this));
    });
    me.$orgForm.prefix.tooltip({
      placement: 'top',
      html: true,
      trigger: 'focus',
      title: String.format('<p style="text-align: left;">{0}</p>', iNet.resources.web.client.auto_prefix)
    });
    //iNet.ui.web.CloudRegister.superclass.constructor.call(this);
  };
  iNet.extend(iNet.ui.web.CloudRegister, iNet.ui.web.SetupService, {
    constructor: iNet.ui.web.CloudRegister,
    validatedata: function () {
      var data = this.getData();
      if(!iNet.isEmpty(data)){
        var istrue = false;
        for(var key in data){
          if(key=='languageUsed'||key=='fax'||key=='_sex'||key=='website'||key=='_mname'){
            istrue = true;
          }else if(iNet.isEmpty(data[key])){
            $('[name="'+key+'"]').parent().addClass('has-error');
            istrue = false;
          }else{
            if(key=='email'||key=='_email'){
              if(!iNet.isEmail(data[key])){
                $('[name="'+key+'"]').parent().addClass('has-error');
                istrue = false;
              }else{
                $('[name="'+key+'"]').parent().removeClass('has-error');
                istrue = true;
              }
            }else{
              $('[name="'+key+'"]').parent().removeClass('has-error');
              istrue = true;
            }
          }
        }
      }
      return istrue;
    },
    getData: function () {
      return {
        name: this.$orgForm.name.val(),
        firmContext: this.$orgForm.prefix.val(),
        email: this.$orgForm.email.val(),
        website: this.$orgForm.web.val(),
        phone: this.$orgForm.phone.val(),
        fax: this.$orgForm.fax.val(),
        address1: this.$orgForm.addr.val(),
        city: this.$orgForm.city.val(),
        country: this.$orgForm.country.val(),
        languageUsed: this.$contactForm.lang.val(),
        _username: this.$contactForm.username.val(),
        _fname: this.$contactForm.fname.val(),
        _mname: this.$contactForm.mname.val(),
        _lname: this.$contactForm.lname.val(),
        _birthday: this.$contactForm.birthday.val(),
        _birthmonth: this.$contactForm.birthmonth.val(),
        _birthyear: this.$contactForm.birthyear.val(),
        _sex: this.$contactForm.gender.val(),
        _email: this.$contactForm.email.val(),
        _phone: this.$contactForm.phone.val(),
        _address1: this.$contactForm.addr.val(),
        _city: this.$contactForm.city.val(),
        _country: this.$contactForm.country.val()
      };
    },
    setData: function (data) {
      this.$orgForm.name.val(data.name);
      this.$orgForm.prefix.val(data.firmContext);
      this.$orgForm.email.val(data.email);
      this.$orgForm.web.val(data.website);
      this.$orgForm.phone.val(data.phone);
      this.$orgForm.fax.val(data.fax);
      this.$orgForm.addr.val(data.address1);
      this.$orgForm.city.val(data.city);
      this.$orgForm.country.val(data.country);
      this.$contactForm.lang.val(data.languageUsed);
      this.$contactForm.username.val(data._username);
      this.$contactForm.fname.val(data._fname);
      this.$contactForm.mname.val(data._mname);
      this.$contactForm.lname.val(data._lname);
      this.$contactForm.birthofday.val(data._dayofbith);
      this.$contactForm.birthday.val(data._birthday);
      this.$contactForm.birthmonth.val(data._birthmonth);
      this.$contactForm.birthyear.val(data._birthyear);
      this.$contactForm.gender.val(data._sex);
      this.$contactForm.email.val(data._email);
      this.$contactForm.phone.val(data._phone);
      this.$contactForm.addr.val(data._address1);
      this.$contactForm.city.val(data._city);
      this.$contactForm.country.val(data._country);
    },
    clearForm: function () {
      this.$orgForm.name.val('');
      this.$orgForm.prefix.val('');
      this.$orgForm.email.val('');
      this.$orgForm.web.val('');
      this.$orgForm.phone.val('');
      this.$orgForm.fax.val('');
      this.$orgForm.addr.val('');
      this.$orgForm.city.val('');
      this.$orgForm.country.val('VN');
      this.$contactForm.lang.val('vi');
      this.$contactForm.username.val('');
      this.$contactForm.lname.val('');
      this.$contactForm.mname.val('');
      this.$contactForm.fname.val('');
      this.$contactForm.birthofday.val('');
      this.$contactForm.birthday.val('');
      this.$contactForm.birthmonth.val('');
      this.$contactForm.birthyear.val('');
      this.$contactForm.gender.val('m');
      this.$contactForm.email.val('');
      this.$contactForm.phone.val('');
      this.$contactForm.addr.val('');
      this.$contactForm.city.val('');
      this.$contactForm.country.val('VN');
    },
    register: function (url, callback) {
      var me = this;
      var fn = function (data) {
        if(iNet.isDefined(data.uuid)){
          location = me.urlRedirect;
        }
      };
      if(iNet.isFunction(callback)){
        fn = callback;
      }
      iNet.ui.web.SetupService.prototype.setUserInfo(this.getData());
      iNet.ui.web.SetupService.prototype.add(!iNet.isEmpty(url)?url:this.url.register, function (data) {
        fn(data);
      });
    }
  });
});