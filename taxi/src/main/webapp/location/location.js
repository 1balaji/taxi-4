var query;

var defaultMarkerImg = "../images/common/marker/free-map-marker-icon-blue.png";
var selectedMarkerImg = "../images/common/marker/free-map-marker-icon-red.png";
//var markerImgArr = [
//					"../images/common/marker/ttt.gif",
//					"../images/common/marker/free-map-marker-icon-red.png",
//					"../images/common/marker/free-map-marker-icon-pink.png",
//					"../images/common/marker/free-map-marker-icon-orange.png",
//					"../images/common/marker/free-map-marker-icon-green-darker.png",
//					"../images/common/marker/free-map-marker-icon-green.png",
//					"../images/common/marker/free-map-marker-icon-dark.png",
//					"../images/common/marker/free-map-marker-icon-blue-darker.png",
//					"../images/common/marker/free-map-marker-icon-blue.png"];

var locations = [];
var markers = [];
var page = 0;

var map;
var zIdx = 0;

var screenWidth = screen.width;
var screenHeight = screen.height;


$(document).ready(function() {
	$("#contentLocation").css("height", screenHeight+"px");
	$("#divMapWrap").css("height", screenHeight+"px");
	
//	var screenWidth = screen.width;
	$("#divSearchInput").css("width", screenWidth + "px");
	var glassWidth = $("#magnifyingGlass").outerHeight(); 
//	var searchInputWidth = screenWidth - glassWidth - 30 - 12;
	var searchInputWidth = screenWidth - 30 - 30 - 12;
	$("#searchInput").css("width", searchInputWidth + "px");
	
	
	
	
//	var ulAddRoomHeight = $("#ulAddRoom").outerHeight();
//	var ulRoomListHeight = divMapHeight - ulAddRoomHeight;
//	$("#divScrollWrapper").css("height", ulRoomListHeight+"px");
//	
//	console.log("screen", screen.height);
//	console.log("header", headHeight);
//	console.log("locationInput", divLocationInputHeight);
//	console.log("content", contentHeight);
//	console.log("roomList", divMapHeight);
	
	
	
	
	
	var params = getParams(window.location.href);
	query = params.query;
//	query = "신사동";
	initMap(function() {
		searchLocation(query, page);
	});
	
	$("#searchInput").val(query);
	// 검색창
	$("#searchInput").bind("keypress", function(e) {
		if (e.keyCode == 13) {
			searchAgain(this);
		}
	});
	
	
});


var myScroll;

function loaded() {
	console.log("loaded()");
	myScroll = new iScroll('wrapper', {
		snap: "li",
		momentum: false,			
		hScrollbar: false,
		onRefresh: function () {
			console.log("onRefresh...");
		},
		onScrollMove: function () {
		},
		onScrollEnd: function () {
			console.log("onScrollEnd...");
		}, 
		onTouchEnd: function () {
			console.log("onTouchEnd...");
			console.log(this.currPageX);
			if ( page < 5 && this.maxScrollX > this.x ) {
				searchLocation(query, ++page);
			} else {
				var currPageX = this.currPageX;
				console.log( currPageX, markers[currPageX] );
				console.log( markers[currPageX].getIcon().url );
				
				hideMarkers(markers);
				
				console.log(markers);
				markers[currPageX].setZIndex(++zIdx);
				markers[currPageX].getIcon().url = selectedMarkerImg;
				
				showMarkers(markers);
				
				console.log(markers);
				
				
				
				
				map.moveTo(markers[currPageX].position, 10);
				
				console.log( currPageX, markers[currPageX] );
				console.log( markers[currPageX].getIcon().url );
				console.log( markers[currPageX].getZIndex() );
			}
		}
	});
}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

document.addEventListener('DOMContentLoaded', loaded, false);


var searchAgain = function( target2 ) {
	var query2 = $.trim($(target2).val());
	if ( query2 != "" ) {
		var params2 = null;
		params2 = { "query" : query2 };
		window.location.href = setParams("../location/location.html", params2);
    }
};

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
					var tmpLocations = [];
					tmpLocations = resultData.payload.RESULTDATA.place.Data;
//					console.log(tmpLocations);
					if (tmpLocations.length > 0) {
						var locationLen = locations.length;
						for( var i = 0 ; i < tmpLocations.length; i++ ) {
							locations[locationLen + i] = tmpLocations[i];
						}
//						initMarkers(markers);
//						markers = [];
//						markers = setMarkers(locations);
						tmpMarkers = setMarkers(tmpLocations);
//						console.log(tmpMarkers);
						var markerLen = markers.length;
						for( var i = 0 ; i < tmpMarkers.length; i++ ) {
							markers[markerLen + i] = tmpMarkers[i];
						}
					}
					
					createLocationList(locations);
					
				} else {
					alert("검색결과 없음.");
				}
			});
};

var createLocationList = function(locations) {
	console.log("createLocationList()");
	
	$("#ulLocationList").children().remove();
	$("#scroller").css("width", 0+"px");
	
	for(var i in locations) {
		$("<li>")
			.addClass("liLocationList")
			.attr("id","liLocationList" + i).css("left",(screenWidth * i) + "px")
			.css("width", screenWidth)
//			.append( 
//					$("<img>")
//						.attr( "src", selectedMarkerImg)
//						.addClass("imgMarker") )
			.append(
					$("<a>")
						.addClass("divFavoriteIcon")
						.attr("href","#")
						.attr("data-idx",i)
						.attr("data-status","false")
						.click(function() {
							var liIdx = $(this).attr("data-idx");
							addAndDelFavoriteLocation(liIdx, locations);
						}) )
			.append(
					$("<div>")
						.addClass("locationNameAndAddress")
						.append(
								$("<legend>")
									.addClass("locationName")
									.text( locations[i].NAME ))
									.append(
										$("<p>")
											.addClass("locationAddress")
											.text(locations[i].ADDR) )
									.append(
											$("<p>")
												.addClass("locationTheme")
												.text(locations[i].THEME_NAME) ) )
			
			
			.append(
						$("<div>")
							.addClass("locationStartAndEnd")
							.attr("data-idx",i)
							.append(
//									$("<span>")
//										.addClass("spanLocationStart")
//										.append(
												$("<a>")
													.addClass("locationStart")
													.attr("href","#")
													.append( $("<span>").text("출발") )
													.click(function() {
														var liIdx =  $(this).parents(".locationStartAndEnd").attr("data-idx");
														setStartSession(
																locations[liIdx].X, 
																locations[liIdx].Y, 
																locations[liIdx].NAME, 
																"",
																function() {
																	window.location.href =  "../home/home.html";
																} );
													}) ) //)
							.append(
//								$("<span>")
//									.addClass("spanLocationEnd")
//									.append(
											$("<a>")
												.addClass("locationEnd")
												.attr("href","#")
												.append( $("<span>").text("도착") )
												.click(function() {
													var liIdx =  $(this).parents(".locationStartAndEnd").attr("data-idx");
													setEndSession(
															locations[liIdx].X, 
															locations[liIdx].Y, 
															locations[liIdx].NAME, 
															"",
															function() {
																window.location.href =  "../home/home.html";
															} );
												}) ) //)
			)
		.appendTo($("#ulLocationList"));
		
		$("#scroller").css("width", parseInt($("#scroller").css("width")) + screenWidth + "px");
	}
	
	myScroll.refresh();
	
	var currPageX = myScroll.currPageX; 
	if ( currPageX != 0) {
		myScroll.scrollToPage( ++currPageX, 1, 1000);
	}
	
	if ( currPageX % 8 == 0 ) {
		markers[currPageX].setZIndex(++zIdx);
		hideMarkers(markers);
		markers[currPageX].getIcon().url = selectedMarkerImg;
		showMarkers(markers);
		map.moveTo(markers[currPageX].position, 10);
	}
	
	
	// 즐겨찾기 초기설정
	getFavoriteLocation(function(favoriteLocationList) {
		for(var i in favoriteLocationList) {
			for(var j in locations ) {
				if (favoriteLocationList[i].fvrtLocLat == locations[j].Y & 
						favoriteLocationList[i].fvrtLocLng == locations[j].X & 
						favoriteLocationList[i].fvrtLocName == locations[j].NAME) {
					$(".divFavoriteIcon[data-idx=" + j + "]")
						.css( 'background-image','url(' + '../images/common/favorite-icon.png' + ')' )
						.attr("data-status","true");
//					$(".divFavoriteIcon[data-idx=" + j + "]")
//					.attr("data-status","true");						
				}
				
			}
		}
	});
};

var getFavoriteLocation = function(execute) {
	console.log("getFavoriteLocation()");
	
	var url = "../member/getFavoritePlaces.do";
	$.getJSON(url
			, function(result) {
				if (result.status == "success") {
					var favoriteLocationList = result.data;
					if (favoriteLocationList.length > 0) {
						execute(favoriteLocationList);
					}
				} else {
					alert(result.data);
				}
	});
};

var addAndDelFavoriteLocation = function(idx, locations) {
	console.log("favoriteLocation(idx, locations)");
	console.log(idx, location);
	
	getFavoriteLocation(function(favoriteLocationList) {
		
		if($(".divFavoriteIcon[data-idx=" + idx + "]").attr("data-status") =="false") {
			$(".divFavoriteIcon[data-idx=" + idx + "]").attr("data-status","true");
			$(".divFavoriteIcon[data-idx=" + idx + "]").css(
					'background-image','url(' + '../images/common/favorite-icon.png' + ')');
			
			var isFavoriteLocation = false;
			for ( var i in favoriteLocationList) {
				if ((favoriteLocationList[i].fvrtLocLat == locations[idx].Y & 
						favoriteLocationList[i].fvrtLocLng == locations[idx].X & 
						favoriteLocationList[i].fvrtLocName == locations[idx].NAME)) {
					isFavoriteLocation = true;
				} else {
					
				} 
			}
			
			if (isFavoriteLocation == false) {
				$.post("../member/addFavoritePlace.do"
						,{
							fvrtLocName : locations[idx].NAME,
							fvrtLocLng  : locations[idx].X,
							fvrtLocLat 	: locations[idx].Y,
						}, function(result) {
							if (result.status == "success") {
								console.log("addFvrtLoc 성공");
							} else {
								alert(result.data);
							}
						}, "json");
			}
			
		} else {
			$(".divFavoriteIcon[data-idx=" + idx + "]").attr("data-status","false");
			$(".divFavoriteIcon[data-idx=" + idx + "]").css(
					'background-image','url(' + '../images/common/favorite-non-icon.png' + ')');
			for (var i in favoriteLocationList){
				if (favoriteLocationList[i].fvrtLocLat == locations[idx].Y & 
						favoriteLocationList[i].fvrtLocLng == locations[idx].X & 
						favoriteLocationList[i].fvrtLocName == locations[idx].NAME) {
					var url = "../member/deleteFavoritePlace.do";
					$.post(url
							,{
								fvrtLocNo : favoriteLocationList[i].fvrtLocNo
							}, function(result) {
								if (result.status == "success") {
									console.log("deleteFvrtLoc 성공");
								} else {
									alert(result.data);
								}
							}, "json");
				}
			}
		}
	});
};

var initMap = function(callbackFunc) {
	console.log("initMap()");
	
//	if ( locations && locations.length > 0) {
//		loadMap( ulLocations[0].coord, 10 );
////		setMarkers();
//		callbackFunc();
//		
//	} else {
		// 현재위치 가져오기
		navigator.geolocation.getCurrentPosition(function(position) {
			var curPoint = new olleh.maps.Point( position.coords.longitude, position.coords.latitude );
			var srcproj = new olleh.maps.Projection('WGS84');
			var destproj = new olleh.maps.Projection('UTM_K');
			olleh.maps.Projection.transform(curPoint, srcproj, destproj);
			
			loadMap( new olleh.maps.Coord(curPoint.getX(), curPoint.getY()), 10 );
			callbackFunc();
		});
//	}
	
};

var loadMap = function (coord, zoom) {
	console.log("loadMap(coord, zoom)");
	
  	var mapOptions = {  	
     	center : coord,
     	zoom : zoom,
     	mapTypeId : olleh.maps.MapTypeId.BASEMAP,
     	zIndex: 0
  	}; 
  	
  	map = new olleh.maps.Map(document.getElementById("canvas_map"), mapOptions);
};

var initMarkers = function() {
	for (var i=0; i < markers.length ; i ++){
		
//		console.log(markers[i]);
		markers[i].getIcon.url = defaultMarkerImg;
		markers[i].setMap(null);
	}
	markers = [];
};

var setMarkers = function(locations) {
	console.log("setMarkers()");
//	console.log(locations);
	var tmpMarkers = [];
	for (var i in locations) {
		tmpMarkers[i] = new olleh.maps.Marker({
				position : new olleh.maps.Coord(locations[i].X, locations[i].Y),
				map : map,  
//				shadow : shadow,
				icon : new olleh.maps.MarkerImage(
						defaultMarkerImg, 
						new olleh.maps.Size(40, 40),
						new olleh.maps.Pixel(0, 0),
						new olleh.maps.Pixel(20, 40)
				),
				title : locations[i].NAME,
//				zIndex : 1
		});
		tmpMarkers[i].setZIndex(0);
	}
	return tmpMarkers;
};

var hideMarkers = function(markers) {
	for (var i = 0; i < markers.length; i++) {
		markers[i].getIcon().url = defaultMarkerImg;
		markers[i].setMap(null);
	}
};

var showMarkers = function(markers) {
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(map);
	}
};

