function g_gather(cgcode,pgcode){
    var w=screen.width;
    var h=screen.height;
    var u=escape(window.location);
    var s=escape(document.referrer);
    var c=escape("00000000-0000-0000-0000-000000000000");
    if(cgcode!=null){
        c=escape(cgcode);
    }
    var p=escape("00000000-0000-0000-0000-000000000000");
    if(pgcode!=null){
        p=escape(pgcode);
    }
    $.getScript("../visit.ashx?w="+w+"&h="+h+"&c="+c+"&p="+p+"&u="+u+"&s="+s);
}