'use strict';

/**
 * @ngdoc directive
 * @name busnetApp.directive:chat
 * @description
 * # chat
 */
angular.module('busnetApp.directives', ['angularMoment'])
  .directive('chat', function (loginService) {
    return {
      templateUrl: 'views/chat.html',
      restrict: 'E',
      scope:{
      	requests: "=requests",
      	rideid: "=rideid",
      	rideowner: "=rideowner"
      },
      link: function postLink(scope, element, attrs) {
      	var socket = io('http://localhost:3002');

        scope.sendMessage = function(rideid, to, msg, reply){
        	var messageType = reply ? 'reply' : 'send';
        	var user = loginService.user;
        	var msg = {
        		message: msg, 
        		rideID: rideid,
        		username: user._id,
        		name: user.dtl.companyName,
        		time: moment().format('HH:mm'), 
        		toUser: to 
        	};

        	if(!scope.requests){
        		scope.requests = {};
        	}

        	if(_.size(scope.requests) == 0){
        		scope.requests[to] = {
        			from: user.dtl.companyName,
        			msgs: []
        		};
        	}
        	scope.requests[to].msgs.push(msg);
        	socket.emit(messageType, msg);
        }
      }
    };
  });
