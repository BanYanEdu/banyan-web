// #PACKAGE: inet-webnotify
// #MODULE: WebNotification
/**
 * Copyright (c) 2014 iNet Solutions Corp.,
 * Created by Nguyen Ba Chi Cong<nbccong@inetcloud.vn>
 *         on 21/11/2014.
 * -------------------------------------------
 * @project cloud-office
 * @file WebNotification
 * @author nbchicong
 */

$(function () {
  iNet.ns('iNet.ui.web.Notification');
  iNet.ui.web.Notification = function (config) {
    var me = this, __cog = config || {};
    iNet.apply(this, __cog);
    this.id = this.id || 'web-notify-'+iNet.generateId();
    this.refEl = this.refEl || null;
    this.$element = $.getCmp(this.id);
    this.$notify = null;
    this.content = this.content || '';
    this.type = !iNet.isEmpty(this.type) ? this.type : 'success';
  };
  iNet.extend(iNet.ui.web.Notification, iNet.Component, {
    getEl: function () {
      return this.$element;
    },
    show: function () {
      this._init();
    },
    hide: function () {
      delete this.$notify;
    },
    setRefEl: function (el) {
      this.refEl = el;
    },
    getRefEl: function () {
      return this.refEl;
    },
    getContent: function () {
      return this.content;
    },
    setContent: function (content) {
      this.content = content;
    },
    setType: function (type) {
      this.type = type;
    },
    getType: function () {
      return this.type;
    },
    _init: function () {
      var $el = this.getEl();
      if($el.length>0){
        this.$notify = $el.notify(this.getContent(), this.getType());
      }else{
        if(!iNet.isEmpty(this.getRefEl())){
          if(this.getRefEl().length>0){
            this.$notify = $.notify(this.getRefEl(), this.getContent(), this.getType());
          }
        }else{
          this.$notify = $.notify(this.getContent(), this.getType());
        }
      }
    }
  });
});