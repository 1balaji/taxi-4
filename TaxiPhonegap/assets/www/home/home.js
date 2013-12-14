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

var myScroll;

var contentWidth;
var contentHeight;


$(document).ready(function() {
//	var string = device.platform;
//	console.log("===================", string);
	console.log("homejs...");
	contentWidth = $("#contentHome").outerWidth();
	contentHeight = $(window).height();
	$("#contentHome").height(contentHeight+"px");

	var searchInputWidth = contentWidth - 30 - 30 - 12;
	$(".searchInput").width(searchInputWidth + "px");
	var divStartEndLocHeight = $("#divStartEndLoc").outerHeight();
	var divRoomListWrapHeight = $("#wrapper").outerHeight();
	var divMapWrapHeight = contentHeight - divStartEndLocHeight - divRoomListWrapHeight;
	$("#divMapWrap").height(divMapWrapHeight+"px");

	init();

	$("#btnSettings").click(function(event) {
//		event.stopPropagation();
		changeHref("../settings/settings.html");
	});

	$("#btnCurrentLoc").click(function(event) {
		event.stopPropagation();
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
    $("#startInput").click(function(event) {
		event.stopPropagation();
		this.select();
	});
    $("#endInput").click(function(event) {
		event.stopPropagation();
		this.select();
	});
	$("#aStartSearchClear").click(function(event) {
		event.stopPropagation();
		$("#startInput").val("");
		$("#aStartSearchClear").css("visibility", "hidden");
	});
	$("#aEndSearchClear").click(function(event) {
		event.stopPropagation();
		$("#endInput").val("");
		$("#aEndSearchClear").css("visibility", "hidden");
	});


	$("#btnAddViewRoom").click(function(event) {
		event.stopPropagation();
		if ($("#btnAddViewRoom > span").text() == "경로등록") {
			isRoomMbr( function() { // isRoomMbrTrue
		    	alert("이미 방에 참여 중입니다.");
		    },
		    function() { // isRoomMbrFalse
		    	var dateTime = new Date();
		    	dateTime.setMinutes( dateTime.getMinutes() + 10 );
		    	$("#setTimeBox").datebox("setTheDate", dateTime);
				$("#divAddRoomCondition_popup").popup("open", { transition  : "pop" });
				$("#setTimeBox").parent().css("display","none");
		    } );

		} else {
			$.getJSON( rootPath + "/room/getMyRoom.do", function(result) {
//				console.log(result);
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
//	$(".btnAddRoomUI").on("touchend", function(event) {
	$(".btnAddRoomUI").on("click", function(event) {		
		event.stopPropagation();
		console.log( $(this).text() );
		if ( $(this).text().trim() == "등록" ) {
//			addRoom('111111111111111111111111111'); //////////////////////////////////////////// Web용 임시
			app.initialise();	//어플배포시 주석 풀것!!!
		} else {
			$("#divAddRoomCondition_popup").popup("close");
		}
    });


    var divWrapperHeight = $("#wrapper").outerHeight();
    var moveHeight = contentHeight - divWrapperHeight;
    var transitionDuration = 300;
    $("#wrapper").on("swipeup", function() {
    	$("#wrapper").height(contentHeight - 1);
    	$("#scroller li").height(contentHeight - 1);

    	$("#wrapper").transition({y: -moveHeight}, transitionDuration);
    	$(".divRoomDetailInfo").transition({ opacity: 1}, transitionDuration );
    	$(".divRoomMbrThumbs").transition({ opacity: 0}, transitionDuration/2 );

    	setTimeout(function() {
    		$(".divRoomMbrThumbs").css("display", "none");
    		$(".divRoomDistanceAndFare").css("display", "");
    		$(".divRoomDistanceAndFare").transition({ opacity: 1 }, transitionDuration/2 );
    		$(".divRoomDetailInfo").css("visibility", "visible");
    	}, transitionDuration/2 );

    });

    $("#wrapper").on("swipedown", function() {
    	$("#wrapper").transition({y: 0}, transitionDuration);
    	$(".divRoomDetailInfo").transition({ opacity: 0}, transitionDuration );

		$(".divRoomDistanceAndFare").transition({ opacity: 0 }, transitionDuration/2 );
    	setTimeout(function() {
    		$(".divRoomDistanceAndFare").css("display", "none");
    		$(".divRoomMbrThumbs").css("display", "");
    		$(".divRoomMbrThumbs").transition({ opacity: 1 }, transitionDuration/2 );
    	}, transitionDuration/2 );

    	setTimeout(function() {
    		$("#wrapper").height(divWrapperHeight -1);
        	$("#scroller li").height(divWrapperHeight -1);
    	}, transitionDuration);
    });


    $("#setTimeBox").parent().parent().removeAttr("class").css("margin", "15px 0px");
    $("#setTimeBox").parent().parent().children().removeAttr("class");

    $("#favoriteUl").css("width",  (contentWidth - 50) + "px");


    $("<div>")
	    .attr("id", "blackImage")
	    .css("width",contentWidth + "px")
	    .css("height",contentHeight + "px")
	    .css("background","black")
	    .css("z-index","1099")
	    .css("left","0")
	    .css("top","0")
	    .css("position","absolute")
	    .css("opacity","0.5")
	    .css("visibility","hidden")
	    .appendTo($("#contentHome"));

	$("#leftPanel ul li a:link").css("width", ((contentWidth / 2) -10) + "px");
	$("#leftPanel ul li a:visited").css("width", ((contentWidth / 2) - 10) + "px");
	$(".ui-panel").css("width", (contentWidth / 2) + "px");


	$("#btnShowMenu").click(function() {
		$("#leftPanel").panel("open");
		$("#blackImage").css("visibility","visible");
	});

	$( "#leftPanel" ).on( "panelbeforeclose", function() {
		$("#blackImage").css("visibility","hidden");
	} );

	$("#blackImage").on({
		click:function(){
	    	$("#leftPanel").panel("close");
	    	$("#blackImage").css("visibility","hidden");
		},
		swipeleft: function() {
			$("#leftPanel").panel("close");
	    	$("#blackImage").css("visibility","hidden");
		}
	});

	
	
	document.addEventListener("deviceready", function() {
		document.addEventListener("backbutton", yourCallbackFunction, false);	
	}, false);
	
}); //ready()

var FINSH_INTERVAL_TIME = 2000;
var backPressedTime = 0;

var yourCallbackFunction = function() {
//	alert("!1111111");
	var tempTime = new Date().getTime();
	var intervalTime = tempTime - backPressedTime;
	
	if ( 0 <= intervalTime && FINSH_INTERVAL_TIME >= intervalTime ) {
		navigator.app.exitApp();
	} else {
		backPressedTime = tempTime;
		Toast.shortshow("'뒤로'버튼을 한번 더 누르시면 종료됩니다.");
	}
};


function loaded() {
	console.log("loadRoomScroll()");
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

			var roomLi = $( $("#ulRoomList li").get(myScroll.currPageX) );

			initRoute();

			searchRoute(
					parseFloat( roomLi.data("startX") ),
					parseFloat( roomLi.data("startY") ),
					parseFloat( roomLi.data("endX") ),
					parseFloat( roomLi.data("endY") ),
					"directionsService_callback",
					null );

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


		var myIcon = new olleh.maps.MarkerImage(
				"../images/common/marker/my_marker_red.png",
				new olleh.maps.Size(10, 10),
				new olleh.maps.Pixel(0,0),
				new olleh.maps.Pixel(5, 5) );
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

	$("#startInput").val(prefix + locName);

	var coord = new olleh.maps.Coord( x, y );
	if (startMarker) {
		startMarker.setMap(null);
	}
	if (startCircle) {
		startCircle.setMap(null);
	}

	var icon = new olleh.maps.MarkerImage(
			"../images/common/marker/MapMarker_Ball__Azure.png",
			new olleh.maps.Size(30, 30),
			new olleh.maps.Pixel(0,0),
			new olleh.maps.Pixel(15, 30)
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

	$("#endInput").val(prefix + locName);

	var coord = new olleh.maps.Coord( x, y );
	if (endMarker) {
		endMarker.setMap(null);
	}
	if (endCircle) {
		endCircle.setMap(null);
	}

	var icon = new olleh.maps.MarkerImage(
			"../images/common/marker/MapMarker_Ball__Pink.png",
			new olleh.maps.Size(30, 30),
			new olleh.maps.Pixel(0,0),
			new olleh.maps.Pixel(15, 30)
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
				$("#btnAddViewRoom > img").attr("src", "../images/common/into.png");
				$("#btnAddViewRoom > span").text("내방가기");
				$("#divRoomList").data("isRoomMbr", "true");
			},
			function() {
				$("#btnAddViewRoom > img").attr("src", "../images/common/monotone_plus_add_round.png");
				$("#btnAddViewRoom > span").text("경로등록");
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
							roomDistance: searchRoomList[i].roomDistance,
							startX : startInfo.pathLng,
							startY : startInfo.pathLat,
							endX : endInfo.pathLng,
							endY: endInfo.pathLat,
							roomMbrCount : searchRoomList[i].roomMbrCount,
							isMyRoom : isMyRoom,
							waypoints : waypoints,
							roomMbrList : roomMbrList,
							roomPathList : roomPathList
						};

					}

					createRoomList( roomList );

				} else {
					console.log("fail");

				}
			}, "json");
};



var createRoomList = function( roomList ) {
	console.log("createRoomList( roomList )");
	console.log( roomList );

	if ( !myScroll ) {
		loaded();
	}


	$("#ulRoomList").children().remove();
	$("#scroller").css("width", 0+"px");

	if (roomList && roomList.length > 0) {
		var roomMbrList = null;
		var divRoomMbrThumb = null;

		for ( var i in roomList ) {
			roomMbrList =  roomList[i].roomMbrList;

			divRoomMbrThumb = $("<div>")
												.addClass("divRoomMbrThumbs");
			for ( var j in roomMbrList ) {
				divRoomMbrThumb.append(
												$("<img>")
													.attr("src", roomMbrList[j].mbrPhotoUrl ) );
			}

			$("<li>")
				.width(contentWidth +"px")
				.data("roomIdx", i)
				.data("roomNo", roomList[i].roomNo)
				.data("startX", roomList[i].startX)
				.data("startY", roomList[i].startY)
				.data("endX", roomList[i].endX)
				.data("endY", roomList[i].endY)
				.data("roomMbrCount", roomList[i].roomMbrCount)
				.data("isMyRoom", roomList[i].isMyRoom)
				.append(
						$("<div>")
						.addClass("divRoomInfoArea")
						.append(
								$("<h2>")
									.text( roomList[i].startTime ) )
						.append(
								$("<span>")
									.addClass("spanStartLabel")
									.text("출발") )
						.append( divRoomMbrThumb )
						.append(
								$("<div>")
									.addClass("divRoomDistanceAndFare")
									.append(
											$("<h4>")
												.addClass("distance")
												.text( changeDistanceUnit(roomList[i].roomDistance) ))
									.append(
											$("<h4>")
												.addClass("fare")
												.text( calcTaxiFare(roomList[i].roomDistance) ) ) )
						.append(
								$("<div>")
									.addClass("divRoomDetailInfo")
									.append(
											$("<div>")
												.addClass("divRoomPathInfo")
												.append(
														$("<img>")
															.addClass("imgDownArrow")
															.attr("src", "../images/common/startToEnd.png") )
												.append(
														$("<h4>")
															.addClass("startLocName")
															.text(roomList[i].roomPathList[0].pathName) )
												.append(
														$("<h4>")
															.addClass("endLocName")
															.text(roomList[i].roomPathList[1].pathName) ) )
									.append(
											$("<div>")
												.addClass("divCanvas")
												.append(
														$("<canvas>")
															.addClass("canvas")
															.attr("id", "myCanvas_" + i) ) ) ) )
				.append(
						$("<div>")
							.addClass("divBtnArea")
							.width(contentWidth +"px")
							.append(
									$("<a>")
										.addClass("btnJoinRoom")
										.append(
												$("<span>")
													.text("같이타자") )
//										.on("touchend", function(event) {
										.on("click", function(event) {
											event.stopPropagation();
											var roomNo = $(this).parents("li").data("roomNo");
//											joinRoom('111111111111111111111111111', roomNo); //////////////////////////////////////////// Web용 임시
											app.initialize(roomNo);	//어플배포시 주석 풀것!!!
										}) ) )
				.appendTo( $("#ulRoomList") );

			$("#scroller").css("width", parseInt($("#scroller").css("width")) + contentWidth + "px");

			showRelationInfo(roomList[i], i);

		}

		$(".startLocName").width( ($(".divRoomPathInfo").outerWidth() - 70 ) + "px");
		$(".endLocName").width( ($(".divRoomPathInfo").outerWidth() - 70 ) + "px");

		$(".divRoomDetailInfo").css("visibility", "hidden");
		$(".divRoomMbrThumbs").css("display", "");
		$(".divRoomDistanceAndFare").css("display", "none");

		var roomLi = $( $("#ulRoomList li").get(0) );

		initRoute();

		searchRoute(
				parseFloat( roomLi.data("startX") ),
				parseFloat( roomLi.data("startY") ),
				parseFloat( roomLi.data("endX") ),
				parseFloat( roomLi.data("endY") ),
				"directionsService_callback",
				null );

	} else {
		$("<li>")
			.width(contentWidth +"px")
			.append(
					$("<div>")
					.addClass("divMsgArea")
					.append(
							$("<h2>")
								.text( "검색된 결과가 없습니다" ) ) )
			.append(
					$("<div>")
						.addClass("divBtnArea")
						.width(contentWidth +"px")
						.append(
								$("<a>")
									.addClass("btnJoinRoom")
									.append(
											$("<span>")
												.text("경로생성") ) )
						.click(function(event) {
							event.stopPropagation();
							isRoomMbr( function() { // isRoomMbrTrue
						    	alert("이미 방에 참여 중입니다.");
						    },
						    function() { // isRoomMbrFalse
						    	var dateTime = new Date();
						    	dateTime.setMinutes( dateTime.getMinutes() + 10 );
						    	$("#setTimeBox").datebox("setTheDate", dateTime);
								$("#divAddRoomCondition_popup").popup("open", { transition  : "pop" });
								$("#setTimeBox").parent().css("display","none");
						    } );
						}) )
			.appendTo( $("#ulRoomList") );

		$("#scroller").css("width", parseInt($("#scroller").css("width")) + contentWidth + "px");

	}

	if ( roomList && roomList.length > 1 ) {
		myScroll.refresh();
		myScroll.enable();

	} else {
		myScroll.disable();

	}

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

var addRoom = function(regId) {
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
    		gcmRegId : regId,
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

	directionMarkers = [];
	var routes = DirectionsResult.result.routes;
	for( var i in routes) {
		if ( routes[i].type == "999" ) {
			directionMarkers[directionMarkers.length] = setWaypointMarker(
					new olleh.maps.Coord( routes[i].point.x, routes[i].point.y ),
					"../images/common/marker/MapMarker_Marker_Outside_Azure.png" );
		}

		if ( routes[i].type == "1000" ) {
			directionMarkers[directionMarkers.length] = setWaypointMarker(
					new olleh.maps.Coord( routes[i].point.x, routes[i].point.y ),
					"../images/common/marker/MapMarker_Marker_Outside_Chartreuse.png" );
		}

		if ( routes[i].type == "1001" ) {
			directionMarkers[directionMarkers.length] = setWaypointMarker(
					new olleh.maps.Coord( routes[i].point.x, routes[i].point.y ),
					"../images/common/marker/MapMarker_Marker_Outside_Pink.png" );
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
		new olleh.maps.Size(30, 30),
		new olleh.maps.Pixel(0,0),
		new olleh.maps.Pixel(15, 30)
	);
	var marker = new olleh.maps.Marker({
		position: coord,
		map: map,
//		shadow: shadow,
		icon: icon,
		title : '내위치',
		zIndex : 1
  	});

	return marker;
};



var joinRoom = function(regId, roomNo) {
	console.log("joinRoom()");
	console.log("deviceId" + regId);

    isRoomMbr(
    		function() { //isRoomMbrTrue
		    	alert("이미 방에 참여 중입니다.");
		    },
		    function() { //isRoomMbrFalse

		    	var locationSession = getSessionItem("locationSession");
		    	console.log(rootPath);
		    	$.post( rootPath + "/room/joinRoom.do",
		    			{
			    		roomNo : roomNo,
						endLocName : locationSession.endName,
						endLocLat : locationSession.endY,
						endLocLng : locationSession.endX,
						gcmRegId : regId
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
                    .attr("data-theme","d")
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

            $("#divFavoriteLoc_popup").popup("open", {
    			transition : "pop"
    		});
        } else {
	        // 즐겨찾기 없을경우 + 버튼 추가

        }
    });
};

var showRelationInfo = function(roomInfo, idx) {
	console.log("showRelationInfo(roomInfo, idx)");
//	console.log(roomInfo, idx);

	var canvas = document.getElementById("myCanvas_" + idx);

	if ( contentWidth < 340 || contentHeight < 580 ) {
		drawRelationCanvas(roomInfo, canvas, 1);

	} else {
		drawRelationCanvas(roomInfo, canvas, 2);

	}

};


var app = {
	    // Application Constructor
		roomNo : null
		,
	    initialize: function(roomNo) {
	    	if(roomNo > 0){
	    		this.roomNo = roomNo;
	    		console.log("not null roomNo :+:" + roomNo);
	    		this.receivedEvent('deviceready');
	    	}
	    },

	    initialise: function() {
	    	var roomNo = null;
	    		this.roomNo = roomNo;
	    		console.log("null roomNo :+:" + roomNo);
	    		this.receivedEvent('deviceready');
	    },

	    // Update DOM on a Received Event
	    receivedEvent: function(id) {
				 var pushNotification = window.plugins.pushNotification;
				 console.log('Register called...');
				 pushNotification.register(this.successHandler, this.errorHandler,{"senderID":"1058995885601","ecb":"app.onNotificationGCM"});
	    },

	    // result contains any message sent from the plugin call
	    successHandler: function(result) {
	        console.log('Callback Success! Result = '+result);
	    },

	    errorHandler:function(error) {
	        console.log('Errore registrazione push:'+ error);
	    },

	    onNotificationGCM: function(e) {
	        switch( e.event )
	        {
	            case 'registered':
	            var regId = e.regid;
	            if ( regId.length > 0 && this.roomNo != null) {
	                joinRoom(regId, this.roomNo);
	            } else {
	            	addRoom(regId);
	            }
	            break;
	        }
	    }
	};


