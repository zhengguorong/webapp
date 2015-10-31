
var app={
  launch:function(){
    this.popup.init();
    this.toast.init();
  }
};

/**
 * 页面路由功能
 */
app.router = $.sammy(function(){
  this.get("#/home",function(){
    app.showPage("indexPage",null,function(){
      app.indexModel = new IndexModel();
      app.renderTemplate("views/home/index.html",app.indexModel,"indexPage");
    });
  })
  this.get("#/cart",function(){
    app.showPage("cartPage",null,function(){
      app.cartModel = new CartModel();
      app.renderTemplate("views/cart/cart.html",app.cartModel,"cartPage");
    });
  })
  this.get("#/category",function(){
    app.showPage("categoryPage",null,function(){
      app.categoryModel = new CategoryModel();
      app.renderTemplate("views/cate/category.html",app.categoryModel,"categoryPage");
    });
  })

})

/**
 * 页面加入新的模板
 * @param  {模板地址}
 * @param  {页面逻辑对象}
 * @param  {页面唯一id}
 * @return {null}
 */
app.renderTemplate=function(templateUrl,controller,pageId){
  $.get(templateUrl,function(data){
    $("#appView").append(data);
    ko.applyBindings(controller,document.getElementById(pageId));
  })
}

/**
 * @param  {页面唯一id}
 * @param  {页面存在回调函数}
 * @param  {页面不存在回调函数}
 * @return {null}
 */
app.showPage=function(pageId,successCallback,fallCallback){
  $("#appView section").hide();
  if(document.getElementById(pageId)){
    if(successCallback){
      successCallback();
    }else{
      $("#"+pageId).show();
    }
  }else{
    if(fallCallback){
      fallCallback();
    }
  }
}
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




$(function(){
  app.router.run("#/home");
  app.launch();
  /* 添加用户窗口事件 改变根字号大小 */
  function addEvent(obj,type,fn){
    if(obj.addEventListener){
      obj.addEventListener(type,fn,false);
    } else {
      obj.attachEvent('on'+type,fn);
    }
  }


  function autoSize(){
    var font = Math.round(win_W / 16);
    var HTML=document.getElementById('html');
    var win_W = $(".container").width();
    if(win_W>=364 && win_W<=375){
      font=24;
    }else{

      if( win_W == 360 || win_W == 361){
        font=22;
      }else{
        if( win_W > 540 ){
          font=34;
        }else{ font = Math.round( win_W / 16 ); }
      }
    }
    HTML.style.fontSize = font + 'px';


  }
  addEvent(window,'load',autoSize);
  addEvent(window,'resize',autoSize);
})
