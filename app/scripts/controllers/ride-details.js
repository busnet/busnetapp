'use strict';

/**
 * @ngdoc function
 * @name busnetApp.controller:RideDetailsCtrl
 * @description
 * # RideDetailsCtrl
 * Controller of the busnetApp
 */
angular.module('busnetApp')
	.config(function ($stateProvider, REST_URLS) {
    $stateProvider
      .state('app.ridedetails', {
      	url: '/ridedetails/:rideId',
        templateUrl: 'views/ride-details.html',
        controller: 'RideDetailsCtrl',
        accessLevel: accessLevels.public,
        resolve: {
        	ride: function($http, $stateParams){	
        		var rideId = $stateParams.rideId;
        		return $http.get(REST_URLS.RIDE + '/'+ rideId).then(function(res){
	      			return res.data;
	      		});
        	},
        	vehicles: function($http){
	      		return $http.post(REST_URLS.VEHICLES).then(function(res){
	      			return _.map(res.data, function(item){
	      				return {id: item.name, label: item.name, _id: item._id};
	      			});
	      		});
	      	},
	      	ridetypes: function($http){
	      		return $http.post(REST_URLS.RIDE_TYPES).then(function(res){
	      			return _.map(res.data, function(item){
	      				return {id: item._id, label: item.name};
	      			});
	      		});
	      	}
        }
      });
  })
  .controller('RideDetailsCtrl', function ($scope, ride, ridetypes, vehicles) {
  	var mapRide = function(item){
      var typeName = item.type == "1" ? ridetypes[0].label : ridetypes[1].label;
      var vehicle = _.find(vehicles, {label: item.vehicleType});
      var typeImg = "/images/vehicles/vehicle-" + vehicle._id +".png";
      var typeClass = item.type == "1" ? 'rideType1' : 'rideType2';
      var formatedItem = {
        typeName: typeName,
        typeImg: typeImg,
        typeClass: typeClass
      }
      _.assign(formatedItem, item);
      return formatedItem;  
    }
  	$scope.ride = mapRide(ride);
});
