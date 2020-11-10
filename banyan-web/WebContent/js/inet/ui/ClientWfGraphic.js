// #PACKAGE: cloudoffice-client-wfstep
// #MODULE: ClientWfGraphic
/**
 * Copyright (c) 2014 iNet Solutions Corp.,
 * Created by Nguyen Ba Chi Cong<nbccong@inetcloud.vn>
 *         on 17/11/2014.
 * -------------------------------------------
 * @project cloud-office
 * @file ClientWfGraphic
 * @author nbchicong
 */

$(function () {
  iNet.ns('iNet.ui.web.ClientWfGraphic');
  iNet.ui.web.ClientWfGraphic = function (config) {
    var me = this, __cog = config || {};
    iNet.apply(this, __cog);
    this.id = this.id || 'client-setup-service';
    this.first = this.first || 'signup';
    this.$element = $.getCmp(this.id);
    this.$header = $('#client-setting-header');
    this.$content = $('#client-setting-content');
    this.$currentEl = this.$header.find('[data-type="step-section-data"]');
    this.$wizard = this.$header.find('.setting-wizard');
    this.current = null;
    this.$button = {
      next: $('#btn-next'),
      back: $('#btn-back')
    };
    this.$button.next.click(function () {
      me.next();
    });
    this.$button.back.click(function () {
      me.back();
    });
    this.$wizard.on('click', 'li[data-wizard]:not(.disabled)', function () {
      var $this = $(this);
      me.action('[data-section="'+$this.data('wizard')+'"]');
    });
    this.init();
    iNet.ui.web.ClientWfGraphic.superclass.constructor.call(this);
  };
  iNet.extend(iNet.ui.web.ClientWfGraphic, iNet.ui.Widget, {
    constructor: iNet.ui.web.ClientWfGraphic,
    getEl: function () {
      return this.$element;
    },
    init: function () {
      this.action('[data-section="'+this.first+'"]');
      this.setCurrentElName(this.first);
      this.fireEvent('initcompleted');
    },
    setCurrentElName: function (current) {
      this.current = current;
    },
    getCurrentElName: function () {
      return this.current;
    },
    setCurrentValue: function (value) {
      this.$currentEl.attr('data-value', value);
      this.currentValue = value;
    },
    setCurrentText: function (currentText) {
      this.$currentEl.text(currentText);
    },
    getCurrentValue: function () {
      this.$currentEl.data('value');
      return this.currentValue;
    },
    getNext: function () {
      var $name = this.$header.find('[data-section="'+this.getCurrentElName()+'"]').next();
      return $name.data('section');
    },
    getBack: function () {
      var $name = this.$header.find('[data-section="'+this.getCurrentElName()+'"]').prev();
      return $name.data('section');
    },
    action: function (step, callback) {
      var fn = callback || iNet.emptyFn,
          $current = this.$header.find(step);
      this.$header.find('[data-section]').hide();
      this.$wizard.find('[data-wizard]').removeClass('active');
      this.$wizard.find('[data-wizard="'+$current.data('section')+'"]').addClass('active');
      this.setCurrentElName($current.data('section'));
      $current.show();
      fn();
      this.fireEvent('action', $current.data('section'));
    },
    next: function (callback) {
      var cur = this.getCurrentElName(),
          fn = callback || iNet.emptyFn;
      if(!iNet.isEmpty(cur)){
        this.action('[data-section="'+this.getNext()+'"]', fn);
        this.fireEvent('next', cur, fn);
      }
    },
    back: function (callback) {
      var cur = this.getCurrentElName(),
          fn = callback || iNet.emptyFn;
      if(!iNet.isEmpty(cur)){
        this.action('[data-section="'+this.getBack()+'"]', fn);
        this.fireEvent('back', cur, fn);
      }
    },
    changeContent: function (content) {
      var value = this.$currentEl.data('value');
      if(!iNet.isEmpty(value)){
        this.showNextButton();
      }
      this.$content.html(content);
    },
    setBtnNextText: function (text) {
      this.$button.next.text(text);
    },
    setBtnBackText: function (text) {
      this.$button.back.text(text);
    },
    showNextButton: function () {
      this.$button.next.removeClass('disabled').removeAttr('disabled');
    },
    hideNextButton: function () {
      this.$button.next.addClass('disabled').attr('disabled', 'disabled');
    },
    showBackButton: function () {
      this.$button.back.removeClass('disabled').removeAttr('disabled');
    },
    hideBackButton: function () {
      this.$button.back.addClass('disabled').attr('disabled', 'disabled');
    }
  });
});