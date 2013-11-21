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



$(document).ready(function(){

	var params = getParams(window.location.href);
	console.log(params);
	var feedRoomNo = params.roomNo;

//	loginInfo();
//	개인 세션 정보로 Select

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

	 $(document).on("click", "#btnDelete", function(){
		 var mbrId = $(this).attr("data-mbrId");
		 var feedNo = $(this).attr("data-feedNo");
		 var feedRoomNo = $(this).attr("data-feedRoomNo");

		 deleteFeed(mbrId, feedNo, feedRoomNo);
	 });

	 $("#relationView").click(function() {
		 	var roomNo = $("#roomNo").attr("data-roomNo");
		 	showRelationInfo(roomNo);
	 });

	 $("#icons").click(function(){
		window.location.href="../home/home.html";
	 });



	 $("#outRoom").on("click", function(){
			 var mbrId = getSessionItem("loginInfo").mbrId;
			 var roomNo = $("#roomNo").attr("data-roomNo");
			 outRoom(mbrId, roomNo);
	 });
});


var searchRoute = function ( startX, startY, endX, endY, callbackFunc, waypoints ) {
	console.log("searchRoute()");
	var DirectionsRequest = {
		origin 		: new olleh.maps.Coord( startX, startY ),
		destination : new olleh.maps.Coord( endX, endY ),
		waypoints 	: waypoints,
		projection 	: olleh.maps.DirectionsProjection.UTM_K,
		travelMode	: olleh.maps.DirectionsTravelMode.DRIVING,
		priority  		: olleh.maps.DirectionsDrivePriority.PRIORITY_0
	};
	directionsService.route(DirectionsRequest, callbackFunc);

};


var directionsService_callback = function (data) {
	console.log("directionsService_callback()");
	var DirectionsResult  = directionsService.parseRoute(data);
	console.log(DirectionsResult);
	distance = DirectionsResult.result.total_distance.value;

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



//var distance_callback = function (data) {
//console.log("distance_callback()");
//var directionsResult  = directionsService.parseRoute(data);
//var distance = directionsResult.result.total_distance.value;
//searchRooms();
//};


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

	$.getJSON("outRoom.do?mbrId=" + mbrId + "&roomNo=" + roomNo
											 , function(result) {
				if(result.status == "success") {
					window.location.href = "../home/home.html";

				} else {
					alert("실행중 오류발생!");
					console.log(result.data);

				}
		});
};



var getRoomInfo = function(roomNo) {

	$.getJSON("getRoomInfo.do?roomNo=" + roomNo,
								function(result) {

	var roomInfo = result.data;

	if(result.status == "success") {

		console.log("init()");
		console.log("방 거리 : " + distance);


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
	     	mapTypeId : olleh.maps.MapTypeId.BASEMAP
	  	};
	  	map = new olleh.maps.Map(document.getElementById("canvas_map"), mapOptions);
		console.log(startLng, startLat, endLng, endLat, dsCallBack);
	  	searchRoute(startLng, startLat, endLng, endLat, dsCallBack);

		var d = new Date(roomInfo.roomStartTime);

		var hour = d.toTimeString().substring(0, 2);
		var minute = d.toTimeString().substring(3, 5);
		var ampm = "AM";

		if (hour > 12) {
			ampm = "PM";
			hour = hour - 12 ;
		}

		$("#roomStartTime").text( hour +":"+ minute );
		$("#roomStartDay").text(ampm);
		$("#roomFare").text(roomInfo.roomFare + "원");
		$("#roomDistance").text("("+roomInfo.roomDistance+"KM)");
		$("#imgMbrPhoto").attr( "src", getSessionItem("loginInfo").mbrPhotoUrl );
		$("#mbrName").text( getSessionItem("loginInfo").mbrName );
		$("#roomNo").attr("data-roomNo", roomInfo.roomNo);

	} else {
		alert("실행중 오류발생!");
		console.log(result.data);
	}
});
};


var getFeedList = function(feedRoomNo){
	$.getJSON("../feed/feedList.do?feedRoomNo="
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
									.attr("style", "width:80px; height:80px;")
									.attr("src", feedList[i].mbrPhotoUrl))
								.append( $("<h2>")
									.text(feedList[i].mbrName));

					if(feedList[i].mbrId === mbrId){
								 	li.append( $("<p>")
								 			.append( $("<strong>").text(feedList[i].feedContent) )
								 			.append( $("<a>")
								 						.attr("id", "btnDelete")
								 						.attr("data-role", "button")
								 						.attr("data-inline", "true")
														.attr("data-icon","delete")
														.attr("data-iconpos", "notext")
														.attr("data-feedRoomNo", feedList[i].feedRoomNo)
														.attr("data-feedNo", feedList[i].feedNo)
														.attr("data-mbrId", feedList[i].mbrId)
								 						))
									.append( $("<p>")
												.attr("class","ui-li-aside")
												.text(feedList[i].feedRegDate) )
									.appendTo(ul);

								 	$('ul a[data-role=button]').buttonMarkup("refresh");
					$('ul').listview('refresh');

					} else {
						console.log("else");
						li.append( $("<p>")
								 .append( $("<strong>").text(feedList[i].feedContent))
									.append( $("<p>")
										.attr("class","ui-li-aside")
										.text(feedList[i].feedRegDate)))
									       .appendTo(ul);
						$('ul').listview('refresh');
					}
			} // 반복문 end
		}
	});
};


var addFeed = function(mbrId, feedContent, feedRoomNo) {
	console.log("addFeed:" + mbrId, feedContent, feedRoomNo);
	$.post("../feed/addFeed.do",
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

	console.log("deleteFeed:" + mbrId, feedNo, feedRoomNo);

	$.getJSON("../feed/deleteFeed.do?mbrId=" + mbrId +
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



var showRelationInfo = function(roomNo) {
	console.log("showRelationInfo()");

	$.getJSON("getRoomInfo.do?roomNo=" + roomNo,
			function(result) {

		var roomInfo = result.data;
		console.log(roomInfo);

		if(result.status == "success") {

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


	 /*


	  $.post("getRoomInfo.do",
			{
					roomNo	:  roomNo,
			},
			function(result) {
				if(result.status == "success") {
					console.log("결과 데이터" + result.data);

				} else {
					alert("실행중 오류발생!");
					console.log(result.data);
				}
			},
	"json");
};
//	console.log(parseInt($("#feedList").val($(this).attr("data-feedNo"))));
	  var addResult = result.data;
		console.log(addResult);

		var ul = $(".listViewUl");

				$("<li>")
					.attr("id", "feedList")
					.attr("data-feedRoomNo", addResult.feedRoomNo)
					.attr("data-feedNo", addResult.feedNo)
					.attr("data-mbrId", addResult.mbrId)
						.append( $("<img>")
							.attr("style", "width:80px; height:80px;")
							.attr("src", "../images/photo/test5.png") ) // loginInfo.PhotoUrl
								 .append( $("<h2>").text( addResult.mbrId ) )
								 	 .append( $("<p>")
										 .append( $("<strong>").text( addResult.feedContent )))
										 	 .append( $("<p>")
										 			 .attr("class","ui-li-aside")
										 			 .text( addResult.feedRegDate) )
				.appendTo(ul);

				$('ul').listview('refresh');*/