var that = this;

$(document).ready(function() {
	init();
	drawRelationMap();
	
	$("#tmpSearch").click(function() {
		searchRooms();
	});
	
	$("#divRoomList").on("click", ".roomItem", function() {
		console.log("ulRoomList");
		that.searchRoute( 
				parseFloat($(this).attr("data-startX")), 
				parseFloat($(this).attr("data-startY")),
				parseFloat($(this).attr("data-endX")),
				parseFloat($(this).attr("data-endY")) );
		$("#divRoomList").css("opacity","0.6");
		$("#divRoomControl_popup").popup("open", {
			transition: "slideup"
		});
	});
	
	
	$("#btnAddRoom").click(function() {
		$("#divAddRoomCondition_popup").popup("open");
	});
	$("#divAddRoomCondition_popup a[data-icon=delete]").click(function() {
		$("#divAddRoomCondition_popup").popup("close");
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
		
		coord = new olleh.maps.Coord(curPoint.getX(), curPoint.getY());
		loadMap(coord, 10);
		setCurMarker();
		geocoder = new olleh.maps.Geocoder("KEY");
		setStartLocation(curPoint);
		setEndLocation( new olleh.maps.Point(960804.5, 1956454) );		///////////////////////////////////// 하드 코딩으로 위치 지정 나중에 변경되야 할 부분
		directionsService = new olleh.maps.DirectionsService('frKMcOKXS*l9iO5g');
	});
};

var loginInfo = function() {
	$.getJSON("auth/loginInfo.do", function(result) {
		if (result.status == "success") {
			loginInfo = result.data;
			
		} else {
			alert("로그인 인증실패");
			$.mobile.changePage("auth/auth.html", {reloadPage : true});
		}
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

var searchRoute = function ( startX, startY, endX, endY ) {
	console.log("searchRoute");
	loadMap( new olleh.maps.Coord(curPoint, startY), 10);
	var DirectionsRequest = {
		origin : new olleh.maps.Coord( startX, startY ),
		destination : new olleh.maps.Coord( endX, endY ),
		projection : olleh.maps.DirectionsProjection.UTM_K,
		travelMode : olleh.maps.DirectionsTravelMode.DRIVING,
		priority  : olleh.maps.DirectionsDrivePriority.PRIORITY_0
	};
	directionsService.route(DirectionsRequest, "directionsService_callback");
};
function directionsService_callback (data){
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
	DirectionsRenderer.getDirections();
	DirectionsRenderer.setMap(map);
};

var searchRooms = function() {
	setStartTime( new Date($.now()) );
	
	var url = "room/searchRooms.do";
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
					$("#ulRoomList > .roomlst_l").remove(); 
					if (searchRoomList.length < 1) {
						$("<li>").addClass("roomlst_l_menu")
									.attr("data-role", "list-divider")
									.attr("data-theme", "no-theme")
									.attr("data-icon", "false")
									.text("리스트")
						.appendTo( $("#ulRoomList") );
					}
					for( var i = 0; i < searchRoomList.length; i++ ) {
						var startTime = new Date(searchRoomList[i].roomStartTime);
						var no = searchRoomList[i].roomNo;
						console.log(no + " | " + startTime.getHours() + ":" + startTime.getMinutes());
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
											.text( startTime.getHours() + ":" + startTime.getMinutes() ) )
						.appendTo( $("#ulRoomList") );
						$("#ulRoomList").listview("refresh");
					}
					
					if ( $('#divRoomList').attr("data-flag") == "close" ) {
						$('#divRoomList').attr("data-flag", "open")
												.animate({right:"0px"},500);
					} else {
						$('#divRoomList').attr("data-flag", "close")
												.animate({right: "-150px"},500);  
					}
				} else {
					console.log("fail");
				}
			}, "json");
};







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