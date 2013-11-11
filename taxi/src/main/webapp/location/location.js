var query;

var markerImgArr = [
					"../images/common/marker/free-map-marker-icon-red.png",
					"../images/common/marker/free-map-marker-icon-pink.png",
					"../images/common/marker/free-map-marker-icon-orange.png",
					"../images/common/marker/free-map-marker-icon-green-darker.png",
					"../images/common/marker/free-map-marker-icon-green.png",
					"../images/common/marker/free-map-marker-icon-dark.png",
					"../images/common/marker/free-map-marker-icon-blue-darker.png",
					"../images/common/marker/free-map-marker-icon-blue.png"];
var locations = [];

var map;

$(document).ready(function() {
	var params = getParams(window.location.href);
	query = params.query;
	
	searchLocation(query, 0);
	
	$("#navLoctionMenu a").click(function() {
		if ( !$(this).hasClass("ui-btn-active") ) {
			searchLocation(query, 0);
		}
	});
	
	$("#popupButtons a").click(function() {
		var idx =  $("#popupButtons").attr("data-idx");
		var params = {
				locType : null,
				locName : locations[idx].locationName,
				x : locations[idx].coord.getX(),
				y : locations[idx].coord.getY(),
		};
		console.log(params);
		if ( $(this).text() == "출발지" ) {
			console.log("출발지");
			$.extend(params, { locType : "start" });
		} else if ( $(this).text() == "목적지" ) {
			console.log("목적지");
			$.extend(params, { locType : "end" });
		} else if ( $(this).text() == "즐겨찾기추가" ) {
			console.log("즐겨찾기추가");
			$.extend(params, { locType : "fvrtLoc" });
		}
		
		window.location.href =  setParams("../home/home.html", params);
	});
	
});

var searchLocation = function(query, page) {
	console.log("searchLocation(query, page)");
	
	var params = {
			query : encodeURI(query),
			places : 8,
			addrs : 8,
			sr : "MATCH",	//DIS:거리순, RANK:정확도순, MATCH:일치
			p : page,
			timestamp : 1317949634794
		};
	$.getJSON("../map/ollehMapApi.do", 
			{
				url : "http://openapi.kt.com/maps/search/localSearch",
				params : JSON.stringify( params )
			}, 
			function(result) {
				if ( result.status == "success" ) {
					var resultData =  JSON.parse(result.data);
//					console.log(resultData);
					
					$(".locationItem").remove();
					locations = [];
					if ( $("div#navLoctionMenu a.ui-btn-active").text() == "장소" ) { // 장소
						locations = resultData.payload.RESULTDATA.place.Data;
//						var locationsCount = resultData.payload.RESULTDATA.place.TotalCount;
//						console.log(locationsCount);
						if ( locations && locations.length > 0) {
							for( var i in locations ) {
								$("<li>").addClass("locationItem")
										.append( $("<a>").attr("href", "#")
																.attr("data-idx", i)
																.click(function() {
																	map.moveTo( locations[$(this).attr("data-idx")].coord, 10 );
																	$("#popupButtons").attr("data-idx", $(this).attr("data-idx"))
																							.popup("open", {
																		tramsition : "pop",
																		positionTo : $(this)
																	});
																})
																.append( $("<img>").attr( "src", markerImgArr[i] ) )
																.append( $("<h2>").text( locations[i].NAME ) )
																.append( $("<p>").html( locations[i].ADDR + "<br>" + locations[i].THEME_NAME ) ) )
								.appendTo( $("#ulLocationList") );
								$.extend(true, locations[i], { 
									image : markerImgArr[i],
									coord : new olleh.maps.Coord(locations[i].X, locations[i].Y),
									locationName : locations[i].NAME
								});
							}
							
						} else {
							$("<li>").addClass("locationItem")
									.append( $("<p>").css("text-align", "center")
															.text( "검색 결과가 없습니다." ) )
							.appendTo( $("#ulLocationList") );
						}
						
					} else { // 주소
						locations = resultData.payload.RESULTDATA.addr.Data;
//						var locationsCount = resultData.payload.RESULTDATA.addr.TotalCount;
//						console.log(locationsCount);
						if ( locations && locations.length > 0) {
							for( var i in locations ) {
								$("<li>").addClass("locationItem")
										.append( $("<a>").attr("href", "#")
																.attr("data-idx", i)
																.click(function() {
																	map.moveTo( locations[$(this).attr("data-idx")].coord, 10 );
																	$("#popupButtons").attr("data-idx", $(this).attr("data-idx"))
																							.popup("open", {
																		tramsition : "pop",
																		positionTo : $(this)
																	});
																})
																.append( $("<img>").attr( "src", markerImgArr[i] ) )
																.append( $("<h2>").text( locations[i].address ) ) )
								.appendTo( $("#ulLocationList") );
								$.extend(true, locations[i], { 
									image : markerImgArr[i],
									coord : new olleh.maps.Coord(locations[i].x, locations[i].y),
									locationName : locations[i].address
								});
							}
							
						} else {
							$("<li>").addClass("locationItem")
									.append( $("<p>").css("text-align", "center")
															.text( "검색 결과가 없습니다." ) )
							.appendTo( $("#ulLocationList") );
						}
					}
					$("#ulLocationList").listview("refresh");
					
					initMap();
					
				} else {
					alert("검색결과 없음.");
				}
				
			});
};


var initMap = function() {
	console.log("initMap()");
	
	if ( locations && locations.length > 0) {
		loadMap( locations[0].coord, 10 );
		setMarkers();
		
	} else {
		// 현재위치 가져오기
		navigator.geolocation.getCurrentPosition(function(position) {
			var curPoint = new olleh.maps.Point( position.coords.longitude, position.coords.latitude );
			var srcproj = new olleh.maps.Projection('WGS84');
			var destproj = new olleh.maps.Projection('UTM_K');
			olleh.maps.Projection.transform(curPoint, srcproj, destproj);
			
			loadMap( new olleh.maps.Coord(curPoint.getX(), curPoint.getY()), 10 );
		});
	}
	
};


var loadMap = function (coord, zoom) {
	console.log("loadMap(coord, zoom)");
	
  	var mapOptions = {  	
     	center : coord,
     	zoom : zoom,
     	mapTypeId : olleh.maps.MapTypeId.BASEMAP
  	}; 
  	map = new olleh.maps.Map(document.getElementById("canvas_map"), mapOptions);
};

var setMarkers = function() {
	console.log("setMarkers()");
	
	var markers = [];
	
	for (var i in locations) {
		markers[i] = new olleh.maps.Marker({
				position : locations[i].coord,  
				map : map,  
//				shadow : shadow,
				icon : new olleh.maps.MarkerImage(
						locations[i].image, 
						new olleh.maps.Size(35, 35),
						new olleh.maps.Pixel(0, 0),
						new olleh.maps.Pixel(0, 35)
				),			
				title : locations[i].NAME,
				zIndex : i
		});
	}
};

/*
var that = this;


// olleh Map
var map;
var coord;
var curPoint, curMarker;

var geocoder;
var startPoint;
var endPoint;

var directionsService;



*/
