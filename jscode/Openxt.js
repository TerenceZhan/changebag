var openxt={
	consts:{
		isApp:true
	},
	page:{
		readyData:function(fn){	}//加载异步请求
	}
};

openxt.page.readyData=function(fn){
	if(typeof(fn)=="function"){
		if(openxt.consts.isApp){
//			alert("APP");
			document.addEventListener("deviceready", fn, false);
		}else{
			fn();
		}
	}else{
		alert("需要传入一个参数")
	}
}

