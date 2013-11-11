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
	
});	  

/*
	var loginInfo;
	
	function loginInfo() {
		$.getJSON("../auth/loginInfo.do", function(result) {
			if (result.status == "success") {
				loginInfo = result.data;
				
			} else {
				alert("로그인 인증실패");
				$.mobile.changePage("../auth/auth.html", {reloadPage : true});
			}
		});
	};
*/

var getRoomInfo = function(roomNo) {
	
	$.getJSON("getRoomInfo.do?roomNo=" + roomNo, 
								function(result) {
		
	var roomInfo = result.data;
	 
	if(result.status == "success") {
		var d = new Date(roomInfo.roomStartTime);
		var hour = d.getHours();
		var minute = d.getMinutes();
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