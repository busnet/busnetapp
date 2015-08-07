'use strict';

/**
 * @ngdoc function
 * @name busnetApp.controller:RideContractCtrl
 * @description
 * # RideContractCtrl
 * Controller of the busnetApp
 */
angular.module('busnetApp')
	.config(function ($stateProvider, REST_URLS) {
		$stateProvider
		  .state('app.ridecontract', {
		  	url: '/ridecontract/:rideid/:targetid',
		    templateUrl: 'views/ride-contract.html',
		    controller: 'RideContractCtrl',
		    accessLevel: accessLevels.user,
		    resolve: {
	        	ride: function($http, $stateParams){	
	        		var rideId = $stateParams.rideid;
	        		return $http.get(REST_URLS.RIDE + '/'+ rideId).then(function(res){
		      			return res.data;
		      		});
	        	},
	        	provider: function($http, $stateParams){
	        		var userId = $stateParams.userId;
	        		return $http.get(REST_URLS.USER + '/'+ userId).then(function(res){
		      			return res.data;
		      		});
	        	},
	        }
		})
	})
	.controller('RideContractCtrl', function ($scope, ride, provider) {
		$scope.ride = ride;
		$scope.contractor = loginService.user;
		$scope.provider = provider;
});
