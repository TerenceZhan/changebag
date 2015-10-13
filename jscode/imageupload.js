/*create by kola    */
/*ver 1.1 2012-12-10*/
(function($) {
    var swfu = null;
    var settings_object = null;
    $.fn.SwfUploadJs = function(options) {
        var id=$(this).attr("id");
        var defaults = {
				upload_url: "../ashx/upload/upload.ashx",
                post_params : {},
				// File Upload Settings
				file_size_limit : "2MB",
				file_types : "*.jpg;*.gif;*.png",
				file_types_description : "请选择图片",
				file_upload_limit : "0",    // Zero means unlimited
				// Button settings
				button_placeholder_id : id,

                button_image_url : "../jscode/XPButtonNoText_160x22.png",
				button_width: 160,
				button_height: 22,
				button_text : '<span class="button">更新图片<span class="buttonSmall">(最大2MB)</span></span>',
				button_text_style : '.button { font-family: Helvetica, Arial, sans-serif; font-size: 14pt;} .buttonSmall { font-size: 10pt; }',
				button_text_left_padding: 5,

				button_action:SWFUpload.BUTTON_ACTION.SELECT_FILE,

				// Flash Settings
				flash_url : "../swfupload.swf",	// Relative to this file

				// Debug Settings
				debug: false,

                //EventHandler
	            file_queued_handler : null,//file
	            file_queue_error_handler : FileQueueErrorEventHandler,//file,error_code,message
	            file_dialog_complete_handler : FileDialogCompleteEventHandler,//numFilesSelected, numFilesQueued
	            upload_start_handler : UploadStartEventHandler,//file
	            upload_progress_handler : UploadProcessEventHandler,//file,uploadbytes,totalbytes
	            upload_error_handler : UploadErrorEventHandler,//file,error_code,message
	            upload_success_handler : UploadSuccessEventHandler,//file,server_data
	            upload_complete_handler : UploadCompleteEventHandler,//file
	            debug_handler : DebugEventHandler,//message
	            show_message:null//flag (0 normal 1 error 2 finished),message
        };
        var options = $.extend(defaults, options);
        settings_object = {
				upload_url: options.upload_url,
                post_params : options.post_params,
				// File Upload Settings
				file_size_limit : options.file_size_limit,
				file_types : options.file_types,
				file_types_description :options.file_types_description,
				// Button settings
				button_placeholder_id : options.button_placeholder_id,

                button_image_url:options.button_image_url,
				button_width: options.button_width,
				button_height: options.button_height,
				button_text : options.button_text,
				button_text_top_padding: options.button_text_top_padding,
				button_text_left_padding: options.button_text_left_padding,

				button_action:options.button_action,

				// Flash Settings
				flash_url : options.flash_url,	// Relative to this file

				// Debug Settings
				debug: options.debug,

                //EventHandler
	            file_queued_handler : options.file_queued_handler,
	            file_queue_error_handler : options.file_queue_error_handler,
	            file_dialog_complete_handler : options.file_dialog_complete_handler,
	            upload_start_handler : options.upload_start_handler,
	            upload_progress_handler : options.upload_progress_handler,
	            upload_error_handler : options.upload_error_handler,
	            upload_success_handler : options.upload_success_handler,
	            upload_complete_handler : options.upload_complete_handler,
	            debug_handler : options.debug_handler,
	            show_message:options.show_message

        };

        
        function FileQueueErrorEventHandler(file,error_code,message){
	        try {
		        var errinfo = "";
		        if (errorCode === SWFUpload.errorCode_QUEUE_LIMIT_EXCEEDED) {
			        errinfo = "您一次上传太多文件";
		        }

		        if (errinfo == "") {
		            switch (errorCode) {
		            case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
			            errinfo="不能上传空文件";
			            break;
		            case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
			            errinfo = "上传文件过大";
			            break;
		            case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
		            case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
		            default:
			            errinfo =message;
			            break;
		            }
		        }
                if(errinfo!=""){
                    if(settings_object.show_message!=null){
                        settings_object.show_message(1,errinfo);
                    }
                }
	        } catch (ex) {
                if(settings_object.show_message!=null){
                    settings_object.show_message(1,ex);
                }
                swfu.debug(ex);
	        }
        };
       
        function UploadStartEventHandler(file) {
            return true;
        };

        function UploadProcessEventHandler(file, uploadedbytes, totalbytes) {
            try{
                var s = file.name + "(" + file.size + ")" + ":" + uploadedbytes + "/" + totalbytes;
                if(settings_object.show_message!=null){
                    settings_object.show_message(0,s);
                }
            }catch(ex){
                if(settings_object.show_message!=null){
                    settings_object.show_message(1,ex);
                }
                swfu.debug(ex);
            }
        };

        function UploadErrorEventHandler(file, error_code, message) {
            var errinfo="";
	        try {
		        switch (errorCode) {
		        case SWFUpload.UPLOAD_ERROR.HTTP_ERROR:
    	            errinfo="传输错误";
			        break;
		        case SWFUpload.UPLOAD_ERROR.MISSING_UPLOAD_URL:
    	            errinfo="找不到上传组件";
			        break;
		        case SWFUpload.UPLOAD_ERROR.IO_ERROR:
    	            errinfo="读写错误";
			        break;
		        case SWFUpload.UPLOAD_ERROR.SECURITY_ERROR:
    	            errinfo="安全错误";
			        break;
		        case SWFUpload.UPLOAD_ERROR.UPLOAD_FAILED:
    	            errinfo="上传失败";
			        break;
		        case SWFUpload.UPLOAD_ERROR.SPECIFIED_FILE_ID_NOT_FOUND:
    	            errinfo="找不到指定的文件ID";
			        break;
		        case SWFUpload.UPLOAD_ERROR.FILE_VALIDATION_FAILED:
    	            errinfo="文件校验失败";
			        break;
		        case SWFUpload.UPLOAD_ERROR.FILE_CANCELLED:
    	            errinfo="文件上传取消";
			        break;
		        case SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED:
		            errinfo="停止文件上传";
		        case SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED:
			        errinfo="上传数量超过限制";
			        break;
		        default:
			        errinfo=message;
			        break;
		        }
                var state = "";
                if (file.filestatus == SWFUpload.FILE_STATUS.QUEUED) {
                    state = "处于队列中";
                } else if (file.filestatus == SWFUpload.FILE_STATUS.IN_PROGRESS) {
                    state = "处于上传过程";
                } else if (file.filestatus == SWFUpload.FILE_STATUS.ERROR) {
                    state = "处于出错中";
                } else if (file.filestatus == SWFUpload.FILE_STATUS.SUCCESS) {
                    state = "处于完成状态";
                } else if (file.filestatus == SWFUpload.FILE_STATUS.CANCELLED) {
                    state = "处于取消状态";
                } else {
                    state = "处于未知状态";
                }
                var s = file.name + "(" + file.size + ")(" + state + ")发生错误" + "[" + error_code + "]:" + errinfo;
                if(errinfo!=""){
                    throw s;
                }
	        } catch (ex) {
                if(settings_object.show_message!=null){
                    settings_object.show_message(1,ex);
                }
		        swfu.debug(ex);
	        }
        };

        function UploadSuccessEventHandler(file, server_data) {
            try{
                if(settings_object.show_message!=null){
                    settings_object.show_message(0,server_data);
                }
            }catch(ex){
                if(settings_object.show_message!=null){
                    settings_object.show_message(1,ex);
                }
		        swfu.debug(ex);
            }
        };

        function UploadCompleteEventHandler(file) {
	        try {
		        /*  I want the next upload to continue automatically so I'll call startUpload here */
		        if (swfu.getStats().files_queued > 0) {
			        swfu.startUpload();
		        } else {
                    var s ="全部文件上传完成";
                    if(settings_object.show_message!=null){
                        settings_object.show_message(2,s);
                    }
		        }
	        } catch (ex) {
                if(settings_object.show_message!=null){
                    settings_object.show_message(1,ex);
                }
		        swfu.debug(ex);
	        }
        };

        function DebugEventHandler(message) {
            if(settings_object.debug==true&&settings_object.show_message!=null){
                settings_object.show_message(0,message);
            }
        };

        function FileDialogCompleteEventHandler(numFilesSelected, numFilesQueued) {
	        try {
		        if (numFilesQueued > 0) {
			        swfu.startUpload();
		        }
	        } catch (ex) {
                if(settings_object.show_message!=null){
                    settings_object.show_message(1,ex);
                }
		        swfu.debug(ex);
	        }
        }
        swfu = new SWFUpload(settings_object);
    }
    $.fn.SetSwfUploadParams=function(param){
        if(swfu==null){
            swfu = new SWFUpload(settings_object);
        }
        for(var p in param){
            swfu.addPostParam(p,param[p]);
        }
    }
})(jQuery);