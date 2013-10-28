var userInfo;
var friendList;

$(document).ready(function() {
	window.fbAsyncInit = function() {
        FB.init({
        	// '661078053922775
          appId      : '656532944366756', 
          status     : true,        
          cookie     : true,          
          xfbml      : true,
          /* oauth : true */
        });
        FB.Event.subscribe('auth.logout', function(response) { 
        	document.location.reload(); });
        
        FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                FB.api('me?fields=id,name,gender,picture.type(small)', 
                		function(user) {
                    if (user) {
                    	console.log(user);
                    	userInfo = {
                    			mbrId: 			parseInt( user.id ),
                    			mbrName: 		user.name,
                    			mbrGender:		user.gender,
                    			mbrPhotoUrl: 	user.picture.data.url,
                    			friendList:		friendList
                    	};
                    }
                });    
                
                FB.api('/me/friends?fields=id,name,picture.type(small)', function(friends) {
                    if (friends) {
                    	userInfo.friendList = [friends.data.length];
                    	for(var i = 0; i < friends.data.length; i++) {
                    		userInfo.friendList[i] = {
	                    			frndId: 			parseInt( friends.data[i].id ),
	                    			mbrId:			userInfo.mbrId,
	                    			frndName: 		friends.data[i].name,
	                    			frndPhotoUrl: 	friends.data[i].picture.data.url
	                    	};
                    	}
                    	
                    	$.ajax("login.do", {
                			type: "POST",
                			data: JSON.stringify(userInfo),
                			dataType: "json",
                			contentType: "application/json",
                			success: function(result) {
                				if(result.status == "fail") {
                					alert("이메일이나 암호가 맞지 않습니다.");
                					
                				} else {
                					alert("login성공!!!");
                				}
                			}
                		});
                    }
                });  
                
                 
            } else if (response.status === 'not_authorized') {
            	alert("not_authorized");
            } else {
            	alert("nonono");
            }
        });
        FB.Event.subscribe('auth.login', function(response) {
            document.location.reload();
        });
      };
      
      function getImgSize(imgSrc)
      {
      var newImg = new Image();
      newImg.src = imgSrc;
      var height = newImg.height;
      var width = newImg.width;
      alert ('The image size is '+width+'*'+height);
      }
      
      (function(d){
         var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement('script'); js.id = id; js.async = true;
         js.src = "//connect.facebook.net/ko_KR/all.js";
         ref.parentNode.insertBefore(js, ref);
       }(document));
	
	
     
	
});

