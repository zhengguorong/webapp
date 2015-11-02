
var app={
  launch:function(){
    this.popup.init();
    this.toast.init();
  }
};


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
