function CategoryModel(){
	var self=this;
	self.categoryList=ko.observableArray([]);
	self.getCategoryList=function(){
		$.get("http://172.16.2.172:8181/moonMall/cn.com.bluemoon.appInterface.category.category.biz.ext",function(data){
			if(data.response=="success"){
				self.categoryList(data.itemList);
			}else{
				console.log("数据异常")
			}
		},"json")
	};
	self.getCategoryList();
}