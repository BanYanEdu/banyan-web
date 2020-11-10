// #PACKAGE: cloud-office-clientcreateservice
// #MODULE: ClientCreateService
/**
 * Copyright (c) 2014 iNet Solutions Corp.,
 * Created by Nguyen Ba Chi Cong<nbccong@inetcloud.vn>
 *         on 13/10/2014.
 * -------------------------------------------
 * @project cloud-office
 * @file ClientCreateService
 * @author chicongnb
 */

$(function () {
  iNet.ns('iNet.ui.web.ClientCreateService');
  iNet.ui.web.ClientCreateService = function (config) {
    var me = this, __config = config || {};
    iNet.apply(this, __config);
    this.id = this.id || 'client-form';
    this.ClientWorkflowGraphic = new iNet.ui.web.ClientWorkflowGraphic();
//    this.$toolbar = {
//      createProfile: $('#btn-create-profile'),
//      submitProfile: $('#btn-submit-profile'),
//      selectTplCog: $('#btn-select-tplcog'),
//      submitTplCog: $('#btn-submit-tplcog'),
//      selectAppPkg: $('#btn-select-apppkg'),
//      submitAppPkg: $('#btn-submit-apppkg'),
//      goPayment: $('#btn-go-payment'),
//      submitPayment: $('#btn-submit-payment')
//    };
    this.$element = $.getCmp(this.id);
    this.$confirmDlg = $('#confirm-modal-dlg');
    var url = {};
    // Setting event --------------
    //---------------------------//
//    this.$toolbar.createProfile.click(function () {
//      me.fireEvent('newclient');
//    });
//    this.$toolbar.submitProfile.click(function () {
//      me.fireEvent('submitprofile');
//    });
//    this.$toolbar.selectTplCog.click(function () {
//      me.fireEvent('loadtplcog');
//    });
//    this.$toolbar.submitTplCog.click(function () {
//      me.fireEvent('submittplcog');
//    });
//    this.$toolbar.selectAppPkg.click(function () {
//      me.fireEvent('loadpackage');
//    });
//    this.$toolbar.submitAppPkg.click(function () {
//      me.fireEvent('submitpackage');
//    });
//    this.$toolbar.goPayment.click(function () {
//      me.fireEvent('gopayment');
//    });
//    this.$toolbar.submitPayment.click(function () {
//      me.fireEvent('paymentprocess');
//    });
    iNet.ui.web.ClientCreateService.superclass.constructor.call(this);
  };
  iNet.extend(iNet.ui.web.ClientCreateService, iNet.ui.Widget, {
    constructor: iNet.ui.web.ClientCreateService,
    getClientId: function () {
      return this.clientID;
    },
    setClientId: function (id) {
      this.clientID = id;
    },
    getClientIds: function () {
      return this.ids;
    },
    setClientIds: function (ids) {
      this.ids = ids;
    },
    getTplCog: function () {
      return this.tplOs;
    },
    setTplCog: function (tplId) {
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
      return this.ClientWorkflowGraphic;
    },
    updateClient: function () {
      $.postJSON(iNet.getUrl('cloud/partner/client/update'), this.getParams(), function (result) {
        console.log(result);
      }, {
        mask: this.getMask(),
        msg: iNet.resources.ajaxLoading.saving
      });
    },
    confirmDlg: function () {
      var me = this,
          $btnOk = $('#btn-confirm-dlg-ok');
      this.$confirmDlg.modal('toggle');
      $btnOk.click(function () {
        var __deleteIds = me.getClientIds();
        if (!iNet.isEmpty(__deleteIds)) {
          var __params = {
            client: __deleteIds.join(',')
          };
          $.postJSON(iNet.getUrl('cloud/partner/client/delete'), __params, function (result) {
            var __result = result || {};
            console.log(__result);
          }, {
            mask: me.getMask(),
            msg: '&nbsp;'
          });
          me.$confirmDlg.modal('hide');
        }
      });
    }
  });
});