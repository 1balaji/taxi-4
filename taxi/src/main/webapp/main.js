$(document).ready(function() {
	initMap();
	drawRelationMap();
	
	$("#btnAddRoom").click(function() {
		$("#divAddRoomCondition_popup").popup("open");
	});
	
	$("#divRoomList a").click(function() {
		alert("1. 경로 지도에 표시 \n2. 하단 버튼 슬라이드 업");
		$("#divRoomControl_popup").popup("open", {
			transition: "slideup"
		});
	});
	
	$("#divRoomControl_popup > a").click(function() {
		if ($(this).text() == "참여하기") {
			alert("참여하기");
		} else {
			$("#divRoomInfo_popup").popup("open", {
				positionTo: "window"
			});
		}
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
var directionsService;

function initMap() {

	var mapOptions = {
		center : new olleh.maps.Coord(965913.7, 1928949.52),
		zoom : 10,
		mapTypeId : olleh.maps.MapTypeId.BASEMAP
  	};
	map = new olleh.maps.Map(document.getElementById("canvas_map"), mapOptions);
	directionsService = new olleh.maps.DirectionsService('frKMcOKXS*l9iO5g');
	var DirectionsRequest = {
		origin : new olleh.maps.Coord(960487, 1955309.75),
		destination : new olleh.maps.Coord(960804.5, 1956454),
		projection : olleh.maps.DirectionsProjection.UTM_K,
		travelMode : olleh.maps.DirectionsTravelMode.DRIVING,
		priority  : olleh.maps.DirectionsDrivePriority.PRIORITY_0
	};
	directionsService.route(DirectionsRequest, "directionsService_callback");
}
function directionsService_callback(data){
	var directionsResult  = directionsService.parseRoute(data);		
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


//function initMap() {
//	// 맵
//	var myCoord = new olleh.maps.Coord(965913.7, 1928949.522);
//  	var mapOptions = {  	
//     	center : myCoord,
//     	zoom : 10,
//     	mapTypeId : olleh.maps.MapTypeId.BASEMAP
//  	}; 
//  	var map = new olleh.maps.Map(document.getElementById("canvas_map"), mapOptions);
//  	
//  	// 마커
//  	var markerImage = new olleh.maps.MarkerImage(
//	  			'images/photo/jimin.jpg', 
//	  			new olleh.maps.Size(30, 40), 
//	  			new olleh.maps.Pixel(0, 0), 
//	  			new olleh.maps.Pixel(15,40));
//  	
//  	var marker = new olleh.maps.Marker({
//  		draggable : true,
//  		position : myCoord,
//  		map : map,
//  		icon : markerImage,
//  		title : 'Title : show title when mouseover',
//  		cursor : "pointer"
//  	});
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