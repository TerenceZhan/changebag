$(document).ready(function(){
	jQuery(".mm_form tr").find("td:first").addClass("current");
	jQuery(".qrw_box .rw_menu span").each(function(index){
		jQuery(this).mouseover(
			function(){
				jQuery(".qrw_box .rw_menu span").removeClass("current");
				jQuery(this).addClass("current");
				jQuery(".qrw_box .rw_main .rw_con").hide();
				jQuery(".qrw_box .rw_main .rw_con:eq(" + index + ")").show();
		})
	});
	jQuery(".zhushi_a").mouseover(
		function(){
			jQuery(".qrw_pa").show();
			jQuery(".arrow_a").show();
	});
	jQuery(".zhushi_a").mouseleave(
		function(){
			jQuery(".qrw_pa").hide();
			jQuery(".arrow_a").hide();
	});
	jQuery(".zhushi_b").mouseover(
	  function(){
		  jQuery(".qrw_pb").show();
		  jQuery(".arrow_b").show();
	});
	jQuery(".zhushi_b").mouseleave(
	  function(){
		  jQuery(".qrw_pb").hide();
		  jQuery(".arrow_b").hide();
	});
	jQuery(".mask_list2 dl").each(function(index){
	   jQuery(this).click(
		  function(){
			  jQuery(this).toggleClass("current");
			  jQuery(this).find(".qrw_form").toggle();
			  jQuery(this).find(".slidedown").toggleClass("current");
	  })
	});	
	$(".txmxx").click(function(){$(".fc_yjx").add(".layblack").hide()})
	$(".tx_but").click(function(){$(".fc_yjx").add(".layblack").show()})
	
	$("body").append('<div class="mb"><div class="load"><div class="loader"></div></div></div>')
	
})
//var isload = function(){$(".mb").add(".load").show()}
//var unload = function(){$(".mb").add(".load").hide()}

var openxt_WYWY={//开放通达强力外援：王毅--js命名空间
	onloadLayer:true
};

openxt_WYWY.fnLayerLoad=function(){
	$(".mb").show();
}
openxt_WYWY.fnLayerUnload=function(){
	$(".mb").hide();
}

$(function(){
	if(openxt_WYWY.onloadLayer){
		openxt_WYWY.fnLayerLoad();
	}else{
		openxt_WYWY.fnLayerUnload();
	}
})

//$(window).load(function(){
//	openxt_WYWY.fnLayerUnload();
//})

//$(function(){
//	openxt_WYWY.fnIsload();
//})