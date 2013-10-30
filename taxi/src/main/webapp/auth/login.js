$(document).ready(function() {
	console.log("login");
	initFacebook();
    
	

});

getFacebookMemberInfo = function () {
	var userInfo = null;
	
	FB.api('me?fields=id,name,gender,picture.type(small)', 
			function(user) {
		if (user) {
        	console.log(user);
        	userInfo = {
        			mbrId: 			parseInt( user.id ),
        			mbrName: 		user.name,
        			mbrGender:		user.gender,
        			mbrPhotoUrl: 	user.picture.data.url,
        			friendList:		null
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
        }
    });
    return userInfo;
};

initFacebook = function () {
	window.fbAsyncInit = function() {
        FB.init({
          appId      : '536450846448669', 
          status     : true,        
          cookie     : true,          
          xfbml      : true,
          /* oauth : true */
        });
        
        FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
            	console.log("connected");
            	var userInfo = getFacebookMemberInfo();

            } else if (response.status === 'not_authorized') {
            	console.log("not_authorized");
            	
            } else {
            	console.log("not_member");
            }
        });
        
        FB.Event.subscribe('auth.login', function(response) {
        	var userInfo = getFacebookMemberInfo();
    	});
        
//    	FB.Event.subscribe('auth.logout', function(response) { 
//			document.location.reload(); 
//		});
        
	};

	(function(d){
		var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
		if (d.getElementById(id)) {return;}
		js = d.createElement('script'); js.id = id; js.async = true;
		js.src = "//connect.facebook.net/ko_KR/all.js";
		ref.parentNode.insertBefore(js, ref);
	}(document));
};


