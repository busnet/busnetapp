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
	      	url: '/ridechat/:rideid/:target',
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
	.controller('RideChatCtrl', function ($scope, loginService, ride, $stateParams) {
		var user = loginService.user;
		$scope.target = $stateParams.target || user._id;
		$scope.ride = ride;
		var requests = ride.requests || [];
        $scope.isOwner = ride.username == user._id;
        $scope.companies = [];
        _.forEach(requests, function(val, key){
          $scope.companies.push({name: val.from, id: key});
        })
	});
