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
	        	},
	        	ridetypes: function($http){
		      		return $http.post(REST_URLS.RIDE_TYPES).then(function(res){
		      			return _.map(res.data, function(item){
		      				return {id: item._id, label: item.name};
		      			});
		      		});
		      	},
		      	vehicles: function($http){
		      		return $http.post(REST_URLS.VEHICLES).then(function(res){
		      			return _.map(res.data, function(item){
		      				return {id: item.name, label: item.name, _id: item._id};
		      			});
		      		});
		      	},
	        }
	      });
	  })
	.controller('RideChatCtrl', function (
			$scope, 
			ride, 
			ridetypes, 
			vehicles, 
			loginService, 
			$stateParams,
			$http,
			REST_URLS) {
		var socket = io(REST_URLS.SOCKET_SERVER);
        var user = loginService.user;

		var mapRide = function(item){
			var typeName = item.type == "1" ? ridetypes[0].label : ridetypes[1].label;
			var vehicle = _.find(vehicles, {label: item.vehicleType});
			var typeImg = "images/vehicles/vehicle-" + vehicle._id +".png";
			var isSubContractor = item.type == "2" ? true : false;
			var formatedItem = {
				typeName: typeName,
				typeImg: typeImg,
				isSubContractor: isSubContractor
			}
			_.assign(formatedItem, item);
			return formatedItem;
		}
		$scope.ride = mapRide(ride);
		$scope.companies = [];
		_.forEach($scope.ride.requests, function(val, key){
			$scope.companies.push({id: key, name: val.from});
		})
		$scope.isOwner = ride.username == loginService.user._id;

		var firstCompany = _.first($scope.companies) ? _.first($scope.companies).id : null;
		var defaultCompny = $scope.isOwner ? firstCompany : $scope.ride.username;

		$scope.target = $stateParams.target || defaultCompny;
		
	});
