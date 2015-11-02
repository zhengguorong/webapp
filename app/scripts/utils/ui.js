/**
 * Created by wulinglong on 2015/11/2.
 */
/**
 弹出框组建
 */
app.popup=(function(){
  var Alert=function(){
    var self=this;
    self.title=ko.observable();
    self.content=ko.observable();
    self.btnName=ko.observable();
  }
  var Confirm=function(){
    var self=this;
    self.title=ko.observable();
    self.content=ko.observable();
  }
  var bmAlert=new Alert();
  var bmConfirm=new Confirm();
  /**
   *alert 组件
   *@param title 标题
   *@param content 内容
   *@param btnName 按钮内容
   */
  var alert=function(title,content,btnName,okCall,cancelCall){
    var alertObj=$(".popup.alert");
    bmAlert.title(title);
    bmAlert.content(content);
    bmAlert.btnName(btnName||"确定");
    show(alertObj);
    alertObj.find(".confirm").click(function(){
      hide(alertObj);
      if(okCall)okCall.call(this);
    });
    alertObj.find(".cancel").click(function(){
      hide(alertObj);
      if(cancelCall)cancelCall.call(this);
    });
  }
  /**
   *confirm 组件
   *@param title 标题
   *@param content 内容
   *@param okCall 确认按钮回调
   *@param cancelCall 取消按钮回调
   */
  var confirm=function(title,content,okCall,cancelCall){
    var confirmObj=$(".popup.confirm");
    bmConfirm.title(title)
    bmConfirm.content(content)
    show(confirmObj);
    confirmObj.find(".confirm").click(function(){
      hide(confirmObj);
      if(okCall)okCall.call(this);
    });
    confirmObj.find(".cancel").click(function(){
      hide(confirmObj);
      if(cancelCall)cancelCall.call(this);
    });
  }
  var showLoading=function(){
    var loadingObj=$(".popup.loading");
    show(loadingObj);
  }
  var hideLoading=function(){
    var loadingObj=$(".popup.loading");
    loadingBGHide(loadingObj);
  }
  var show=function(obj){
    $(obj).addClass("active");
    $(".TB_overlayBG").addClass("active");
  }
  //隐藏loading的背景
  var loadingBGHide=function(obj){
    $(obj).removeClass("active");
    if($(".popup.active").length==0){
      $(".TB_overlayBG").removeClass("active");
    }
  }
  var hide=function(obj){
    $(obj).removeClass("active");
    $(".TB_overlayBG").removeClass("active");
  }
  var hideAllPopup=function(){
    $(".TB_overlayBG.active").removeClass("active");
    $(".popup.active").removeClass("active");
  }
  var init=function(){
    $(".TB_overlayBG").click(function(){
      hideAllPopup();
    })
    ko.applyBindings(bmAlert, document.getElementById("alert"));
    ko.applyBindings(bmConfirm, document.getElementById("confirm"));
  }
  return{
    alert:alert,
    confirm:confirm,
    showLoading:showLoading,
    hideLoading:hideLoading,
    hideAllPopup:hideAllPopup,
    init:init
  }
})();

/*toast提示*/
app.toast=(function(){
  var Toast=function(){
    var self=this;
    self.content=ko.observable();
  }
  var toast=new Toast();
  var init=function(){
    toast=new Toast();
    ko.applyBindings(toast, document.getElementById("toast"));
  }
  var defalut=function(content,time,callback){
    var obj=$(".prompt.toast .pmt_default");
    _show(obj,content);
    setTimeout(function(){
      _hide(obj)
    },time||1000);
  }
  var success=function(content,time,callback){
    var obj=$(".prompt.toast .pmt_success");
    _show(obj,content);
    setTimeout(function(){
      _hide(obj,callback)
    },time||1000);
  }
  var error=function(content,time,callback){
    var obj=$(".prompt.toast .pmt_failure");
    _show(obj,content);
    setTimeout(function(){
      _hide(obj)
    },time||1000);
  }
  var info=function(content,time,callback){
    var obj=$(".prompt.toast .pmt_sigh");
    _show(obj,content);
    setTimeout(function(){
      _hide(obj)
    },time||1000);
  }
  var _hide=function(obj,callback){
    $(obj).removeClass("active");
    callback&&callback();
  }
  var _show=function(obj,content){
    console.log(content)
    toast.content(content);
    obj.addClass("active");
  }

  return{
    defalut:defalut,
    success:success,
    error:error,
    info:info,
    init:init
  }
})();
