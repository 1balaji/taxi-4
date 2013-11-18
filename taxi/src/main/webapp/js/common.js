var setSessionItem = function (key, value) {
	sessionStorage.setItem(key, JSON.stringify(value));
};
var getSessionItem = function (key) {
	return JSON.parse(sessionStorage.getItem(key));	
};
var removeSessionItem = function (key) {
	sessionStorage.removeItem(key);
};
var clearSession = function () {
	sessionStorage.clear();
};
setSessionItem("rootPath", "/" + window.location.pathname.split("/")[1]);

var setParams = function (url, jsonObject) {
	if (jsonObject) {
		return url += "?params=" + JSON.stringify(jsonObject);
	} else {
		return url;
	}
};

var getParams = function (url) {
	var splitUrl = decodeURI(url).split("?params=");
	if ( splitUrl.length > 1 ) {
		return JSON.parse( splitUrl[1] );
	} else {
		return ;
	}
};


var getDate = function (dateStr) {
	return new Date(dateStr.replace(" ", "T"));
	
};

var authCheck = function () {
	if (window.location.href.split(getSessionItem("rootPath"))[1] != "/auth/auth.html") {
		$.getJSON(getSessionItem("rootPath") + "/auth/loginInfo.do", function(result) {
			if (result.status == "success") {
				setSessionItem("loginInfo", result.data);
				
			} else {
				alert("사용자 인증 실패!");
				window.location.href = getSessionItem("rootPath") + "/auth/auth.html";
				
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
	console.log("setSessionStart()");
	
	if ( !prefix ) {
		prefix = "";
	}
	
	if ( locName && locName != null && locName.length > 0 ) {
		$.getJSON("../room/setLocationSession.do",{
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
			var geocoderResult = geocoder.parseGeocode(data);
			if(geocoderResult["count"] != "0") {
				var infoArr = geocoderResult["infoarr"];
				for(var i=0; i<infoArr.length; i++){
					$.getJSON("../room/setLocationSession.do",{
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
	console.log("setEndSession()");
	
	if ( !prefix ) {
		prefix = "";
	}
	
	if ( locName && locName != null && locName.length > 0 ) {
		$.getJSON("../room/setLocationSession.do",{
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
			var geocoderResult = geocoder.parseGeocode(data);
			if(geocoderResult["count"] != "0") {
				var infoArr = geocoderResult["infoarr"];
				for(var i=0; i<infoArr.length; i++){
					$.getJSON("../room/setLocationSession.do",{
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

