$(document).ready(function() {
//	로그인 하면 강제적으로 기본 셋팅값 설정 출발지 1000m 도착지 1000m를 변경
	$("#seach").click(function() {
		startRangeChk();
		endRangeChk();
		 $("#startRange").find("input[type='radio']").bind("change", function(){
      });
	});
	$("#btnAdd").click(function() {
		addRange();
	});
	$.getJSON( rootPath + "/settings/getRange.do", function(result){
		if(result.status == "success") {
			var setting = result.data;
			$("#startRange1").val(setting.startRange);
			$("#endRange1").val(setting.endRange);
		}else{
			alert("실행중 오류발생!");
			console.log(result.data);
		}
	});
	
	$("#btnLogoutAccept").click(function(){ 
		logout(); 
	}); 
	$("#btnLogoutCancel").click(function() {
		$("#popupLogout").popup("close");
	});

	$("#frndRefresh").click(function() {
		frndRefresh();
	});
	
	$("#btnLeave").click(function(){
		console.log("btnLeave");
		leaveMember(); 
	}); 
	$("#btnCancel").click(function(){ 
		console.log("close");
		$("#popupLeaveMember").popup("close");
	}); 
	$("#btnDeleteLocCancel").click(function() {
		$("#popupFvrtLoc").popup("close");
	});
	
	$("#btnChange").click(function(){
		fvrtLocLists();
	});
	
	$("#btnDeleteLoc").click(function() {
		deleteFvrtLoc();
	});
	
	$("#btnList").click(function(){
		listFvrtLoc();
	});
	$("#btnFvrtLocUpdate").click(function(){
    	fvrtLocUpdate();
	});
	$("#cross").click(function() {
		window.location.href = "../home/home.html";
	});
	$("#arrow").click(function() {
		window.location.href = "../settings/settings.html";
	});
	$("#arrow1").click(function() {
		window.location.href = "../settings/settings.html";
	});
	/*$(document).bind('pageinit', function() {
	    $( "#sortable" ).sortable();
	    $( "#sortable" ).disableSelection();
	    $( "#sortable" ).bind( "sortstop", function(event, ui) {
	    $( "#sortable").listview('refresh');
	    });
	  });*/
	
	$(".content").hide();
	$("#btnList").show();
	$("#btnList").click(function () {
	$(".content").toggle("slide");
	});
	
	$(".contents").hide();
	$("#btnChange").show();
	$("#btnChange").click(function () {
	$(".contents").toggle("slide");
	});
	$.mobile.loadPage( "settings.html", { showLoadMsg: false } );
	
	// 폰번호 입력시 validatePhone() 호출
	/*$("#content").on('keyup','#txtPhone', function(e) {
	   if (validatePhone('txtPhone')) {
	       $('#spnPhoneStatus').text('Valid');
	       $('#spnPhoneStatus').css('color', 'green');
	       $("#next").css("display", "");
	       
	   } else {
	      $('#spnPhoneStatus').text('Invalid');
	      $('#spnPhoneStatus').css('color', 'red');
	      $("#next").css("display", "none");
	   }
	});
	
	$("#btnPhoneNo").on('click', function(){
		signUp( $("#txtPhone").val() );
	});
	initFacebook();*/
});

function startRangeChk() {
	
	$.getJSON("getRange.do", function(result){
		if(result.status == "success") {
		var setting = result.data;
			if(setting.startRange == "500"){
				$("#radio-choice-h-2a").prop("checked", true).checkboxradio("refresh");
			}else if(setting.startRange =="1000"){
				$("#radio-choice-h-2b").prop("checked", true).checkboxradio("refresh");
			}else if(setting.startRange =="2000"){
				$("#radio-choice-h-2c").prop("checked", true).checkboxradio("refresh");
			}else if(setting.startRange =="3000"){
				$("#radio-choice-h-2d").prop("checked", true).checkboxradio("refresh"); 
			}
		/*$("#startRange1").val(setting.startRange);
		$("#endRange1").val(setting.endRange);*/
		}else{
				alert("실행중 오류발생!");
				console.log(result.data);
		}
	});
 }

function endRangeChk() {
	
	$.getJSON("getRange.do", function(result){
		if(result.status == "success") {
		var setting = result.data;
			if(setting.endRange == "500"){
				$("#radio-choice-h-3a").prop("checked", true).checkboxradio("refresh");
			}else if(setting.endRange =="1000"){
				$("#radio-choice-h-3b").prop("checked", true).checkboxradio("refresh");
			}else if(setting.endRange =="2000"){
				$("#radio-choice-h-3c").prop("checked", true).checkboxradio("refresh");
			}else if(setting.endRange =="3000"){
				$("#radio-choice-h-3d").prop("checked", true).checkboxradio("refresh"); 
			}
		/*$("#startRange1").val(setting.startRange);
		$("#endRange1").val(setting.endRange);*/
		}else{
				alert("실행중 오류발생!");
				console.log(result.data);
		}
	});
 }










/*친구목록갱신 버튼*/
$( document ).on( "click", ".show-page-loading-msg", function() {
    var $this = $( this ),
        theme = $this.jqmData( "theme" ) || $.mobile.loader.prototype.options.theme,
        msgText = $this.jqmData( "msgtext" ) || $.mobile.loader.prototype.options.text,
        textVisible = $this.jqmData( "textvisible" ) || $.mobile.loader.prototype.options.textVisible,
        textonly = !!$this.jqmData( "textonly" );
        html = $this.jqmData( "html" ) || "";
    $.mobile.loading( "show", {
            text: msgText,
            textVisible: textVisible,
            theme: theme,
            textonly: textonly,
            html: html
    });
})
.on( "click", ".hide-page-loading-msg", function() {
    $.mobile.loading( "hide" );
});
function initFacebook(){
	console.log("initFacebook()");
	window.fbAsyncInit = function() {
        FB.init({
			appId      : '536450846448669', 
			status     : true,        
			cookie     : true,          
			xfbml      : true,
			oauth      : true
        });
        getFacebookLoginStatus();
        FB.Event.subscribe('auth.login', function(response) {
        	getFacebookLoginStatus(); 
        	
        });

	};
	(function(d){
		var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
		if (d.getElementById(id)) {return;}
		js = d.createElement('script'); js.id = id; js.async = true;
		js.src = "http://connect.facebook.net/ko_KR/all.js";
		ref.parentNode.insertBefore(js, ref);
	}(document));
	deletefrnd();  
};

var getFacebookLoginStatus = function() {
	console.log("getFacebookLoginStatus()");
	FB.getLoginStatus(function(response) {

	        if (response.status === 'connected') {

	        } else if (response.status === 'not_authorized') {
	        	console.log("not_authorized");
//	        	$.mobile.changePage("#divLoginPage");
	        } else {
	        	console.log("not_member");
//	        	$.mobile.changePage("#divLoginPage");
	        }
	});
};

var getFacebookMemberInfo = function(callback) {
	console.log("ss");
	FB.api('me?fields=id,name,gender,picture.type(small)', 
			function(user) {
		var userInfo=null;
		if (user) {
        	userInfo = {
        			mbrId: 			parseInt( user.id ),
        			mbrName: 		user.name,
        			mbrGender:		user.gender,
        			mbrPhotoUrl: 	user.picture.data.url,
        			friendList:		[]
        	};
        }
		FB.api('/me/friends?fields=id,name,picture.type(small)', function(friends) {
            if (friends) {
            	console.log(userInfo);
            	userInfo.friendList = [friends.data.length];
            	for(var i = 0; i < friends.data.length; i++) {
            		userInfo.friendList[i] = {
                			frndId: 		parseInt( friends.data[i].id ),
                			mbrId:			userInfo.mbrId,
                			frndName: 		friends.data[i].name,
                			frndPhotoUrl: 	friends.data[i].picture.data.url
                	};
            	}
            	callback(userInfo);
            }
        });
	});  
	
};










//로그아웃
function logout() { 
	console.log("logout()");
//	event.preventDefault();
	$.getJSON("logout.do", function(result) { 
		if(result.status == "success") {
			alert("로그아웃이 성공적으로 되었습니다."); 
			FB.logout(function(response) {
				location.href = "../auth/auth.html"; 
			});
		} 
	}); 
};
function frndRefresh(userInfo) { 
	getFacebookMemberInfo(function(userInfo) {
		$.ajax("../member/frndRefresh.do", {
    		type: "POST",
    		data: JSON.stringify( {"userInfo": userInfo} ),
    		dataType: "json",
    		contentType: "application/json",
    		success: function(result) {
    			console.log(userInfo);
    			if(result.status == "success") {
//    				$.mobile.changePage("../main.html");
//    				window.location.href = "../main.html";
    				$( "#stop" ).listview('refresh');
    			} else {
    				alert("회원정보가 맞지 않습니다.");
    			}
    		}
    	});
	});
};	
function frndRefresh(userInfo) {
	$.ajax( rootPath + "/member/frndRefresh.do", {
		type: "POST",
		data: JSON.stringify( userInfo ) ,
		dataType: "json",
		contentType: "application/json",
		success: function(result) {
			console.log(userInfo);
			if(result.status == "success") {
    			console.log(result.data);
    			$( "#stop" ).listview('refresh');
    			/*$("#view").trigger("projectChanged");*/
    			alert("정보 갱신되었습니다.");
            	location.href = "../settings/settings.html";
			} else {
			alert("실패");
		}
	},
});
};

//회원탈퇴
function leaveMember() { 
	$.getJSON("../auth/loginInfo.do", function(result) { 
		if(result.status == "success") { 
			var loginInfo=result.data; 
			$.post("../member/leaveMember.do",  
					{mbrId: loginInfo.mbrId}, 
					function(result) { 
						if(result.status == "success") { 
							alert("탈퇴가 성공적으로 되었습니다."); 
							FB.logout(function(response) {
								location.href = "../auth/auth.html"; 
							});
						} else { 
							alert("실행중 오류발생!"); 
							console.log(loginInfo); 
						} 
					}, 
			"json"); 
		} else { 
			console.log(result.data); 
		} 
	}); 
}

function deleteFvrtLoc() {
	console.log("!!!@");
	//$.getJSON("deleteFvrtLoc.do", function(result) {
	//console.log(어흥);
	//console.log(result.data);
	//console.log($(that).attr("fvrtLocNo"));
	
	$.getJSON("../member/deleteFavoritePlace.do?fvrtLocNo=" + $("#fvrtLocNo").attr("fvrtlocno"), function(result) {
		if(result.status == "success") {
			console.log(result.data);
			console.log(result);
			$("#popupFvrtLoc").popup("close");
			fvrtLocLists();
		} else {
			alert("실행중 오류발생!");
			console.log(result.data);
		}
	});
}
/*반경등록*/
function addRange(){
	
	$.post("updateRange.do", 
			{
		startRange: $('input[name=radio-choice-h-2]:checked', '#updateRange').val(),
		endRange: $('input[name=radio-choice-h-2]:checked', '#updateRange1').val(),
		
			},
			function(result) {
				if(result.status == "success") {
					alert("등록되었습니다");
					location.href = "../settings/settings.html";
				} else {
					alert("실행중 오류발생!");
					console.log(result.data);
				}
			},
	"json");
	$.getJSON("getRange.do", function(result){
		if(result.status == "success") {
		var setting = result.data;
		$("#startRange1").val(setting.startRange);
		$("#endRange1").val(setting.endRange);
		}else{
				alert("실행중 오류발생!");
				console.log(result.data);
			
		}
	});
}

function selected(obj) {
	// HTML로 부터 변경된 값 가져오는 함수
	/*alert(obj[obj.selectedIndex].value);*/
}
/* 라디오버튼 벨류값 가져오기 */
function getRadioValue(radioObj){
	 if(radioObj != null){
	  for(var i=0; i<radioObj.length; i++){
	   if(radioObj[i].checked){
	    return radioObj[i].value;
	    alert(radioObj[radioObj.checkedIndex].value);
	   }
	  }
	 }
	 return null;
	}
/*즐겨찾기 우선순위 변경*/
$(function() {
    $( "#sortable" ).sortable();
    $( "#sortable" ).disableSelection();
    $( "#sortable" ).listview('refresh');
  });
function fvrtLocLists(){
$.getJSON("../member/getFavoritePlaces.do", function(result) { 
	if(result.status == "success") {
		var FvrtLoc = result.data;
		var ol = $("#sortable");
		$("#sortable li").remove();
		$('#fvrtLocNo').find('span').show();
		for(var i=0; i<FvrtLoc.length; i++){
			
			     $("<li>")
			     	.attr("data-icon", "delete")
			     	.attr("id","fvrtLocNo")
			        .attr("data-theme","c")
			     	.attr("fvrtLocNo", FvrtLoc[i].fvrtLocNo)
			     	.attr("data-rank", FvrtLoc[i].fvrtLocRank)
			     	.append($("<a>")	
			     	.attr("data-icon", "delete")
			     	.attr("data-rel","popup")
					.attr("href","#popupFvrtLoc")
			     	.append($("<div>")		
			     	.text(FvrtLoc[i].fvrtLocName))
			     	.attr("data-icon", "delete")
			     	)
			     	.attr("data-icon", "delete")
			        .appendTo(ol);
			     	
			         $( "#sortable" ).listview('refresh');
		}
	}else { 
		alert("실행중 오류발생!"); 
		console.log(getFavoritePlaces); 
	}
},"json");
};

/*즐겨찾기 우선순위 변경 저장클릭시 이동*/
function fvrtLocUpdate(){
	var fvrtArr = [];
	for(var index = 0; index < $("#sortable>li").size(); index++ ) {
		fvrtArr[index] = {
				fvrtLocNo : $($("#sortable>li").get(index)).attr("fvrtLocNo"),
				fvrtLocName : $($("#sortable>li").get(index)).text(),
				fvrtLocRank : index + 1
		};
	};
	console.log(fvrtArr);
	rankUpdate(fvrtArr);
};
function rankUpdate() {
	var fvrtArr = [];
	for(var index = 0; index < $("#sortable>li").size(); index++ ) {
		fvrtArr[index] = {
				fvrtLocNo : $($("#sortable>li").get(index)).attr("fvrtLocNo"),
				fvrtLocName : $($("#sortable>li").get(index)).text(),
				fvrtLocRank : index + 1
		};
	};
	
	alert("왔나?");
	
	$.ajax( rootPath + "/member/changeFavoritePlaces.do", {
		type: "POST",
		data: JSON.stringify( { "fvrtArr" : fvrtArr} ) ,
		dataType: "json",
		contentType: "application/json",
		success: function(result) {
			alert("무징");
			console.log(fvrtArr);
			if(result.status == "success") {
    			console.log(result.data);
    			fvrtLocLists();
    			$("#sortable").listview('refresh');
            	location.href = "../settings/settings.html";
			} else {
			alert("실패");
		}
	},
});

};
//$("input[type='radio']").attr("checked",true).checkboxradio("refresh"); 라디오 박스