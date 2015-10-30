var app={};

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



$(function(){
  app.router.run("#/home");
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
