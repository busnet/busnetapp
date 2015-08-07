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
		var companies = [];
		_.forEach(ride.requests, function(val, key){
			companies.push({name: val.from, id: key});
		});
		$scope.companies = companies;
		$scope.isOwner = ride.username == loginService.user._id;

		var firstCompany = _.first(companies) ? _.first(companies).id : user._id;
		var defaultCompny = $scope.isOwner ? firstCompany : ride.username;

		$scope.target = $stateParams.target || defaultCompny;

		$scope.suggest = function(price){
			socket.emit('updateRidePrice', { 
				rideID: ride._id, 
				price: price, 
				username: user._id, 
				toUser: $scope.target, 
				name: user.dtl.companyName 
			});
			$scope.ride.price = price;
		};

		$scope.approve = function(approved){
			socket.emit('approveRideStatus', { 
				rideID: ride._id, 
				username: user._id, 
				toUser: $scope.target, 
				isApproved: approved ,
				name: user.dtl.companyName
			});
			if(!approved){
				$scope.ride.price = null;
			}
		};

		socket.on('gotPrice', function(message){
			$scope.ride.price = message.price;
		});
	});
