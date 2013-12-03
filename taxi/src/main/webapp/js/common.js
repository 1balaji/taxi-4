console.log("commonjs...");

//var rootPath = "http://buru1020.cafe24.com/taxi";		//호스팅
var rootPath = "http://localhost:9999/taxi";		//로컬
//var rootPath = "http://192.168.0.45:9999/taxi";	//비트_상헌
//var rootPath = "http://192.168.0.3:9999/taxi";	//비트_지우
//var rootPath = "http://192.168.41.10:9999/taxi";	//비트_경식
//var rootPath = "http://192.168.43.61:9999/taxi";	//임시

var setSessionItem = function (key, value) {
	console.log("setSessionItem(", key,", ", value+")");
//	console.log(key, value);
	sessionStorage.setItem(key, JSON.stringify(value));
};
var getSessionItem = function (key) {
	console.log("getSessionItem(key)");
//	console.log(key);
	return JSON.parse(sessionStorage.getItem(key));	
};
var removeSessionItem = function (key) {
	console.log("removeSessionItem(key)");
	sessionStorage.removeItem(key);
};
var clearSession = function () {
	console.log("clearSession()");
	sessionStorage.clear();
};
setSessionItem("rootPath", "/" + window.location.pathname.split("/")[1]);


var changeHref = function (url, jsonObject) {
	console.log("changeHref(url, jsonObjec)");
//	console.log(url, jsonObject));
	if (jsonObject) {
		setSessionItem("hrefParams", jsonObject);
	}
	window.location.href = url;
};

var getHrefParams = function () {
	console.log("getHrefParams()");
	var hrefParams = getSessionItem("hrefParams");
//	removeSessionItem("hrefParams");
	return hrefParams; 
};
var setParams = function (url, jsonObject) {
	console.log("setParams(url, jsonObjec)");
//	console.log(url, jsonObject));
	
	if (jsonObject) {
		return url += "?params=" + JSON.stringify(jsonObject);
	} else {
		return url;
	}
};

var getParams = function (url) {
	console.log("getParams(url)");
//	console.log(url);
	
	var splitUrl = decodeURI(url).split("?params=");
	if ( splitUrl.length > 1 ) {
		return JSON.parse( splitUrl[1] );
	} else {
		return ;
	}
};


var getDate = function (dateStr) {
	console.log("getDate()");
	return new Date(dateStr.replace(" ", "T"));
};

var authCheck = function () {
	console.log("authCheck()");
	var hrefArr = window.location.href.split("/auth/");
	var curHtml = hrefArr[hrefArr.length-1];
	
	if ( curHtml != "auth.html" ) {
		$.getJSON( rootPath + "/auth/loginInfo.do", function(result) {
			console.log(result.status);
			if (result.status == "success") {
				setSessionItem("loginInfo", result.data);
				
			} else {
				alert("사용자 인증 실패!");
				window.location.href = "../auth/auth.html";
				
			}
		});
	}
};
authCheck();



/**
 * params (
 * 		x 			: 지도의 x좌표,
 * 		y 			: 지도의 y좌표,
 * 		locName	: 지명
 * 		prefix		: 앞에 수식될 문구
 * 		startSession_callback : 세션등록후 처리될 콜백 함수
 */
var setStartSession = function(x, y, locName, prefix, startSession_callback) {
	console.log("setSessionStart(x, y, locName, prefix, startSession_callback)");
//	console.log(x, y, locName, prefix, startSession_callback);
	
	if ( !prefix ) {
		prefix = "";
	}
	
	if ( locName && locName != null && locName.length > 0 ) {
		$.getJSON( rootPath + "/room/setLocationSession.do",{
			startName : locName,
			startX : x,
			startY : y,
			startPrefix :  prefix
		}, function(result) {
			startSession_callback();
		});

	} else {
	  	geocoder.geocode(
				{
			  		type: 1,
			  		isJibun: 1,
			  		x: x, 
			  		y: y
				}, 
				"setStartSession_callback");
	  	setStartSession_callback = function(data) {
	  		console.log("setStartSession_callback(data)");
//	  		console.log(data);
	  		
			var geocoderResult = geocoder.parseGeocode(data);
			if(geocoderResult["count"] != "0") {
				var infoArr = geocoderResult["infoarr"];
				for(var i=0; i<infoArr.length; i++){
					$.getJSON( rootPath + "/room/setLocationSession.do",{
						startName : infoArr[i].address,
						startX : infoArr[i].x,
						startY : infoArr[i].y,
						startPrefix :  prefix
					}, function(result) {
						startSession_callback();
					});
				}
			}
		};
		
	}
};

/**
 * params (
 * 		x 			: 지도의 x좌표,
 * 		y 			: 지도의 y좌표,
 * 		locName	: 지명
 * 		prefix		: 앞에 수식될 문구
 * 		endSession_callback : 세션등록후 처리될 콜백 함수
 */
var setEndSession = function(x, y, locName, prefix, endSession_callback) {
	console.log("setEndSession(x, y, locName, prefix, startSession_callback)");
//	console.log(x, y, locName, prefix, startSession_callback);
	
	if ( !prefix ) {
		prefix = "";
	}
	
	if ( locName && locName != null && locName.length > 0 ) {
		$.getJSON( rootPath + "/room/setLocationSession.do",{
			endName : locName,
			endX : x,
			endY : y,
			endPrefix :  prefix
		}, function(result) {
			endSession_callback();
		});

	} else {
	  	geocoder.geocode(
				{
			  		type: 1,
			  		isJibun: 1,
			  		x: x, 
			  		y: y
				}, 
				"setEndSession_callback");
	  	setEndSession_callback = function(data) {
	  		console.log("setEndSession_callback(data)");
//	  		console.log(data);
	  		
			var geocoderResult = geocoder.parseGeocode(data);
			if(geocoderResult["count"] != "0") {
				var infoArr = geocoderResult["infoarr"];
				for(var i=0; i<infoArr.length; i++){
					$.getJSON( rootPath + "/room/setLocationSession.do",{
						endName : infoArr[i].address,
						endX : infoArr[i].x,
						endY : infoArr[i].y,
						endPrefix :  prefix
					}, function(result) {
						endSession_callback();
					});
				}
			}
		};
		
	}
};

