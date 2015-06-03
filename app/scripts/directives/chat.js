'use strict';

/**
 * @ngdoc directive
 * @name busnetApp.directive:chat
 * @description
 * # chat
 */
angular.module('busnetApp.directives', ['angularMoment'])
  .directive('chat', function (loginService, REST_URLS) {
    return {
      templateUrl: 'views/chat.html',
      restrict: 'E',
      scope:{
      	requests: "=requests",
      	rideid: "=rideid",
      	rideowner: "=rideowner"
      },
      link: function postLink(scope, element, attrs) {
      	var socket = io(REST_URLS.SOCKET_SERVER);
        scope.sendMessage = function(message){
        	var messageType = scope.requests ? 'reply' : 'send';
        	var user = loginService.user;
          console.log(user);
        	var msg = {
        		message: message, 
        		rideID: scope.rideid,
        		username: user._id,
        		name: user.dtl.companyName,
        		time: moment().format('HH:mm'), 
        		toUser: scope.rideowner
        	};

        	if(!scope.requests){
        		scope.requests = {};
        	}

        	if(_.size(scope.requests) == 0){
        		scope.requests[scope.rideowner] = {
        			from: user.dtl.companyName,
        			msgs: []
        		};
        	}
        	scope.requests[scope.rideowner].msgs.push(msg);
        	socket.emit(messageType, msg);
        }
      }
    };
  });
