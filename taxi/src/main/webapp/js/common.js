var rootPath = "/" + window.location.pathname.split("/")[1];
var loginInfo;

var getLoginInfo = function () {
	console.log("getLoginInfo()");
	
	$.ajax({
		url : rootPath + "/auth/loginInfo.do",
		type : "GET",
		async : false,
		dataType : "json",
		success : function(result) {
			if (result.status == "success") {
				loginInfo = result.data;
			} else {
				alert("사용자 인증 실패!");
				window.location.href = rootPath + "/auth/auth.html";
			}
		},
		error : function(err) {
			alert("사용자 인증 중 시스템 오류 발생\n잠시후 다시 시도해주세요.");
			window.location.href = rootPath + "/auth/auth.html";
		}
			
	});
};
getLoginInfo();


var setParams = function (url, jsonObject) {
	if (jsonObject) {
		return url += "?" + encodeURI("params=" + JSON.stringify(jsonObject));
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
















function AppContext() {
	var objMap = {};
	
	this.addObject = function(name, obj) {
		objMap[name] = obj;
	};
	
	this.getObject = function(name) {
		return objMap[name];
	};
}

window.appContext = new AppContext();