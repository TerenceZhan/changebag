/**
* 接口定义 v1.0
* @author 赵颖杰 				联系方式 13805848274
* @modifier 陈帅                联系方式 chenshuai@cnnb.com.cn
*/

var PushMessage = {};//推送消息接口对象
(function($){
	
	/************推送标签设置接口**************/
	/**
	* 推送机制标签注册
	* @param tags 标签数组 [str, ...];
	* @param success_func 成功回调function(param); 注：如需要返回信息，请设置
	* @param error_func 失败回调function(param); 注：如需要返回信息，请设置
	* @return {status:"OK/ERROE", message:""} message只有在ERROR时有效
	*/
	$.bindTags = function(tags, success_func, error_func){
		cordova.exec(function(param) {
			if(success_func)
				success_func(param);
		}, function(error) {
			if(error_func)
				error_func(param);
		}, "OpenxtPlu", "bindTags", tags);
	};
	
	/************消息接口**************/
	/**
	* 本地存储消息格式定义
	* [
	*	{
	*	  uuid: "唯一标识符", //默认生成方式UUID
	*	  title: "标题", //内容可以自定义 具体根据推送消息来做处理
	*	  message: "消息内容", //内容可以自定义 具体根据推送消息来做处理
	*	  custom_content: "自定义内容", //内容可以自定义 具体根据推送消息来做处理
	*	  state: "" //消息状态  read/unread
	*	},
	*	...
	* ]
	*
	*/
	
	/**
	* 获取本地消息
	* @param action 获取方式
	*		all:获取全部消息
	*		read:已读消息
	*		unread:未读
	*		all_del:获取全部消息,并清空全部消息
	*		read_del:获取已读消息,并清空已读消息
	*		unread_del:获取未读消息,并清空未读消息
	* @param success_func 成功回调function(param); 注：如需要返回信息，请设置
	* @param error_func 失败回调function(param); 注：如需要返回信息，请设置
	* @return
	*/
	$.obtainLocalPushMsg = function(action, success_func, error_func){
		cordova.exec(function(param) {
			if(success_func)
			    var obj={};
			    
				success_func(param);
		}, function(error) {
			if(error_func)
				error_func(param);
		}, "OpenxtPlu", "obtainLocalPushMsg", [action]);
	};
	
	/**
	* 更新本地消息
	* @param args 消息列表 [唯一标示符, ...]
	* @param action 更新方式
	*		read:标记为已读
	*		unread:标记为未读
	*		del:清除消息
	* @param success_func 成功回调function(param); 注：如需要返回信息，请设置
	* @param error_func 失败回调function(param); 注：如需要返回信息，请设置
	* @return {status:"OK/ERROE", message:""} message只有在ERROR时有效
	*/
	$.updateLocalPushMsg = function(args, action, success_func, error_func){
		cordova.exec(function(param) {
			if(success_func)
				success_func(param);
		}, function(error) {
			if(error_func)
				error_func(param);
		}, "OpenxtPlu", "updateLocalPushMsg", [args, action]);
	};
	
	/*******TODO 该方法由app调用，本地实现*********/
	/**
	* app点击通知，通知本地执行消息显示 （由app发起，本地h5来实现）
	* @param uuid 唯一标示符
	*/
	$.NoticeMsg;
})(PushMessage);