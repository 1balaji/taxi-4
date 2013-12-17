var map;
var distance;
var geocoder;
var curCoord;
var geocoder;
var directionsService;
var startMarker;
var endMarker;
var curMarker;

var directionsRenderer;
var directionMarkers;
var startTime;
var memberCount;
var contentWidth;
var contentHeight;


$(document).ready(function(){

	document.addEventListener("deviceready", onDeviceReady, false);

	var params = getHrefParams();
	console.log(params);
	var feedRoomNo = params.roomNo;
	var contentHeight = $(window).height();
	console.log(contentHeight);
	console.log($("#mainHeader").outerHeight());
	console.log($("#content").outerHeight());
	console.log($("#commentList").outerHeight());
//	var feedheight = $("#divStartEndLoc").outerHeight()
//	$("#commentList")

//	loginInfo();
//	개인 세션 정보로 Select
	$("#divMapWrap").css("height",(contentHeight * 2 / 3) + "px");
	getRoomInfo(feedRoomNo);
	getFeedList(feedRoomNo);

	$(document).on('keypress', '#reply', function(evt){

	        var keyPressed = evt.which || evt.keyCode;
	        var mbrId = getSessionItem("loginInfo").mbrId;

	        if (keyPressed == 13) {

	        	var feedContent = $("#reply").val();
	        	$("#reply").val("");
	        	addFeed(mbrId, feedContent, feedRoomNo);
	        }
	 });

	 $(document).on("click", "#btnDelete", function(event){
		 event.stopPropagation();

		 var mbrId = $(this).attr("data-mbrId");
		 var feedNo = $(this).attr("data-feedNo");
		 var feedRoomNo = $(this).attr("data-feedRoomNo");
		 deleteFeed(mbrId, feedNo, feedRoomNo);
	 });

	 $("#icons").click(function(event){
		 event.stopPropagation();
		 changeHref("../home/home.html");
	 });

	 $(document).on("click", "#exitRoom",function(){
			$("#popupExit_popup").popup("open", {
				transition : "flip"
			});
	 });

	 $(document).on("click", "#cancleExit", function(event){
		 	event.stopPropagation();
			$("#popupExit_popup").popup("close", {
				transition : "flip"
			});
	 });


	 $("#outRoom").on("click", function(event){
		 event.stopPropagation();

		 var mbrId = getSessionItem("loginInfo").mbrId;
		 var roomNo = $("#roomNo").attr("data-roomNo");
		 outRoom(mbrId, roomNo);
	 });


	 $(function() {
		 $(document).swipe({
			  swipe:function(event, direction, distance, duration, fingerCount, phase) {
				  console.log(event, direction, distance, duration, fingerCount, phase);
			    if(direction == "up"){
			    	if($("#roomSubHeader").attr("data-flag") == "open"){
			    		event.stopPropagation();
			    		$("#divTouch").attr("style", "visibility:hidden");
						$(".divHeaderLine").attr("data-flag", "close");
						$("#roomSubHeader").attr("data-flag", "close");
						$("#divRoomList").attr("data-flag", "close").transition({y: "0px"}, 300);
						$("#headerVar").attr("src", "../images/common/defaultvar.png");
						$(".divCall1").attr("style", "opacity:0");

					} else {
					}
			    } else if(direction == "down"){
			    	if($("#roomSubHeader").attr("data-flag") == "close"){
			    		event.stopPropagation();
					$("#divTouch").attr("style", "visibility:visible");
					$("#roomSubHeader").attr("data-flag", "open");
					$(".divHeaderLine").attr("data-flag", "open");
					$("#divRoomList").attr("data-flag", "open").
								transition({y: ''+ ($("#divRoomList").height() - 11) +'px'}, 300, 'linear');
					$("#headerVar").attr("src", "../images/common/upheadervar.png");

			    	}
			    }
			  },
			  allowPageScroll:"none",
			  triggerOnTouchEnd : true,
			  excludedElements:$.fn.swipe.defaults.excludedElements+"#divMapWrap, #commentList, " +
			  														".divCall1, .divCall2, .divCall3, .divCall4"
			});

			$("#roomPage").on("click", "#roomSubHeader",function(event){
				console.log("click" + event);
				if(event.type == "click" && $("#roomSubHeader").attr("data-flag") == "close"){
					event.stopPropagation();
					$("#divTouch").attr("style", "visibility:visible");
					$("#roomSubHeader").attr("data-flag", "open");
					$(".divHeaderLine").attr("data-flag", "open");
					$("#divRoomList").attr("data-flag", "open").
								transition({y: ''+ ($("#divRoomList").height() - 11) +'px'}, 300, 'linear');
					$("#headerVar").attr("src", "../images/common/upheadervar.png");
					event.stopPropagation();
				} else if(event.type == "click" && ($(".divHeaderLine").attr("data-flag") == "open")){
					event.stopPropagation();
					$("#divTouch").attr("style", "visibility:hidden");
					$(".divHeaderLine").attr("data-flag", "close");
					$("#roomSubHeader").attr("data-flag", "close");
					$("#divRoomList").attr("data-flag", "close").transition({y: "0px"}, 300);
					$("#headerVar").attr("src", "../images/common/defaultvar.png");
					$(".divCall1").attr("style", "opacity:0");
				}
			});

			$("#divTouch").bind("touchmove touchend touchstart", function(event){
				console.log(event);
				event.stopPropagation();
			});

			$("#olleh_Main").bind("touchmove touchend touchstart swipeup swipedown", "#olleh_Pane0_svgRoot",function(event){
				event.stopPropagation();
			});
	 });

			$(document).bind("touchstart touchend", "#commentList",function(event){
				console.log(event.toElement);
				event.stopPropagation();
			});


	 		$(document).on("click", ".divCall1",function(event){
				event.stopPropagation();
				alert("aa");

			});

			$(document).on("click", ".divCall2",function(event){
				event.stopPropagation();
				alert("aa");
			});

			$(document).on("click", ".divCall3",function(event){
				event.stopPropagation();
				alert("cc");
			});

			$(document).on("click", ".divCall4",function(event){
				event.stopPropagation();
				alert("ddd");
			});

});


/**
 * deviceready 이벤트
 */
var onDeviceReady = function() {
	document.addEventListener("backbutton", touchBackBtnCallbackFunc, false);
	push();
};

/**
 * 뒤로가기 버튼 처리
 */
var touchBackBtnCallbackFunc = function() {
	console.log("touchBackBtnCallbackFunc()");
	changeHref("../home/home.html");
};


var searchRoute = function ( startX, startY, endX, endY, callbackFunc, waypoints ) {
	console.log("searchRoute()");
	var DirectionsRequest = {
		origin 		: new olleh.maps.Coord( startX, startY ),
		destination : new olleh.maps.Coord( endX, endY ),
		waypoints 	: waypoints,
		projection 	: olleh.maps.DirectionsProjection.UTM_K,
		travelMode	: olleh.maps.DirectionsTravelMode.DRIVING,
		priority  		: olleh.maps.DirectionsDrivePriority.PRIORITY_3
	};
	directionsService.route(DirectionsRequest, callbackFunc);
};


var directionsService_callback = function (data) {
	console.log("directionsService_callback()");
	var DirectionsResult  = directionsService.parseRoute(data);
	console.log(DirectionsResult);

	var date = parseInt(startTime);
//	var chargeVelo = 15;
//	var chargeTime = 35;
//	var defaultFare = 100;
//	var chargeFare = 120;

	if(	date >= 00 && date < 04){

		console.log("할증");

		var distanceFare =
			(DirectionsResult.result.total_distance.value / 142) * 120;

//		var durationFare =
//				Math.round(((
//					(Math.round(DirectionsResult.result.total_duration.value) * 60) - 540) / 35) * 100);

		var totalFare = Math.round(distanceFare + 3600);
			totalFare = totalFare.toString().substr(
												0, totalFare.toString().length -2).concat("00");

		console.log(totalFare);
		distance = DirectionsResult.result.total_distance.value  / 10.0;
		distance = Math.round(distance) / 100;

		$("#roomDistance").text( distance +"km");
		$("#totalFareName").text("할증요금")
							.css("background-color", "crimson")
							.css("color", "lightyellow");

		$("#roomFare").text( totalFare );

		var roomFare = ((totalFare / memberCount) / 100);
		var myFare = roomFare.toString().substr(
								0, totalFare.toString().length -2).concat("00").replace(".", "");
		console.log(myFare);
		$("#myFare").text( myFare + "원");

	} else {


		console.log("NO할증");

		var distanceFare =
			(DirectionsResult.result.total_distance.value / 142) * 100;

		var durationFare =
				Math.round(((
					(Math.round(DirectionsResult.result.total_duration.value) * 60) - 540) / 35) * 100) / 2;

		var totalFare = Math.round(distanceFare + 3000);
			totalFare = totalFare.toString().substr(
												0, totalFare.toString().length -2).concat("00");

		distance = DirectionsResult.result.total_distance.value  / 10.0;
		distance = Math.round(distance) / 100;

		$("#roomFare").text(totalFare + "원");

		var roomFare = ((totalFare / memberCount) / 100);
		var myFare = roomFare.toString().substr(
								0, totalFare.toString().length -2).concat("00").replace(".", "");

		$("#myFare").text( myFare + "원");
		$("#roomDistance").text( distance +"km");

		$("#totalFareName").text("Total")
						   .css("background-color", "wheat")
						   .css("color", "darkgreen");

		$("#exitRoom").attr("src","../images/common/exitroom.png");

	}

	directionMarkers = [];
	var routes = DirectionsResult.result.routes;
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


var outRoom = function (mbrId, roomNo) {

	$.getJSON( rootPath + "/room/outRoom.do?mbrId=" + mbrId + "&roomNo=" + roomNo
											 , function(result) {
				if(result.status == "success") {
					changeHref("../home/home.html");

				} else {
					alert("실행중 오류발생!");
					console.log(result.data);
				}
		});
};


var getRoomInfo = function(roomNo) {
	console.log("getRoomInfo()");

	$.getJSON( rootPath + "/room/getRoomInfo.do?roomNo=" + roomNo,
								function(result) {
	var roomInfo = result.data;

	if(result.status == "success") {

		console.log("init()	- getRoomInfo()");

		var startLat = roomInfo.roomPathList[0].pathLat;
		var startLng = roomInfo.roomPathList[0].pathLng;
		var endLat = roomInfo.roomPathList[1].pathLat;
		var endLng = roomInfo.roomPathList[1].pathLng;
		var dsCallBack = "directionsService_callback";

		geocoder = new olleh.maps.Geocoder("KEY");
		directionsService = new olleh.maps.DirectionsService('frKMcOKXS*l9iO5g');

		curCoord = new olleh.maps.Coord(startLng, startLat);

		console.log("loadMap()");
	  	var mapOptions = {
	     	center : curCoord,
	     	zoom : 10,
	     	mapTypeId : olleh.maps.MapTypeId.BASEMAP,
	     	mapTypeControl: false
	  	};
	  	map = new olleh.maps.Map(document.getElementById("canvas_map"), mapOptions);
		console.log(startLng, startLat, endLng, endLat, dsCallBack);
	  	searchRoute(startLng, startLat, endLng, endLat, dsCallBack);

		var d = new Date(roomInfo.roomStartTime);

		var hour = d.toTimeString().substring(0, 2);
		var minute = d.toTimeString().substring(3, 5);
		startTime = hour;
		memberCount = roomInfo.roomMbrCount;



		$("#roomStartTime").text( hour +":"+ minute );
		$("#roomStartDay").text("출발");
		$("#imgMbrPhoto").attr( "src", getSessionItem("loginInfo").mbrPhotoUrl );
		$("#mbrName").text( getSessionItem("loginInfo").mbrName );
		$("#roomNo").attr("data-roomNo", roomInfo.roomNo);

		var idx = 0;
//		var divRoomList = $("#divRoomList").css("top", "-" + $("#divMapWrap").css("height") - 15 + "px");
		var divRoomList = $("#divRoomList");


		$("<div>")
			.attr("id", "divCanvas")
				  .append(
						  $("<canvas>")
						  			  .addClass("canvas")
						  			  .attr("id", "myCanvas_" + idx))
			      .appendTo(divRoomList);

//		var canvas = $("#myCanvas_0");
//		canvas.width = canvas.width;

		$("#divCanvas")
			.append( $("<img>")
//					.attr("src", "../images/common/call1.png")
					.attr("style", "z-index:1000")
					.addClass("divCall1") )
			.append( $("<div>")
				.addClass("divCall2") )
			.append( $("<div>")
				.addClass("divCall3") )
			.append( $("<div>")
				.addClass("divCall4") );


		$("<div>")
			.addClass("divHeaderLine")
			.attr("data-flag", "close")
						  		.append($("<a>")
						  		.attr("href", "#")
						  		.attr("id", "btnHeaderVar")
										.append(
												$("<img>")
														  .attr("src", "../images/common/defaultvar.png")
														  .attr("id", "headerVar")
														  .addClass("headerVar")))
		.appendTo(divRoomList);

		$("#divMapWrap").append(
								$("<div>").attr("id", "divTouch"));


		console.log("" + screen.width);
		console.log("" + screen.height);

		if ( contentWidth < 340 || contentHeight < 580 ) {

			$("#divRoomList").css("top", "-277px" );

			$("#roomStartDay").css("margin-top", "20px")
							  .css("font-size: 100%");

			$("#roomFare").css("font-size", "78%");
			$("#roomStartTime").css("font-size", "200%");

			$("#roomDistance").css("width", "22%");
			$("#fareName").text("예상요금")
						  .css("width", "20%");

			$("#myFare").attr("style", "font-size: 81%")
						.attr("style", "width: 20%");

		} else {
			$("#divRoomList").css("top", "-327px" );

			$("#roomStartDay").css("margin-top", "24px")
			  .css("margin-left", "17px")
			  .css("font-size: 110%");

			$("#roomFare").attr("style", "font-size: 85%");

			$("#roomStartTime").attr("style", "font-size: 235%");

			$("#roomDistance").attr("style", "width: 22%");
			$("#fareName").text("예상요금")
			 			  .css("width", "22%");

			$("#myFare").attr("style", "font-size: 90%")
						.attr("style", "width:22%");

		}
		showRelationInfo(roomInfo, idx);

	} else {
		alert("실행중 오류발생!");
		console.log(result.data);
	}
});
};



var showRelationInfo = function(roomInfo, idx) {
	console.log("showRelationInfo(roomInfo, idx)");

	var canvas = document.getElementById("myCanvas_" + idx);

	if ( contentWidth < 340 || contentHeight < 580 ) {
		drawRelationCanvas(roomInfo, canvas, 1);

	} else {
		drawRelationCanvas(roomInfo, canvas, 2);
	}

};



var getFeedList = function(feedRoomNo){
	$.getJSON( rootPath + "/feed/feedList.do?feedRoomNo="
									+ feedRoomNo, function(result) {

		if(result.status == "success") {

			var feedList = result.data;
			var mbrId = getSessionItem("loginInfo").mbrId;
			var ul = $(".listViewUl");

			$(".listViewUl #feedList").remove();

			for (var i in feedList) {
				var li = $("<li>")
							.attr("id", "feedList")
								.append( $("<img>")
									.attr("id","feedMbrImg")
									.attr("src", feedList[i].mbrPhotoUrl))
								.append( $("<h2>")
									.text(feedList[i].mbrName));

					if(feedList[i].mbrId === mbrId){
								 	li.append( $("<p>")
								 			.append( $("<strong>").text(feedList[i].feedContent) )
								 			.append( $("<a>")
								 						.attr("id", "btnDelete")
								 						.attr("data-inline", "true")
														.attr("data-feedRoomNo", feedList[i].feedRoomNo)
														.attr("data-feedNo", feedList[i].feedNo)
														.attr("data-mbrId", feedList[i].mbrId)
															.append($("<img>").attr("src", "../images/common/deletefeed.png")
																			  .addClass("deleteFeed"))
								 						))
									.append( $("<p>")
												.attr("class","ui-li-aside")
												.text(feedList[i].feedRegDate) )
									.appendTo(ul);

								 	$('ul a[data-role=button]').buttonMarkup("refresh");
					} else {
						console.log("else");
						li.append( $("<p>")
								 .append( $("<strong>").text(feedList[i].feedContent))
									.append( $("<p>")
										.attr("class","ui-li-aside")
										.text(feedList[i].feedRegDate)))
									       .appendTo(ul);
					}
			} // 반복문 end
			$('ul').listview('refresh');

            contentHeight = $(window).height();
            var currentWarpperHeight = $("#wrapper").css("height");
            $("#wrapper").css("height", (currentWarpperHeight + 81)  + "px");
		}
	});
};


var addFeed = function(mbrId, feedContent, feedRoomNo) {
	console.log("addFeed:" + mbrId, feedContent, feedRoomNo);
	$.post( rootPath + "/feed/addFeed.do",
			{
					mbrId	:  mbrId,
			   feedRoomNo	:  feedRoomNo,
			  feedContent	:  feedContent
			},
			function(result) {
				if(result.status == "success") {
					getFeedList(feedRoomNo);

				} else {
					alert("실행중 오류발생!");
					console.log(result.data);
				}
			},
	"json");
};


var deleteFeed = function(mbrId, feedNo, feedRoomNo){

	$.getJSON( rootPath + "/feed/deleteFeed.do?mbrId=" + mbrId +
									"&feedNo=" + feedNo
										, function(result) {

				if(result.status == "success") {
					getFeedList(feedRoomNo);

				} else {
					alert("실행중 오류발생!");
					console.log(result.data);
				}
		});
};




