var map;
var curCoord;
var geocoder;
var directionsService;

$(document).ready(function() {
	console.log("homejs...");
	init();
	drawRelationMap();
	
	$("#btnSettings").click(function() {
		window.location.href = "../settings/settings.html";
	});
	
	$(".divLocationInput input[type=text]").bind("keypress", function(e) {
		if (e.keyCode == 13) {
			searchLocatoin(this);
		}
	});
	
	$("#btnAddRoom").click(function() {
		isRoomMbr( function() { // isRoomMbrTrue
	    	alert("이미 방에 참여 중입니다.");
	    },
	    function() { // isRoomMbrFalse
			$("#divAddRoomCondition_popup").popup("open");
			$("#setTimeBox").parent().css("display","none");
	    });
	});
	$("#divAddRoomCondition_popup a[data-icon=delete]").click(function() {
		$("#divAddRoomCondition_popup").popup("close");
	});
	$("#btnAddRoomSubmit").click(function() { 
        addRoom(); 
    }); 
	
	$(".btnJoin").click(function() { 
        var roomNo = $("#divRoomControl_popup").attr("data-no"); 
        joinRoom(roomNo); 
    }); 
    $("#btnRoomInfo_popup").click(function() { 
        $('#divRoomList').attr("data-flag", "close").animate({right: "-150px"},300);   
    }); 
    $("#btnCloseRoomInfo").click(function() { 
        $('#divRoomList').attr("data-flag", "open").animate({right:"0px"},500); 
    }); 

    $("#btnCurrentLoc").click(function() {
    	map.moveTo(curCoord);
    	setStartLocation(curCoord.getX(), curCoord.getY(), null, "내위치: ");
    });
    
	
	 $("#btnFavoriteLoc").click(function(){ 
		favoriteList(); 
		$("#divFavoriteLoc_popup").popup("open"); 
		$('#divRoomList').attr("data-flag", "close").animate({right: "-150px"},300);
	}); 
	$("#favorite_Header").click(function(){ 
	    $("#divFavoriteLoc_popup").popup("close"); 
	});
	
}); //ready()


var init = function() {
	console.log("init()");
	// 현재위치 조회
	navigator.geolocation.getCurrentPosition(function(position) {
//		curPoint = new olleh.maps.Point( 127.027699, 37.498321 );		//강남역					37.498321, 127.027699	==>	1944444.7947507137, 958252.2212954559
//		curPoint = new olleh.maps.Point( 127.032112, 37.503734 );		//비트교육센터			37.503734, 127.032112	==>	1945043.384320117, 958645.2844253756
//		curPoint = new olleh.maps.Point( 127.001928, 37.582456 );		//혜화역					37.582456, 127.001928	==>	1953790.8525704339, 956023.6917773776
//		curPoint = new olleh.maps.Point( 127.000641, 37.586027 );		//혜화로터리				37.586027, 127.000641	==>	1954187.641569722, 955912.1639432621
//		curPoint = new olleh.maps.Point( 126.929723, 37.484207 );		//신림역					37.484207, 126.929723	==>	1942926.8986323199, 949582.3412903354
//		curPoint = new olleh.maps.Point( 126.928092, 37.484224 );		//이철헤어커커(신림점)	37.484224, 126.928092	==>	1942929.6593462331, 949438.156302435
		var curPoint = new olleh.maps.Point( position.coords.longitude, position.coords.latitude );
//		console.log(position.coords.longitude +","+ position.coords.latitude);
		var srcproj = new olleh.maps.Projection('WGS84');
		var destproj = new olleh.maps.Projection('UTM_K');
		olleh.maps.Projection.transform(curPoint, srcproj, destproj);
		curCoord = new olleh.maps.Coord(curPoint.getX(), curPoint.getY());
		
		geocoder = new olleh.maps.Geocoder("KEY");
		directionsService = new olleh.maps.DirectionsService('frKMcOKXS*l9iO5g');

		// 방참여중인가?		
		isRoomMbr(function() { // 방참여중
			// 방정보조회 == > 출발지&목적지 지정 ==> 방목록 조회 ==> 참여중인방 선택 ==> 선택된 방 경로 출력 ==> 컨트롤 팝업
			alert("[처리 해야할 로직] \n방정보조회 \n== > 출발지&목적지 지정 \n==> 방목록 조회 \n==> 참여중인방 선택 \n==> 선택된 방 경로 출력 \n==> 컨트롤 팝업");
			
			var startLocInfo = getSessionItem("startLocInfo");
			var endLocInfo = getSessionItem("endLocInfo");
			loadMap( curCoord, 10);
			setMarker( curCoord, getSessionItem("loginInfo").mbrPhotoUrl );
			if ( startLocInfo && startLocInfo != null && startLocInfo.length > 0 ) {
				setStartLocation(startLocInfo.x, startLocInfo.y, startLocInfo.locName, startLocInfo.prefix);	
			} else {
				setStartLocation(curCoord.getX(), curCoord.getY(), null, "내위치: ");
			}
			if ( endLocInfo && endLocInfo != null && endLocInfo.length > 0 ) {
				setEndLocation(endLocInfo.x, endLocInfo.y, endLocInfo.locName, endLocInfo.prefix);
			} else {
				setEndLocation( 956033.0, 1953797.0, null, "최근목적지: " );		///////////////////////////////////// 하드 코딩으로 위치 지정 나중에 변경되야 할 부분
			}
			
			
		}, 
		
		function() { // 방참여 안함
			// 좌표값이 있는가?
			var locationInfo = hasLocationInfo();
			
			var startLocInfo = getSessionItem("startLocInfo");
			var endLocInfo = getSessionItem("endLocInfo");
			
			
			if ( locationInfo ) { // 받아오는 좌표값 있을 때(location으로 부터 값받아 올때)
				loadMap( new olleh.maps.Coord(locationInfo.x, locationInfo.y), 10);
				setMarker( curCoord, getSessionItem("loginInfo").mbrPhotoUrl );
				if ( locationInfo.locType == "start") { // 출발지
					setStartLocation(locationInfo.x, locationInfo.y, locationInfo.locName, "");
					setEndLocation(endLocInfo.x, endLocInfo.y, endLocInfo.locName, endLocInfo.prefix);
					
				} else if ( locationInfo.locType == "end") { // 목적지
					setStartLocation(startLocInfo.x, startLocInfo.y, startLocInfo.locName, startLocInfo.prefix);	
					setEndLocation(locationInfo.x, locationInfo.y, locationInfo.locName, "");
				
				} else { // 그외..
					alert("아무처리도 안함");
				}
				
			} else { // 받아오는 좌표값 없을 때
				loadMap( curCoord, 10);
				setMarker( curCoord, getSessionItem("loginInfo").mbrPhotoUrl );
				if ( startLocInfo && startLocInfo != null && startLocInfo.length > 0 ) {
					setStartLocation(startLocInfo.x, startLocInfo.y, startLocInfo.locName, startLocInfo.prefix);	
				} else {
					setStartLocation(curCoord.getX(), curCoord.getY(), null, "내위치: ");
				}
				if ( endLocInfo && endLocInfo != null && endLocInfo.length > 0 ) {
					setEndLocation(endLocInfo.x, endLocInfo.y, endLocInfo.locName, endLocInfo.prefix);
				} else {
					setEndLocation( 956033.0, 1953797.0, null, "최근목적지: " );		///////////////////////////////////// 하드 코딩으로 위치 지정 나중에 변경되야 할 부분
				}
			}
		});
		
	});
};


var isRoomMbr = function(isRoomMbrTrue, isRoomMbrFalse) {	
	console.log("isRoomMbr()");
	$.getJSON("../room/isRoomMbr.do", function(result) {
		if (result.status == "success") {
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


var hasLocationInfo = function() {
	console.log("hasLocationCoord()");
	var params = getParams( window.location.href );
	
	if ( params ) { // 좌표 값이 있는 경우 (location에서 받은 좌표)
		return params;
		
	} else { // 좌표 값이 없는 경우 (현재위치)
		return;
		
	}
	
};


var loadMap = function (coord, zoom) {
	console.log("loadMap()");
  	var mapOptions = {  	
     	center : coord,
     	zoom : zoom,
     	mapTypeId : olleh.maps.MapTypeId.BASEMAP
  	}; 
  	map = new olleh.maps.Map(document.getElementById("canvas_map"), mapOptions);
};


var setMarker = function( coord, imageUrl ) {
	console.log("setMarker()");
	var icon = new olleh.maps.MarkerImage(
		imageUrl,
		new olleh.maps.Size(35, 35),
		new olleh.maps.Pixel(0,0),
		new olleh.maps.Pixel(0,35)
	);
	var marker = new olleh.maps.Marker({ 
		position: coord,  
		map: map,  
//		shadow: shadow,
		icon: icon,			
		title : 'Current Location',
		zIndex : 1		
  	});
	var circle = new olleh.maps.Circle({
		center: coord,
		radius: getSessionItem("loginInfo").startRange,
		map: map,
		fillColor: "#ff0000", 
		fillOpacity: 0.07,
		strokeColor: "#ff0000",
		strokeOpacity: 0.6,
		strokeWeight: 1
	});
};


var searchLocatoin = function( target ) {
	console.log("searchLocatoin()");
	var query = $.trim($(target).val());
	if ( target && query != "" ) {
		if ( query.indexOf("내위치: ") == 0 || query.indexOf("최근목적지: ") == 0 ) {
			query = query.split(": ")[1];
		} 

		var params = null;
		if ( $(target).get(0) == $("#textStartLocation").get(0) ) {
			console.log("1");
			params = { "query" : query };
		} else if ( $(target).get(0) == $("#textEndLocation").get(0) ) {
			console.log("2");
			params = { "query" : query };
		}
		
		window.location.href = setParams("../location/location.html", params);
	}

};

			
/**
 * params (
 * 		x 			: 지도의 x좌표,
 * 		y 			: 지도의 y좌표,
 * 		locName	: 지명
 * 		prefix		: 앞에 수식될 문구
 */
var setStartLocation = function (x, y, locName, prefix) {
	console.log("setStartLocation()");
	if ( !prefix ) {
		prefix = "";
	}
	
	if ( locName && locName != null && locName.length > 0 ) {
		setSessionItem("startLocInfo", {
			x : x,
			y : y,
			locName : locName,
			prefix :  prefix
		});
		$("#textStartLocation").val(prefix + locName)
										.attr("placeholder", prefix + locName );
		setMarker( new olleh.maps.Coord(x, y), "../images/common/marker/Map-Marker-Ball-Azure-icon.png" );
		checkSettedLocations();
	} else {
	  	geocoder.geocode(
				{
			  		type: 1,
			  		isJibun: 1,
			  		x: x, 
			  		y: y
				}, 
				"startLocatoin_callback");
	  	startLocatoin_callback = function(data) {
			var geocoderResult = geocoder.parseGeocode(data);
			if(geocoderResult["count"] != "0"){
				var infoArr = geocoderResult["infoarr"];
				for(var i=0; i<infoArr.length; i++){
					setSessionItem("startLocInfo", {
						x : infoArr[i].x,
						y : infoArr[i].y,
						locName :  infoArr[i].address,
						prefix :  prefix
					});
					$("#textStartLocation").val(prefix + infoArr[i].address)
													.attr("placeholder", prefix + infoArr[i].address );
					setMarker( new olleh.maps.Coord(x, y), "../images/common/marker/Map-Marker-Ball-Azure-icon.png" );
					checkSettedLocations();
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
 */
var setEndLocation = function (x, y, locName, prefix) {
	console.log("setEndLocation()");
	if ( !prefix ) {
		prefix = "";
	}
	
	if ( locName && locName != null && locName.length > 0 ) {
		setSessionItem("endLocInfo", {
			x : x,
			y : y,
			locName : locName,
			prefix :  prefix
		});
		$("#textEndLocation").val( prefix + locName )
										.attr("placeholder", prefix + locName );
		setMarker( new olleh.maps.Coord(x, y), "../images/common/marker/Map-Marker-Ball-Pink-icon.png" );
		checkSettedLocations();
		
	} else {
	  	geocoder.geocode(
	  			{
	  				type: 1,
	  				isJibun: 1,
	  				x: x, 
	  				y: y
	  			}, 
	  			"endLocatoin_callback");
	  	endLocatoin_callback = function(data) {
			var geocoderResult = geocoder.parseGeocode(data);
			if(geocoderResult["count"] != "0"){
				var infoArr = geocoderResult["infoarr"];
				var prefix = "";
				for(var i=0; i<infoArr.length; i++){
					setSessionItem("endLocInfo", {
						x : infoArr[i].x,
						y : infoArr[i].y,
						locName :  infoArr[i].address,
						prefix :  prefix
					});
					$("#textEndLocation").val( prefix + infoArr[i].address )
													.attr("placeholder", prefix + infoArr[i].address );
					setMarker( new olleh.maps.Coord(x, y), "../images/common/marker/Map-Marker-Ball-Pink-icon.png" );
					checkSettedLocations();
					
				}
			}
	  	};
	  	
  	};
};
		

var checkSettedLocations = function () {
	console.log("checkSettedLocations()");
	var loginInfo = getSessionItem("loginInfo");
	var startLocation = getSessionItem("startLocInfo");
	var endLocation = getSessionItem("endLocInfo");
	console.log(loginInfo);
	console.log(startLocation);
	console.log(endLocation);
	if ( startLocation && startLocation != null &&
			startLocation.x && !startLocation.x != null &&
			startLocation.y && !startLocation.y != null &&
			endLocation && endLocation != null &&
			endLocation.x && !endLocation.x != null &&
			endLocation.y && !endLocation.y != null &&
			loginInfo && loginInfo != null &&
			loginInfo.startRange && !loginInfo.startRange != null &&
			loginInfo.endRange && !loginInfo.endRange != null ) {
		searchRooms();
	}
};

			
var searchRooms = function() {
	console.log("searchRooms()");
	
	var url = "../room/searchRooms.do";
	var startLocInfo = getSessionItem("startLocInfo");
	var endLocInfo = getSessionItem("endLocInfo");
	var loginInfo = getSessionItem("loginInfo");
	$.post(url
			, {
//				startTime 	: $("#hiddenStartTime").val(),
				startLat 		: startLocInfo.y,
				startLng 	: startLocInfo.x,
				startRange 	: loginInfo.startRange,
				endLat 		: endLocInfo.y,
				endLng 		: endLocInfo.x,
				endRange 	: loginInfo.endRange
			}, function(result) {
				if (result.status == "success") {
					console.log(result.data);
					var searchRoomList = result.data;
					$("#ulRoomList > .roomlst_l").remove();
					$("#ulRoomList > .roomlst_l_menu").remove(); 
					if (searchRoomList.length > 0) {
						$("<li>").addClass("roomlst_l_menu")
									.attr("data-role", "list-divider")
									.attr("data-theme", "no-theme")
									.attr("data-icon", "false")
									.text("리스트")
						.appendTo( $("#ulRoomList") );
					}
					for( var i = 0; i < searchRoomList.length; i++ ) {
						var startTime = new Date(searchRoomList[i].roomStartTime);
						$("#divRoomList").css("opacity", "1.0");
						$("<li>").addClass("roomlst_l")
									.attr("data-theme", "no-theme")
									.attr("data-icon", "false")
									.append(
								$("<a>").attr("href", "#")
											.addClass("roomItem")
											.attr("data-no", searchRoomList[i].roomNo)
											.attr("data-startX", searchRoomList[i].pathLocList[0].pathLocLng)
											.attr("data-startY", searchRoomList[i].pathLocList[0].pathLocLat)
											.attr("data-endX", searchRoomList[i].pathLocList[1].pathLocLng)
											.attr("data-endY", searchRoomList[i].pathLocList[1].pathLocLat)
											.text( startTime.getHours() + ":" + startTime.getMinutes() ) 
											.on("click", function(e) {
												searchRoute( 
														parseFloat($(this).attr("data-startX")), 
														parseFloat($(this).attr("data-startY")),
														parseFloat($(this).attr("data-endX")),
														parseFloat($(this).attr("data-endY")),
														"directionsService_callback");
												$("#divRoomList").css("opacity", "0.6");
												$("#divRoomList a").css("color", "white");
												$("#divRoomControl_popup").popup("open", {
													transition: "slideup"
												});
												$("#divRoomControl_popup").attr("data-no",$(this).attr("data-no"));
											}) )
						.appendTo( $("#ulRoomList") );
						$("#ulRoomList").listview("refresh");
					}
					
					if ( $('#divRoomList').attr("data-flag") == "close" ) {
						$('#divRoomList').attr("data-flag", "open")
												.animate({right:"0px"},500);
//					} else {
//						$('#divRoomList').attr("data-flag", "close")
//												.animate({right: "-150px"},500);  
					}
				} else {
					console.log("fail");
				}
			}, "json");
};
			
			
var searchRoute = function ( startX, startY, endX, endY, callbackFunc ) {
	console.log("searchRoute()");
	console.log(startX, startY, endX, endY);
//	loadMap( new olleh.maps.Coord(curPoint, startY), 10);
	var DirectionsRequest = {
		origin : new olleh.maps.Coord( startX, startY ),
		destination : new olleh.maps.Coord( endX, endY ),
		projection : olleh.maps.DirectionsProjection.UTM_K,
		travelMode : olleh.maps.DirectionsTravelMode.DRIVING,
		priority  : olleh.maps.DirectionsDrivePriority.PRIORITY_0
	};
	directionsService.route(DirectionsRequest, callbackFunc);

};
var directionsService_callback = function (data) {
	console.log("directionsService_callback()");
	
	var directionsResult  = directionsService.parseRoute(data);
	
	console.log(directionsResult);
	console.log(directionsResult.result);
	console.log(directionsResult.result.routes);
//	directionsResult.result.routes.splice(1, 5);
	var routes = directionsResult.result.routes;
	routes.splice(1, routes.length - 2);
//	delete directionsResult.result.routes[1];
//	directionsResult.result.routes[0].point.id = "olleh.maps.Point_1820";
//	console.log(map);
	var distance = directionsResult.result.total_distance.value;
	console.log(distance);
	var DirectionsRendererOptions = {	
		directions : directionsResult,
		map : map,
		keepView : true,
		offMarkers : false,
		offPolylines : false
	};
	var directionsRenderer = new olleh.maps.DirectionsRenderer(DirectionsRendererOptions);
	directionsRenderer.getDirections();
	directionsRenderer.setMap(map);
	
};
			

var joinRoom = function(roomNo) { 
	console.log("joinRoom()");
	
    isRoomMbr(function() { //isRoomMbrTrue
    	alert("이미 방에 참여 중입니다.");
    }, 
    
    function() { //isRoomMbrFalse
    	$.post("../room/joinRoom.do", { 
					roomNo : roomNo 
				}, 
				function(result) { 
					console.log(result); 
					if (result.status =="success") { 
						alert("방에 참여합니다!");
						window.location.href = setParams("../room/room.html", { roomNo : roomNo}); 
					} else { 
						alert(result.data);
					} 
				}, "json");
    });
}; 


var addRoom = function() {  
	console.log("addRoom()");
//	distance, fare는 추후 수정필요   
    var distance = 3000;  
    var fare = 20000;  
    var startTime = new Date(); 
    startTime.setHours($("#setTimeBox").datebox('getTheDate').getHours()); 
    startTime.setMinutes($("#setTimeBox").datebox('getTheDate').getMinutes()); 
    if($(".selectTodayTomorrow option:selected").val() == "tomorrow") { 
        startTime.setDate(startTime.getDate() + 1); 
    } 
      
    var url = "../room/addRoom.do"; 
    var startLocInfo = getSessionItem("startLocInfo");
	var endLocInfo = getSessionItem("endLocInfo");
	
	$.post(url,  
    {  
    roomStartTime : startTime,          
    roomDistance : distance,  
        roomFare : fare,  
        pathLocRank : 0,  
        pathLocName : startLocInfo.locName,  
        pathLocLat : startLocInfo.x,  
        pathLocLng : startLocInfo.y,  
        endLocRank : 4,  
        endLocName : endLocInfo.locName,  
        endLocLat : endLocInfo.x,  
        endLocLng : endLocInfo.y,  
    }, function(result) { 
//    	console.log(result); 
        if (result.status == "success") { 
        	alert("방을 생성 완료!");
        	window.location.href = setParams("../room/room.html", { roomNo : result.data}); 
        } else { 
        	alert(result.data); 
        } 
    }, "json");  
};  

			
var favoriteList = function() {
    console.log("favoriteList()");
    
    $.getJSON("../member/getFvrtLoc.do", function(result) {
        if(result.status == "success") {
            var fvrtLoc = result.data; 
            var ul = $("#favoriteUl"); 
              
            $("#favoriteUl #favoriteList").remove(); 
            for (var i in fvrtLoc) {
                $("<li>") 
                    .attr("id", "favoriteList") 
                    .attr("data-theme","f") 
                    .attr("data-icon", "false") 
                    .attr("data-endX", fvrtLoc[i].fvrtLocLng) 
                    .attr("data-endY", fvrtLoc[i].fvrtLocLat)
                    .attr("data-locName", fvrtLoc[i].fvrtLocName)
                    .click( function(event){
//                        console.log($(this).attr("data-endX"), $(this).attr("data-endY")); 
                        setEndLocation($(this).attr("data-endX"), $(this).attr("data-endY"), $(this).attr("data-locName"), "");
                        map.moveTo( new olleh.maps.Coord($(this).attr("data-endX"), $(this).attr("data-endY")) );
                        $("#divFavoriteLoc_popup").popup("close"); 
                    })
                    .append(
                    		$("<a>") 
                            	.attr("id", "favoriteLink") 
                                .attr("href","#") 
                                .append(
                                		$("<img>") 
	                                    	.attr("id", "favoriteIco") 
	                                        .attr("style", "width:35px;") 
	                                        .attr("src", "../images/common/taxi.png")  ) 
                                .append($("<div>") 
                                    .attr("id", "favoriteText") 
                                    .text(fvrtLoc[i].fvrtLocName) ) )  
                    .appendTo(ul);
                $("#favoriteUl").listview("refresh"); 
            } 
        } else { 
	        // 즐겨찾기 없을경우 + 버튼 추가     
	              
        } 
    }); 
};
			
			
var drawRelationMap = function() {
	var c=document.getElementById("myCanvas");
	var ctx=c.getContext("2d");
	//가로1,2
	ctx.moveTo(0,123);
	ctx.lineTo(369,123);
	ctx.lineWidth=1;
	
	ctx.moveTo(0,246);
	ctx.lineTo(369,246);
	ctx.lineWidth=1;
	//세로1,2
	ctx.moveTo(123,0);
	ctx.lineTo(123,370);
	ctx.lineWidth=1;
	
	ctx.moveTo(246,0);
	ctx.lineTo(246,385);
	ctx.lineWidth=1;
	
	ctx.moveTo(0,123);
	ctx.lineTo(369,123);
	ctx.strokeStyle="#fde58b";
	ctx.lineWidth=1;
	
	ctx.stroke();
	
	
	ctx.beginPath();
	//내부 선
	ctx.moveTo(61,61);
	ctx.lineTo(308,61);
	ctx.lineWidth=4;
	
	ctx.moveTo(61,61);
	ctx.lineTo(61,308);
	ctx.lineWidth=4;
	
	ctx.moveTo(61,308);
	ctx.lineTo(308,308);
	ctx.lineWidth=4;
	
	ctx.moveTo(308,61);
	ctx.lineTo(308,308);
	ctx.lineWidth=4;
	
	ctx.moveTo(61,184);
	ctx.lineTo(308,184);
	
	ctx.lineWidth=4;
	
	ctx.moveTo(184,61);
	ctx.lineTo(184,308);
	ctx.strokeStyle="#B0C4DE";
	ctx.lineWidth=4;
	
	ctx.stroke();
	
	
	ctx.beginPath();
	//각 점
	ctx.arc(61,61,5,0,2*Math.PI);
	ctx.arc(61,308,5,0,2*Math.PI);
	ctx.arc(308,61,5,0,2*Math.PI);
	ctx.arc(308,308,5,0,2*Math.PI);
	ctx.arc(184,184,5,0,2*Math.PI);
	ctx.fillStyle="#bf9000";
	ctx.fill();
	
	
	ctx.beginPath();
	ctx.fillStyle="black";
	
	var img=document.getElementById("member01");
	ctx.drawImage(img,280,160);
	ctx.font="20px Arial";
	ctx.fillText("이지우",280,250);
	
	var img=document.getElementById("member02");
	ctx.drawImage(img,160,40);
	ctx.font="20px Arial";
	ctx.fillText("유지민",160,30);
	
	
	var img=document.getElementById("member03");
	ctx.drawImage(img,160,280);
	ctx.font="20px Arial";
	ctx.fillText("송미영",160,360);
	
	var img=document.getElementById("member04");
	ctx.drawImage(img,40,160);
	ctx.font="20px Arial";
	ctx.fillText("김상헌",40,250);
	
	
	ctx.font="12px Arial";
	ctx.fillText("이영균",280,330);
	
	ctx.font="12px Arial";
	ctx.fillText("안성헌",40,330);
	
	ctx.font="12px Arial";
	ctx.fillText("공경식",40,50);
};
			
			

