'use strict';

/**
 * @ngdoc function
 * @name busnetApp.controller:RideChatCtrl
 * @description
 * # RideChatCtrl
 * Controller of the busnetApp
 */
angular.module('busnetApp.RideChat', [])
	.config(function ($stateProvider, REST_URLS) {
	    $stateProvider
	      .state('app.ridechat', {
	      	url: '/ridechat/:rideid',
	        templateUrl: 'views/ride-chat.html',
	        controller: 'RideChatCtrl',
	        accessLevel: accessLevels.public,
	        resolve: {
	        	ride: function($http, $stateParams){	
	        		var rideId = $stateParams.rideid;
	        		return $http.get(REST_URLS.RIDE + '/'+ rideId).then(function(res){
		      			return res.data;
		      		});
	        	}
	        }
	      });
	  })
	.controller('RideChatCtrl', function ($scope, ride) {
		$scope.rideid = ride._id;
		$scope.owner = ride.username;
		$scope.requests = ride.requests;
		console.log(ride);
	});
