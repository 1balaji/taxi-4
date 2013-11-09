if (window.appContext.getObject("homejs") == undefined) {
	console.log("homejs...");
	var homejs = {
			loginInfo : null,
			map : null,
			geocoder : null,
			directionsService : null,
			
			init : function() {
				var that = this;
				console.log("init()");
				
				that.getLoginInfo();
				that.initLocation();
//				that.drawRelationMap();
				
				
				
//				$("#formLocations").on("searchLocation", function() {
//					console.log("asdadasdasdasdasdasdasdasdasdadas");
//				});
				
//				$("body").on("searchLocation", function() {
//					console.log("asdadasdasdasdasdasdasdasdasdadas");
//				});
				
				$("#tmpSearch").click(function() {
					that.searchRooms();
				});
				
				$(".divLocationInput input[type=text]").bind("keypress", function(e) {
					if (e.keyCode == 13) {
						that.searchLocatoin(this);
					}
				});
				
				$("#btnAddRoom").click(function() {
					$("#divAddRoomCondition_popup").popup("open");
				});
				$("#divAddRoomCondition_popup a[data-icon=delete]").click(function() {
					$("#divAddRoomCondition_popup").popup("close");
				});
				$("#btnAddRoomSubmit").click(function() { 
			        that.addRoom(); 
			    }); 

				
				 $("#favoriteLoc").click(function(){ 
					that.favoriteList(); 
					$("#divFavoriteLoc_popup").popup("open"); 
				}); 
				$("#favorite_Header").click(function(){ 
				    $("#divFavoriteLoc_popup").popup("close"); 
				});
				
			}, //init()
			
			
			getLoginInfo : function() {
				var that = this;
				console.log("getLoginInfo()");
				
				$.getJSON("auth/loginInfo.do", function(result) {
					if (result.status == "success") {
						that.loginInfo = result.data;
					} else {
						alert("로그인 인증실패");
//						$.mobile.changePage("../auth/auth.html", {reloadPage : true});
						window.location.href = "auth/auth.html";
					}
				});
			},
			
			
			initLocation : function () {
				var that = this;
				console.log("initLocation()");
				
				// 현재위치 가져오기
				navigator.geolocation.getCurrentPosition(function(position) {
//					curPoint = new olleh.maps.Point( 127.027699, 37.498321 );		//강남역					37.498321, 127.027699	==>	1944444.7947507137, 958252.2212954559
//					curPoint = new olleh.maps.Point( 127.032112, 37.503734 );		//비트교육센터			37.503734, 127.032112	==>	1945043.384320117, 958645.2844253756
//					curPoint = new olleh.maps.Point( 127.001928, 37.582456 );		//혜화역					37.582456, 127.001928	==>	1953790.8525704339, 956023.6917773776
//					curPoint = new olleh.maps.Point( 127.000641, 37.586027 );		//혜화로터리				37.586027, 127.000641	==>	1954187.641569722, 955912.1639432621
//					curPoint = new olleh.maps.Point( 126.929723, 37.484207 );		//신림역					37.484207, 126.929723	==>	1942926.8986323199, 949582.3412903354
//					curPoint = new olleh.maps.Point( 126.928092, 37.484224 );		//이철헤어커커(신림점)	37.484224, 126.928092	==>	1942929.6593462331, 949438.156302435
					var curPoint = new olleh.maps.Point( position.coords.longitude, position.coords.latitude );
//					console.log(position.coords.longitude +","+ position.coords.latitude);
					var srcproj = new olleh.maps.Projection('WGS84');
					var destproj = new olleh.maps.Projection('UTM_K');
					olleh.maps.Projection.transform(curPoint, srcproj, destproj);
//					console.log(curPoint.getX() + ", " +curPoint.getY());
					
					var coord = new olleh.maps.Coord(curPoint.getX(), curPoint.getY());
					console.log(coord.getY() + ", " + coord.getX());
					that.loadMap(coord, 10);
					that.setCurMarker(coord, that.loginInfo.mbrPhotoUrl);
					that.geocoder = new olleh.maps.Geocoder("KEY");
					that.setStartLocation(curPoint.getX(), curPoint.getY());
					that.setEndLocation( 956033.0, 1953797.0 );		///////////////////////////////////// 하드 코딩으로 위치 지정 나중에 변경되야 할 부분
					that.directionsService = new olleh.maps.DirectionsService('frKMcOKXS*l9iO5g');
				});	
			}, 
			
			
			loadMap : function (coord, zoom) {
				var that = this;
				console.log("loadMap");
				
			  	var mapOptions = {  	
			     	center : coord,
			     	zoom : zoom,
			     	mapTypeId : olleh.maps.MapTypeId.BASEMAP
			  	}; 
			  	that.map = new olleh.maps.Map(document.getElementById("canvas_map"), mapOptions);
			},
			
			
			setCurMarker : function(coord, imageUrl) {
				var that = this;
				console.log("setCurMarker");
				
				var icon = new olleh.maps.MarkerImage(
					imageUrl,
					new olleh.maps.Size(35, 35),
					new olleh.maps.Pixel(0,0),
					new olleh.maps.Pixel(0,35)
				);
				var curMarker = new olleh.maps.Marker({ 
					position: coord,  
					map: that.map,  
//					shadow: shadow,
					icon: icon,			
					title : 'Current Location',
					zIndex : 1		
			  	});
				var curCircle = new olleh.maps.Circle({
					center: coord,
					radius: 500,
					map: that.map,
					fillColor: "#ff0000", 
					fillOpacity: 0.07,
					strokeColor: "#ff0000",
					strokeOpacity: 0.6,
					strokeWeight: 1
				});
			},
			
			
			setStartLocation : function (x, y) {
				var that = this;
				console.log("setStartLocation()");
				
			  	that.geocoder.geocode(
						{
					  		type: 1,
					  		isJibun: 1,
					  		x: x, 
					  		y: y
						}, 
						"startLocatoin_callback");
			  	startLocatoin_callback = function(data) {
					var geocoderResult = that.geocoder.parseGeocode(data);
					if(geocoderResult["count"] != "0"){
						var infoArr = geocoderResult["infoarr"];
						for(var i=0; i<infoArr.length; i++){
							$("#hiddenStartX").val( infoArr[i].x );
							$("#hiddenStartY").val( infoArr[i].y );
							$("#hiddenStartName").val( infoArr[i].address );
							$("#textStartLocation").val("내위치: " + infoArr[i].address)
															.attr("placeholder", "내위치: " + infoArr[i].address );
						}
					}
				};
			},
			
			
			setEndLocation : function(x, y) {
				var that = this;
				console.log("setEndLocation");
				
			  	that.geocoder.geocode(
			  			{
			  				type: 1,
			  				isJibun: 1,
			  				x: x, 
			  				y: y
			  			}, 
			  			"endLocatoin_callback");
			  	endLocatoin_callback = function(data) {
					var geocoderResult = that.geocoder.parseGeocode(data);
					if(geocoderResult["count"] != "0"){
						var infoArr = geocoderResult["infoarr"];
						for(var i=0; i<infoArr.length; i++){
							$("#hiddenEndX").val( infoArr[i].x );
							$("#hiddenEndY").val( infoArr[i].y );
							$("#hiddenEndName").val( infoArr[i].address );
							$("#textEndLocation").val( "최근목적지: " + infoArr[i].address )
															.attr("placeholder", "최근목적지: " + infoArr[i].address );
							
						}
					}
			  	};
			},
			
			
			searchLocatoin : function( target ) {
				var that = this;
				console.log("searchLocatoin()");

				var query = $.trim($(target).val());
				
				if ( target && query != "" ) {
					if ( query.indexOf("내위치: ") == 0 || query.indexOf("최근목적지: ") == 0 ) {
						query = query.split(": ")[1];
					} 
					
					if ( $(target).get(0) == $("#textStartLocation").get(0) ) {
						console.log("1");
						$("#formLocations").trigger("searchLocation"); //, [query, "start"]
//						$("#formLocations").live("searchLocation"); //, [query, "start"]
						
					} else if ( $(target).get(0) == $("#textEndLocation").get(0) ) {
						$(this).trigger("searchLocation", [query, "end"]);
						
					}
				}
				
			},
			
			
			searchRooms : function() {
				var that = this;
				console.log("searchRooms()");
				console.log("params: " + $("#hiddenStartY").val(), $("#hiddenStartX").val(), $("#hiddenEndY").val(), $("#hiddenEndX").val());
				
				var url = "room/searchRooms.do";
				$.post(url
						, {
							startTime 	: $("#hiddenStartTime").val(),
							startLat 		: $("#hiddenStartY").val(),
							startLng 	: $("#hiddenStartX").val(),
							startRange 	: $("#hiddenStartRange").val(),
							endLat 		: $("#hiddenEndY").val(),
							endLng 		: $("#hiddenEndX").val(),
							endRange 	: $("#hiddenEndRange").val()
						}, function(result) {
							if (result.status == "success") {
								console.log(result.data);
								var searchRoomList = result.data;
								$("#ulRoomList > .roomlst_l").remove(); 
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
															that.searchRoute( 
																	parseFloat($(this).attr("data-startX")), 
																	parseFloat($(this).attr("data-startY")),
																	parseFloat($(this).attr("data-endX")),
																	parseFloat($(this).attr("data-endY")) );
															$("#divRoomList").css("opacity","0.6");
															$("#divRoomList a").css("color","white");
															$("#divRoomControl_popup").popup("open", {
																transition: "slideup"
															});
														}) )
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
			},
			
			
			searchRoute : function ( startX, startY, endX, endY ) {
				var that = this;
				console.log("searchRoute()");
				console.log(startX, startY, endX, endY);
//				that.loadMap( new olleh.maps.Coord(curPoint, startY), 10);
				var DirectionsRequest = {
					origin : new olleh.maps.Coord( startX, startY ),
					destination : new olleh.maps.Coord( endX, endY ),
					projection : olleh.maps.DirectionsProjection.UTM_K,
					travelMode : olleh.maps.DirectionsTravelMode.DRIVING,
					priority  : olleh.maps.DirectionsDrivePriority.PRIORITY_0
				};
				that.directionsService.route(DirectionsRequest, "homejs.directionsService_callback");

			}, 
			
			
			directionsService_callback : function (data) {
				console.log("directionsService_callback()");
				var that = this;
				
				console.log(this);
				console.log(that);
				var directionsResult  = that.directionsService.parseRoute(data);
				console.log(directionsResult);
				console.log(that.map);
				var DirectionsRendererOptions = {	
					directions : directionsResult,
					map : that.map,
					keepView : true,
					offMarkers : false,
					offPolylines : false
				};
				var DirectionsRenderer = new olleh.maps.DirectionsRenderer(DirectionsRendererOptions);
				DirectionsRenderer.getDirections();
				DirectionsRenderer.setMap(that.map);
			},
			
			
			addRoom : function() { 
			    var distance = 3000; 
			    var fare = 20000; 
			    var startRank = 0; 
			    var startLoc = "강남역"; 
			    var startLot = 127.058766; 
			    var startLat = 37.598184; 
			    var endRank = 4; 
			    var endLoc = "대학로"; 
			    var endLat = 37.484513; 
			    var endLng = 126.929682; 
			      
			    // lat, lng 
			    var startTime = new Date(); 
			    var url = "room/addRoom.do"; 
			    $.post(url, 
			        { 
			        roomStartTime : startTime, 
			        roomDistance : distance, 
			            roomFare : fare, 
			            pathLocRank : startRank, 
			            pathLocName : startLoc, 
			            pathLocLat : startLat, 
			            pathLocLng : startLot, 
			            endLocRank : endRank, 
			            endLocName : endLoc, 
			            endLocLat : endLat, 
			            endLocLng : endLng, 
			      
			        }, function(result) {
			              console.log(result);
			              if (result.status == "success") {
			            	  alert("방만들기 성공");
			            	  $("#divAddRoomCondition_popup").popup("close");
			              } else {
			            	  alert(result.data);
			              }
			        }, "json"); 
			},
			
			
			favoriteList : function() {
			    var that = this;
			    console.log("favoriteList()");
			    
			    $.getJSON("member/getFvrtLoc.do", function(result) {
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
                                    console.log($(this).attr("data-endX"), $(this).attr("data-endY")); 
                                    $("#hiddenEndX").val($(this).attr("data-endX"));  
                                    $("#hiddenEndY").val($(this).attr("data-endY")); 
                                    $("#textEndLocation").val($(this).attr("data-locName"));
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
				                                        .attr("src", "images/common/taxi.png")  ) 
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
			},
			
			
			drawRelationMap : function() {
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
			}
			
			
			
			
	};
	
	window.appContext.addObject("homejs", homejs);
}





