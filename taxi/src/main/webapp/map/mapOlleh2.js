$(document).ready(function() {
	var params = {
			query : encodeURI("신림"),
			timestamp : 1317949634794
		};
	$.getJSON("localSearch.do", 
			{
				url : "http://openapi.kt.com/maps/search/localSearch",
				params : JSON.stringify( params )
			}, 
			function(result) {
				console.log(result);
				var obj =  JSON.parse(result.data);
				console.log(obj);
			});
	
	
		
//	$.ajax({
//		type: "GET",
//		url: "http://openapi.kt.com/maps/search/GetPoiWithinNearArea?callback?x=948417&y=1945766&name=%EC%A0%84%ED%99%94&timestamp=1383554436336",
//		dataType: "jsonp",
//		jsonp: "callback",
//		success: function(result) {
//			console.log(result);
//		}
//	});
		
	
	
	

});



