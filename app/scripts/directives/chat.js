'use strict';

/**
 * @ngdoc directive
 * @name busnetApp.directive:chat
 * @description
 * # chat
 */
angular.module('busnetApp.directives', ['angularMoment'])
  .directive('chat', function ($state, loginService, REST_URLS) {
    return {
      templateUrl: 'views/chat.html',
      restrict: 'E',
      scope:{
      	ride: "=ride",
        target: "=target"
      },
      link: function postLink(scope, element, attrs) {
        var socket = io(REST_URLS.SOCKET_SERVER);
        var user = loginService.user;
        scope.isOwner = scope.ride.username == user._id;
        scope.messages = {};
        if(scope.ride.requests){
          scope.messages = scope.ride.requests[scope.target] ? scope.ride.requests[scope.target] : [];
        }

        scope.suggest = function(price){
          socket.emit('updateRidePrice', { 
            rideID: scope.ride._id, 
            price: price, 
            username: user._id, 
            toUser: scope.target, 
            name: user.dtl.companyName 
          });
          scope.messages.price = price;
        };

        scope.approve = function(approved){
          socket.emit('approveRideStatus', { 
            rideID: scope.ride._id, 
            username: user._id, 
            toUser: scope.target, 
            isApproved: approved ,
            name: user.dtl.companyName
          });
          if(!approved){
            scope.messages.price = null;
          }else{
            $state.go('app.ridecontract', {
              rideid: scope.ride._id, 
              targetid: scope.target
            });
          }
        };

        socket.on('gotPrice', function(message){
          scope.ride.messages.price = message.price;
        });

        var addMessage = function(message){
          if(!message){
            return;
          }
          scope.$apply(function(){
            if(!scope.messages.msgs){
              scope.messages.msgs = [];
            }
            scope.messages.msgs.push(message);
            //scrollToBottom();
          });
        };
        socket.on('message2Owner', addMessage);
        socket.on('message2User', addMessage);
        scope.sendMessage = function(message){
        	var messageType =  scope.ride.requests[scope.target] ? 'reply' : 'send';
        	var msg = {
        		message: message, 
        		rideID: scope.ride._id,
        		username: user._id,
        		name: user.dtl.companyName,
        		time: moment().format('HH:mm'), 
        		toUser: scope.target
        	};

        	socket.emit(messageType, msg);
          scope.message = '';
        }
      }
    };
  });
