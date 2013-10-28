$(document).ready(function() {
	init();
	drawRelationMap();
	
	$("#btnAddRoom").click(function() {
		$("#divAddRoomCondition_popup").popup("open");
	});
	
	$("#divRoomList a").click(function() {
//		alert("1. 경로 지도에 표시 \n2. 하단 버튼 슬라이드 업");
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





// olleh Map
var map;
var myMarker;
var startPoint;
var endPoint;
var geocoder;
var directionsService;

function init() {  
	// 현재위치 가져오기
	navigator.geolocation.getCurrentPosition(function(position) {
		var point = new olleh.maps.Point( position.coords.longitude, position.coords.latitude );
		var srcproj = new olleh.maps.Projection('WGS84');
		var destproj = new olleh.maps.Projection('UTM_K');
		olleh.maps.Projection.transform(point, srcproj, destproj);
		console.log(point.getX() + " | " +point.getY());
		loadMap(point);
		initLocations(point);
	});
} 

function initLocations(currPoint) {
	geocoder = new olleh.maps.Geocoder("KEY");
	
	startPoint = currPoint;
  	geocoder.geocode(
  			{
		  		type: 1,
		  		isJibun: 1,
		  		x: startPoint.getX(), 
		  		y: startPoint.getY()
  			}, 
  			"startLocatoin_callback");
  	startLocatoin_callback = function(data) {
			var geocoderResult = geocoder.parseGeocode(data);
			if(geocoderResult["count"] != "0"){
				var infoArr = geocoderResult["infoarr"];
				for(var i=0; i<infoArr.length; i++){
					$("#textStartLocation").attr("placeholder", "현위치: " + infoArr[i].address);
				}
			}
		};
  	
  	endPoint = new olleh.maps.Point(127.002032, 37.57812);	//최근 목적지  /////////////////////////////////////// 최근목적지 리스트 가져오는것 구현해야 함. 현재 임시 값임.//////
  	geocoder.geocode(
  			{
  				type: 1,
  				isJibun: 1,
  				x: endPoint.getX(), 
  				y: endPoint.getY()
  			}, 
  			"endLocatoin_callback");
  	endLocatoin_callback = function(data) {
		var geocoderResult = geocoder.parseGeocode(data);
		if(geocoderResult["count"] != "0"){
			var infoArr = geocoderResult["infoarr"];
			for(var i=0; i<infoArr.length; i++){
				$("#textEndLocation").attr("placeholder", "최근목적지: " + infoArr[i].address);
			}
		}
  	};
  	
  	searchRooms();
}

function searchRooms() {
	if(!startPoint) {
		alert("출발지를 지정해주세요.");
		return;
	}
	if(!endPoint) {
		alert("목적지를 지정해주세요.");
		return;
	}
	
	var url = "room/searchRooms.do";
	var params = "?startLat=" + startPoint.getY() + 
						"&startLng=" + startPoint.getX() +
						"&endLat=" + endPoint.getY() +
						"&endLng=" + endPoint.getX();
	url += params;
	$.getJSON(url, function(result) {
		if (result.status == "SUCCESS") {
			console.log("SUCCESS");
			console.log(result.data);
			var searchRoomList = result.data; 
			for( var i = 0; i < searchRoomList.length; i++ ) {
				var startTime = new Date(searchRoomList[i].roomStartTime);
				var no = searchRoomList[i].roomNo;
				console.log(no + " | " + startTime.getHours() + ":" + startTime.getMinutes());
//				$("#ulRoomList")
			}
			
		} else {
			console.log("FAIL");
		}
	});
}


function loadMap(currPoint) {
	curCoord = new olleh.maps.Coord(currPoint.getX(), currPoint.getY());
  	var mapOptions = {  	
     	center : curCoord,
     	zoom : 10,
     	mapTypeId : olleh.maps.MapTypeId.BASEMAP
  	}; 
  	map = new olleh.maps.Map(document.getElementById("canvas_map"), mapOptions);
  	
  	
  	// 마커 아이콘
	var icon = new olleh.maps.MarkerImage(
		'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc1/275382_100001276016427_722347921_t.jpg',
		new olleh.maps.Size(35, 35),
		new olleh.maps.Pixel(0,0),
		new olleh.maps.Pixel(0,30)
	);

	var marker = new olleh.maps.Marker({ 
		position: curCoord,  
		map: map,  
//		shadow: shadow,
		icon: icon,			
		title : 'Current Location',
		zIndex : 1		
  	});
	
	// 반경
	var circle = new olleh.maps.Circle({
		center: curCoord,
		radius: 500,
		map: map,
		fillColor: "#008888", 
		fillOpacity: 0.35,
		strokeColor: "#008888",
		strokeOpacity: 0.5,
		strokeWeight: 3
	});
	
}




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