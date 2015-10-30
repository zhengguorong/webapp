var CartModel=function(){
	var self=this;
	self.title="this is a cart";
  self.showAlert=function(){
    app.plugin.alert.show("我是标题","我是内容",function(){
      console.log("callback")
    })
  }
}
