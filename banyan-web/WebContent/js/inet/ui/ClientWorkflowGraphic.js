// #PACKAGE: cloud-office-clientwfgraphic
// #MODULE: ClientWorkflowGraphic
/**
 * Copyright (c) 2014 iNet Solutions Corp.,
 * Created by Nguyen Ba Chi Cong<nbccong@inetcloud.vn>
 *         on 13/10/2014.
 * -------------------------------------------
 * @project cloud-office
 * @file ClientWorkflowGraphic
 * @author chicongnb
 */

$(function () {
  iNet.ns('iNet.ui.web.ClientWorkflowGraphic');
  iNet.ui.web.ClientWorkflowGraphic = function (config) {
    var me = this, __config = config || {};
    iNet.apply(this, __config);
    this.id = this.id || 'client-form';
    this.$element = $.getCmp(this.id);
    this.$baseWf = this.$baseWf || $('#workflow-base');
    this.$panelEl = this.$panelEl || $('.panel');
    this.$container = this.$container || $('.tasks-container');
    this.$content = this.$content || $('.tasks-content');
    this.$taskText = this.$taskText || $('.tasks-text');
    this.$step = this.$step || $('.panelnav');
    this.node = this.node || ['profile', 'configure', 'pushcloud', 'build', 'scale'];
    this.wizard = this.wizard || ['profile', 'tplcog', 'apppkg', 'checkout'];
    this.step = null;
    this.$node = [];
    // EVENT ............
    for(var n=0; n<this.node.length; n++){
      this.$node.push($('.'+this.node[n]));
    }
    iNet.ui.web.ClientWorkflowGraphic.superclass.constructor.call(this);
    this.onLoad();
    this.settingEvent();
  };
  iNet.extend(iNet.ui.web.ClientWorkflowGraphic, iNet.ui.Widget, {
    version: '1.0',
    description: '',
    setStep: function (step) {
      this.step = step;
    },
    getStep: function () {
      return this.step;
    },
    reset: function () {
      this.$panelEl.hide();
      this.$step.find('a').removeClass('active');
      FormUtils.showButton($('.wfstep'), true);
      FormUtils.showButton($('.wfnext'), false);
    },
    addToNode: function (el, node) {
    },
    addToGraph: function (el, node) {
    },
    setTag: function (step, value) {
      this.$content.find('.'+step).find('.app-item span').text(value||'');
    },
    getBtnByStep: function (step) {
      return this.$taskText.find('.'+step).find('button[data-panel="'+step+'"]').first();
    },
    dragTo: function (el, direction, to, to2) {
      var __style = {};
      if(direction=='rtl' || direction=='ltr'){
        __style.left = to;
      }
      if(direction=='ttl'){
        __style.top = to;
        __style.left = to2;
      }
      if(direction=='ttr'){
        __style.top = to;
        __style.right = to2;
      }
      el.animate(__style, 200);
    },
    initProfile: function () {
      this.reset();
      this.$step.children().eq(0).find('a:first').addClass('active');
      this.$baseWf.hide();
      this.$baseWf.find('div').hide();
      this.$node[0].fadeIn();
      this.setStep(this.wizard[0]);
    },
    initTplCog: function () {
      this.reset();
      this.$step.children().eq(1).find('a:first').addClass('active');
      this.$baseWf.show();
      this.$baseWf.find('img').hide();
//      this.$baseWf.find('div').hide();
      this.$panelEl.first().hide();
      this.$baseWf.find('.profile').show();
//      this.$baseWf.find('.develop').show();
      this.$node[1].fadeIn(200);
//      this.$baseWf.find('.configure2').hide();
      this.setStep(this.wizard[1]);
    },
    initAppPackage: function () {
      this.reset();
      this.$step.children().eq(2).find('a:first').addClass('active');
      this.$baseWf.show();
      this.$baseWf.find('img').hide();
//      this.$baseWf.find('.profile').show();
      this.$baseWf.find('.tplcog').show();
//      this.$baseWf.find('.'+this.node[1]).show();
//      this.$node[2].find('.app').show();
      this.$node[2].fadeIn(200);
      this.setStep(this.wizard[2]);
    },
    initCheckOut: function () {
      this.reset();
      this.$step.children().eq(3).find('a:first').addClass('active');
      this.$baseWf.show();
      this.$baseWf.find('img').hide();
//      this.$baseWf.find('.profile').show();
//      this.$baseWf.find('.develop').show();
      this.$baseWf.find('.apppkg').show();
//      this.$baseWf.find('.'+this.node[1]).show();
      this.$node[3].fadeIn(200);
      this.setStep(this.wizard[3]);
    },
    prev: function () {
      if(this.getStep()!=null){
        var __index = this.wizard.indexOf(this.getStep());
        this.changeWorkspace(this.wizard[--__index]);
      }
    },
    next: function () {
      if(this.getStep()!=null){
        var __index = this.wizard.indexOf(this.getStep());
        this.changeWorkspace(this.wizard[++__index]);
      }
    },
    onLoad: function () {
      this.initProfile();
    },
    changeWorkspace: function (type) {
      switch (type) {
        case this.wizard[0] :
          this.initProfile();
          this.fireEvent('initprofile');
          break;
        case this.wizard[1] :
          this.initTplCog();
          this.fireEvent('inittplcog');
          break;
        case this.wizard[2] :
          this.initAppPackage();
          this.fireEvent('initpackage');
          break;
        case this.wizard[3] :
          this.initCheckOut();
          this.fireEvent('initcheckout');
          break;
        default :
          console.log('not found action');
      }
    },
    changeAnimate: function (type) {
      switch (type) {
        case this.wizard[0] :
          break;
        case this.wizard[1] :
//          this.dragTo(this.$node[1].find('.app'), 'ltr', '15%');
          this.fireEvent('submittplcog');
          break;
        case this.wizard[2] :
          this.fireEvent('submitpkg');
          break;
        case this.wizard[3] :
          this.fireEvent('checkoutprocess');
          break;
        default :
          console.log('not found action');
      }
    },
    settingEvent: function () {
      var me = this, __type = '';
      this.$step.on('click', 'a', function () {
        var $this = $(this);
        __type = $this.data('section');
        me.changeWorkspace(__type);
        me.$step.find('a').removeClass("active");
        $this.addClass('active');
      });
      this.$taskText.on('click', 'button', function () {
        var $this = $(this);
        __type = $this.data('panel');
        if($this.hasClass('wfstep')){
          FormUtils.disableButton($this, true);
          FormUtils.showButton($this.next(), true);
          me.changeAnimate(__type);
        }
        if($this.hasClass('wfnext')){
          FormUtils.showButton($this.next(), false);
          me.changeAnimate(__type);
          me.next();
        }
      });
    }
  });
});