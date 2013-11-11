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
	var loginInfo = getSessionItem("loginInfo");
	if ( !loginInfo || loginInfo == null || loginInfo.length > 1 ) {
		if (window.location.href.split(getSessionItem("rootPath"))[1] != "/auth/auth.html") {
			window.location.href = getSessionItem("rootPath") + "/auth/auth.html";	
		}
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