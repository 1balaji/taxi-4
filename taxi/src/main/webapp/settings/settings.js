$(document).ready(function(){ 
    console.log("settingjs");
    $("#btnLogout").click(function(){ 
        logout(); 
    }); 
    
    $("#btnLeaveMember").click(function(){ 
        $("#popupLeaveMember").popup("open");
    });
    $("#btnLeave").click(function(){
    	console.log("btnLeave");
        leaveMember(); 
    }); 
    $("#btnCancel").click(function(){ 
    	console.log("close");
    	$("#popupLeaveMember").popup("close");
    }); 
    
});


/*회원탈퇴*/
function leaveMember() { 
	console.log("leaveMember()");
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
      
/*로그아웃*/
function logout() { 
	console.log("logout()");
//    event.preventDefault();
    $.getJSON("../auth/logout.do", function(result) { 
        if(result.status == "success") {
            alert("로그아웃이 성공적으로 되었습니다."); 
            FB.logout(function(response) {
        		location.href = "../auth/auth.html"; 
            });
        } 
    }); 
}; 