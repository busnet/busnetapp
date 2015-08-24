'use strict';

/**
 * @ngdoc service
 * @name busnetApp.pushNotifications
 * @description
 * # pushNotifications
 * Service in the busnetApp.
 */
angular.module('busnetApp')
  .service('pushNotifications', function (GOOGLE, $cordovaPush, loginService) {
    var notifications = function(){
		document.addEventListener("deviceready", function(){
	        var platform = $cordovaDevice.getPlatform().toLowerCase();
	        if (platform == 'android'){
	            var googleConfig = {
	                "senderID": GOOGLE.SENDERID
	            };
	            $cordovaPush.register(googleConfig).then(function(result) {
	                console.log('push register success: ' + result);
	            }, function(err) {
	                console.log('push register error: ' + err);
	            })
	        }else{
	            var iosConfig = {
	                "badge": true,
	                "sound": true,
	                "alert": true,
	            };
	            $cordovaPush.register(iosConfig).then(function(deviceToken) {
	                loginService.device.ios = {
	                    deviceToken: deviceToken
	                }
	            }, function(err) {
	                console.log("Registration error: " + err);
	            });
	        }
	    });
    }
    return notifications;
  });
