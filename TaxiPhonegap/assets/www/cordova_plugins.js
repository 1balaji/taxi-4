cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/org.apache.cordova.media/www/MediaError.js",
        "id": "org.apache.cordova.media.MediaError",
        "clobbers": [
            "window.MediaError"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.media/www/Media.js",
        "id": "org.apache.cordova.media.Media",
        "clobbers": [
            "window.Media"
        ]
    },
    {
        "file": "plugins/com.phonegap.plugins.PushPlugin/www/PushNotification.js",
        "id": "com.phonegap.plugins.PushPlugin.PushNotification",
        "clobbers": [
            "PushNotification"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.splashscreen/www/splashscreen.js",
        "id": "org.apache.cordova.splashscreen.SplashScreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.phonenumber/www/phonenumber.js",
        "id": "org.apache.cordova.phonenumber",
        "clobbers": [
                     "PhoneNumber"
         ]
    },
    {
		"file": "plugins/org.apache.cordova.toast/www/toast.js",
		"id": "org.apache.cordova.toast",
		"runs": true
	}
];
module.exports.metadata = 
// TOP OF METADATA
{
    "org.apache.cordova.media": "0.2.6",
    "com.phonegap.plugins.facebookconnect": "0.4.0",
    "com.phonegap.plugins.PushPlugin": "2.1.1",
    "org.apache.cordova.splashscreen": "0.2.5",
    "com.simonmacdonald.telephonenumber": "1.0.0"
}
// BOTTOM OF METADATA
});