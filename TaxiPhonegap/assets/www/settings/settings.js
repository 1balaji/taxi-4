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
		alert("aa");
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
	
	$("#save").click(function(){
		alert("처음");
		rankUpdate();
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
	/*$.mobile.loadPage( "settings.html", { showLoadMsg: false } );*/
	
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
	
	//$("#radio-choice-h-2a").prop("checked", true).checkboxradio("refresh");
	//$("input:radio[name='radio-choice-h-2'][value="+'<c:out value="${setting.startRange}"/>'+"]").attr("checked","checked");
	//$("input[type='radio']").attr("checked",true).checkboxradio("refresh");
  /* $("#radio-choice-h-2a").prop("checked", true).checkboxradio("refresh");
    $("#radio-choice-h-2b").prop("checked", true).checkboxradio("refresh");
    $("#radio-choice-h-2c").prop("checked", true).checkboxradio("refresh");
    $("#radio-choice-h-2d").prop("checked", true).checkboxradio("refresh"); 
    $("#radio-choice-h-3a").prop("checked", true).checkboxradio("refresh");
    $("#radio-choice-h-3b").prop("checked", true).checkboxradio("refresh");
    $("#radio-choice-h-3c").prop("checked", true).checkboxradio("refresh");
    $("#radio-choice-h-3d").prop("checked", true).checkboxradio("refresh"); */  
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
	
	//$("#radio-choice-h-2a").prop("checked", true).checkboxradio("refresh");
	//$("input:radio[name='radio-choice-h-2'][value="+'<c:out value="${setting.startRange}"/>'+"]").attr("checked","checked");
	//$("input[type='radio']").attr("checked",true).checkboxradio("refresh");
  /* $("#radio-choice-h-2a").prop("checked", true).checkboxradio("refresh");
    $("#radio-choice-h-2b").prop("checked", true).checkboxradio("refresh");
    $("#radio-choice-h-2c").prop("checked", true).checkboxradio("refresh");
    $("#radio-choice-h-2d").prop("checked", true).checkboxradio("refresh"); 
    $("#radio-choice-h-3a").prop("checked", true).checkboxradio("refresh");
    $("#radio-choice-h-3b").prop("checked", true).checkboxradio("refresh");
    $("#radio-choice-h-3c").prop("checked", true).checkboxradio("refresh");
    $("#radio-choice-h-3d").prop("checked", true).checkboxradio("refresh"); */  
 }
/*친구목록갱신 버튼*/
/*$( document ).on( "click", ".show-page-loading-msg", function() {
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
});*/
//친구 목록 갱신
/*function frndRefresh(userInfo) { 
	console.log("왔어염");
	getFacebookMemberInfo(function(userInfo) {
		$.ajax("../member/frndRefresh.do", {
    		type: "POST",
    		data: JSON.stringify( {"userInfo": userInfo} ),
    		dataType: "json",
    		contentType: "application/json",
    		success: function(result) {
    			console.log(userInfo);
    			if(result.status == "success") {
    				alert("왔음");
//    				$.mobile.changePage("../main.html");
//    				window.location.href = "../main.html";
    				$( "#stop" ).listview('refresh');
    			} else {
    				alert("회원정보가 맞지 않습니다.");
    			}
    		}
    	});
	});
};			*/
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
			
				/*
				    $("li#selection select.select option").each(function(){
				        if($(this).val()==500){ // EDITED THIS LINE
				            $(this).attr("selected","selected");    
				        }else if($(this).val()==1000){ // EDITED THIS LINE
				            $(this).attr("selected","selected");
				        }else if($(this).val()==2000){
				        	$(this).attr("selected","selected");
				        }else if($(this).val()==3000){
				        	$(this).attr("selected","selected");
				        }
				        console.log(result.data);
				    });*/
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
/*function addRange(){
	$.post("updateRange.do", 
			{
		startRange: $("#startRange").val(),
		endRange: $("#endRange").val(),
			},
			function(result) {
				if(result.status == "success") {
					alert("등록되었습니다");
				} else {
					alert("실행중 오류발생!");
					console.log(result.data);
				}
			},
	"json");
}*/

/*function listFvrtLoc(){
	$.getJSON("../member/getFavoritePlaces.do", function(result) {
		if(result.status == "success") {
			console.log(result);
			var fvrtLoc = result.data;
			var ul = $("#favoriteUl");
			$("#favoriteUl li").remove();
			for (var i in fvrtLoc) {
				$("<li>")
				.attr("data-theme","c")
				.attr("data-icon", "delete")
				.attr("id","fvrtLocNo")
				.attr("fvrtLocNo", fvrtLoc[i].fvrtLocNo)
				.attr("data-rank", fvrtLoc[i].fvrtLocRank)
				.append($("<a>")
						
						.attr("data-rel","popup")
						.attr("href","#popupFvrtLoc")
						.attr("data-fvrt_no", fvrtLoc[i].fvrtLocNo)
						.attr("id","selectView")
						.append($("<div>")
						.text(fvrtLoc[i].fvrtLocName) 
						.addClass("projectView")	
						))
						.appendTo(ul);
				$("#favoriteUl").listview("refresh");	
			}
		} else {
			console.log(result.data);
		}
	});
}*/

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
/*function fvrtLocUpdate(){
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
};*/
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