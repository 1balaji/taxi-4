$(document).ready(function() {
	init();
	drawRelationMap();
	
	$("#tmpSearch").click(function() {
		searchRooms();
		
	});
	
	$("#btnAddRoom").click(function() {
		$("#divAddRoomCondition_popup").popup("open");
	});
	
	$("#divRoomList a").click(function() {
//		alert("1. 경로 지도에 표시 \n2. 하단 버튼 슬라이드 업");
		searchRoute();
		$("#divRoomControl_popup").popup("open", {
			transition: "slideup"
		});
	});
	
	
	// 방등록 조건 팝업 관련
	$("#divAddRoomCondition_popup a[data-icon=delete]").click(function() {
		$("#divAddRoomCondition_popup").popup("close");
	});
	
	
	// 방리스트 패널 관련 
	$("#ulSearchRoomList a").click(function() {
		$("#formRoomInfo_popup").popup("open");
	});
});




var loginInfo;
// olleh Map
var map;
var coord;
var curPoint, curMarker;

var geocoder;

var startPoint;
var endPoint;
var directionsService;

var init = function () {
	// 회원정보 가져오기
	loginInfo();
	
	// 현재위치 가져오기
	navigator.geolocation.getCurrentPosition(function(position) {
//		curPoint = new olleh.maps.Point( 127.058766, 37.598184 );		//961050.3182397316 | 1955510.7090402246
//		curPoint = new olleh.maps.Point( 126.929682, 37.484513 );		//949578.9221358099 | 1942960.8693880793 
//		curPoint = new olleh.maps.Point( 127.027583, 37.498125 );		//958241.8585819643 | 1944423.101265581
		curPoint = new olleh.maps.Point( position.coords.longitude, position.coords.latitude );
		var srcproj = new olleh.maps.Projection('WGS84');
		var destproj = new olleh.maps.Projection('UTM_K');
		olleh.maps.Projection.transform(curPoint, srcproj, destproj);
		console.log(curPoint.getX() + " | " +curPoint.getY());
		
		loadMap(curPoint, 10);
		setCurMarker();
		geocoder = new olleh.maps.Geocoder("KEY");
		setStartLocation(curPoint);
		setEndLocation( new olleh.maps.Point(960804.5, 1956454) );
	});
};

var loginInfo = function() {
	$.getJSON("auth/loginInfo.do", function(result) {
		if (result.status == "success") {
			loginInfo = result.data;
			
		} else {
			alert("로그인 인증실패");
		}
	});
};

var loadMap = function (point, zoom) {
	console.log("loadMap");
	coord = new olleh.maps.Coord(point.getX(), point.getY());
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

var setStartLocation = function (point) {
	console.log("setStartLocation");
  	geocoder.geocode(
			{
		  		type: 1,
		  		isJibun: 1,
		  		x: point.getX(), 
		  		y: point.getY()
			}, 
			"startLocatoin_callback");
  	startLocatoin_callback = function(data) {
		var geocoderResult = geocoder.parseGeocode(data);
		if(geocoderResult["count"] != "0"){
			var infoArr = geocoderResult["infoarr"];
			for(var i=0; i<infoArr.length; i++){
				$("#hiddenStartX").val( infoArr[i].x );
				$("#hiddenStartY").val( infoArr[i].y );
				$("#textStartLocation").val("내위치: " + infoArr[i].address);
			}
		}
	};
};

var setEndLocation = function(point) {
	console.log("setEndLocation");
  	geocoder.geocode(
  			{
  				type: 1,
  				isJibun: 1,
  				x: point.getX(), 
  				y: point.getY()
  			}, 
  			"endLocatoin_callback");
  	endLocatoin_callback = function(data) {
		var geocoderResult = geocoder.parseGeocode(data);
		if(geocoderResult["count"] != "0"){
			var infoArr = geocoderResult["infoarr"];
			for(var i=0; i<infoArr.length; i++){
				$("#hiddenEndX").val( infoArr[i].x );
				$("#hiddenEndY").val( infoArr[i].y );
				$("#textEndLocation").val( "최근목적지: " + infoArr[i].address );
				
			}
		}
  	};
};

var setStartTime = function( date ) {
	console.log("setStartTime");
	var dateTimeStr = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" +  date.getDate() + " "
									+  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
	$("#hiddenStartTime").val( dateTimeStr );
};





var searchRoute = function (pointStart, pointEnd) {
	console.log("searchRoute");
	directionsService = new olleh.maps.DirectionsService('frKMcOKXS*l9iO5g');
	var DirectionsRequest = {
		origin : new olleh.maps.Coord(958280.8128180101, 1944033.1845990776),
		destination : new olleh.maps.Coord(960804.5, 1956454),
		projection : olleh.maps.DirectionsProjection.UTM_K,
		travelMode : olleh.maps.DirectionsTravelMode.DRIVING,
		priority  : olleh.maps.DirectionsDrivePriority.PRIORITY_0
	};
	directionsService.route(DirectionsRequest, "directionsService_callback");
};

function directionsService_callback(data){
	var directionsResult  = directionsService.parseRoute(data);
	console.log(directionsResult);
	var DirectionsRendererOptions = {
		directions : directionsResult,
		map : map,
		keepView : true,
		offMarkers : false,
		offPolylines : false
	};
	var DirectionsRenderer = new olleh.maps.DirectionsRenderer(DirectionsRendererOptions);
	DirectionsRenderer.setMap(map);
}










var searchRooms = function() {
	setStartTime( new Date($.now()) );
	console.log( $("#hiddenStartX").val() );
	console.log( $("#hiddenStartY").val() );
	console.log( $("#hiddenEndX").val() );
	console.log( $("#hiddenEndY").val() );
	console.log( $("#hiddenStartTime").val() );
	
	var url = "room/searchRooms.do";
	var params = "?startLat=" + $("#hiddenStartY").val() + 
						"&startLng=" + $("#hiddenStartX").val() +
						"&endLat=" + $("#hiddenEndX").val() +
						"&endLng=" + $("#hiddenStartY").val() +
						"&startDateTime=" + $("#hiddenStartTime").val();
//	url += params;
	$.post(url, 
			{
				startLat : $("#hiddenStartY").val(),
				startLng : $("#hiddenStartX").val(),
				endLat : $("#hiddenEndY").val(),
				endLng : $("#hiddenEndX").val(),
				startDateTime : $("#hiddenStartTime").val()
			}, function(result) {
				if (result.status == "success") {
					console.log(result.data);
					var searchRoomList = result.data;
					//<li data-role="list-divider" data-theme="f">방목록</li>
					$("#ulRoomList > li").remove(); 
					$("<li>").attr("data-role", "list-divider")
							.attr("data-theme", "f")
							.text("방목록")
					.appendTo( $("#ulRoomList") );
					for( var i = 0; i < searchRoomList.length; i++ ) {
						var startTime = new Date(searchRoomList[i].roomStartTime);
						var no = searchRoomList[i].roomNo;
						console.log(no + " | " + startTime.getHours() + ":" + startTime.getMinutes());
						$("<li>").attr("data-theme", "f").append( 
								$("<a>").attr("href", "#")
											.attr("data-no", searchRoomList[i].roomNo)
											.text( startTime.getHours() + ":" + startTime.getMinutes() ) )
						.appendTo( $("#ulRoomList") );
						$("#ulRoomList").listview("refresh");
					}
				} else {
					console.log("fail");
				}
			}, "json");
//	$.getJSON(url, function(result) {
//		if (result.status == "SUCCESS") {
//			console.log("SUCCESS");
//			console.log(result.data);
//			var searchRoomList = result.data; 
//			for( var i = 0; i < searchRoomList.length; i++ ) {
//				var startTime = new Date(searchRoomList[i].roomStartTime);
//				var no = searchRoomList[i].roomNo;
//				console.log(no + " | " + startTime.getHours() + ":" + startTime.getMinutes());
////				$("#ulRoomList")
//			}
//			
//		} else {
//			console.log("FAIL");
//		}
//	});
};



//function initMap() {
//	coord = new olleh.maps.Coord(965913.7, 1928949.52);
//	var mapOptions = {
//		center : coord,
//		zoom : 10,
//		mapTypeId : olleh.maps.MapTypeId.BASEMAP
//  	};
//	map = new olleh.maps.Map(document.getElementById("canvas_map"), mapOptions);
//	directionsService = new olleh.maps.DirectionsService('frKMcOKXS*l9iO5g');
//	var DirectionsRequest = {
//		origin : new olleh.maps.Coord(960487, 1955309.75),
//		destination : new olleh.maps.Coord(960804.5, 1956454),
//		projection : olleh.maps.DirectionsProjection.UTM_K,
//		travelMode : olleh.maps.DirectionsTravelMode.DRIVING,
//		priority  : olleh.maps.DirectionsDrivePriority.PRIORITY_0
//	};
//	directionsService.route(DirectionsRequest, "directionsService_callback");
//}
//
//function directionsService_callback(data){
//	var directionsResult  = directionsService.parseRoute(data);		
//	var DirectionsRendererOptions = {
//		directions : directionsResult,
//		map : map,
//		keepView : true,
//		offMarkers : false,
//		offPolylines : false
//	};
//	var DirectionsRenderer = new olleh.maps.DirectionsRenderer(DirectionsRendererOptions);
//	DirectionsRenderer.setMap(map);
//}


























// 관계도 그리기
drawRelationMap = function() {

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