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
	        		var userId = $stateParams.targetid;
	        		return $http.get(REST_URLS.USER + '/'+ userId).then(function(res){
		      			return res.data;
		      		});
	        	}
	        }
		})
	})
	.controller('RideContractCtrl', function (
		$scope,
		$state,
		loginService, 
		ride, 
		provider,
		REST_URLS) {
		var socket = io(REST_URLS.SOCKET_SERVER);
		var user = loginService.user;

		$scope.ride = ride;
		$scope.provider = provider.data;
		$scope.contractor = loginService.user;
		$scope.now = moment().format('DD/MM/YYYY');
		$scope.approve = function(){
			socket.emit('ownerApprovedAgreement', { 
				rideID: ride._id, 
				username: user._id, 
				toUser: $scope.contractor._id, 
				isApproved: true, 
				name: user.dtl.companyName 
			});
			$state.go('app.rides');
		};
});
