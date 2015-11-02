/**
 * Created by wulinglong on 2015/11/2.
 */

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
 * @param  {如果页面已经存在执行的回调函数}
 * @param  {如果页面不存在执行的回调函数}
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
