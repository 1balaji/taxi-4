var that = this;

$(document).ready(function() {
	init();
});



// olleh Map
var map;
var coord;
var curPoint, curMarker;

var geocoder;
var startPoint;
var endPoint;

var directionsService;

var init = function () {
	
	// 현재위치 가져오기
	navigator.geolocation.getCurrentPosition(function(position) {
		curPoint = new olleh.maps.Point( position.coords.longitude, position.coords.latitude );
		console.log(position.coords.longitude +","+ position.coords.latitude);
		var srcproj = new olleh.maps.Projection('WGS84');
		var destproj = new olleh.maps.Projection('UTM_K');
		olleh.maps.Projection.transform(curPoint, srcproj, destproj);
		
		coord = new olleh.maps.Coord(curPoint.getX(), curPoint.getY());
		console.log(coord.getY() + ", " + coord.getX());
		loadMap(coord, 10);
		
//		setCurMarker();
		
		
	
		
		
//		var url = "http://openapi.kt.com/maps/search/GetPoiWithinNearArea";
//		var params = "?x=948417&y=1945766&name=강남&timestamp=1383486735397";
//		$.ajax({
//			url	: url + params,
//			type : "GET",
//			beforeSend : function (xhr) {
//				xhr.setRequestHeader("Authorization", "Basic ODEwMEQ4QzA6VEJGRkMwMzQzOUQ4NA==" );
//			},
//			success 		: function (result) {
//				console.log(result);
//			},
////			error : function(result) {
////				console.log(result);
////			}
//		});
		
		
		
		
		
		
		
	});
};

var loadMap = function (coord, zoom) {
	console.log("loadMap");
  	var mapOptions = {  	
     	center : coord,
     	zoom : zoom,
     	mapTypeId : olleh.maps.MapTypeId.BASEMAP
  	}; 
  	map = new olleh.maps.Map(document.getElementById("canvas_map"), mapOptions);
};

var setCurMarker = function() {
	console.log("setCurMarker");
	var icon = new olleh.maps.MarkerImage(
		'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc1/275382_100001276016427_722347921_t.jpg',
		new olleh.maps.Size(35, 35),
		new olleh.maps.Pixel(0,0),
		new olleh.maps.Pixel(0,35)
	);
	curMarker = new olleh.maps.Marker({ 
		position: coord,  
		map: map,  
//		shadow: shadow,
		icon: icon,			
		title : 'Current Location',
		zIndex : 1		
  	});
	var curCircle = new olleh.maps.Circle({
		center: coord,
		radius: 500,
		map: map,
		fillColor: "#ff0000", 
		fillOpacity: 0.07,
		strokeColor: "#ff0000",
		strokeOpacity: 0.6,
		strokeWeight: 1
	});
};

