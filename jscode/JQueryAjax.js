/*powered by chenshuai 20100617*/
//version 1.1 20150818 chenshuai && zhaoyingjie

var Remoting = {};//后台通信接口对象
(function($){
	
	/************通讯接口**************/
	/**
	* 通讯
	* @param url http地址 例如http://xxxxx;
	* @param data 业务层参数数据
	*			{
	*				a:"value",
	*				。。。 
	*			}或 a=1&b=2&c=3
	* @param success_func 成功回调function(param); 注：如需要返回信息，请设置
	* @param error_func 失败回调function(param); 注：如需要返回信息，请设置
	* @param style 样式参数
	*			{
	*				show_progress:true, //是否显示进度信息 (可选); 默认true
	*				progress_theme:"scroll"	//进度显示样式 (可选) scroll:滚动; 默认scroll
	*			}
	* @return string 返回值根据实际需求自行转换
	*/
	$.doRemoting = function(url, data, success_func, error_func, style){

		var urlIndex=url.indexOf("http://");
		if(urlIndex>0){
			alert("请求地址错误");
			return false;
		}
		if(url.length>0 && urlIndex!=0){
			//TODO:Ternece 2015/09/28  如果地址变更，这边地址也需要变更
			var defaultWebSite="http://www.51qbd.cn/AppService"; 
			url=defaultWebSite+ (url[0]==='/'?"":"/") +url;
		}

		cordova.exec(function(param) {
			if(success_func)
				success_func(param);
		}, function(error) {
			if(error_func)
				error_func(param);
		}, "OpenxtPlu", "doRemoting", [url, data, style]);

	};
})(Remoting);

function JQueryResultObject() {
	this.error = null;
	this.data = null;
	this.status = null;
}
function JQueryAjax(purl, pdata, callback) {
	var obj = new JQueryResultObject();
	if (callback == null) {
		if(typeof(cordova)=="undefined"){
			//微信、PC网页
			$.ajax({
				type: "POST",
				url: purl,
				data: pdata,
				async: false,
				dataType: "json",
				success: function(data, textStatus) {
					if (data != null) {
						obj.status = data.id;
						if (data.id >= 10000) {
							obj.error = eval("(" + data.name + ")");
						} else {
							obj.data = eval("(" + data.name + ")");
						}
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					if (XMLHttpRequest.status >= 10000) {
						obj.error = XMLHttpRequest.responseText;
					} else {
						//obj.error = textStatus;
						obj.error="网络连接错误";
					}
					obj.status = XMLHttpRequest.status;
				}

			});
		}else{
			//APP 插件
			obj.error="APP下不支持同步请求操作";
			obj.status=-1;
		}
		return obj;
	} else {
		if(typeof(cordova)=="undefined"){
			//微信、PC网页
			$.ajax({
				type: "POST",
				url: purl,
				data: pdata,
				dataType: "json",
				success: function(data, textStatus) {
					if (data != null) {
						obj.status = data.id;
						if (data.id >= 10000) {
							obj.error = eval("(" + data.name + ")");
						} else {
							obj.data = eval("(" + data.name + ")");
						}
						callback(obj);
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					if (XMLHttpRequest.status >= 10000) {
						obj.error = XMLHttpRequest.responseText;
					} else {
						//obj.error = textStatus;
						obj.error="网络连接错误";
					}
					alert(obj.error);
					obj.status = XMLHttpRequest.status;
					callback(obj);
				}
			});
		}else{
			//APP 插件
			Remoting.doRemoting(purl, pdata, function(data){
				if(data!=null){
					data=eval("(" + data + ")");
					obj.status = data.id;
					if (data.id >= 10000) {
						obj.error = eval("(" + data.name + ")");
					} else {
						obj.data = eval("(" + data.name + ")");
					}
					callback(obj);
				}
			}, function(error){
				obj.error=error;
				obj.status=-1;
				callback(obj);
			});
		}
	}
}
function JQueryAjax2(purl, pdata, pidx, callback) {
	var obj = new JQueryResultObject();
	if (callback == null) {
		if(typeof(cordova)=="undefined"){
			//微信、PC网页
			$.ajax({
				type: "POST",
				url: purl,
				data: (pdata == null ? ("pidx="+pidx ) : (pdata + "&pidx=" + pidx)),
				async: false,
				dataType: "json",
				success: function(data, textStatus) {
					if (data != null) {
						obj.status = data.id;
						if (data.id >= 10000) {
							obj.error = eval("(" + data.name + ")");
						} else {
							obj.data = eval("(" + data.name + ")");
						}
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {

					if (XMLHttpRequest.status >= 10000) {
						obj.error = XMLHttpRequest.responseText;

					} else {
						//obj.error = textStatus;
						obj.error="网络连接错误";
					}
					obj.status = XMLHttpRequest.status;
				}
			});
		}else{
			//APP 插件
			obj.error="APP下不支持同步请求操作";
			obj.status=-1;
		}
		return obj;
	} else {
		if(typeof(cordova)=="undefined"){
			//微信、PC网页
			$.ajax({
				type: "POST",
				url: purl,
				data: (pdata == null ? ("pidx=" + pidx) : (pdata + "&pidx=" + pidx )),
				dataType: "json",
				success: function(data, textStatus) {
					if (data != null) {
						obj.status = data.id;
						if (data.id >= 10000) {
							obj.error = eval("(" + data.name + ")");
						} else {
							obj.data = eval("(" + data.name + ")");
						}
						callback(obj);
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					if (XMLHttpRequest.status >= 10000) {
						obj.error = XMLHttpRequest.responseText;

					} else {
						//obj.error = textStatus;
						obj.error="网络连接错误";
					}
					obj.status = XMLHttpRequest.status;
					callback(obj);
				}
			});
		}else{
			//APP 插件
			Remoting.doRemoting(purl, (pdata == null ? ("pidx=" + pidx) : (pdata + "&pidx=" + pidx )), function(data){
				if(data!=null){
					data=eval("(" + data + ")");
					obj.status = data.id;
					if (data.id >= 10000) {
						obj.error = eval("(" + data.name + ")");
					} else {
						obj.data = eval("(" + data.name + ")");
					}
					callback(obj);
				}
			}, function(error){
				obj.error=error;
				obj.status=-1;
				callback(obj);
			});
		}
	}
}
function JQueryAjax3(purl, pdata, callback) {
	var obj = new JQueryResultObject();
	var rnd= Math.round(Math.random() * Math.pow(10, 8));
	if (callback == null) {
		if(typeof(cordova)=="undefined"){
			//微信、PC网页
			$.ajax({
				type: "GET",
				url: purl,
				data: pdata,
				async: false,
				dataType: "jsonp",
				jsonp:"callbackparam",
				jsonpCallback:"jsonpCallback"+rnd,
				success: function(data, textStatus) {
					obj=data;
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					obj={};
					if (XMLHttpRequest.status >= 10000) {
						obj.error = XMLHttpRequest.responseText;
					} else {
						//obj.error = textStatus;
						obj.error="网络连接错误";
					}
					obj.status = XMLHttpRequest.status;
				}

			});
		}else{
			obj.error="APP下不支持同步请求操作";
			obj.status=-1;
		}
		return obj;
	} else {
		if(typeof(cordova)=="undefined"){
			$.ajax({
				type: "GET",
				url: purl,
				data: pdata,
				dataType: "jsonp",
				jsonp:"callbackparam",
				jsonpCallback:"jsonpCallback"+rnd,
				success: function(data, textStatus) {
					callback(data);
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					obj={};
					if (XMLHttpRequest.status >= 10000) {
						obj.error = XMLHttpRequest.responseText;

					} else {
						//obj.error = textStatus;
						obj.error="网络连接错误";
					}
					obj.status = XMLHttpRequest.status;
					callback(obj);
				}
			});
		}else{
			//APP 插件
			Remoting.doRemoting(purl, pdata, function(data){
				if(data!=null){
					data=eval("(" + data + ")");
					obj.status = data.id;
					if (data.id >= 10000) {
						obj.error = eval("(" + data.name + ")");
					} else {
						obj.data = eval("(" + data.name + ")");
					}
					callback(obj);
				}
			}, function(error){
				obj.error=error;
				obj.status=-1;
				callback(obj);
			});
		}
	}
}

