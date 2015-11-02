/**
 * 购物车
 * @constructor
 */
var CartModel=function(){
	var self=this;
	self.title="this is a cart";
  self.showAlert=function(){
    app.popup.alert("提示","弹出内容",null,null)
  }
  self.showConfirm=function(){
    app.popup.confirm("提示","弹出内容",null,null)
  }
  self.showToast=function(){
    app.toast.success("成功提示",2000);
  }
  self.showLoading=function(){
    app.popup.showLoading();
  }
}
