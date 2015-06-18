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
      	ride: "=ride",
        target: "=targetUser"
      },
      link: function postLink(scope, element, attrs) {
      	var socket = io(REST_URLS.SOCKET_SERVER);
        var user = loginService.user;
        scope.target = scope.target || user._id;
        var requests = scope.ride.requests || [];
        scope.messages = requests[scope.target] ? requests[scope.target].msgs : [];
        scope.isOwner = scope.ride.username == user._id;
        scope.sendMessage = function(message){
        	var messageType = _.size(scope.messages) > 0 ? 'reply' : 'send';
        	var msg = {
        		message: message, 
        		rideID: scope.ride._id,
        		username: user._id,
        		name: user.dtl.companyName,
        		time: moment().format('HH:mm'), 
        		toUser: scope.ride.username
        	};

        	scope.messages.push(msg);
        	socket.emit(messageType, msg);
        }
      }
    };
  });
