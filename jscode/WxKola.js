//百度地图JS工具
//Create By Kola
//2015-8-10 version 1.0
//2015-8-11 version 1.1
//2015-8-20
//version 1.2
function GetBaiduAddressInfoByCoordinate(ak,lon,lat,callbackName){
    var url="http://api.map.baidu.com/geocoder/v2/?ak="+escape(ak)+"&location="+escape(lat+","+lon)+"&coordtype=bd09ll&pois=0&output=json&callback="+callbackName;
    var script = document.createElement('script');
	script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}

function CalcBaiduMapDistance(lon1,lat1,lon2,lat2){
    var r=6370693.5;
    var pi=3.14159265359;
    
    lat1=lat1*pi/180;
    lon1=lon1*pi/180;
    lat2=lat2*pi/180;
    lon2=lon2*pi/180;
    
    //// 求大圆劣弧与球心所夹的角(弧度)
    var distance = Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon1 - lon2);
    //// 求大圆劣弧长度
    distance = r * Math.acos(distance)/1000;
    var rdistance={};
    if(distance<1){
        rdistance={"distance":distance*1000,"unit":"米"};
    }else{
        rdistance={"distance":distance,"unit":"公里"};
    }
    return rdistance;
}
function ConvertGPSCoordinate(lon,lat,ak,callbackName){
    var url="http://api.map.baidu.com/geoconv/v1/?ak="+escape(ak)+"&coords="+escape(lon+","+lat)+"&from=1&to=5&output=json&callback="+callbackName;
    var script = document.createElement('script');
	script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}
