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