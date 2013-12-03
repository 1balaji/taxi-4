var map;
var curCoord;
var geocoder;
var directionsService;
var curMarker;
var curCircle;
var startMarker;
var startCircle;
var endMarker;
var endCircle;

var directionsRenderer;
var directionMarkers;

var myScrolll;

var contentWidth;
var contentHeight;

$(document).ready(function() {
	console.log("homejs...");
	
//	var contentWidth = $("#contentHome").outerWidth();
//	var headHeight = $("#headerHome").outerHeight();
//	var contentHeight = $(window).height() - headHeight;
//	$("#contentHome").css("height", contentHeight + "px");
//	$(".divLocationInput").css("width",contentWidth + "px");
//	var searchInputWidth = contentWidth - 30 - 30 - 12;
//	$(".searchInput").css("width",searchInputWidth + "px");
	
	contentWidth = $("#contentHome").outerWidth();
	contentHeight = $(window).height();
	$("#contentHome").height(contentHeight+"px");
	
	var searchInputWidth = contentWidth - 30 - 30 - 12;
	$(".searchInput").css("width",searchInputWidth + "px");
	var divStartEndLocHeight = $("#divStartEndLoc").outerHeight();
	var divRoomListWrapHeight = $("#wrapper").outerHeight();
	var divMapWrapHeight = contentHeight - divStartEndLocHeight - divRoomListWrapHeight;
	$("#divMapWrap").height(divMapWrapHeight+"px");
	
	
	// 임시방편
	$("#scroller li").width(contentWidth+"px");
	$("div.divBtnArea").width(contentWidth+"px");
	
	
	
	
	init();

		
	$("#btnSettings").click(function() {
		changeHref("../settings/settings.html");
	});
	
	$("#btnCurrentLoc").click(function() {
    	map.moveTo(curCoord);
    	setStartSession(
    			curCoord.getX(), 
    			curCoord.getY(), 
    			null, 
    			"내위치: ", 
    			function () {
		    		checkStartLocation();
		    	});
    });
	
	 $("#btnFavoriteLoc").click(function(){ 
		favoriteList(); 
		$("#divFavoriteLoc_popup").popup("open", {
			transition : "flip"
		}); 
		$('#divRoomList').data("flag", "close").animate({right: "-150px"},300);
	 });
	 $("#divFavoriteLoc_popup").on("popupafterclose", function(event, ui) {
		 $('#divRoomList').data("flag", "open").animate({right:"0px"},500);
	 });
	 $("#favorite_Header").click(function(){ 
		 $("#divFavoriteLoc_popup").popup("close"); 
	 });
	
	
	$("#divStartEndLoc input[type=text]").bind("keypress", function(e) {
		if (e.keyCode == 13) {
			searchLocation(this);
		}
	});
    $("#startInput").on("input", function(e) {
		if ( $("#startInput").val() == "" ) {
			$("#aStartSearchClear").css("visibility", "hidden");
		} else {
			$("#aStartSearchClear").css("visibility", "visible");
		}
	});
    $("#endInput").on("input", function(e) {
		if ( $("#endInput").val() == "" ) {
			$("#aEndSearchClear").css("visibility", "hidden");
		} else {
			$("#aEndSearchClear").css("visibility", "visible");
		}
	});
    $("#startInput").click(function() {
		this.select();
	});
    $("#endInput").click(function() {
		this.select();
	});
    
	$("#aStartSearchClear").click(function() {
		$("#startInput").val("");
		$("#aStartSearchClear").css("visibility", "hidden");
	});
	$("#aEndSearchClear").click(function() {
		$("#endInput").val("");
		$("#aEndSearchClear").css("visibility", "hidden");
	});
	
	
	$("#btnAddViewRoom").click(function() {
		if ($("#btnAddViewRoom").text() == "+") {
			isRoomMbr( function() { // isRoomMbrTrue
		    	alert("이미 방에 참여 중입니다.");
		    },
		    function() { // isRoomMbrFalse
		    	var dateTime = new Date();
		    	dateTime.setMinutes( dateTime.getMinutes() + 10 );
		    	$("#setTimeBox").datebox("setTheDate", dateTime);
				$("#divAddRoomCondition_popup").popup("open", { transition  : "flip" });
				$("#setTimeBox").parent().css("display","none");
		    } );
			
		} else {
			$.getJSON( rootPath + "/room/getMyRoom.do", function(result) {
				console.log(result);
				if (result.status === "success") {
					var room = result.data;
					if ( room && room != null && 
							room.roomNo && room.roomNo != null && room.roomNo != 0) {
						changeHref("../room/room.html", { roomNo : room.roomNo });
					}
				}
			});
		}
		
	});
//	$("#divAddRoomCondition_popup a[data-icon=delete]").click(function() {
//		$("#divAddRoomCondition_popup").popup("close");
//	});
	$(".btnAddRoomUI").click(function() {
		console.log( $(this).text() );
		if ( $(this).text().trim() == "등록" ) {
			addRoom();
		} else {
			$("#divAddRoomCondition_popup").popup("close");
		}
    }); 
	
	$(".btnJoin").click(function() { 
        var roomNo = $("#divRoomControl_popup").data("roomNo");
        joinRoom(roomNo); 
    }); 
	
	$("#btnRoomInfo_popup").click(function() { 
		var roomNo = $("#divRoomControl_popup").data("roomNo");
		showRoomInfo(roomNo);
		$('#divRoomList').data("flag", "close").animate({right: "-150px"},300);   
	}); 
    $("#divRoomInfo_popup").on("popupafterclose", function (event, ui) {
    	var canvas = $("#myCanvas").get(0);
    	canvas.width = canvas.width;
    	$('#divRoomList').data("flag", "open").animate({right:"0px"},500);
    });
    
}); //ready()


function loaded() {
	console.log("loadRoomScroll()");
	myScrolll = new iScroll('wrapper', {
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
//			if ( page < 5 && this.maxScrollX > this.x ) {
//				searchLocation(query, ++page);
//				
//			} else {
//				var currPageX = this.currPageX;
//				
//				hideMarkers(markers);
//				markers[currPageX].setZIndex(++zIdx);
//				markers[currPageX].getIcon().url = selectedMarkerImg;
//				showMarkers(markers);
//
//				map.moveTo(markers[currPageX].position, 10);
//			}
		}
	});
}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

document.addEventListener('DOMContentLoaded', loaded, false);


var init = function() {
	console.log("init()");
	// 현재위치 조회
	navigator.geolocation.getCurrentPosition(function(position) {
		var curPoint = new olleh.maps.Point( position.coords.longitude, position.coords.latitude );
//		curPoint = new olleh.maps.Point( 127.027699, 37.498321 );		//강남역					37.498321, 127.027699	==>	1944444.7947507137, 958252.2212954559
//		curPoint = new olleh.maps.Point( 127.028085, 37.494831 );		//비트교육센터			37.494831, 127.028085	==>	1944057.4305749675, 958284.3996343074
//		curPoint = new olleh.maps.Point( 127.039372, 37.476663 );		//양재우리집				37.476663,127.039372	==>	1942036.8700700814, 959272.2741138777 
//		curPoint = new olleh.maps.Point( 127.001928, 37.582456 );		//혜화역					37.582456, 127.001928	==>	1953790.8525704339, 956023.6917773776
//		curPoint = new olleh.maps.Point( 127.000641, 37.586027 );		//혜화로터리				37.586027, 127.000641	==>	1954187.641569722, 955912.1639432621
//		curPoint = new olleh.maps.Point( 126.998958, 37.579863 );		//서울대학병원			37.579863, 126.998958	==>	1953504.56599458, 955759.9252819163
//		curPoint = new olleh.maps.Point( 127.00237 , 37.577236 );		//방송통신대학교		37.577236, 127.00237	==>	1953211.5116532317, 956059.6498991799
//		curPoint = new olleh.maps.Point( 126.929723, 37.484207 );		//신림역					37.484207, 126.929723	==>	1942926.8986323199, 949582.3412903354
//		curPoint = new olleh.maps.Point( 126.928092, 37.484224 );		//이철헤어커커 신림	37.484224, 126.928092	==>	1942929.6593462331, 949438.156302435
//		curPoint = new olleh.maps.Point( 126.934465, 37.484547 );		//은천교회				37.484547, 126.934465	==>	1942962.09067221, 950001.807260273
//		curPoint = new olleh.maps.Point( 126.927191, 37.485296 );		//대현오피스텔			37.485296, 126.927191	==>	1943049.075365723, 949359.22264851

		
//		console.log(position.coords.longitude +","+ position.coords.latitude);
		var srcproj = new olleh.maps.Projection('WGS84');
		var destproj = new olleh.maps.Projection('UTM_K');
		olleh.maps.Projection.transform(curPoint, srcproj, destproj);
//		console.log(curPoint.getY() + ", " + curPoint.getX());
		curCoord = new olleh.maps.Coord(curPoint.getX(), curPoint.getY());
		
		geocoder = new olleh.maps.Geocoder("KEY");
		directionsService = new olleh.maps.DirectionsService('frKMcOKXS*l9iO5g');
		
//		loadMap( curCoord, 10);
		console.log("loadMap()");
	  	var mapOptions = {  	
	     	center : curCoord,
	     	mapTypeId : olleh.maps.MapTypeId.BASEMAP,
	     	mapTypeControl: false,
	     	zoom : 10
	  	}; 
	  	map = new olleh.maps.Map(document.getElementById("canvas_map"), mapOptions);
	  	
//		curMarker = setMarker( curCoord, getSessionItem("loginInfo").mbrPhotoUrl );
		console.log("setMarker()");
		var myIcon = new olleh.maps.MarkerImage(
				getSessionItem("loginInfo").mbrPhotoUrl,
				new olleh.maps.Size(40, 40),
				new olleh.maps.Pixel(0,0),
				new olleh.maps.Pixel(20, 20) );
		curMarker = new olleh.maps.Marker({ 
			position: curCoord,  
			map: map,  
			icon: myIcon,			
			title : '내위치',
			zIndex : 1		
	  	});
		
		checkLocations();
		
	});
};


var checkLocations = function() {
	console.log("checkLocations()");
	checkStartLocation();
};


var checkStartLocation = function() {
	console.log("checkStartLocation()");
	$.getJSON( rootPath + "/room/getLocationSession.do", function(result) {
		var locationSession = result.data;

		if ( locationSession && locationSession != null &&
				locationSession.startName && locationSession.startName != null && locationSession.startName != "" &&
				locationSession.startX && locationSession.startX != null && locationSession.startX != "" &&
				locationSession.startY && locationSession.startY != null && locationSession.startY != "" ) {
			setStartLocation(locationSession.startX, locationSession.startY, locationSession.startName, locationSession.startPrefix);
			
			checkEndLocation();
			
		} else {
			setStartSession(
					curCoord.getX(), 
					curCoord.getY(), 
					null, 
					"내위치: ", 
					function () {
			    		checkStartLocation();
			    	} );
			
		}
	});
};


var setStartLocation = function (x, y, locName, prefix) {
	console.log("setStartLocation()");
	
	if ( !prefix || prefix == null ) {
		prefix = "";
	}
	
	$("#startInput").val(prefix + locName)
									.attr("placeholder", prefix + locName );
	
	var coord = new olleh.maps.Coord( x, y );
	if (startMarker) {
		startMarker.setMap(null);
	}
	if (startCircle) {
		startCircle.setMap(null);
	}
	
	var icon = new olleh.maps.MarkerImage(
			"../images/common/marker/Map-Marker-Ball-Azure-icon.png",
			new olleh.maps.Size(40, 40),
			new olleh.maps.Pixel(0,0),
			new olleh.maps.Pixel(20, 40)
		);
	startMarker= new olleh.maps.Marker({ 
			position: coord,  
			map: map,  
//			shadow: shadow,
			icon: icon,			
			title : '출발지',
			zIndex : 1		
	  	});
	startCircle = setCircle( coord, "#00ffff", getSessionItem("loginInfo").startRange );
};


var checkEndLocation = function() {
	console.log("checkEndLocation()");
	$.getJSON( rootPath + "/room/getLocationSession.do", function(result) {
		var locationSession = result.data;
		if ( locationSession && locationSession != null &&
				locationSession.endName && locationSession.endName != null && locationSession.endName != "" &&
				locationSession.endX && locationSession.endX != null && locationSession.endX != "" &&
				locationSession.endY && locationSession.endY != null && locationSession.endY != "" ) {
			setEndLocation(
					locationSession.endX, 
					locationSession.endY, 
					locationSession.endName, 
					locationSession.endPrefix );
			
			setSessionItem("locationSession", locationSession);
			searchRooms();
			
		} else {
			$.getJSON( rootPath + "/member/getRecentDestination.do", function(result) {
				if (result.status === "success") {
					var recentDestinationList = result.data;
					if ( recentDestinationList.length > 0 ) {
//						console.log(recentDestinationList);
						setEndSession(
								recentDestinationList[0].fvrtLocLng, 
								recentDestinationList[0].fvrtLocLat, 
								recentDestinationList[0].fvrtLocName, 
								"최근목적지: ", 
								function() {
									checkEndLocation();
								} );
					}
				}
			});
			
		}
	});
};


var setEndLocation = function (x, y, locName, prefix) {
	console.log("setEndLocation()");
	
	if ( !prefix || prefix == null ) {
		prefix = "";
	}
	
	$("#endInput").val(prefix + locName)
									.attr("placeholder", prefix + locName );
	
	var coord = new olleh.maps.Coord( x, y );
	if (endMarker) {
		endMarker.setMap(null);
	}
	if (endCircle) {
		endCircle.setMap(null);
	}
	
	var icon = new olleh.maps.MarkerImage(
			"../images/common/marker/Map-Marker-Ball-Pink-icon.png",
			new olleh.maps.Size(40, 40),
			new olleh.maps.Pixel(0,0),
			new olleh.maps.Pixel(20, 40)
		);
		endMarker= new olleh.maps.Marker({ 
			position: coord,  
			map: map,  
//			shadow: shadow,
			icon: icon,			
			title : '출발지',
			zIndex : 1		
	  	});
	endCircle = setCircle( coord, "#00ffff", getSessionItem("loginInfo").endRange );
};


var setCircle = function( coord, color, radius ) {
	var circle = new olleh.maps.Circle({
		center: coord,
		radius: radius,
		map: map,
		fillColor: color, 
		fillOpacity: 0.07,
		strokeColor: color,
		strokeOpacity: 0.4,
		strokeWeight: 1
	});
	
	return circle;
};


var searchLocation = function( target ) {
    console.log("searchLocation()");
    var query = $.trim($(target).val());
    if ( target && query != "" ) {
            if ( query.indexOf("내위치: ") == 0 || query.indexOf("최근목적지: ") == 0 ) {
                    query = query.split(": ")[1];
            } 

            var params = null;
            if ( $(target).get(0) == $("#startInput").get(0) ) {
                    params = { "query" : query };
            } else if ( $(target).get(0) == $("#endInput").get(0) ) {
                    params = { "query" : query };
            }
            
            changeHref("../location/location.html", params);
    }

};


var searchRooms = function() {
	console.log("searchRooms()");
	
	var locationSession = getSessionItem("locationSession");
	var loginInfo = getSessionItem("loginInfo");
	isRoomMbr(
			function() {
				$("#btnAddViewRoom").text("방");
				$("#divRoomList").data("isRoomMbr", "true");
			}, 
			function() {
				$("#btnAddViewRoom").text("+");
				$("#divRoomList").data("isRoomMbr", "false");
			} );
	$.post( rootPath + "/room/searchRooms.do"
			, {
				startLat 		: locationSession.startY,
				startLng 	: locationSession.startX,
				startRange 	: loginInfo.startRange,
				endLat 		: locationSession.endY,
				endLng 		: locationSession.endX,
				endRange 	: loginInfo.endRange
			}, function(result) {
				if (result.status == "success") {
					initRoute();

					var searchRoomList = result.data;
					console.log(searchRoomList);
					
					var roomPathList = null;
					var roomMbrList = null;
					var startInfo = null;
					var endInfo = null;
					var waypoints = [];
					var startTime = null;
					var isMyRoom = "false";
					var loginInfo = getSessionItem("loginInfo");
					
					var roomList = [];
					
					for( var i = 0; i < searchRoomList.length; i++ ) {
						roomPathList = searchRoomList[i].roomPathList;
						roomMbrList = searchRoomList[i].roomMbrList;
						
						startInfo = null;
						endInfo = null;
						waypoints = [];
						
						startTime = new Date(searchRoomList[i].roomStartTime);
						startTime = startTime.toTimeString().substr(0, 5);
						
						isMyRoom = "false";
						for ( var j in roomMbrList ) {
							if ( roomMbrList[j].mbrId == loginInfo.mbrId ) {
								isMyRoom = "true";
							}
						}
						
						for ( var j in roomPathList) {
							if ( roomPathList[j].pathRank == 0 ) {
								startInfo = roomPathList[j];
								
							} else if ( roomPathList[j].pathRank == 99 ) {
								endInfo = roomPathList[j];
								
							} else {
								waypoints[waypoints.length] = roomPathList[j];
								
							}
						}
						
						roomList[i] = {
							roomNo : searchRoomList[i].roomNo,
							startTime : startTime,
							startX : startInfo.pathLng,
							startY : startInfo.pathLat,
							endX : endInfo.pathLng,
							endY: endInfo.pathLat,
							roomMbrCount : searchRoomList[i].roomMbrCount,
							isMyRoom : isMyRoom,
							waypoints : waypoints
						};
						
					}
					
//					createRoomList(roomList);
					
					if ( $('#divRoomList').data("flag") == "close" ) {
						$('#divRoomList').data("flag", "open")
												.animate({right:"0px"},500);
					}
					
				} else {
					console.log("fail");
					
				}
			}, "json");
};


var createRoomList = function( roomList ) {
	console.log("createRoomList( roomList )");
//	console.log( roomList );
	
	if ( !myScrolll ) {
		loaded();
	}
	
	$("#ulRoomList").children().remove();
	$("#scroller").css("width", 0+"px");
/*	
	<div class="divRoomInfoArea">
		<legend>09:10</legend>
		<div class="divRoomMbrThumbs">
			<img src="../images/photo/m02.jpg">
			<img src="../images/photo/m03.jpg">
			<img src="../images/photo/m04.jpg">
		</div>
	</div>
	<div class="divBtnArea">
		<div>
		<a class="btnJoinRoom"><span>같이타자</span></a>
		</div>
	</div>		*/	
	for ( var i in roomList ) {
		$("<li>")
			.css("left",(contentWidth * i) + "px")
			.css("width", contentWidth)
			.append(
					$("<div>")
						.addClass("divRoomInfoArea")
						.append(
								$("<legend>")
									.text("09:10") )
									)
						.append(
								$("<div>")
									.addClass("divRoomMbrThumbs")
									.append(
											$("<img>")
												.attr("src", "../images/photo/m02.jpg") )
									.append(
											$("<img>")
												.attr("src", "../images/photo/m03.jpg") ) 
									.append(
											$("<img>")
												.attr("src", "../images/photo/m04.jpg") ) ) //)
			.append(
					$("<div>")
						.addClass("divBtnArea")
						.append(
								$("<div>")
									.append(
											$("<a>")
												.addClass("btnJoinRoom")
												.append(
														$("<span>")
															.text("같이타자") ) ) ) )
			.appendTo( $("#ulRoomList") );			
	}
	console.log($("#ulRoomList"));
	myScrolll.refresh();
		
								
	
	
	
	
	
//	for ( var i in roomList ) {
//		$("<li>").addClass("roomlst_l")
//					.attr("data-theme", "no-theme")
//					.attr("data-icon", "false")
//					.append(
//				$("<a>").attr("href", "#")
//							.addClass("roomItem")
//							.data("roomNo", roomList[i].roomNo)
//							.data("startX", roomList[i].startX)
//							.data("startY", roomList[i].startY)
//							.data("endX", roomList[i].endX)
//							.data("endY", roomList[i].endY)
//							.data("roomMbrCount", roomList[i].roomMbrCount)
//							.data("isMyRoom", roomList[i].isMyRoom)
//							.text( roomList[i].startTime ) 
//							.click(function(e) {
//								initRoute();
//								searchRoute( 
//										parseFloat($(this).data("startX")), 
//										parseFloat($(this).data("startY")),
//										parseFloat($(this).data("endX")),
//										parseFloat($(this).data("endY")),
//										"directionsService_callback",
//										roomList[i].waypoints );
//								
//								$("#divRoomList").css("opacity", "0.6");
//								$("#divRoomList a").css("color", "white");
//								
//								if ( $("#divRoomList").data("isRoomMbr") == "false" && 
//										$(this).data("roomMbrCount") < 4 ) {
//									$(".btnJoin").removeClass("ui-disabled");
//								} else {
//									$(".btnJoin").addClass("ui-disabled");
//								}
//								
//								$("#divRoomControl_popup").data("roomNo", $(this).data("roomNo"))	
//																	.data("roomMbrCount", $(this).data("roomMbrCount"));
//								$("#divRoomControl_popup").popup("open", {
//									transition: "slideup"
//								});
//								
//							}) )
//		.appendTo( $("#ulRoomList") );
//	}
//	roomListScroll.refresh();
//	$("#ulRoomList").listview("refresh");
	
};


var initRoute = function() {
	if (directionsRenderer) {
		directionsRenderer.setMap(null);
	}
	
	if (directionMarkers) {
		for( var i in directionMarkers ) {
			directionMarkers[i].setMap(null);
		}
	}
};


var isRoomMbr = function( isRoomMbrTrue, isRoomMbrFalse ) {	
	console.log("isRoomMbr()");
	$.getJSON( rootPath + "/room/isRoomMbr.do", function(result) {
		if (result.status == "success") {
//			console.log(result.data);
			setSessionItem("isRoomMbr", result.data);
			
			if (result.data === true) {
				isRoomMbrTrue();
        	} else {
        		isRoomMbrFalse();
        	}
			
		} else {
			alert("요청 처리중 오류 발생");
		}
	});
};


var addRoom = function() {  
	console.log("addRoom()");
	
	var locationSession = getSessionItem("locationSession");
    var startTime = new Date(); 
    startTime.setHours($("#setTimeBox").datebox('getTheDate').getHours()); 
    startTime.setMinutes($("#setTimeBox").datebox('getTheDate').getMinutes()); 
    if($("#radioDaySelect li[checked]").val() == "tomorrow") { 
        startTime.setDate(startTime.getDate() + 1); 
    } 
//	distance, fare는 추후 수정필요   
    var distance = 21600;
    var fare = 20000; 
    console.log(startTime);
    if ( startTime && startTime != null && startTime != "" &&
    		locationSession && locationSession != null &&
    		locationSession.startName && locationSession.startName != null && locationSession.startName != "" &&
    		locationSession.startX && locationSession.startX != null && locationSession.startX != "" &&
    		locationSession.startY && locationSession.startY != null && locationSession.startY != "" &&
    		locationSession.endName && locationSession.endName != null && locationSession.endName != "" &&
    		locationSession.endX && locationSession.endX != null && locationSession.endX != "" &&
    		locationSession.endY && locationSession.endY != null && locationSession.endY != ""
    		) {
    	$.post( rootPath + "/room/addRoom.do",  {
    	    roomStartTime : startTime,
    	    roomDistance : distance,
            roomFare : fare,
            startLocName : locationSession.startName,
            startLocLng : locationSession.startX,
            startLocLat : locationSession.startY,  
    	    startLocRank : 0,
            endLocName : locationSession.endName,
            endLocLng : locationSession.endX,
            endLocLat : locationSession.endY,  
            endLocRank : 99
        }, 
        function(result) {
            if (result.status == "success") { 
            	changeHref("../room/room.html", { roomNo : result.data});
            	 
            } else { 
            	console.log(result.data);
            	 
            } 
        }, 
        "json");  
    }
};  

//var checkSettedLocations = function () {
//console.log("checkSettedLocations()");
//var loginInfo = getSessionItem("loginInfo");
//var locationSession = getSessionItem("locationSession");
//
//if ( locationSession && locationSession != null &&
//		locationSession.startX && !locationSession.startX != null &&
//		locationSession.startY && !locationSession.startY != null &&
//		locationSession.endX && !locationSession.endX != null &&
//		locationSession.endY && !locationSession.endY != null &&
//		loginInfo && loginInfo != null &&
//		loginInfo.startRange && !loginInfo.startRange != null &&
//		loginInfo.endRange && !loginInfo.endRange != null ) {
//	searchRoute( 
//			parseFloat( locationSession.startX ), 
//			parseFloat( locationSession.startY ),
//			parseFloat( locationSession.startX ),
//			parseFloat( locationSession.startY ),
//			"distance_callback");
//}
//};
//var distance_callback = function (data) {
//console.log("distance_callback()");
//var directionsResult  = directionsService.parseRoute(data);
//var distance = directionsResult.result.total_distance.value;
//setSessionItem("distance", distance);
//
//searchRooms();
//};


var searchRoute = function ( startX, startY, endX, endY, callbackFunc, waypoints ) {
	console.log("searchRoute()");
	var DirectionsRequest = {
		origin 		: new olleh.maps.Coord( startX, startY ),
		destination : new olleh.maps.Coord( endX, endY ),
		waypoints 	: waypoints,
		projection 	: olleh.maps.DirectionsProjection.UTM_K,
		travelMode	: olleh.maps.DirectionsTravelMode.DRIVING,
		priority  		: olleh.maps.DirectionsDrivePriority.PRIORITY_3	//1.최단 거리 우선(PRIORITY = 0),2.고속도로 우선(PRIORITY = 1),3.무료 도로 우선(PRIORITY = 2),4.최적 경로(PRIORITY = 3)
	};
	directionsService.route(DirectionsRequest, callbackFunc);

};
var directionsService_callback = function (data) {
	console.log("directionsService_callback()");
	var DirectionsResult  = directionsService.parseRoute(data);
//	var distance = DirectionsResult.result.total_distance.value;
//	setSessionItem("distance", distance);
	
	directionMarkers = [];
	var routes = DirectionsResult.result.routes;
	console.log(DirectionsResult.result);
	for( var i in routes) {
		if ( routes[i].type == "999" ) {
			directionMarkers[directionMarkers.length] = setWaypointMarker( 
					new olleh.maps.Coord( routes[i].point.x, routes[i].point.y ), 
					"../images/common/marker/MapMarker_Flag3_Right_Azure.png" );   
		} 
		
		if ( routes[i].type == "1000" ) {
			directionMarkers[directionMarkers.length] = setWaypointMarker( 
					new olleh.maps.Coord( routes[i].point.x, routes[i].point.y ), 
					"../images/common/marker/MapMarker_Flag1_Right_Chartreuse.png" ); 
		}
		
		if ( routes[i].type == "1001" ) {
			directionMarkers[directionMarkers.length] = setWaypointMarker( 
					new olleh.maps.Coord( routes[i].point.x, routes[i].point.y ), 
					"../images/common/marker/MapMarker_ChequeredFlag_Right_Pink.png" ); 
		}
	}
	
	var DirectionsRendererOptions = {	
		directions : DirectionsResult,
		map : map,
		keepView : true,
		offMarkers : true,
		offPolylines : false
	};
	
	directionsRenderer = new olleh.maps.DirectionsRenderer(DirectionsRendererOptions);
	directionsRenderer.setMap(map);
};


var setWaypointMarker = function( coord, imageUrl ) {
	console.log("setWaypointMarker()");
	var icon = new olleh.maps.MarkerImage(
		imageUrl,
		new olleh.maps.Size(40, 40),
		new olleh.maps.Pixel(0,0),
		new olleh.maps.Pixel(5, 40)
	);
	var marker = new olleh.maps.Marker({ 
		position: coord,  
		map: map,  
//		shadow: shadow,
		icon: icon,			
		title : 'Current Location',
		zIndex : 1		
  	});

	return marker;
};


var joinRoom = function(roomNo) { 
	console.log("joinRoom()");
	
    isRoomMbr(
    		function() { //isRoomMbrTrue
		    	alert("이미 방에 참여 중입니다.");
		    }, 
		    function() { //isRoomMbrFalse
		    	var locationSession = getSessionItem("locationSession");
		    	$.post( rootPath + "/room/joinRoom.do", 
		    			{ 
							roomNo : roomNo,
							endLocName : locationSession.endName,
							endLocLat : locationSession.endY,
							endLocLng : locationSession.endX
						}, 
						function(result) { 
							if (result.status =="success") { 
								changeHref("../room/room.html", { roomNo : roomNo});
								
							} else { 
								console.log(result.data);
								
							} 
						}, "json");
		    });
};


var favoriteList = function() {
    console.log("favoriteList()");
    
    $.getJSON( rootPath + "/member/getFavoritePlaces.do", function(result) {
        if(result.status == "success") {
            var fvrtLoc = result.data; 
            var ul = $("#favoriteUl"); 
              
            $("#favoriteUl #favoriteList").remove(); 
            for (var i in fvrtLoc) {
                $("<li>") 
                    .attr("id", "favoriteList") 
                    .attr("data-theme","f") 
                    .attr("data-icon", "false") 
                    .data("endX", fvrtLoc[i].fvrtLocLng) 
                    .data("endY", fvrtLoc[i].fvrtLocLat)
                    .data("locName", fvrtLoc[i].fvrtLocName)
                    .click( function(event){
                     	setEndSession(
                     			$(this).data("endX"), 
                     			$(this).data("endY"), 
                     			$(this).data("locName"), 
                    			"", 
                    			function () {
                		    		checkEndLocation();
                		    		map.moveTo( new olleh.maps.Coord($(this).data("endX"), $(this).data("endY")) );
                                    $("#divFavoriteLoc_popup").popup("close"); 
                		    	});
                    })
                    .append(
                    		$("<a>") 
                            	.attr("id", "favoriteLink") 
                                .attr("href","#") 
                                .text( fvrtLoc[i].fvrtLocName) 
                                .append(
                                		$("<img>") 
                                			.addClass("ui-li-icon ui-corner-none")
	                                        .attr("src", "../images/common/star-th.png")  
                                ) 
                    )
                    .appendTo(ul);
                $("#favoriteUl").listview("refresh"); 
            } 
        } else { 
	        // 즐겨찾기 없을경우 + 버튼 추가     
	              
        } 
    }); 
};

			

var showRoomInfo = function(roomNo) {
	console.log("showRoomInfo()");
//	console.log(roomNo);
	$.getJSON( rootPath + "/room/getRoomInfo.do?roomNo=" + roomNo, 
			function(result) {
		
		var roomInfo = result.data;
//		console.log(roomInfo);
		
		if(result.status == "success") {
			
			var d = new Date(roomInfo.roomStartTime);
			
			var hour = d.toTimeString().substring(0, 2);
			var minute = d.toTimeString().substring(3, 5);
			var ampm = "AM";
			
			if (hour > 12) {
				ampm = "PM";
				hour = hour - 12 ;
			}
		
//			 var mbrPhotoUrl = getSessionItem("loginInfo").mbrPhotoUrl;
//			 console.log(mbrPhotoUrl);
			
//			$("#member01").attr("src", mbrPhotoUrl);
//			var ul = $("#popup_list");
//			$("#popup_list #relationInfo").remove();
			
//			var d = new Date(roomInfo.roomStartTime);
//			var hour = d.getHours();
//			var minute = d.getMinutes();
//			var ampm = "AM";
//			if (hour > 12) {
//			ampm = "PM";
//			hour = hour - 12 ;
//		}
			$("#startLocName").text( roomInfo.roomPathList[0].pathName );
			$("#endLocName").text( roomInfo.roomPathList[1].pathName );
			$("#startTime").text( hour + ":" + minute );
			$("#startDay").text( ampm );
			$("#distance").text("("+roomInfo.roomDistance+"KM)");
			
			    var canvas = document.getElementById("myCanvas");
			    canvas.width = canvas.width;
			    var ctx = canvas.getContext("2d");
			    
			    ctx.beginPath();
			    ctx.fillStyle="black";
			    
			    var img = document.getElementById("back");
			    ctx.drawImage(img, 0, 0, 320, 320);
			    
			    // 방장
			    if( (roomInfo.roomMbrList[2] && roomInfo.roomMbrList[2] != null)){	
			    	if(roomInfo.roomMbrList[0].roomMbrId 
			    		== roomInfo.roomMbrList[2].mbrId) { 
			    		horizontalLine(true);
			    	}
				} 
			    
			    if( (roomInfo.roomMbrList[1] && roomInfo.roomMbrList[1] != null)){	
			    	if(	roomInfo.roomMbrList[0].roomMbrId 
				    		== roomInfo.roomMbrList[1].mbrId) {  
					first(true);
			    	}
				} 
			    
			    if( (roomInfo.roomMbrList[3] && roomInfo.roomMbrList[3] != null)){	
			    	if(roomInfo.roomMbrList[0].roomMbrId 
				    		== roomInfo.roomMbrList[3].mbrId) {  
					fourth(true);
			    	}
			    }
			    
			    // 두번째 멤버
			    if( (roomInfo.roomMbrList[1] && roomInfo.roomMbrList[1] != null) && 
			    		(roomInfo.roomMbrList[3] && roomInfo.roomMbrList[3] != null)){	
			    	
			    	if(roomInfo.roomMbrList[1].roomMbrId 
			    			== roomInfo.roomMbrList[3].mbrId) {  
			    		
			    		if( (roomInfo.roomMbrList[1].frndRelId != "" &&
				    			roomInfo.roomMbrList[1].frndRelId != null)
						    		&& (roomInfo.roomMbrList[1].frndRelName != null &&
						    				roomInfo.roomMbrList[1].frndRelName != "") ) {
			    			
							var fixDot1 = new Image();
							fixDot1.src = "../images/common/fixdot.png";
							fixDot1.onload = function() {
								ctx.drawImage(fixDot1, 175, 170, 30, 30);
								ctx.font="13px Gothic";
								ctx.fillStyle="black";
								ctx.fillText(roomInfo.roomMbrList[1].frndRelName, 135, 196);//
								ctx.font="11px Gothic";
								ctx.fillStyle="crimson";
								ctx.fillText("("+roomInfo.roomMbrList[1].mbrName + "님의 친구)", 133, 210);//
				    		};
						}
			    	verticalLine(true);
			    	}	
			    } 
			    
			    if( (roomInfo.roomMbrList[1] && roomInfo.roomMbrList[1] != null) && 
			    				(roomInfo.roomMbrList[0] && roomInfo.roomMbrList[0] != null)){
			    	if(roomInfo.roomMbrList[1].roomMbrId 
				    		== roomInfo.roomMbrList[0].mbrId) {  
			    		if( (roomInfo.roomMbrList[1].frndRelId != "" &&
				    			roomInfo.roomMbrList[1].frndRelId != null)
						    		&& (roomInfo.roomMbrList[1].frndRelName != null &&
						    				roomInfo.roomMbrList[1].frndRelName != "") ) {
			    			
							var fixDot1 = new Image();
							fixDot1.src = "../images/common/fixdot.png";
							fixDot1.onload = function() {
								ctx.drawImage(fixDot1, 40, 40, 30, 30);
								ctx.font="13px Gothic";
								ctx.fillStyle="black";
								ctx.fillText(roomInfo.roomMbrList[1].frndRelName, 32, 20);
								ctx.font="11px Gothic";
								ctx.fillStyle="crimson";
								ctx.fillText("("+roomInfo.roomMbrList[1].mbrName + "님의 친구)", 15, 38);//
				    		};
				    	}
					first(true);
			    	}
				} 
			    
			    if( (roomInfo.roomMbrList[1] && roomInfo.roomMbrList[1] != null) && 
								(roomInfo.roomMbrList[2] && roomInfo.roomMbrList[2] != null)){
			    	if(roomInfo.roomMbrList[1].roomMbrId 
				    		== roomInfo.roomMbrList[2].mbrId) { 
			    		if( (roomInfo.roomMbrList[1].frndRelId != "" &&
				    			roomInfo.roomMbrList[1].frndRelId != null)
						    		&& (roomInfo.roomMbrList[1].frndRelName != null &&
						    				roomInfo.roomMbrList[1].frndRelName != "") ) {
							
							var fixDot1 = new Image();
							fixDot1.src = "../images/common/fixdot.png";
							fixDot1.onload = function() {
								ctx.drawImage(fixDot1, 255, 40, 30, 30);
								ctx.font="13px Gothic";
								ctx.fillStyle="black";
								ctx.fillText(roomInfo.roomMbrList[1].frndRelName, 250, 20);
								ctx.font="11px Gothic";
								ctx.fillStyle="crimson";
								ctx.fillText("("+roomInfo.roomMbrList[1].mbrName + "님의 친구)", 225, 38);//
				    		};
						}
					second(true);
			    	}
	    		} 
			    
			    // 세번째 멤버
			    	if( (roomInfo.roomMbrList[2] && roomInfo.roomMbrList[2] != null)
			    			&& (roomInfo.roomMbrList[1] && roomInfo.roomMbrList[1] != null)){	
				    	if(roomInfo.roomMbrList[2].roomMbrId 
				    			== roomInfo.roomMbrList[1].mbrId) {  
				    		if( (roomInfo.roomMbrList[2].frndRelId != "" &&
					    			roomInfo.roomMbrList[2].frndRelId != null)
							    		&& (roomInfo.roomMbrList[2].frndRelName != null &&
							    				roomInfo.roomMbrList[2].frndRelName != "") ) {
								var fixDot2 = new Image();
								fixDot2.src = "../images/common/fixdot.png";
								fixDot2.onload = function() {
					    			ctx.drawImage(fixDot2, 255, 40, 30, 30);
					    			ctx.font="13px Gothic";
									ctx.fillStyle="black";
									ctx.fillText(roomInfo.roomMbrList[2].frndRelName, 250, 20);
									ctx.font="11px Gothic";
									ctx.fillStyle="crimson";
									ctx.fillText("("+roomInfo.roomMbrList[2].mbrName + "님의 친구)", 225, 38);//
					    		};
							}
						second(true);
				    	}
					} 
			    	
			    	if( (roomInfo.roomMbrList[2] && roomInfo.roomMbrList[2] != null)){	
				    	if(roomInfo.roomMbrList[2].roomMbrId 
					    		== roomInfo.roomMbrList[0].mbrId) {   
				    		if( (roomInfo.roomMbrList[2].frndRelId != "" &&
					    			roomInfo.roomMbrList[2].frndRelId != null)
							    		&& (roomInfo.roomMbrList[2].frndRelName != null &&
							    				roomInfo.roomMbrList[2].frndRelName != "") ) {
								var fixDot2 = new Image();
								fixDot2.src = "../images/common/fixdot.png";
					    		fixDot2.onload = function() {
					    			ctx.drawImage(fixDot2, 100, 117, 30, 30);//
					    			ctx.font="13px Gothic";
									ctx.fillStyle="black";
									ctx.fillText(roomInfo.roomMbrList[2].frndRelName, 130, 138);
									ctx.font="11px Gothic";
									ctx.fillStyle="crimson";
									ctx.fillText("("+roomInfo.roomMbrList[2].mbrName + "님의 친구)", 105, 155);//
					    		};
							}
						horizontalLine(true);
				    	}
					} 
			    	
			    	if( (roomInfo.roomMbrList[3] && roomInfo.roomMbrList[3] != null)){	
				    	if(roomInfo.roomMbrList[2].roomMbrId 
					    		== roomInfo.roomMbrList[3].mbrId) {  
				    		if( (roomInfo.roomMbrList[2].frndRelId != "" &&
					    			roomInfo.roomMbrList[2].frndRelId != null)
							    		&& (roomInfo.roomMbrList[2].frndRelName != null &&
							    				roomInfo.roomMbrList[2].frndRelName != "") ) {
								var fixDot2 = new Image();
								fixDot2.src = "../images/common/fixdot.png";
								fixDot2.onload = function() {
									ctx.drawImage(fixDot2, 255, 255, 30, 30);
					    			ctx.font="13px Gothic";
									ctx.fillStyle="black";
									ctx.fillText(roomInfo.roomMbrList[2].frndRelName, 250, 300);//
									ctx.font="11px Gothic";
									ctx.fillStyle="crimson";
									ctx.fillText("("+roomInfo.roomMbrList[2].mbrName + "님의 친구)", 225, 315);
					    		};
							}
						third(true);
				    	}
					} 
			    	
				
				// 라스트멤버
		    	if( (roomInfo.roomMbrList[3] && roomInfo.roomMbrList[3] != null) && 
		    			(roomInfo.roomMbrList[1] && roomInfo.roomMbrList[1] != null)){	
			    	if(roomInfo.roomMbrList[3].roomMbrId 
			    			== roomInfo.roomMbrList[1].mbrId) {   
			    		if( (roomInfo.roomMbrList[3].frndRelId != "" &&
				    			roomInfo.roomMbrList[3].frndRelId != null)
						    		&& (roomInfo.roomMbrList[3].frndRelName != null &&
						    				roomInfo.roomMbrList[3].frndRelName != "") ) {
							var fixDot3 = new Image();
				    		fixDot3.src = "../images/common/fixdot.png";
				    		fixDot3.onload = function() {
				    			ctx.drawImage(fixDot3, 172, 170, 30, 30);
								ctx.font="13px Gothic";
								ctx.fillStyle="black";
								ctx.fillText(roomInfo.roomMbrList[3].frndRelName, 130, 190);//
								ctx.font="11px Gothic";
								ctx.fillStyle="crimson";
								ctx.fillText("("+roomInfo.roomMbrList[3].mbrName + "님의 친구)", 119, 205);//
				    		};
						}
					verticalLine(true);
			    	}
				} 
		    	if( (roomInfo.roomMbrList[3] && roomInfo.roomMbrList[3] != null) && 
							(roomInfo.roomMbrList[2] && roomInfo.roomMbrList[2] != null)){	
		    		if(roomInfo.roomMbrList[3].roomMbrId 
		    				== roomInfo.roomMbrList[2].mbrId) { 
		    			if( (roomInfo.roomMbrList[3].frndRelId != "" &&
				    			roomInfo.roomMbrList[3].frndRelId != null)
						    		&& (roomInfo.roomMbrList[3].frndRelName != null &&
						    				roomInfo.roomMbrList[3].frndRelName != "") ) {
							var fixDot3 = new Image();
				    		fixDot3.src = "../images/common/fixdot.png";
				    		fixDot3.onload = function() {
				    			ctx.drawImage(fixDot3, 255, 255, 30, 30);
				    			ctx.font="13px Gothic";
								ctx.fillStyle="black";
								ctx.fillText(roomInfo.roomMbrList[3].frndRelName, 250, 300);//
								ctx.font="11px Gothic";
								ctx.fillStyle="crimson";
								ctx.fillText("("+roomInfo.roomMbrList[3].mbrName + "님의 친구)", 225, 315);
				    		};
						}
					third(true);
		    		}
				} 
		    	if( (roomInfo.roomMbrList[3] && roomInfo.roomMbrList[3] != null) && 
						(roomInfo.roomMbrList[0] && roomInfo.roomMbrList[0] != null)){	
			    	if(roomInfo.roomMbrList[3].roomMbrId 
				    		== roomInfo.roomMbrList[0].mbrId) {  
			    		if( (roomInfo.roomMbrList[3].frndRelId != "" &
				    			roomInfo.roomMbrList[3].frndRelId != null)
						    		& (roomInfo.roomMbrList[3].frndRelName != null &
						    				roomInfo.roomMbrList[3].frndRelName != "") ) {
			    			
						var fixDot3 = new Image();
			    		fixDot3.src = "../images/common/fixdot.png";
			    		fixDot3.onload = function() {
			    			ctx.drawImage(fixDot3, 40, 250, 30, 30);
			    			ctx.font="13px Gothic";
							ctx.fillStyle="black";
							ctx.fillText(roomInfo.roomMbrList[3].frndRelName, 43, 295);
							ctx.font="11px Gothic";
							ctx.fillStyle="crimson";
							ctx.fillText("("+roomInfo.roomMbrList[3].mbrName + "님의 친구)", 10, 310);
			    		};
					}
					fourth(true);
			    	}
				} 
				
				function first(yn){
					if(yn){
						eval("ctx.beginPath();\n" +
						    		"ctx.moveTo(53, 150);\n" +
						    		"ctx.lineTo(53, 53);\n" +
						    		"ctx.lineTo(150, 53);\n" +
						    		"ctx.lineWidth=10;\n" +
						    		"ctx.lineJoin='round';\n" +
						    		"ctx.strokeStyle='#00DE6F'");
				    	 ctx.stroke();
				    	 
					} else {
						
					}
				};
				
			    function second(yn) {
			    	if (yn) {
				    	eval("ctx.beginPath();\n" +
						    		"ctx.moveTo(150, 53);\n" +
						    		"ctx.lineTo(270, 53);\n" +
						    		"ctx.lineTo(270, 150);\n" +
						    		"ctx.lineWidth=10;\n" +
						    		"ctx.lineCap='round';\n" +
						    		"ctx.strokeStyle='#00DE6F';");
				    	
				    	 ctx.stroke();
				    	
			    	} else {
			    		
			    	}
			    };
			    
			    function third(yn) {
			    	if (yn) {
				    	eval("ctx.beginPath();\n" +
						    		"ctx.moveTo(270, 150);\n" +
						    		"ctx.lineTo(270, 270);\n" +
						    		"ctx.lineTo(150, 270);\n" +
						    		"ctx.lineWidth=10;\n" +
						    		"ctx.lineCap='round';\n" +
						    		"ctx.strokeStyle='#00DE6F';");
				    	ctx.stroke();
				    	
			    	} else {
			    		
			    	}
			    };
			    
			    function fourth(yn) {
			    	if (yn) {
				    	eval("ctx.beginPath();\n" +
						    		"ctx.moveTo(150, 270);\n" +
						    		"ctx.lineTo(53, 270);\n" +
						    		"ctx.lineTo(53, 150);\n" +
						    		"ctx.lineWidth=10;\n" +
						    		"ctx.lineCap='round';\n" +
						    		"ctx.strokeStyle='#00DE6F';");
				    	 ctx.stroke();
				    	 
			    	} else {
			    		
			    	}
			    };
			    
			    function horizontalLine(yn) {
			    	if (yn) {
				    	eval("ctx.beginPath();\n" +
						    		"ctx.moveTo(53, 140);\n" +
						    		"ctx.lineTo(270, 140);\n" +
						    		"ctx.lineWidth=10;\n" +
						    		"ctx.lineCap='round';\n" +
						    		"ctx.strokeStyle='#00DE6F';");
				    	 ctx.stroke();
				    	 
			    	} else {
			    		
			    	}
			    };
			    
			    function verticalLine(yn) {
			    	if (yn) {
				    	eval("ctx.beginPath();\n" +
						    		"ctx.moveTo(180, 53);\n" +
						    		"ctx.lineTo(180, 270);\n" +
						    		"ctx.lineWidth=10;\n" +
						    		"ctx.lineCap='round';\n" +
						    		"ctx.strokeStyle='#00DE6F';");
				    	 ctx.stroke();
					    
			    	} else {
			    		
			    	}
			    };
			    
	    		ctx.font="13px Gothic";
	    		ctx.fillStyle="black";
	    		ctx.fillText(roomInfo.roomMbrList[0].mbrName, 28, 218);
	    		
			    var photo = new Image();
			    photo.src = roomInfo.roomMbrList[0].mbrPhotoUrl;
			    var ctx1 = canvas.getContext("2d"); 	
			    var ctx2 = canvas.getContext("2d");
	    		photo.onload = function() {
	    			ctx1.beginPath();
	    		
	    			
	    			if(roomInfo.roomMbrList[1] && roomInfo.roomMbrList[1] != null && roomInfo.roomMbrList[1] != ""){
				    		ctx2.moveTo(160, 50);
				    		ctx2.arc(160, 50, 38, 0, Math.PI * 2);
			    			ctx.font="13px Gothic";
					    	ctx.fillStyle="black";
					    	ctx.fillText(roomInfo.roomMbrList[1].mbrName, 138, 108);
					    	
				    		var photo1 = new Image();
				    		photo1.src = roomInfo.roomMbrList[1].mbrPhotoUrl;
						    photo1.onload = function() {
						    	ctx.drawImage(photo1, 122, 11, 80, 80);
				    		};

			    			
	    			}
	    			
	    			if(roomInfo.roomMbrList[2] && roomInfo.roomMbrList[2] != null && roomInfo.roomMbrList[2] != ""){
			    			ctx1.moveTo(270, 160);
			    			ctx1.arc(270, 160, 38, 0, Math.PI * 2);
			    			ctx.font="13px Gothic";
							ctx.fillStyle="black";
							ctx.fillText(roomInfo.roomMbrList[2].mbrName, 248, 214);
	    				
				    		var photo2 = new Image();
				    		photo2.src = roomInfo.roomMbrList[2].mbrPhotoUrl;
						    photo2.onload = function() {
						    	ctx.drawImage(photo2, 230, 120, 80, 80);
				    		};

	    			}
	    			
	    			if(roomInfo.roomMbrList[3] && roomInfo.roomMbrList[3] != null && roomInfo.roomMbrList[3] != ""){
		    			ctx1.moveTo(160, 270);
		    			ctx1.arc(160, 260, 38, 0, Math.PI * 2);
		    			ctx.font="13px Gothic";
						ctx.fillStyle="black";
						ctx.fillText(roomInfo.roomMbrList[3].mbrName, 138, 315);
			    		
			    		var photo3 = new Image();
			    		photo3.src = roomInfo.roomMbrList[3].mbrPhotoUrl;
					    photo3.onload = function() {
					    	ctx.drawImage(photo3, 120, 218, 80, 80);
			    		};
	    			}
	    			
	    			ctx1.moveTo(50, 160);
	    			ctx1.arc(50, 160, 38, 0, Math.PI * 2);
	    			ctx1.strokeStyle='#AEAEAE';
	    			ctx1.lineWidth=8;
	    			ctx1.stroke();
	    			ctx2.stroke();
	    			
		    		ctx1.clip();
		    		
		    		ctx.drawImage(photo, 12, 123, 75, 75);
		    		
	    		};
		    	// Frnd's frnd dot.
		} // if(success)

	}); // getJSON
}; // end
			
			

