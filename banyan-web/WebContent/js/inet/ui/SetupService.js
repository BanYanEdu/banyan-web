// #PACKAGE: cloudoffice-setupservice
// #MODULE: SetupService
/**
 * Copyright (c) 2014 iNet Solutions Corp.,
 * Created by Nguyen Ba Chi Cong<nbccong@inetcloud.vn>
 *         on 19/11/2014.
 * -------------------------------------------
 * @project cloud-office
 * @file SetupService
 * @author nbchicong
 */

$(function () {
  iNet.ns('iNet.ui.web.SetupService');
  iNet.ui.web.SetupService = function (config) {
    var __cog = config || {};
    iNet.apply(this, __cog);
    this.id = this.id || 'client-setting-content';
    this.$element = $.getCmp(this.id);
    this.$confirmDlg = $('#confirm-modal-dlg');
    this.clientwf = new iNet.ui.web.ClientWfGraphic();
    this.isEdit = false;
    iNet.ui.web.SetupService.superclass.constructor.call(this);
  };
  iNet.extend(iNet.ui.web.SetupService, iNet.ui.Widget, {
    constructor: iNet.ui.web.SetupService,
    getText: function (text) {
      return iNet.resources.web.client[text];
    },
    getEl: function () {
      return this.$element;
    },
    getClientId: function () {
      return this.clientID;
    },
    setClientId: function (id) {
      this.clientID = this.client = id;
    },
    getClientIds: function () {
      return this.ids;
    },
    setClientIds: function (ids) {
      this.ids = ids;
    },
    getTplOS: function () {
      return this.tplOs;
    },
    setTplOS: function (tplId) {
      this.tplOs = tplId;
    },
    getPackage: function () {
      return this.packg;
    },
    setPackage: function (pkg) {
      this.packg = pkg;
    },
    getParams: function () {
      return this.params || {};
    },
    setParams: function (params) {
      this.params = params;
    },
    getAmount: function () {
      return this.amount;
    },
    setAmount: function (amount) {
      this.amount = amount;
    },
    getGraphic: function () {
      return this.clientwf;
    },
    setUserInfo: function (info) {
      this.info = info;
    },
    getUserInfo: function () {
      return this.info;
    },
    add: function (url, callback) {
      var __url = !iNet.isEmpty(url)?url:iNet.getUrl('cloud/member/firm/register'),
          __fn = iNet.isFunction(callback)?callback:iNet.emptyFn;
      $.postJSON(__url, this.getUserInfo(), function (data) {
        __fn(data);
      }, {
        mask: this.getMask(),
        msg: iNet.resources.ajaxLoading.saving
      });
    },
    update: function (url, callback) {
      var __url = !iNet.isEmpty(url)?url:iNet.getUrl('cloud/partner/client/update'),
          __fn = iNet.isFunction(callback)?callback:iNet.emptyFn;
      $.postJSON(__url, this.getParams(), function (result) {
        __fn(result);
      }, {
        mask: this.getMask(),
        msg: iNet.resources.ajaxLoading.saving
      });
    },
    delClient: function (params, callback) {
      var me = this,
          fn = iNet.isFunction(callback)?callback:iNet.emptyFn;
      $.postJSON(iNet.getUrl('cloud/partner/client/delete'), params || {}, function (result) {
        var __result = result || {};
        fn(__result);
      }, {
        mask: me.getMask(),
        msg: '&nbsp;'
      });
    }
  });
});