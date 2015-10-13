//JQuery插件
//edit by chenshuai 2013-3-21
//version 1.3 2014-01-08
//version 1.4 2014-03-01
//version 1.5 2014-04-22
//version 1.6 2014-05-22
//version 1.7 2014-07-03
//version 1.8 2015-03-04
//version 1.9 2015-03-24
//vserion 1.10 2015-07-28
//vserion 1.11 2015-07-31
//系统补充
Array.prototype.contains=function(element,compareFunction){
    if(compareFunction!=null&&compareFunction!=undefined&&(typeof(compareFunction)=="function"||typeof(compareFunction)=="Function")){
        for(var i=0;i<this.length;i++){
            if(compareFunction(this[i],element)==true) return true;
        }
    }else{
        for(var i=0;i<this.length;i++){
            if(this[i]==element) return true;
        }
    }
    return false;
}
Array.prototype.indexOf=function(element,compareFunction){
    if(compareFunction!=null&&compareFunction!=undefined&&(typeof(compareFunction)=="function"||typeof(compareFunction)=="Function")){
        for(var i=0;i<this.length;i++){
            if(compareFunction(this[i],element)==true) return i;
        }
    }else{
        for(var i=0;i<this.length;i++){
            if(this[i]==element) return i;
        }
    }
    return -1;
}
//公共方法
jQuery.KolaPlugIn={
    //系统修正补充
    FixDebug:function(){
        var browser=$.KolaPlugIn.GetBrowserInfo();
        if(browser.msie){
            $("textarea[maxlength]").keyup(function(){
                var len=$(this).attr("maxlength");
                var r=$.KolaPlugIn.ValueChecker(len);
                if(!r.IsInt) return;
                if(len<=0) return;
                if($(this).val().length>len){
                    $(this).val($(this).val().substr(0,len));
                }
            });
        }
    },
    //浏览器相关
    GetBrowserInfo:function(){
        var userAgent = navigator.userAgent.toLowerCase();

        // Figure out what browser is being used
        var obj = {
	        version: (userAgent.match( /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [0,'0'])[1],
	        safari: /webkit/.test( userAgent ),
	        opera: /opera/.test( userAgent ),
	        msie: /msie/.test( userAgent ) && !/opera/.test( userAgent ),
	        mozilla: /mozilla/.test( userAgent ) && !/(compatible|webkit)/.test( userAgent ),
	        chrome:/chrome/.test( userAgent ),
	        firefox:/mozilla/.test( userAgent )&&/firefox/.test(userAgent),
	        ie6:false
        };
        if(obj.msie){
            obj.ie6=!window.XMLHttpRequest;
        }
        
        return obj;
    },
    GetUrlQuery:function(name) {
        var s = document.location.href;
        if (s == null) s = "";
        s = this.Trim(s);
        if (s.length <= 1) return s;
        if ((s.substr(s.length - 1, 1)) == "#") {
            s = s.substr(0, s.length - 1);
        }
        var reg = new RegExp("(^|&|\\?)" + name + "=([^&]*)(&|$)"), r;
        if ((r = s.match(reg)) != null) return unescape(r[2]);
        return null;
    },
    GetDomain:function(url) {
        if (url == null) return "";
        url = this.Trim(url);
        if (url.length == 0) return "";
        url = url.toLowerCase();
        var pos1 = url.indexOf("://");
        if (pos1 >= 0) {
            url = url.substring(pos1 + 3);
        }
        var pos2 = url.indexOf("/");
        if (pos2 > 0) {
            url = url.substring(0, pos2);
        }
        var pos3 = url.indexOf(":");
        if (pos3 > 0) {
            url = url.substring(0, pos3);
        }
        url = this.Trim(url);
        return url;
    },
    SetCookie:function(name, value, day, hour, minute, second) {
        if (day == null || typeof (day) == "undefined") day = 0;
        if (hour == null || typeof (hour) == "undefined") hour = 0;
        if (minute == null || typeof (minute) == "undefined") minute = 0;
        if (second == null || typeof (second) == "undefined") second = 0;
        if ((day + hour + minute + second) == 0) day = 1;
        var exp = new Date();
        exp.setTime(exp.getTime() + (day * 24 * 60 * 60 * 1000) + (hour * 60 * 60 * 1000) + (minute * 60 * 1000) + (second * 1000));
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
    },
    GetCookie:function(name) {
        var start = document.cookie.indexOf(name + "=");
        var len = start + name.length + 1;
        if ((!start) && (name != document.cookie.substring(0, name.length))) {
            return null;
        }
        if (start == -1) return null;
        var end = document.cookie.indexOf(';', len);
        if (end == -1) end = document.cookie.length;
        return unescape(document.cookie.substring(len, end));
    },
    DelCookie:function(name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = f_getcookie(name);
        if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    },
    SetHomePage:function(url) {
        if (document.all) {
            document.body.style.behavior = 'url(#default#homepage)';
            document.body.setHomePage(url);
        }
        else if (window.sidebar) {
            if (window.netscape) {
                try {
                    netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
                }
                catch (e) {
                    alert("该操作被浏览器拒绝，如果想启用该功能，请在地址栏内输入 about:config,然后将项 signed.applets.codebase_principal_support 值该为true");
                }
            }
            var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
            prefs.setCharPref('browser.startup.homepage', url);
        }
    },
    FilterHtml:function(s){
        var r=$.KolaPlugIn.ValueChecker(s);
        if(!r.IsString) return "";
        s = s.replace(/<\s*script[^>]*>(.|[\r\n])*?<\s*\/script[^>]*>/gi, '');        s = s.replace(/<\s*style[^>]*>(.|[\r\n])*?<\s*\/style[^>]*>/gi, '');        s = s.replace(/<\/?[^>]+>/g, '');        s = s.replace(/\&[a-z]+;/gi, '');        s = s.replace(/\s/gi, '');
        return s;
    },
    //位置尺寸
    GetWindowInfo:function(){
        var browser=this.GetBrowserInfo();

        var tWidth=document.body.scrollWidth;
        var tHeight=document.body.scrollHeight;
        var width=document.body.clientWidth;
        var height=document.body.clientHeight;
        
        if(browser.msie){
            if(browser.ie6){
                width=document.documentElement.clientWidth;
                height=document.documentElement.clientHeight;
                tWidth=document.documentElement.scrollWidth;
                tHeight=document.documentElement.scrollHeight;
            }else{
                width=document.documentElement.offsetWidth;
                height=document.documentElement.offsetHeight;
                tWidth=document.documentElement.scrollWidth;
                tHeight=document.documentElement.scrollHeight;
            }
        }else if(browser.chrome){
            width=document.documentElement.clientWidth;
            height=document.documentElement.clientHeight;
            tWidth=document.documentElement.scrollWidth;
            tHeight=document.documentElement.scrollHeight;
        }else if(browser.firefox){
            width=document.documentElement.clientWidth;
            height=document.documentElement.clientHeight;
            tWidth=document.documentElement.scrollWidth;
            tHeight=document.documentElement.scrollHeight;
        }
        
        var left=document.documentElement.scrollLeft || document.body.scrollLeft;
        var top=document.documentElement.scrollTop || document.body.scrollTop;
        
        var obj={
            Left:left,
            Top:top,
            Width:width,
            Height:height,
            TotalWidth:tWidth,
            TotalHeight:tHeight
        };
        return obj;
    },
    GetMaxZIndex:function(){
        var zidx=0;
        $("*").each(function(){
            var z=parseInt($(this).css("zIndex"));
            if(z==NaN) z=0;
            if(z>zidx) zidx=z;
        });
        return zidx;
    },
    GetRectScope:function(items){
        var r=$.KolaPlugIn.ValueChecker(items);
        if(r.IsArray){
        }else if(r.IsString){
            items=items.split(",");
        }else{
            return null;
        }
        for(var i=items.lenght - 1;i>=0;i--){
            if($("#"+items[i]).length==0) items.splice(i,1);
        }
        if(items.length==0) return null;
        var item=$("#"+items[0]);
        var s={LT:{x:item.offset().left,y:item.offset().top},RT:{x:(item.offset().left + item.width()),y:item.offset().top},LB:{x:item.offset().left,y:(item.offset().top+item.height())},RB:{x:(item.offset().left+item.width()),y:(item.offset().top + item.height())}};
        for(var i=1;i<items.length ;i++){
            item=$("#"+items[i]);
            var d={LT:{x:item.offset().left,y:item.offset().top},RT:{x:(item.offset().left + item.width()),y:item.offset().top},LB:{x:item.offset().left,y:(item.offset().top+item.height())},RB:{x:(item.offset().left+item.width()),y:(item.offset().top + item.height())}};
            if(s.LT.x<d.LT.x) s.LT.x=d.LT.x;
            if(s.LT.y<d.LT.y) s.LT.y=d.LT.y;
            if(s.LB.x<d.LB.x) s.LB.x=d.LB.x;
            if(s.LB.y<d.LB.y) s.LB.y=d.LB.y;
            if(s.RT.x<d.RT.x) s.RT.x=d.RT.x;
            if(s.RT.y<d.RT.y) s.RT.y=d.RT.y;
            if(s.RB.x<d.RB.x) s.RB.x=d.RB.x;
            if(s.RB.y<d.RB.y) s.RB.y=d.RB.y;
        }
        return s;
    },

    //字符数字处理
    ValueChecker:function(o){
       var obj={
            IsNull:(!o&&(typeof(o)!="undefined"&&o!=undefined)&&o!=0),
            IsUndefined:(typeof(o)=="undefined"||o==undefined),
            IsIllegalNumber:(o!=undefined && isNaN(o)),
            IsInt:o!=undefined && /^(-)*\d+$/.test(o),
            IsUInt:o!=undefined && /^\d+$/.test(o)&&(o>0),
            IsFloat:o!=undefined && /(^(-)*\d+\.\d*$)|(^(-)*\d+$)/.test(o),
            IsMoney:o!=undefined && /(^(-)*\d+\.\d{1}$)|(^(-)*\d+\.\d{2}$)|(^(-)*\d+$)/.test(o),
            IsString:o!=undefined && (typeof(o)=="string"),
            IsEmpty:o!=undefined && (typeof(o)=="string")&&($.KolaPlugIn.Trim(o).length==0),
            IsHex16:o!=undefined && /^[0-9a-fA-F]{1,}$/.test(o),
            IsBool:o!=undefined && (typeof(o)=="boolean"),
            IsDate:o!=undefined && (o instanceof(Date)),
            IsArray:o!=undefined && (o instanceof(Array)),
            IsObject:o!=undefined && (typeof(o)=="object"),
            IsFunction:o!=undefined && (typeof(o)=="function"||typeof(o)=="Function"),
            IsName:o!=undefined && /^[\u4e00-\u9fa5_a-zA-Z0-9]{1,16}$/.test(o),
            //IsAcct:/^([\u4e00-\u9fa5][\u4e00-\u9fa5_a-zA-Z0-9]){2,16}$/.test(o)||/^([A-Za-z][\u4e00-\u9fa5_a-zA-Z0-9]){2,16}$/.test(o)||/^([0-9][\u4e00-\u9fa5_a-zA-Z0-9]){2,16}$/.test(o),
            IsAcct:o!=undefined && /^([\u4e00-\u9fa5_a-zA-Z0-9]){2,16}$/.test(o),
            IsPwd:o!=undefined && /^[A-Za-z0-9]{2,16}$/.test(o),
            IsVCode:o!=undefined && /^\d+$/.test(o),
            IsSampleType:false,
            IsNumber:false,
            IsPositive:o!=undefined && /(^\d+\.\d+$)|(^\d+$)/.test(o)&&o>0,
            IsMobile:o!=undefined && /^1[1-9]{1}[0-9]{9}$/.test(o),
            IsPhone:o!=undefined && /^[0-9]{3,4}-[0-9]{7,8}$/.test(o)||/^[0-9]{7,8}$/.test(o),
            IsGuid:o!=undefined && /^[A-Za-z0-9]{8}(-[A-Za-z0-9]{4}){3}-[A-Za-z0-9]{12}$/.test(o),
            IsDate:o!=undefined && /^\d{4}\-(0?[1-9]|1[0-2])\-(0?[1-9]|[12][0-9]|3[01])$/.test(o),
            IsDateTime:o!=undefined && /^\d{4}\-(0?[1-9]|1[0-2])\-(0?[1-9]|[12][0-9]|3[01])\s+(0?[0-9]|1[0-9]|2[0-3]):(0?[0-9]|[1-5][0-9]):(0?[0-9]|[1-5][0-9])$/.test(o),
            IsTime:o!=undefined && /^(0?[0-9]|1[0-9]|2[0-3]):(0?[0-9]|[1-5][0-9]):(0?[0-9]|[1-5][0-9])$/.test(o)
        };
        obj.IsNumber=o!=undefined && (obj.IsInt||obj.IsFloat);
        obj.IsSampleType=o!=undefined && (obj.IsNull||obj.IsUndefined||obj.IsNumber||obj.IsString||obj.IsBool);
        return obj;
    },
    GetRandomByLen:function(ilen) {
        return Math.round(Math.random() * Math.pow(10, ilen));
    },
    GetRandomByRange:function(imin, imax) {
        return Math.floor(Math.random() * (1 + imax - imin) + imin);
    },
    Round:function(v, len) {
        return Math.round(v * Math.pow(10, len)) / Math.pow(10, len);
    },
    ReplaceString:function(a, s, r) {
        return a.replace(new RegExp(s, "gm"), r);
    },
    ReplaceString2:function(a, reg, r) {
        return a.replace(reg, r);
    },
    ReplaceSingleQuot : function(a) {
        return $.KolaPlugIn.ReplaceString(a,"'","\"");
    },
    FormatCode:function(v,cnt) {
        var r=$.KolaPlugIn.ValueChecker(v);
        if (r.IsNull||r.IsUndefined) return "";
        cnt=parseInt(cnt);
        if(cnt<=0) cnt=4;
        var s="";
        while(v.length>0){
            if(v.length>cnt){
                if(s==""){
                    s=v.substring(0,cnt);
                }else{
                    s+="-"+v.substring(0,cnt);
                }
                v=v.substring(cnt);
            }else{
                if(s==""){
                    s=v;
                }else{
                    s+="-"+v;
                }
                v="";
            }
        }
        return s;
    },
    UnFormatNumber:function(snum) {
        var r=$.KolaPlugIn.ValueChecker(snum);
        if (r.IsNull||r.IsUndefined) return "";
        return $.KolaPlugIn.ReplaceString($.KolaPlugIn.ReplaceString(snum, ",", ""), "#", "");
    },
    FormatNumber:function(fnumber, fdivide, fpoint, fround) {
        //fnumber 数字 fdivide 使用逗号分割 fpoint 小数位数 fround 是否四舍五入
        function f_formatnumber2(fnumber, fdivide, fpoint, fround){
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
            return f_formatnumber2(fnumber,fdivide,fpoint,fround);
        }else{
            return "-" + f_formatnumber2(Math.abs(fnumber),fdivide,fpoint,fround);
        }
    },
    LPadInt:function(d, len) {
        var a = d.toString();
        if (a.length >= len) return a;
        var b = a;
        for (var i = 0; i < (len - a.length); i++) b = "0" + b;
        return b;
    },
    LTrim:function(s) {
        return s.replace(/^\s*/, "");
    },
    RTrim:function(s) {
        return s.replace(/\s*$/, "");
    },
    Trim:function(s) {
        return $.KolaPlugIn.RTrim($.KolaPlugIn.LTrim(s));
    },
    StartWith:function(s1,s2){
        var r1=this.ValueChecker(s1);
        if(r1.IsNull||r1.IsUndefined) return false;
        var r2=this.ValueChecker(s2);
        if(r2.IsNull||r1.IsUndefined) return false;
        if(r1.IsEmpty==false&&r2.IsEmpty) return false;
        if(r1.IsEmpty&&r2.IsEmpty==false) return false;
        if(r1.IsEmpty&&r2.IsEmpty) return true;
        if(s2.length>s1.length) return false;
        if(s1.substr(0,s2.length)==s2)
          return true;
        else
          return false;
    },
    EndWith:function(s1,s2){
        var r1=this.ValueChecker(s1);
        if(r1.IsNull||r1.IsUndefined) return false;
        var r2=this.ValueChecker(s2);
        if(r2.IsNull||r1.IsUndefined) return false;
        if(r1.IsEmpty==false&&r2.IsEmpty) return false;
        if(r1.IsEmpty&&r2.IsEmpty==false) return false;
        if(r1.IsEmpty&&r2.IsEmpty) return true;
        if(s2.length>s1.length) return false;
        if(s1.substring(s1.length - s2.length)==s2)
          return true;
        else
          return false;
    },
    Hex16To10:function(v){
        var r=$.KolaPlugIn.ValueChecker(v);
        if(r.IsNull||r.IsUndefined) return 0;
        return parseInt("0x"+v);
    },
    Hex10To16:function(v){
        var r=$.KolaPlugIn.ValueChecker(v);
        if(!r.IsUInt) return "00";
        v=parseInt(v);
        return v.toString(16).toUpperCase();
    },
    //日期处理
    CSDate2Date:function(d){
        if (d == null) return "";
        d=eval('new '+eval(d).source);
        return d;
    },
    FormatCSDate:function(d){
        if (d == null) return "";
        d=eval('new '+eval(d).source);
        if (d <= new Date(1900,0,1) || d >= new Date(3000,0,1)) return "";
        return d.getFullYear() + "-" + $.KolaPlugIn.LPadInt((d.getMonth() + 1),2) + "-" + $.KolaPlugIn.LPadInt(d.getDate(),2);
    },
    FormatCSDateTime:function(d){
        if (d == null) return "";
        d=eval('new '+eval(d).source);
        if (d <= new Date(1900,0,1) || d >= new Date(3000,0,1)) return "";
        return d.getFullYear() + "-" + $.KolaPlugIn.LPadInt((d.getMonth() + 1),2) + "-" + $.KolaPlugIn.LPadInt(d.getDate(),2) + " " + $.KolaPlugIn.LPadInt(d.getHours(),2) + ":" + $.KolaPlugIn.LPadInt(d.getMinutes(),2) + ":" +$.KolaPlugIn.LPadInt(d.getSeconds(),2);
    },
    FormatDate:function(d){
        if (d == null) return "";
        if (d <= new Date(1900,0,1) || d >= new Date(3000,0,1)) return "";
        return d.getFullYear() + "-" + $.KolaPlugIn.LPadInt((d.getMonth() + 1),2) + "-" + $.KolaPlugIn.LPadInt(d.getDate(),2);
    },
    FormatDateTime:function(d){
        if (d == null) return "";
        if (d <= new Date(1900,0,1) || d >= new Date(3000,0,1)) return "";
        return d.getFullYear() + "-" + $.KolaPlugIn.LPadInt((d.getMonth() + 1),2) + "-" + $.KolaPlugIn.LPadInt(d.getDate(),2) + " " + $.KolaPlugIn.LPadInt(d.getHours(),2) + ":" + $.KolaPlugIn.LPadInt(d.getMinutes(),2) + ":" + $.KolaPlugIn.LPadInt(d.getSeconds(),2);
    },
    GetFirstDay:function(sType,dtDate){
        var dtTmp = new Date(dtDate);
        if (isNaN(dtTmp)) dtTmp = new Date();
        if(sType=="y"){
            return new Date(dtTmp.getFullYear(),0,1);
        }else if(sType=="m"){
            return new Date(dtTmp.getFullYear(),dtTmp.getMonth(),1);
        }else{
            var d=0;
            if(dtTmp.getDay()>0){
                d=dtTmp.getDay();
            }
            if(d==0) d=7;
            d--;
            dtTmp=$.KolaPlugIn.AddDate("d",-d,dtTmp);
            return dtTmp;
        }
    },
    GetEndDay:function(sType,dtDate){
        var dtTmp = new Date(dtDate);
        if (isNaN(dtTmp)) dtTmp = new Date();
        if(sType=="y"){
            var d= new Date(dtTmp.getFullYear() + 1,0,1);
            return $.KolaPlugIn.AddDate("d",-1,d);
        }else if(sType=="m"){
            var d=new Date(dtTmp.getFullYear(),dtTmp.getMonth(),1);
            d=$.KolaPlugIn.AddDate("m",1,d);
            return $.KolaPlugIn.AddDate("d",-1,d);
        }else{
            var d=0;
            if(dtTmp.getDay()>0){
                d=dtTmp.getDay();
            }
            if(d==0) d=7;
            dtTmp=$.KolaPlugIn.AddDate("d",7 - d,dtTmp);
            return dtTmp;
        }
    },
    AddDate:function(sType, iCnt, dtDate) {
        var dtTmp = new Date(dtDate);
        if (isNaN(dtTmp)) dtTmp = new Date();
        switch (sType) {
            case "s": return new Date(Date.parse(dtTmp) + (1000 * iCnt));
            case "n": return new Date(Date.parse(dtTmp) + (60000 * iCnt));
            case "h": return new Date(Date.parse(dtTmp) + (3600000 * iCnt));
            case "d": return new Date(Date.parse(dtTmp) + (86400000 * iCnt));
            case "w": return new Date(Date.parse(dtTmp) + ((86400000 * 7) * iCnt));
            case "m": return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + iCnt, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
            case "y": return new Date((dtTmp.getFullYear() + iCnt), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
        }
    },
    IsSamePeriod:function(sType,dt1,dt2){
        var d1=new Date(dt1);
        if(isNaN(d1)) return false;
        var d2=new Date(dt2);
        if(isNaN(d2)) return false;
        if(sType=="y"){
            return d1.getFullYear()==d2.getFullYear();
        }else if(sType=="m"){
            return (d1.getFullYear()==d2.getFullYear())&&(d1.getMonth()==d2.getMonth());
        }else if(sType=="w"){
            return (d1.getFullYear()==d2.getFullYear())&&($.KolaPlugIn.GetYearWeeks(d1)==$.KolaPlugIn.GetYearWeeks(d2));
        }else{
            return (d1.getFullYear()==d2.getFullYear())&&(d1.getMonth()==d2.getMonth())&&(d1.getDate()==d2.getDate());
        }
    },
    TimeDiff:function(sdate/*yyyy/MM/dd HH:mm:ss*/) {
        var d = new Date(sdate);
        return $.KolaPlugIn.TimeDiff1(d);
    },
    TimeDiff1:function(ed) {
        return $.KolaPlugIn.TimeDiff2(new Date(),ed);
    },
    TimeDiff2:function(sd,ed) {
        var t = $.KolaPlugIn.TimeDiff3(sd,ed);
        return t.hour + "小时" + t.minute + "分钟" + t.second + "秒";
    },
    TimeDiff3:function(sd,ed) {
        var t = (ed - sd) / 1000;
        if(t>0){
            return {hour:Math.floor(t / 3600),minute:Math.floor((t % 3600) / 60),second:Math.floor((t % 3600) % 60)};
        }else{
            return {hour:0,minute:0,second:0};
        }
    },
    GetDate:function(dt){
        var d=new Date(dt);
        return new Date(d.getFullYear(),d.getMonth(),d.getDate());
    },
    GetDayOfWeek:function(dt){
        var d=new Date(dt);
        return d.getDay();
    },
    GetMonthDays:function(dt){
        var d=new Date(dt);
        d=$.KolaPlugIn.GetDate(d);
        var sd=new Date(d.getFullYear(),d.getMonth(),1);
        var ed=$.KolaPlugIn.AddDate("m",1,sd);
        ed=$.KolaPlugIn.AddDate("m",-1,ed);
        return ed.getDate();
    },
    GetMonthWeeks:function(dt){
        var d=new Date(dt);
        d=$.KolaPlugIn.GetDate(d);
        var mfd=$.KolaPlugIn.GetFirstDay("m",d);
        var wmfd=$.KolaPlugIn.GetFirstDay("w",mfd);
        return Math.floor((d - wmfd)/(86400000*7)) + 1;
    },
    GetYearWeeks:function(dt){
        var d=new Date(dt);
        d=$.KolaPlugIn.GetDate(d);
        var yfd=$.KolaPlugIn.GetFirstDay("y",d);
        var wyfd=$.KolaPlugIn.GetFirstDay("w",yfd);
        return Math.floor((d - wyfd)/(86400000*7)) + 1;
    },
    //检验校验
    CheckEMail:function(strEmail) {
        var emailReg = /^[_a-zA-Z.0-9]+@([_a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,3}$/;
        return emailReg.test(strEmail);
    },
    CheckIDCard:function(num){
        num = num.toUpperCase();
        //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。   
        if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
            return false;
        }
        //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。 
        //下面分别分析出生日期和校验位 
        var len, re;
        len = num.length;
        if (len == 15) {
            re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
            var arrSplit = num.match(re);

            //检查生日日期是否正确 
            var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
            var bGoodDay;
            bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
            if (!bGoodDay) {
                return false;
            }
            else {
                //将15位身份证转成18位 
                //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。 
                var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
                var nTemp = 0, i;
                num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
                for (i = 0; i < 17; i++) {
                    nTemp += num.substr(i, 1) * arrInt[i];
                }
                num += arrCh[nTemp % 11];
                return num;
            }
        }
        if (len == 18) {
            re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
            var arrSplit = num.match(re);

            //检查生日日期是否正确 
            var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
            var bGoodDay;
            bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
            if (!bGoodDay) {
                return false;
            }
            else {
                //检验18位身份证的校验码是否正确。 
                //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。 
                var valnum;
                var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
                var nTemp = 0, i;
                for (i = 0; i < 17; i++) {
                    nTemp += num.substr(i, 1) * arrInt[i];
                }
                valnum = arrCh[nTemp % 11];
                if (valnum != num.substr(17, 1)) {
                    return false;
                }
                return num;
            }
        }
        return false;
    },
    CheckPhone:function(val) {
        var patrn = /^[0-9]{3,4}-[0-9]+$/;
        if (patrn.test(val) == false) {
            patrn = /^[0-9]+$/;
            return patrn.test(val);
        }
        return true;
    },
    CheckMobile:function(val) {
        if (val.length != 11) return false;
        var patrn = /^1[1-9]{1}[0-9]{9}$/;
        return patrn.test(val);
    },
    CheckName:function(val) {
        if (val.length < 1) {
            return false;
        }
        if (val.length > 16) {
            return false;
        }
        var patrn = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
        if (patrn.test(val) == false) {
            return false;
        }
        return true;
    },
    CheckAcct:function(val) {
        if (val.length < 2) {
            return false;
        }
        if (val.length > 16) {
            return false;
        }
        var patrn = /^[\u4e00-\u9fa5][\u4e00-\u9fa5_a-zA-Z0-9]+$/;
        var patrn1 = /^[A-Za-z][\u4e00-\u9fa5_a-zA-Z0-9]+$/;
        var patrn2 = /^[0-9][\u4e00-\u9fa5_a-zA-Z0-9]+$/;
        if (patrn.test(val) == false) {
            if (patrn1.test(val) == false) {
                if (patrn2.test(val) == false) {
                    return false;
                } else {
                    return true;
                }

            } else {
                return true;
            }
        } else {
            return true;
        }
    },
    CheckPwd:function(val) {
        if (val.length < 6) {
            return false;
        }
        if (val.length > 16) {
            return false;
        }
        var patrn = /^[A-Za-z0-9]+$/;

        if (patrn.test(val) == false) {
            return false;
        }
        return true;
    },
    CheckVCode:function(m) {
        var patrn = /^\d+$/;
        return patrn.test(m);
    },
    CheckPositive:function(m) {
        var patrn = /(^\d+\.\d+$)|(^\d+$)/;
        if(patrn.test(m)){
            return m>0;
        }else{
            return false;
        }
    },
    CheckMoney:function(m) {
        var patrn = /(^\d+\.\d{1}$)|(^\d+\.\d{2}$)|(^\d+$)/;
        return patrn.test(m);
    },
    CheckInt:function(m) {
        var patrn = /^\d+$/;
        return patrn.test(m);
    },
    CheckUrl:function(url) {
        if (url == null) {
            return false;
        }
        var urlpatern1 = /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i;
        if (!urlpatern1.test(url)) {
            return false;
        }
        var s = "0";
        var t = 0;
        var re = new RegExp(":\\d+", "ig");
        while ((arr = re.exec(url)) != null) {
            s = str.substring(RegExp.index + 1, RegExp.lastIndex);
            if (s.substring(0, 1) == "0") {
                return false;
            }
            t = parseInt(s);
            if (t < 1 || t > 65535) {
                return false;
            }
        }
        return true;
    },
    CheckHtmlObjectType:function(objName){
        var r=$.KolaPlugIn.ValueChecker(objName);
        if(r.IsNull||r.IsUndefined) return undefined;
        if($("#"+objName).length==0) return undefined;
        var tagName=$("#"+objName)[0].tagName;
        if(tagName=="INPUT"){
            var type=$("#"+objName).attr("type");
            var rt=$.KolaPlugIn.ValueChecker(type);
            if(rt.IsNull||rt.IsUndefined) return type;
            return type.toUpperCase();
        }
        return tagName;
    },
    //界面控制
    Enter2Tab:function(ctlNames){
        var ctls=ctlNames.split(",");
        if(ctls.length<2) return;
        for(var i=0;i<ctls.length;i++){
            var t=$("#"+ctls[i])[0].tagName;
            if(t!="INPUT"&&t!="A"&&t!="DIV"&&t!="SELECT"&&t!="BUTTON"){
                alert(ctls[i]+"(类型"+t+")"+"不能进行Enter转Tab操作");
                return;
            }
        }
        var s="";
        var s1="";
        for(var i=0;i<ctls.length;i++){
            if(i<(ctls.length - 1)){
                if(s==""){
                    s="#"+ctls[i];
                }else{
                    s+=",#"+ctls[i];
                }
            }
            if($("#"+ctls[i])[0].tagName!="A"&&$("#"+ctls[i])[0].tagName!="DIV"&&$("#"+ctls[i])[0].tagName!="BUTTON"){
                if(s1==""){
                    s1="#"+ctls[i];
                }else{
                    s1+=",#"+ctls[i];
                }
            }
        }
        var bLast=false;
        $(s1).focusin(function(){
            bLast=false;
        });
        $(s).keypress(function(evt){
            var kcode=false;
            if($(this)[0].tagName=="TEXTAREA"){
                kcode=(evt.ctrlKey&&evt.keyCode==13);
            }else{
                kcode=(evt.keyCode==13);
            }
            if(kcode){
                var k=0;
                var b=false;
                for(var j=0;j<ctls.length;j++){
                    if(ctls[j]==$(this).attr("id")){
                        k=j;
                        b=true;
                        break;
                    }
                }
                if(b){
                    k++;
                    if(k<ctls.length){
                        $("#"+ctls[k])[0].focus();
                        if(k==(ctls.length - 1)){
                            var t1=$("#"+ctls[k])[0].tagName;
                            if(t1=="A"||t1=="DIV"||t1=="BUTTON"){
                                if(bLast==false){
                                    $("#"+ctls[k]).click();
                                    bLast=true;
                                }
                            }
                        }
                    }
                }
            }
        });
        
    },
    Tab2Enter:function(evt,thisId,nextId){
        var kcode=false;
        if($("#"+thisId)[0].tagName=="TEXTAREA"){
            kcode=(evt.ctrlKey&&evt.keyCode==13);
        }else{
            kcode=(evt.keyCode==13);
        }
        if(kcode){
            if($("#"+nextId).length>0){
                var tagName=$.KolaPlugIn.CheckHtmlObjectType(nextId);
                $("#"+nextId)[0].focus();
                if(tagName=="TEXT"||tagName=="PASSWORD"){
                    $("#"+nextId).select();
                }else if(tagName=="A"||tagName=="DIV"||tagName=="BUTTON"){
                    $("#"+nextId).click();
                }else if(tagName=="TEXTAREA"){
                    var obj=$("#"+nextId)[0];
                    var len=obj.value.length;
                    if(obj.setSelectionRange){
                        obj.setSelectionRange(len,len);
                    }else if (obj.createTextRange) {
                        var range = obj.createTextRange();
                        range.collapse(true);
                        range.moveStart('character', len);
                        range.moveEnd('character', len);
                        range.select();
                    }
                }
            }
        }
    },
    GetMousePosition:function(evt){
        if(evt.pageX||evt.pageY){
            return {x:evt.pageX,y:evt.pageY};
        }else{
            var winfo=$.KolaPlugIn.GetWindowInfo();
            return {
                x:evt.clientX+winfo.Left- winfo.ClientLeft,
                y:evt.clientY+winfo.Top - winfo.ClientTop
            };
        }
    },
    //颜色控制
    ColorNegated:function(color){
        var r=$.KolaPlugIn.ValueChecker(color);
        if(!r.IsString) return "#000000";
        color=$.KolaPlugIn.Trim(color).toLowerCase();
        if(color.length==0) return "#000000";
        color=color.substr(1);
        r=$.KolaPlugIn.ValueChecker(color);
        if(!r.IsHex16) return "#000000";
        if(color.length<3){
            return "#000000";
        }else if(color.length<6){
            color=color[0]+color[0]+color[1]+color[1]+color[2]+color[2];
        }else if(color.length>=6){
            color=color.substr(0,6);
        }
        var ds=[];
        ds.push(color.substr(0,2));
        ds.push(color.substr(2,2));
        ds.push(color.substr(4,2));
        var s="";
        for(var i=0;i<ds.length;i++){
            s+=$.KolaPlugIn.Hex10To16(Math.abs(255 - $.KolaPlugIn.Hex16To10(ds[i])));
        }
        
        return "#"+s;
    },
    JsRgb2Hex16:function(rgb){
        var regexp = /^rgb\(([0-9]{0,3})\,\s([0-9]{0,3})\,\s([0-9]{0,3})\)/g;
        var re = rgb.replace(regexp, "$1 $2 $3").split(" ");
        var s = "#"; 
        for (var i = 0; i < 3; i++) {  
            s+=$.KolaPlugIn.Hex10To16(re[i]);
        }  
        return s; 
   },
    RgbToHex16:function(v){
        return "#"+$.KolaPlugIn.LPadInt($.KolaPlugIn.Hex10To16(v.R),2)+$.KolaPlugIn.LPadInt($.KolaPlugIn.Hex10To16(v.G),2)+$.KolaPlugIn.LPadInt($.KolaPlugIn.Hex10To16(v.B),2);
    },
    Hex16ToRgb:function(color){
        var r=$.KolaPlugIn.ValueChecker(color);
        if(!r.IsString) return {R:0,G:0,B:0};
        color=$.KolaPlugIn.Trim(color).toLowerCase();
        if(color.length==0) return {R:0,G:0,B:0};
        r=$.KolaPlugIn.ValueChecker(color);
        if(!r.IsHex16) return {R:0,G:0,B:0};
        if(color.length<3){
            return {R:0,G:0,B:0};
        }else if(color.length<6){
            color=color[0]+color[0]+color[1]+color[1]+color[2]+color[2];
        }else if(color.length>=6){
            color=color.substr(0,6);
        }
        var ds=[];
        ds.push($.KolaPlugIn.Hex16To10(color.substr(0,2)));
        ds.push($.KolaPlugIn.Hex16To10(color.substr(2,2)));
        ds.push($.KolaPlugIn.Hex16To10(color.substr(4,2)));
        return {R:ds[0],G:ds[1],B:ds[2]};
    },
    Rgb2HSL:function(v){
        var r=v.R/255;
        var g=v.G/255;
        var b=v.B/255;
                
        var max=Math.max(Math.max(r,g),b);
        var min=Math.min(Math.min(r,g),b);
        var xc=max - min;
        
        var l=(max + min)/2;       
        var h=0;
        var s=0;
        
        if(max==min){
            h=0;
        }else if(r==max&&g>=b){
            h=60*(g-b)/xc;
        }else if(r==max&&g<b){
            h=60*(g-b)/xc + 360;
        }else if(g==max){
            h=60*(b-r)/xc +120;
        }else{
            h=60*(r-g)/xc +240;
        }
        
        if(l==0||max==min){
            s=0;
        }else if(l>0&&l<=0.5){
            s=xc/(2*l);
        }else if(l>0.5){
            s=xc/(2-2*l);
        }
        
        return {H:h,S:s*100,L:Math.round(l*100)};
    },
    HSL2Rgb:function(v){
        
        this.calcRgb=function(p,q,tc){
            if(tc<0) tc+=1.0;
            if(tc>1) tc-=1.0;
            
            if(tc<(1/6)){
                return p + (( q - p ) * 6 * tc);
            }else if(tc>=(1/6)&&tc<(1/2)){
                return q;
            }else if(tc>=(1/2)&&tc<(2/3)){
                return p + (( q - p ) * 6 * ((2/3) - tc));
            }else{
                return p;
            }
        }
    
        var h=v.H;
        var s=v.S/100;
        var l=v.L/100;
        var r=1;
        var g=1;
        var b=1;
        if(s==0){
            l=100*l;
            if(l<10){
                r=0;
            }else if(l<=90){
                r=Math.ceil((l-9)/20)*51;
            }else{
                r=255;
            }
            if(l<=90){
                g=b=Math.floor(l/20)*51;
            }else{
                g=b=255;
            }
        }else{
            var q=0;
            
            if(l<0.5){
                q=l*(1+s);
            }else{
                q=l+s - (l*s);
            }
            
            var p=2*l - q;
            var hk=h/360;
            var tr=hk+(1/3);
            var tg=hk;
            var tb=hk - (1/3);
            
            r=this.calcRgb(p,q,tr);
            g=this.calcRgb(p,q,tg);
            b=this.calcRgb(p,q,tb);

            r=Math.round(r*255)%255;
            if(r<0) r+=255;
            g=Math.round(g*255)%255;
            if(g<0) g+=255;
            b=Math.round(b*255)%255;
            if(b<0) b+=255;
        }
        return {R:r,G:g,B:b};
    },
    JsRgb2HSL:function(color){
        color=$.KolaPlugIn.JsRgb2Hex16(color);
        var rgb=$.KolaPlugIn.Hex16ToRgb(color.substr(1));
        return $.KolaPlugIn.Rgb2HSL(rgb);
    },
    DeepenColor:function(color,depth,sv){
        depth=100 - Math.abs(Math.round(depth)%100);
        var r=$.KolaPlugIn.ValueChecker(sv);
        if(!r.IsUInt){
            sv=undefined;
        }else{
            sv=Math.abs(Math.round(depth)%100);
        }
        color=$.KolaPlugIn.JsRgb2Hex16(color);
        var rgb=$.KolaPlugIn.Hex16ToRgb(color.substr(1));
        var hsl=$.KolaPlugIn.Rgb2HSL(rgb);
        hsl.L=depth;
        if(sv!=undefined){
            hsl.S=sv;
        }
        rgb=$.KolaPlugIn.HSL2Rgb(hsl);
        return $.KolaPlugIn.RgbToHex16(rgb);
    },
    //调试工具
    GetObjectStruct:function(o) {
        this.GetObjInfo=function(obj,prefix){
            var r=$.KolaPlugIn.ValueChecker(obj);
            var s = prefix;
            if (r.IsSampleType) {
                s += obj+"<"+typeof(obj)+">" + ";";
            } else {
                s+="\r\n";
                if(r.IsArray){
                    for(var i=0;i<obj.length;i++){
                        s+=prefix+"Array["+i+"]="+this.GetObjInfo(obj[i],prefix+" ") + ";\r\n";
                    }
                }else{
                    for (var p in obj) {
                        s+=prefix+"Prop["+p+"]="+this.GetObjInfo(obj[p],prefix+" ") + ";\r\n";
                    }
                }
            }
            return s;
        }
        return this.GetObjInfo(o,"");
    }
};
//对象方法
(function($){
    //位置相关
    $.fn.GetControlPos=function() {
        var pos = {};
        pos.ALeft = $(this).offset().left;
        pos.ATop = $(this).offset().top;
        pos.RLeft=$(this).position().left;
        pos.RTop=$(this).position().top;
        return pos;
    };
    //操作相关
    $.fn.BundleMove=function(items){
        var r=$.KolaPlugIn.ValueChecker(items);
        var ids=new Array();
        if(r.IsString){
            if(items.indexOf(",")>0){
                ids=items.split(",");
            }else{
                ids.push(items);
            }
        }else if(r.IsArray){
            ids=items;
        }else{
            return;
        }
        var mid=$(this).attr("id");
        if(mid==null||mid==undefined||mid=="") mid="id_"+$.KolaPlugIn.GetRandomByLen(10);
        mid=mid.toLowerCase();
        for(var i=ids.length - 1;i>=0;i--){
            ids[i]=ids[i].toLowerCase();
            if($("#"+ids[i]).length==0||ids[i]==mid) ids.splice(i,1);
        }
        if(ids.length==0) return;
        var ox=$(this).offset().left;
        var oy=$(this).offset().top;
        var ss=[];
        for(var i=0;i<ids.length;i++){
            ss.push({x:$("#"+ids[i]).offset().left,y:$("#"+ids[i]).offset().top});
        }
        $(this).bind("move",function(arg){
            var nx=$(this).offset().left;
            var ny=$(this).offset().top;
            var dx=nx - ox;
            var dy=ny - oy;
            for(var i=0;i<ids.length;i++){
                var x=ss[i].x + dx;
                var y=ss[i].y + dy;
                $("#"+ids[i]).css("left",x+"px");
                $("#"+ids[i]).css("top",y+"px");
            }
        });
    };
    $.fn.ItemsHOver=function(event,items){
        var evt=$.KolaPlugIn.GetMousePosition(event);
        var r=$.KolaPlugIn.ValueChecker(items);
        var ids=new Array();
        if(r.IsString){
            if(items.indexOf(",")>0){
                ids=items.split(",");
            }else{
                ids.push(items);
            }
        }else if(r.IsArray){
            ids=items;
        }else{
            return false;
        }
        var mid=$(this).attr("id");
        if(mid==null||mid==undefined||mid=="") mid="id_"+$.KolaPlugIn.GetRandomByLen(10);
        mid=mid.toLowerCase();
        for(var i=ids.length - 1;i>=0;i--){
            ids[i]=ids[i].toLowerCase();
            if($("#"+ids[i]).length==0||ids[i]==mid) ids.splice(i,1);
        }
        if(ids.length==0) return false;
        for(var i=0;i<ids.length;i++){
            var d={x:$("#"+ids[i]).offset().left,y:$("#"+ids[i]).offset().top,w:$("#"+ids[i]).width(),h:$("#"+ids[i]).height()};
            if(evt.x>=d.x && evt.x<=(d.x+d.w) && evt.y>=d.y && evt.y<=(d.y+d.h)) return true;
        }
        return false;
    };
})(jQuery);
