/**
* APP调用摄像头拍照（调用时可以通过输入参数确定是否调用摄像头，可能是拍视频，也可能是拍照），并上传到服务端（服务端的接收处理http接口[asp.net的ashx接口]，不限定格式，可能是照片，也可能是视频文件，也可以是其他格式的文件）
* 接口定义 v1.0
* @author 赵颖杰 				联系方式 13805848274
*/

var WebcamApp = {};//摄像头接口对象
(function($){
	
	/************通讯接口**************/
	/**
	* 摄像头
	* @param wc_type 调用方式 拍照:photo, album:相册, video:摄像;
	* @param url http地址 例如http://xxxxx;
	* @param data 业务层参数数据
	*			{
	*				a:"value",
	*				。。。 
	*			}或 a=1&b=2&c=3
	* @param success_func 成功回调function(param); 注：如需要返回信息，请设置
	* @param error_func 失败回调function(param); 注：如需要返回信息，请设置
	* @return string 返回值根据实际需求自行转换
	*/
	$.doWebcamApp = function(wc_type, url, data, success_func, error_func){
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
		if( typeof(cordova)!="undefined"){
			cordova.exec(function(param) {
				if(success_func)
					success_func(param);
			}, function(error) {
				if(error_func)
					error_func(param);
			}, "WebcamAppPlu", "doWebcamApp", [wc_type, url, data]);
		}
	};
})(WebcamApp);