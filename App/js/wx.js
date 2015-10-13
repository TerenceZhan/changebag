(function ($) {
                //获取请求地址中的参数
                $.getUrlParam = function (name) {
                    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                    var r = window.location.search.substr(1).match(reg);
                    if (r != null) return unescape(r[2]); return null;
                }
            })(jQuery);
       function g_formatnumber(fnumber, fdivide, fpoint, fround) {
        //fnumber 数字 fdivide 使用逗号分割 fpoint 小数位数 fround 是否四舍五入
        function g_formatnumber2(fnumber, fdivide, fpoint, fround){
            var fnum = fnumber + '';
            var revalue = "";

            if (fnum == null) {
                for (var i = 0; i < fpoint; i++) revalue += "0";
                return "0." + revalue;
            }
            fnum = fnum.replace(/^\s*|\s*$/g, '');
            if (fnum == "") {
                for (var i = 0; i < fpoint; i++) revalue += "0";
                return "0." + revalue;
            }

            fnum = fnum.replace(/,/g, "");

            if (fround) {
                var temp = "0.";
                for (var i = 0; i < fpoint; i++) temp += "0";
                temp += "5";

                fnum = Number(fnum) + Number(temp);
                fnum += '';
            }

            var arrayf = fnum.split(".");

            if (fdivide) {
                if (arrayf[0].length > 3) {
                    while (arrayf[0].length > 3) {
                        revalue = "," + arrayf[0].substring(arrayf[0].length - 3, arrayf[0].length) + revalue;
                        arrayf[0] = arrayf[0].substring(0, arrayf[0].length - 3);
                    }
                }
            }
            revalue = arrayf[0] + revalue;

            if (arrayf.length == 2 && fpoint != 0) {
                arrayf[1] = arrayf[1].substring(0, (arrayf[1].length <= fpoint) ? arrayf[1].length : fpoint);

                if (arrayf[1].length < fpoint)
                    for (var i = 0; i < fpoint - arrayf[1].length; i++) arrayf[1] += "0";
                revalue += "." + arrayf[1];
            } else if (arrayf.length == 1 && fpoint != 0) {
                revalue += ".";
                for (var i = 0; i < fpoint; i++) revalue += "0";
            }

            return revalue;
        }
        
        if(fnumber>=0){
            return g_formatnumber2(fnumber,fdivide,fpoint,fround);
        }else{
            return "-" + g_formatnumber2(Math.abs(fnumber),fdivide,fpoint,fround);
        }
    }
    function g_price2tenthousand(v){
        var p=parseFloat(v);
        var s = "";
        if(p<10000)
        {
           s=p+"元";
           return s;
        }
        else
        {
        return g_formatnumber(p/10000,false,2,true) + "万";
        }
        
    } 











var CBAComLib={
    dom:{
        back:".title_top>a.back"
    },
    init:function(){},
    redirect:{
        back:function(){window.history.back();},//返回
        index:function(){window.location="Index.html";},//首页
        insideNavigate:function(){window.location="InsideNavigate.html";}//内页导航
    },
    event:{
        back:function(){}//(attr:xtlt) 1:首页  2：内页导航
    }
}
CBAComLib.event.back=function(){
    var linktype=CBAComLib.dom.back.attr("xtlt");
    switch(linktype){
        case '首页':
            CBAComLib.redirect.index();
        break;
        case '内页':
            CBAComLib.redirect.insideNavigate();
        break;
        default:
            CBAComLib.redirect.back();
        break;
    }
    return false;
}
CBAComLib.init=function(){
    CBAComLib.dom.back=$(CBAComLib.dom.back);
    
    CBAComLib.dom.back.click(function(){
        return CBAComLib.event.back();
    });
}
$(function(){
    CBAComLib.init();
})