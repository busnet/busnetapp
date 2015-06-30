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
	.controller('RideChatCtrl', function ($scope, ride, loginService, $stateParams) {
		$scope.ride = ride;
		var companies = [];
		_.forEach(ride.requests, function(val, key){
			companies.push({name: val.from, id: key});
		});
		$scope.companies = companies;
		$scope.isOwner = ride.username == loginService.user._id;

		var firstCompany = _.first(companies) ? _.first(companies).id : loginService.user._id;
		var defaultCompny = $scope.isOwner ? firstCompany : loginService.user._id;

		$scope.target = $stateParams.target || defaultCompny;
	});
